import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Facultad } from './facultad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFacultadDto } from './dto/create-facultad.dto';

@Injectable()
export class FacultadService {
    
    constructor(@InjectRepository(Facultad) private facultadRepository: Repository<Facultad>){}
    
    async createFacultad(facultad: CreateFacultadDto){
        const facultadFound= await this.facultadRepository.findOne({
            where:{
                idFacultad: facultad.idFacultad
            }
        })

        if(facultadFound){
            return new HttpException('Faculty already exists',HttpStatus.CONFLICT)
        }

        const newFacultad= this.facultadRepository.create(facultad)
        return this.facultadRepository.save(newFacultad)
    }

    getFacultades(){
        return this.facultadRepository.find()
    }

    async getFacultad(idFacultad: number){
        const facultadFound = await this.facultadRepository.findOne({
            where:{
                idFacultad
            }
        });

        if(!facultadFound){
            return new HttpException('Faculty not found',HttpStatus.NOT_FOUND)
        }
        return facultadFound;
    }

    async deleteFacultad(idFacultad: number){
        const result= await this.facultadRepository.delete({idFacultad});
        if(result.affected === 0){
        return new HttpException('Faculty not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }
}
