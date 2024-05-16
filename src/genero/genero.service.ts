import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genero } from './genero.entity';
import { Repository } from 'typeorm';
import { CreateGeneroDto } from './dto/create-genero.dto';

@Injectable()
export class GeneroService {

    constructor(@InjectRepository(Genero) private generoRepository: Repository<Genero>){}

    async createGenero(genero: CreateGeneroDto){
        const generoFound= await this.generoRepository.findOne({
            where:{
                idGenero: genero.idGenero
            }
        })

        if(generoFound){
            return new HttpException('Genero already exists', HttpStatus.CONFLICT)
        }

        const newGenero= this.generoRepository.create(genero)
        return this.generoRepository.save(newGenero)
    }

    getGeneros(){
        return this.generoRepository.find()
    }

    async getGenero(idGenero: string){
        const generoFound= await this.generoRepository.findOne({
            where:{
                idGenero
            }
        });

        if(!generoFound){
            return new HttpException('Genero not found', HttpStatus.NOT_FOUND);
        }
        return generoFound;
    }

    async deleteGenero(idGenero: string){
        const result= await this.generoRepository.delete({idGenero});
            if(result.affected===0){
                return new HttpException('Genero not found', HttpStatus.NOT_FOUND);
            }
            return result;
    }
}
