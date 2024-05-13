import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Pabellon } from './pabellon.entity';
import { Repository } from 'typeorm';
import { CreatePabellonDto } from './dto/create-pabellon.dto';

@Injectable()
export class PabellonService {
    
    constructor(@InjectRepository(Pabellon) private pabellonRepository: Repository<Pabellon>){}

    async createPabellon(pabellon: CreatePabellonDto){
        const pabellonFound= await this.pabellonRepository.findOne({
            where:{
                IdPabellon: pabellon.IdPabellon
            }
        })

        if(pabellonFound){
            return new HttpException('Pabellon already exists', HttpStatus.CONFLICT)
        }

        const newPabellon= this.pabellonRepository.create(pabellon)
        return this.pabellonRepository.save(newPabellon)
    }

    getPabellones(){
        return this.pabellonRepository.find()
    }

    async getPabellon(IdPabellon: string){
        const pabellonFound= await this.pabellonRepository.findOne({
            where:{
                IdPabellon
            }
        });

        if(!pabellonFound){
            return new HttpException('Pabellon not found', HttpStatus.NOT_FOUND);
        }
        return pabellonFound;
    }

    async deletePabellon(IdPabellon: string){
        const result= await this.pabellonRepository.delete({IdPabellon});
            if(result.affected===0){
                return new HttpException('Pabellon not found', HttpStatus.NOT_FOUND);
            }
            return result;
    }
    }
