import { Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    ParseIntPipe,} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from './estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Controller('estudiante')
export class EstudianteController {

    constructor(private estudianteService: EstudianteService){}

    @Get()
    getEstudiantes(): Promise<Estudiante[]>{
        return this.estudianteService.getEstudiantes();
    }

    @Post()
    createEstudiante( @Body() newEstudiante: CreateEstudianteDto){
        return this.estudianteService.createEstudiante(newEstudiante);
    }
    
    @Get('/total')
    async getTotalEstudiantes() {
        const total = await this.estudianteService.getTotalEstudiantes();
        return { total };
    }

    @Get('/categoria')
    async getEstudiantesPorCategoria() {
        const data = await this.estudianteService.getEstudiantesPorCategoria();
        return data;
    }
    
    @Get(':id')
    getEstudiante(@Param('id', ParseIntPipe) id:number){
        return this.estudianteService.getEstudiante(id);
    }
    
    @Delete(':id')
    deleteProfesr(@Param('id', ParseIntPipe) id:number){
        return this.estudianteService.deleteEstudiante(id);
    }
}
