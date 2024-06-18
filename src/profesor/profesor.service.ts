import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './profesor.entity';
import { Repository } from 'typeorm';
import { EstadocivilService } from 'src/estadocivil/estadocivil.service';
import { GeneroService } from 'src/genero/genero.service';
import { DistritoService } from 'src/distrito/distrito.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { Usuario } from 'src/usuario/usuario.entity';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Injectable()
export class ProfesorService {    
    constructor(@InjectRepository(Profesor) 
    private profesorRepository: Repository<Profesor>,
    private estadocivilService: EstadocivilService,
    private generoService: GeneroService,
    private distritoServce: DistritoService){}
    
    async createProfesor(profesor: CreateProfesorDto){
        
        const profesorFound= await this.profesorRepository.findOne({
            where:{
                codigoD: profesor.codigoD
            }
        })
        if(profesorFound){
            return new HttpException('Teacher already exists',HttpStatus.CONFLICT)
        }

        const estadoFound= await this.estadocivilService.getEstado(profesor.idEstado,);
        const generoFound= await this.generoService.getGenero(profesor.idGenero);
        const distritoFound= await this.distritoServce.getDistrito(profesor.idDistrito);

        if(!estadoFound && !generoFound && ! distritoFound){
            return new HttpException(
                'Faltan datos (idEstadoCivil, idGenero, idDistrito)',
                HttpStatus.NOT_FOUND,
                );
        }

        const newProfesor= this.profesorRepository.create(profesor)
        return this.profesorRepository.save(newProfesor)
    }

    getProfesores(){
        return this.profesorRepository.find({
            relations:['estadocivil','genero','distrito'],
        });
    }

    async getProfesor(codigoD: number){
        const profesorFound = await this.profesorRepository.findOne({
            where:{
                codigoD
            }
        });

        if(!profesorFound){
            return new HttpException('Teacher not found',HttpStatus.NOT_FOUND)
        }
        return profesorFound;
    }

    async deleteProfesor(codigoD: number){
        const result= await this.profesorRepository.delete({codigoD});
        if(result.affected === 0){
            return new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    async updateProfesor(codigoD: number, profesor: UpdateProfesorDto){
        const profesorFound= await this.profesorRepository.findOne({
            where:{
                codigoD,
            }
        })

        if(!profesorFound){
            return new HttpException('Teacher not found',HttpStatus.NOT_FOUND);
        }
        
        const updateProfesor= Object.assign(profesorFound,profesor);
        return this.profesorRepository.save(updateProfesor);

    }

    async getProfesorUsuario() {
        const query = this.profesorRepository.createQueryBuilder('p')
          .leftJoinAndMapOne('p.usuario', Usuario, 'u', 'u.codigoD = p.codigoD')
          .select([
            'p',
            'COALESCE(u.username, \'\') AS username',
            'COALESCE(u.password, \'\') AS password',
            'COALESCE(CAST(u.issuperuser AS VARCHAR), \'\') AS issuperuser',
            'COALESCE(CAST(u.codigoD AS VARCHAR), \'\') AS usuario_codigoD'
          ]);
    
        const results = await query.getRawMany();
        return results;
    }

    async getProfesoresPorGenero(): Promise<any> {
        const query = `
            SELECT 
                idGenero,
                COUNT(*) AS cantidad,
                ROUND((COUNT(*) * 100.0 / (SELECT COUNT(*) FROM profesor)), 1) AS porcentaje
            FROM 
                profesor
            GROUP BY 
                idGenero;
        `;
    
        const result = await this.profesorRepository.query(query);
        return result;
    }

    async getTotalProfesores(): Promise<number> {
        const totalProfesores = await this.profesorRepository.count();
        return totalProfesores;
    }
    async getConsultarProfesorDistrito(): Promise<any[]> {
        const queryBuilder = this.profesorRepository.createQueryBuilder('profesor')
            .select(['distrito.Nombre_Di', 'COUNT(*) AS cantidad'])
            .innerJoin('profesor.distrito', 'distrito')
            .groupBy('distrito.Nombre_Di')
            .orderBy('cantidad', 'DESC')
            .limit(9);

        const results = await queryBuilder.getRawMany();
        return results;       
    }
    async ProfesoresDistritos(distritos: string[]): Promise<number> {
        const queryBuilder = this.profesorRepository.createQueryBuilder('profesor')
            .innerJoin('profesor.distrito', 'distrito')
            .select('COUNT(*)', 'cantidad')
            .where('distrito.Nombre_DI IN (:...distritos)', { distritos });

        const result = await queryBuilder.getRawOne();
        return result.cantidad;
    }
}
