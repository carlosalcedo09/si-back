import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaEstudiante } from './categoriaestudiante.entity';
import { Repository } from 'typeorm';
import { CreateCategoriaEstudianteDto } from './dto/create-categoriaestudiante.dto';

@Injectable()
export class CategoriaestudianteService {
    
    constructor(@InjectRepository(CategoriaEstudiante) private catestudianteRepository: Repository<CategoriaEstudiante>){}
    
    async createCategoriaE(categoriaestudiante: CreateCategoriaEstudianteDto){
        const categoriaestudianteFound= await this.catestudianteRepository.findOne({
            where:{
                idCategoriaE: categoriaestudiante.idCategoriaE
            }
        })

        if(categoriaestudianteFound){
            return new HttpException('Category already exists',HttpStatus.CONFLICT)
        }

        const newCategoriaE= this.catestudianteRepository.create(categoriaestudiante)
        return this.catestudianteRepository.save(newCategoriaE)
    }

    getCategoriasEstudiante(){
        return this.catestudianteRepository.find()
    }

    async getCategoriaE(idCategoriaE: string){
        const categoriaestudianteFound = await this.catestudianteRepository.findOne({
            where:{
                idCategoriaE
            }
        });

        if(!categoriaestudianteFound){
            return new HttpException('Category not found',HttpStatus.NOT_FOUND)
        }
        return categoriaestudianteFound;
    }

    async deleteCategoriaE(idCategoriaE: string){
        const result= await this.catestudianteRepository.delete({idCategoriaE});
        if(result.affected === 0){
        return new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }
}
