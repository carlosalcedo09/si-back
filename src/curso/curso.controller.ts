import { Controller ,
    Post,
    Body,
    Get,
    Param,
    Delete,
    ParseIntPipe,
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
    
    @Get('by-id/:id')
    getCurso(@Param('id') id:string){
        return this.cursoService.getCurso(id);
    }
    
    @Delete('by-id/:id')
    deleteCurso(@Param('id') id:string){
        return this.cursoService.deleteCurso(id);
    }

    @Get('by-codigoD/:codigoD')
    profesorCursos(@Param('codigoD',ParseIntPipe) codigoD: number){
        return this.cursoService.profesorCursos(codigoD);
    }
    
}
