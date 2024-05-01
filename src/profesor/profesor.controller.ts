import { Controller ,
    Post,
    Body,
    Get,
    Param,
    Delete,
    ParseIntPipe,} from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { Profesor } from './profesor.entity';
import { CreateProfesorDto } from './dto/create-profesor.dto';

@Controller('profesor')
export class ProfesorController {
    
    constructor(private profesorService: ProfesorService){}

    @Get()
    getProfesores(): Promise<Profesor[]>{
        return this.profesorService.getProfesores();
    }

    @Post()
    createProfesor( @Body() newProfesor: CreateProfesorDto){
        return this.profesorService.createProfesor(newProfesor);
    }
    
    @Get(':id')
    getProfesor(@Param('id', ParseIntPipe) id:number){
        return this.profesorService.getProfesor(id);
    }
    
    @Delete(':id')
    deleteProfesor(@Param('id', ParseIntPipe) id:number){
        return this.profesorService.deleteProfesor(id);
    }
}
