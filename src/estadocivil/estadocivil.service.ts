import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoCivil } from './estadocivil.entity';
import { Repository } from 'typeorm';
import { CreateEstadoCivilDto } from './dto/create-estadocivil.dto';

@Injectable()
export class EstadocivilService {

    constructor(@InjectRepository(EstadoCivil) private estadocivilRepository: Repository<EstadoCivil>){}

    async createEstadoCivil(estadocivil:CreateEstadoCivilDto){
        const estadoFound= await this.estadocivilRepository.findOne({
            where:{
                idEstado: estadocivil.idEstado
            }
        })

        if(estadoFound){
            return new HttpException('Status alredy exists',HttpStatus.CONFLICT);
        }
        const newEstadoCivil= this.estadocivilRepository.create(estadocivil);
        return this.estadocivilRepository.save(newEstadoCivil);
    }

    getEstados(){
        return this.estadocivilRepository.find();
    }

    async getEstado(idEstado: string){
        const estadoFound= await this.estadocivilRepository.findOne({
            where:{
                idEstado
            }
        });

        if(!estadoFound){
            return new HttpException('Status not found',HttpStatus.NOT_FOUND);
        }
        return estadoFound;
    }
    
    async deleteEstado(idEstado: string){
        const result= await this.estadocivilRepository.delete({idEstado})
        if(result.affected===0){
            return new HttpException('Status not found', HttpStatus.NOT_FOUND);
        } 
        return result;
    }


}
