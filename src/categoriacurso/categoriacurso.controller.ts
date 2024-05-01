import { Controller,
    Post,
    Body,
    Get,
    Param,
    Delete, } from '@nestjs/common';
import { CategoriacursoService } from './categoriacurso.service';
import { CategoriaCurso } from './categoriacurso.entity';
import { CreateCategoriaCursoDto } from './dto/create-categoriacurso.dto';

@Controller('categoriacurso')
export class CategoriacursoController {
    
    constructor(private categoriacursoService: CategoriacursoService){}

    @Get()
    getCategoriasCurso(): Promise<CategoriaCurso[]>{
        return this.categoriacursoService.getCategoriasCurso();
    }

    @Post()
    createCategoriaC( @Body() newCategoriaC: CreateCategoriaCursoDto){
        return this.categoriacursoService.createCategoriaC(newCategoriaC);
    }
    
    @Get(':id')
    getCategoriaC(@Param('id') id:string){
        return this.getCategoriaC(id);
    }
    
    @Delete(':id')
    deleteCurso(@Param('id') id:string){
        return this.deleteCurso(id)
    }
}
