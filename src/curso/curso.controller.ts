import { Controller ,
    Post,
    Body,
    Get,
    Param,
    Delete,
 } from '@nestjs/common';
import { CursoService } from './curso.service';
import { Curso } from './curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';

@Controller('curso')
export class CursoController {

    constructor(private cursoService: CursoService){}

    @Get()
    getCursos(): Promise<Curso[]>{
        return this.cursoService.getCursos();
    }

    @Post()
    createCurso( @Body() newCurso: CreateCursoDto){
        return this.cursoService.createCurso(newCurso);
    }
    
    @Get(':id')
    getCurso(@Param('id') id:string){
        return this.cursoService.getCurso(id);
    }
    
    @Delete(':id')
    deleteCurso(@Param('id') id:string){
        return this.cursoService.deleteCurso(id);
    }
}
