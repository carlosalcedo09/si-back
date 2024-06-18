import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleNota } from './detallenota.entity';
import { Repository } from 'typeorm';
import { NotasService } from 'src/notas/notas.service';
import { UnidadService } from 'src/unidad/unidad.service';
import { TipoService } from 'src/tipo/tipo.service';
import { CreateDetalleNotaDto } from './dto/create-detallenota.dto';

@Injectable()
export class DetallenotaService { 
    
    constructor(@InjectRepository(DetalleNota) 
    private detalleNRepository: Repository<DetalleNota>,
    private notaService: NotasService,
    private unidadService: UnidadService,
    private tipoService: TipoService){}
    
    async createDetalleNota(detalleNota: CreateDetalleNotaDto){
        
        const detalleNFound= await this.detalleNRepository.findOne({
            where:{
                idDetalleMC: detalleNota.idDetalleMC,
                idTipo: detalleNota.idTipo,
                idUnidad: detalleNota.idUnidad
            }
        })
        if(detalleNFound){
            return new HttpException('Detalle nota already exists',HttpStatus.CONFLICT)
        }

        const notaFound= await this.notaService.getNota(detalleNota.idDetalleMC,);
        const unidadFound= await this.unidadService.getUnidad(detalleNota.idUnidad);
        const tipoFound= await this.tipoService.getTipo(detalleNota.idTipo);

        if(!notaFound && !unidadFound && ! tipoFound){
            return new HttpException(
                'Faltan datos (idNota, idUnidad, idTipo)',
                HttpStatus.NOT_FOUND,
                );
        }

        const newDetalleN= this.detalleNRepository.create(detalleNota)
        return this.detalleNRepository.save(newDetalleN)
    }

    getDetalleNotas(){
        return this.detalleNRepository.find({
            relations:['notas','unidad','tipo'],
        });
    }

    async getDetalleNota(idDetalleMC: string, idTipo: string, idUnidad: string){
        const detalleNFound = await this.detalleNRepository.findOne({
            where:{
                idDetalleMC,
                idTipo,
                idUnidad
            }
        });

        if(!detalleNFound){
            return new HttpException('Detalle nota not found',HttpStatus.NOT_FOUND)
        }
        return detalleNFound;
    }

    async deleteDetalleNota(idDetalleMC: string, idTipo: string, idUnidad: string){
        const result= await this.detalleNRepository.delete({idDetalleMC,idTipo,idUnidad});
        if(result.affected === 0){
        return new HttpException('Detalle nota not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    async getTipoNota(): Promise<any> {
        const query = this.detalleNRepository.createQueryBuilder('d')
            .select([
                `CASE 
                    WHEN t.descripcion IN ('Examen Final', 'Examen Parcial') THEN 'Exámenes'
                    ELSE t.descripcion 
                END AS Tipo`,
                'COALESCE(COUNT(d.idTipo), 0) AS cantidad'
            ])
            .innerJoin('d.tipo', 't')
            .innerJoin('d.notas', 'n')
            .groupBy('CASE WHEN t.descripcion IN (\'Examen Final\', \'Examen Parcial\') THEN \'Exámenes\' ELSE t.descripcion END')
            .getRawMany();
        
        return query;

    }

    
}
