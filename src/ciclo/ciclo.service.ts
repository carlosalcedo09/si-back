import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciclo } from './ciclo.entity';
import { Repository } from 'typeorm';
import { CreateCicloDto } from './dto/create-ciclo.dto';

@Injectable()
export class CicloService {
    
    constructor(@InjectRepository(Ciclo) private cicloRepository: Repository<Ciclo>){}
    
    async createCiclo(ciclo: CreateCicloDto){
        const cicloFound= await this.cicloRepository.findOne({
            where:{
                idCiclo: ciclo.idCiclo
            }
        })

        if(cicloFound){
            return new HttpException('Ciclo already exists',HttpStatus.CONFLICT)
        }

        const newCiclo= this.cicloRepository.create(ciclo)
        return this.cicloRepository.save(newCiclo)
    }

    getCiclos(){
        return this.cicloRepository.find()
    }

    async getCiclo(idCiclo: number){
        const cicloFound = await this.cicloRepository.findOne({
            where:{
                idCiclo
            }
        });

        if(!cicloFound){
            return new HttpException('Ciclo not found',HttpStatus.NOT_FOUND)
        }
        return cicloFound;
    }

    async deleteCiclo(idCiclo: number){
        const result= await this.cicloRepository.delete({idCiclo});
        if(result.affected === 0){
        return new HttpException('Ciclo not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }
}
