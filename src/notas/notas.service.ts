import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallematriculaService } from 'src/detallematricula/detallematricula.service';
import { Notas } from './notas.entity';
import { CreateNotasDto } from './dto/create-notas.dto';
import { Repository } from 'typeorm';

@Injectable()
export class NotasService {
    
    constructor(@InjectRepository(Notas) 
    private notasRepository: Repository<Notas>,
    private detalleMService: DetallematriculaService){}
    
    async createNota(nota: CreateNotasDto){
        
        const notaFound= await this.notasRepository.findOne({
            where:{
                idDetalleMC: nota.idDetalleMC
                }
        })
        if(notaFound){
            return new HttpException('Nota already exists',HttpStatus.CONFLICT)
        }

        const detalleMFound= await this.detalleMService.getDetalleM(nota.idMatricula,nota.idCurso);

        if(!detalleMFound){
            return new HttpException(
                'Faltan datos (idMatricula, idCurso)',
                HttpStatus.NOT_FOUND,
                );
        }

        const newNota= this.notasRepository.create(nota)
        return this.notasRepository.save(newNota)
    }

    async getNotas() {
        try {
            return await this.notasRepository.find({
                relations: ['detallenota', 'detalleMatricula'],
            });
        } catch (error) {
            throw new HttpException('Error al obtener las notas', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getNota(idDetalleMC: string){
        const notaFound = await this.notasRepository.findOne({
            where:{
                idDetalleMC
            }
        });

        if(!notaFound){
            return new HttpException('Detalle de nota not found',HttpStatus.NOT_FOUND)
        }
        return notaFound;
    }

    async deleteNota(idDetalleMC: string){
        const result= await this.notasRepository.delete({idDetalleMC});
        if(result.affected === 0){
            return new HttpException('Detalle de nota not found', HttpStatus.NOT_FOUND);
        }
        return result;
        }
}
