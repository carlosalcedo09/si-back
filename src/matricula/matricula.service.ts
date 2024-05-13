import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Matricula } from './matricula.entity';
import { Repository } from 'typeorm';
import { EstudianteService } from 'src/estudiante/estudiante.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';

@Injectable()
export class MatriculaService {
    constructor(@InjectRepository(Matricula) 
    private matriculaRepository: Repository<Matricula>,
    private estudianteService: EstudianteService){}
    
    async createMatricula(matricula: CreateMatriculaDto){
        
        const matriculaFound= await this.matriculaRepository.findOne({
            where:{
                idMatricula: matricula.idMatricula
            }
        })
        if(matriculaFound){
            return new HttpException('Matricula already exists',HttpStatus.CONFLICT)
        }

        const estudianteFound= await this.estudianteService.getEstudiante(matricula.codigoE);

        if(!estudianteFound){
            return new HttpException(
                'Faltan datos (CodigoD)',
                HttpStatus.NOT_FOUND,
                );
        }

        const newMatricula= this.matriculaRepository.create(matricula)
        return this.matriculaRepository.save(newMatricula)
    }

    getMatriculas(){
        return this.matriculaRepository.find({
            relations:['estudiante'],
        });
    }

    async getMatricula(idMatricula: number){
        const  matriculaFound= await this.matriculaRepository.findOne({
            where:{
                idMatricula
            }
        });

        if(!matriculaFound){
            return new HttpException('Matricula not found',HttpStatus.NOT_FOUND)
        }
        return matriculaFound;
    }

        async deleteMatricula(idMatricula: number){
        const result= await this.matriculaRepository.delete({idMatricula});
        if(result.affected === 0){
            return new HttpException('Matricula not found', HttpStatus.NOT_FOUND);
        }
        return result;
        }

    async ListaCodigoCursoAula(codigoD: number, idCurso:string, aula:string ){
        return this.matriculaRepository.createQueryBuilder('m')
        .select('e.nombresE', 'nombresE')
        .addSelect('e.apellidosE', 'apellidosE')
        .addSelect('dt.idCurso', 'idCurso')
        .addSelect('dt.aula', 'aula')
        .addSelect('p.codigoD', 'codigoD')
        .addSelect('e.codigoE', 'codigoE')
        .innerJoin('m.estudiante', 'e', 'e.codigoE = m.codigoE')
        .innerJoin('m.detallematricula', 'dt') 
        .innerJoin('dt.profesor', 'p', 'p.codigoD = dt.codigoD')
        .where('p.codigoD = :codigoD', { codigoD })
        .andWhere('dt.idCurso = :idCurso', { idCurso })
        .andWhere('dt.aula = :aula', { aula })
        .getRawMany();
    }
    
    async getCondicionNota(codigoD: number, idCurso: string, aula: string, idUnidad: string) {
        return this.matriculaRepository
            .createQueryBuilder('m')
            .select('e.nombresE', 'nombresE')
            .addSelect('e.apellidosE', 'apellidosE')
            .addSelect('dt.idCurso', 'idCurso')
            .addSelect('dt.aula', 'aula')
            .addSelect('p.codigoD', 'codigoD')
            .addSelect('e.codigoE', 'codigoE')
            .addSelect('CASE WHEN EXISTS (SELECT 1 FROM notas n JOIN detallenota dn ON dn.idDetalleMC = n.idDetalleMC WHERE n.idMatricula = dt.idMatricula AND dn.idTipo IN (\'EP\', \'EF\') AND dn.idUnidad = :idUnidad) THEN \'Calificado\' ELSE \'No calificado\' END', 'condicionNota')
            .addSelect('COALESCE(MAX(dn.nota), 0.0)', 'nota')
            .innerJoin('m.estudiante', 'e', 'e.codigoE = m.codigoE')
            .innerJoin('m.detallematricula', 'dt')
            .innerJoin('dt.profesor', 'p', 'p.codigoD = dt.codigoD')
            .leftJoin('notas', 'n', 'n.idMatricula = dt.idMatricula')
            .leftJoin('detallenota', 'dn', 'dn.idDetalleMC = n.idDetalleMC AND dn.idUnidad = :idUnidad AND dn.idTipo IN (\'EP\', \'EF\')')
            .where('p.codigoD = :codigoD', { codigoD })
            .andWhere('dt.idCurso = :idCurso', { idCurso })
            .andWhere('dt.aula = :aula', { aula })
            .setParameters({ idUnidad })  
            .groupBy('e.nombresE')
            .addGroupBy('e.apellidosE')
            .addGroupBy('dt.idCurso')
            .addGroupBy('dt.aula')
            .addGroupBy('p.codigoD')
            .addGroupBy('e.codigoE')
            .addGroupBy('dt.idMatricula')
            .getRawMany();
    }
    
    
}
