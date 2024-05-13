import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Modalidad } from './modalidad.entity';
import { Repository } from 'typeorm';
import { CreateModalidadDto } from './dto/create-modalidad.dto';

@Injectable()
export class ModalidadService {
    constructor(@InjectRepository(Modalidad) private modalidadRepository: Repository<Modalidad>){}
    
    async createModalidad(modalidad: CreateModalidadDto){
        const modalidadFound= await this.modalidadRepository.findOne({
            where:{
                idModalidad: modalidad.idModalidad
            }
        })

        if(modalidadFound){
            return new HttpException('Modalidad already exists',HttpStatus.CONFLICT)
        }

        const newModalidad= this.modalidadRepository.create(modalidad)
        return this.modalidadRepository.save(newModalidad)
    }

    getModalidades(){
        return this.modalidadRepository.find()
    }

    async getModalidad(idModalidad: string){
        const modalidadFound = await this.modalidadRepository.findOne({
            where:{
                idModalidad
            }
        });

        if(!modalidadFound){
            return new HttpException('Modalidad not found',HttpStatus.NOT_FOUND)
        }
        return modalidadFound;
    }

    async deleteModalidad(idModalidad: string){
        const result= await this.modalidadRepository.delete({idModalidad});
        if(result.affected === 0){
            return new HttpException('Modalidad not found', HttpStatus.NOT_FOUND);
        }
        return result;
        }
}
