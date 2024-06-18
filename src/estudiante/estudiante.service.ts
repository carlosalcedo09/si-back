import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './estudiante.entity';
import { Repository } from 'typeorm';
import { EstadocivilService } from 'src/estadocivil/estadocivil.service';
import { GeneroService } from 'src/genero/genero.service';
import { DistritoService } from 'src/distrito/distrito.service';
import { CategoriaestudianteService } from 'src/categoriaestudiante/categoriaestudiante.service';
import { CarreraService } from 'src/carrera/carrera.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { CategoriaEstudiante } from 'src/categoriaestudiante/categoriaestudiante.entity';

@Injectable()
export class EstudianteService {
    constructor(@InjectRepository(Estudiante) 
    private estudianteRepository: Repository<Estudiante>,
    private estadocivilService: EstadocivilService,
    private generoService: GeneroService,
    private distritoService: DistritoService,
    private categoriaestudianteService: CategoriaestudianteService,
    private carreraService: CarreraService){}
    
    async createEstudiante(estudiante: CreateEstudianteDto){
        
        const estudianteFound= await this.estudianteRepository.findOne({
            where:{
                codigoE: estudiante.codigoE
            }
        })
        if(estudianteFound){
            return new HttpException('Student already exists',HttpStatus.CONFLICT)
        }

        const estadoFound= await this.estadocivilService.getEstado(estudiante.idEstado,);
        const generoFound= await this.generoService.getGenero(estudiante.idGenero);
        const distritoFound= await this.distritoService.getDistrito(estudiante.idDistrito);
        const categoriaestudianteFound= await this.categoriaestudianteService.getCategoriaE(estudiante.idCategoriaE);
        const carreraFound= await this.carreraService.getCarrera(estudiante.idCarrera);

        if(!estadoFound && !generoFound && ! distritoFound && categoriaestudianteFound && carreraFound){
            return new HttpException(
                'Faltan datos (idEstadoCivil, idGenero, idDistrito, idCarrera, idCategoriaEstudiante)',
                HttpStatus.NOT_FOUND,
                );
        }

        const newEstudiante= this.estudianteRepository.create(estudiante)
        return this.estudianteRepository.save(newEstudiante)
    }

    getEstudiantes(){
        return this.estudianteRepository.find({
            relations:['estadocivil','genero','distrito','categoriaestudiante','carrera'],
        });
    }

    async getEstudiante(codigoE: number){
        const estudianteFound = await this.estudianteRepository.findOne({
            where:{
                codigoE
            }
        });

        if(!estudianteFound){
            return new HttpException('Student not found',HttpStatus.NOT_FOUND)
        }
        return estudianteFound;
    }

    async deleteEstudiante(codigoE: number){
        const result= await this.estudianteRepository.delete({codigoE});
        if(result.affected === 0){
        return new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    async getTotalEstudiantes(): Promise<number> {
        const totalEstudiantes = await this.estudianteRepository.count();
        return totalEstudiantes;
    }

    async getEstudiantesPorCategoria(): Promise<any> {
        const totalEstudiantes = await this.estudianteRepository.count();

        const query = this.estudianteRepository.createQueryBuilder('e')
            .select('c.descripcionCE', 'descripcionCE')
            .addSelect('COUNT(*)', 'cantidad')
            .addSelect(`ROUND((COUNT(*) * 100.0 / ${totalEstudiantes}), 2)`, 'porcentaje')
            .innerJoin(CategoriaEstudiante, 'c', 'c.idCategoriaE = e.idCategoriaE')
            .groupBy('c.descripcionCE')
            .orderBy('cantidad', 'DESC')
            .limit(3);
            

        const result = await query.getRawMany();
        return result;
    }
}
