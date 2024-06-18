import { Controller ,
    Post,
    Body,
    Get,
    Param,
    Delete,
    ParseIntPipe,
    Patch,} from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { Profesor } from './profesor.entity';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Controller('profesor')
export class ProfesorController {
    
    constructor(private profesorService: ProfesorService){}

    @Get()
    getProfesores(): Promise<Profesor[]>{
        return this.profesorService.getProfesores();
    }

    @Post()
    async createProfesor( @Body() newProfesor: CreateProfesorDto){
        return await this.profesorService.createProfesor(newProfesor);
    }
    
    @Get('/profesoresUsuarios')
    async getProfesorUsuario(){
        return this.profesorService.getProfesorUsuario();
    }

    @Get('/total')
    async getTotalProfesores() {
        const total = await this.profesorService.getTotalProfesores();
        return { total };
    }

    @Get('/genero')
    async getProfesoresPorGenero() {
        const data = await this.profesorService.getProfesoresPorGenero();
        return data;
    }

    @Get('/distrito')
    async getProfesorDistrito(){
        const data= await this.profesorService.getConsultarProfesorDistrito();
        return data;
    }
    @Get('/distritosTotal')
    async contarPorDistritos(): Promise<{ cantidad: number }> {
        const distritos = ['Ancón', 'Puente Piedra', 'Santa Rosa', 'Los Olivos', 'Comas', 'Independencia', 'San Martin de Porres', 'Carabayllo'];
        const cantidad = await this.profesorService.ProfesoresDistritos(distritos);
        return { cantidad };
    }

    @Get(':id')
    getProfesor(@Param('id', ParseIntPipe) id:number){
        return this.profesorService.getProfesor(id);
    }

    @Patch(':codigoD')
    updateProfesor(@Param('codigoD',ParseIntPipe)codigoD:number, @Body() profesor: UpdateProfesorDto){
        this.profesorService.updateProfesor(codigoD,profesor)
    }

    @Delete(':id')
    deleteProfesor(@Param('id', ParseIntPipe) id:number){
        return this.profesorService.deleteProfesor(id);
    }
}
