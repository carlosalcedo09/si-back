import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleMatricula } from './detallematricula.entity';
import { Repository } from 'typeorm';
import { MatriculaService } from 'src/matricula/matricula.service';
import { ProfesorService } from 'src/profesor/profesor.service';
import { CursoService } from 'src/curso/curso.service';
import { ModalidadService } from 'src/modalidad/modalidad.service';
import { PabellonService } from 'src/pabellon/pabellon.service';
import { CreateDetalleMatriculaDto } from './dto/create-detallematricula.dto';

@Injectable()
export class DetallematriculaService {

    constructor(@InjectRepository(DetalleMatricula) 
    private detallematriculaRepository: Repository<DetalleMatricula>,
    private matriculaService: MatriculaService,
    private profesorService: ProfesorService,
    private cursoService: CursoService,
    private modalidadService: ModalidadService,
    private pabellonService: PabellonService){}
    
    async createDetalleM(detallematricula: CreateDetalleMatriculaDto){
        
        const detallematriculaFound= await this.detallematriculaRepository.findOne({
            where:{
                idMatricula: detallematricula.idMatricula,
                idCurso: detallematricula.idCurso
            }
        })
        if(detallematriculaFound){
            return new HttpException('DetalleMatricula already exists',HttpStatus.CONFLICT)
        }

        const matriculaFound= await this.matriculaService.getMatricula(detallematricula.idMatricula,);
        const profesorFound= await this.profesorService.getProfesor(detallematricula.idMatricula);
        const cursoFound= await this.cursoService.getCurso(detallematricula.idCurso);
        const modalidadFound= await this.modalidadService.getModalidad(detallematricula.idModalidad);
        const pabellonFound= await this.pabellonService.getPabellon(detallematricula.idPabellon)

        if(!matriculaFound && !profesorFound && ! cursoFound && !modalidadFound  && !pabellonFound){
            return new HttpException(
                'Faltan datos (idMatricula, codigoD, idCurso,idPabellon, idModalidad)',
                HttpStatus.NOT_FOUND,
                );
        }

        const newDetalleMatricula= this.detallematriculaRepository.create(detallematricula)
        return this.detallematriculaRepository.save(newDetalleMatricula)
    }

    getDetallesM(){
        return this.detallematriculaRepository.find({
            relations:['matricula','curso','profesor','pabellon','modalidad'],
        });
    }

    async getDetalleM(idMatricula: number, idCurso: string){
        const detallematriculaFound = await this.detallematriculaRepository.findOne({
            where:{
                idMatricula,
                idCurso
            }
        });

        if(!detallematriculaFound){
            return new HttpException('Detalle matricula not found',HttpStatus.NOT_FOUND)
        }
        return detallematriculaFound;
    }

    async deleteDetalleM(idMatricula: number, idCurso: string){
        const result= await this.detallematriculaRepository.delete({idMatricula,idCurso});
        if(result.affected === 0){
        return new HttpException('Detalle matrícula not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    async SeccionesCursoProfesor(idCurso: string, codigoD: number) {
        return this.detallematriculaRepository.createQueryBuilder('d')
            .select('d.idPabellon', 'idPabellon')
            .addSelect('d.aula', 'aula')
            .addSelect('m.descripcionM', 'descripcionM')
            .addSelect('t.descripcionTurno', 'descripcionTurno')
            .innerJoin('d.modalidad', 'm', 'd.idModalidad = m.idModalidad')
            .innerJoin('d.turno', 't', 'd.idTurno = t.idTurno')
            .where('d.idCurso = :idCurso', { idCurso })
            .andWhere('d.codigoD = :codigoD', { codigoD })
            .distinct(true)
            .getRawMany();
    }

    async CantidadTotalPorCurso(): Promise<any[]> {
        const queryBuilder = this.detallematriculaRepository.createQueryBuilder('detalle')
        .innerJoin('detalle.curso', 'curso')
        .innerJoin('detalle.matricula', 'matricula')
        .select('curso.NombreCurso', 'NombreCurso')
        .addSelect('COUNT(matricula.codigoE)', 'totalE')
        .addSelect('COUNT(*)', 'cantidad')
        .addSelect('ROUND((COUNT(matricula.codigoE) * 100.0 / NULLIF(COUNT(*), 1)), 2)', 'porcentaje')
        .groupBy('curso.NombreCurso');

    const results = await queryBuilder.getRawMany();
    return results;
    }

}
