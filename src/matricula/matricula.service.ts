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
}
