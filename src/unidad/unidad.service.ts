import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unidad } from './unidad.entity';
import { Repository } from 'typeorm';
import { CreateUnidadDto } from './dto/create-unidad.dto';

@Injectable()
export class UnidadService {

    constructor(@InjectRepository(Unidad) private unidadRepository: Repository<Unidad>){}

    async createUnidad(unidad: CreateUnidadDto){
        const unidadFound= await this.unidadRepository.findOne({
            where:{
                idUnidad: unidad.idUnidad
            }
        })

        if(unidadFound){
            return new HttpException('Unidad alredy exists',HttpStatus.CONFLICT);
        }

        const newUnidad= this.unidadRepository.create(unidad);
        return this.unidadRepository.save(newUnidad);
    }
    
    getUnidades(){
        return this.unidadRepository.find()
    }

    async getUnidad(idUnidad:string){
        const unidadFound= await this.unidadRepository.findOne({
            where:{
                idUnidad
            }
        });

        if(!unidadFound){
            return new HttpException('Unidad not found', HttpStatus.NOT_FOUND);
        }
        return unidadFound;
    }

    async deleteUnidad(idUnidad: string){
        const result= await this.unidadRepository.delete({idUnidad})
        if(result.affected===0){
            return new HttpException('Unidad not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }
}
