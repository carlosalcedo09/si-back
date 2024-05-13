import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrera } from './carrera.entity';
import { Repository } from 'typeorm';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { FacultadService } from 'src/facultad/facultad.service';

@Injectable()
export class CarreraService {
    constructor(@InjectRepository(Carrera) 
    private carreraRepository: Repository<Carrera>,
    private facultadService: FacultadService){}
    
    async createCarrera(carrera: CreateCarreraDto){
        
        const carreraFound= await this.carreraRepository.findOne({
            where:{
                idCarrera: carrera.idCarrera
            }
        })
        if(carreraFound){
            return new HttpException('Carrera already exists',HttpStatus.CONFLICT)
        }

        const facultadFound= await this.facultadService.getFacultad(
            carrera.idFacultad,
        );
        if(!facultadFound){
            return new HttpException(
                'Faltan datos (idFacultad)',
                HttpStatus.NOT_FOUND,
                );
        }

        const newCarrera= this.carreraRepository.create(carrera)
        return this.carreraRepository.save(newCarrera)
    }

    getCarreras(){
        return this.carreraRepository.find({
            relations:['facultad'],
        });
    }

    async getCarrera(idCarrera: number){
        const carreraFound = await this.carreraRepository.findOne({
            where:{
                idCarrera
            }
        });

        if(!carreraFound){
            return new HttpException('Carrera not found',HttpStatus.NOT_FOUND)
        }
        return carreraFound;
    }

    async deleteCarrera(idCarrera: number){
        const result= await this.carreraRepository.delete({idCarrera});
        if(result.affected === 0){
        return new HttpException('Carrera not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }
}
