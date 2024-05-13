import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turno } from './turno.entity';
import { CreateTurnoDto } from './dto/create-turno.dto';

@Injectable()
export class TurnoService {
    constructor(@InjectRepository(Turno) private turnoRepository: Repository<Turno>){}
    
    async createTurno(turno: CreateTurnoDto){
        const turnoFound= await this.turnoRepository.findOne({
            where:{
                idTurno: turno.idTurno
                }
        })

        if(turnoFound){
            return new HttpException('Turno already exists',HttpStatus.CONFLICT)
        }

        const newTurno= this.turnoRepository.create(turno)
        return this.turnoRepository.save(newTurno)
    }

    getTurnos(){
        return this.turnoRepository.find()
    }

    async getTurno(idTurno: string){
        const turnoFound = await this.turnoRepository.findOne({
            where:{
                idTurno
            }
        });

        if(!turnoFound){
            return new HttpException('Turno not found',HttpStatus.NOT_FOUND)
        }
        return turnoFound;
    }

    async deleteTurno(idTurno: string){
        const result= await this.turnoRepository.delete({idTurno});
        if(result.affected === 0){
            return new HttpException('Turno not found', HttpStatus.NOT_FOUND);
        }
        return result;
        }
    }
