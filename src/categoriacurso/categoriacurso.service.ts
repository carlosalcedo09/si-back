import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaCurso } from './categoriacurso.entity';
import { Repository } from 'typeorm';
import { CreateCategoriaCursoDto } from './dto/create-categoriacurso.dto';

@Injectable()
export class CategoriacursoService {
    constructor(@InjectRepository(CategoriaCurso) private catcursoRepository: Repository<CategoriaCurso>){}
    
    async createCategoriaC(categoriacurso: CreateCategoriaCursoDto){
        const categoriacursoFound= await this.catcursoRepository.findOne({
            where:{
                idCategoriaCurso: categoriacurso.idCategoriaCurso
            }
        })

        if(categoriacursoFound){
            return new HttpException('Category already exists',HttpStatus.CONFLICT)
        }

        const newCategoriaC= this.catcursoRepository.create(categoriacurso)
        return this.catcursoRepository.save(newCategoriaC)
    }

    getCategoriasCurso(){
        return this.catcursoRepository.find()
    }

    async getCategoriaC(idCategoriaCurso: string){
        const categoriacursoFound = await this.catcursoRepository.findOne({
            where:{
                idCategoriaCurso
            }
        });

        if(!categoriacursoFound){
            return new HttpException('Category not found',HttpStatus.NOT_FOUND)
        }
        return categoriacursoFound;
    }

    async deleteCategoriaC(idCategoriaCurso: string){
        const result= await this.catcursoRepository.delete({idCategoriaCurso});
        if(result.affected === 0){
        return new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }
}
