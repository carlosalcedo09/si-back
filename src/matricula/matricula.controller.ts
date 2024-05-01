import { Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    ParseIntPipe,} from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { Matricula } from './matricula.entity';
import { CreateMatriculaDto } from './dto/create-matricula.dto';

@Controller('matricula')
export class MatriculaController {
       
    constructor(private matriculaService: MatriculaService){}

    @Get()
    getMatriculas(): Promise<Matricula[]>{
        return this.matriculaService.getMatriculas();
    }

    @Post()
    createMatricula( @Body() newMatricula: CreateMatriculaDto){
        return this.matriculaService.createMatricula(newMatricula);
    }
    
    @Get(':id')
    getMatricula(@Param('id', ParseIntPipe) id:number){
        return this.matriculaService.getMatricula(id);
    }
    
    @Delete(':id')
    deleteMatricula(@Param('id', ParseIntPipe) id:number){
        return this.matriculaService.deleteMatricula(id);
    }

}
