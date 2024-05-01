import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './profesor.entity';
import { Repository } from 'typeorm';
import { EstadocivilService } from 'src/estadocivil/estadocivil.service';
import { GeneroService } from 'src/genero/genero.service';
import { DistritoService } from 'src/distrito/distrito.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';

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
}
