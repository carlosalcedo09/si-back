import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Distrito } from './distrito.entity';
import { Repository } from 'typeorm';
import { CreateDistritoDto } from './dto/create-distrito.dto';

@Injectable()
export class DistritoService {

    constructor(@InjectRepository(Distrito) private distritoRepository: Repository<Distrito>){
    }

    async createDistrito(distrito: CreateDistritoDto){
        const distritoFound= await this.distritoRepository.findOne({
            where:{
                IDDistrito: distrito.IDDistrito
            }
        })

        if(distritoFound){
            return new HttpException('City already exists', HttpStatus.CONFLICT)
        }

        const newDistrito= this.distritoRepository.create(distrito);
        return this.distritoRepository.save(newDistrito);
    }

    getDistritos(){
        return this.distritoRepository.find();
    }

    async getDistrito(IDDistrito: number){
        const distritoFound= await this.distritoRepository.findOne({
            where:{
                IDDistrito
            }
        });

        if(!distritoFound){
            return new HttpException('City not found',HttpStatus.NOT_FOUND);
    
        }
        return distritoFound;
    }

    async deleteDistrito(IDDistrito: number){
        const result= await this.distritoRepository.delete({IDDistrito});
        if(result.affected===0){
            return new HttpException('City not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }
}
