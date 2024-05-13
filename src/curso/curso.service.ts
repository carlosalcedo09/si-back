import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './curso.entity';
import { Repository } from 'typeorm';
import { CicloService } from 'src/ciclo/ciclo.service';
import { CategoriacursoService } from 'src/categoriacurso/categoriacurso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { DetalleMatricula } from 'src/detallematricula/detallematricula.entity';

@Injectable()
export class CursoService {
    
    constructor(@InjectRepository(Curso) 
    private cursoRepository: Repository<Curso>,
    private cicloService: CicloService,
    private categoriacursoService: CategoriacursoService,){}
    
    async createCurso(curso: CreateCursoDto){    
        const cursoFound= await this.cursoRepository.findOne({
            where:{
                idCurso: curso.idCurso
            }
        })
        if(cursoFound){
            return new HttpException('Curso already exists',HttpStatus.CONFLICT)
        }

        const cicloFound= await this.cicloService.getCiclo(curso.idCiclo,);
        const categoriacursoFound= await this.categoriacursoService.getCategoriaC(curso.idCategoriaCurso);

        if(!cicloFound && !categoriacursoFound){
            return new HttpException(
                'Faltan datos (idCiclo,idCategoriaCurso)',
                HttpStatus.NOT_FOUND,
                );
        }

        const newCurso= this.cursoRepository.create(curso)
        return this.cursoRepository.save(newCurso)
    }

    getCursos(){
        return this.cursoRepository.find({
            relations:['ciclo','categoriacurso'],
        });
    }

    async getCurso(idCurso: string){
        const cursoFound = await this.cursoRepository.findOne({
            where:{
                idCurso
            }
        });

        if(!cursoFound){
            return new HttpException('Curso not found',HttpStatus.NOT_FOUND)
        }
        return cursoFound;
    }

    async deleteCurso(idCurso: string){
        const result= await this.cursoRepository.delete({idCurso});
        if(result.affected === 0){
        return new HttpException('Curso not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    //OBTENER CURSOS POR DOCENTE
    async profesorCursos(codigoD: number): Promise<Curso[]> {
        return this.cursoRepository.createQueryBuilder('curso')
            .leftJoinAndSelect('curso.detallematricula', 'detalle')
            .where('detalle.codigoD = :codigoD', { codigoD })
            .getMany();
    }
}
