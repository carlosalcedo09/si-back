import { Controller ,
    Post,
    Body,
    Get,
    Param,
    Delete, 
    ParseIntPipe
} from '@nestjs/common';
import { CategoriaestudianteService } from './categoriaestudiante.service';
import { CategoriaEstudiante } from './categoriaestudiante.entity';
import { CreateCategoriaEstudianteDto } from './dto/create-categoriaestudiante.dto';

@Controller('categoriaestudiante')
export class CategoriaestudianteController {

    constructor(private categoriaestudianteService: CategoriaestudianteService){}

    @Get()
    getCategoriasEstudiante(): Promise<CategoriaEstudiante[]>{
        return this.categoriaestudianteService.getCategoriasEstudiante();
    }

    @Post()
    createCategoriaE( @Body() newCategoriaE: CreateCategoriaEstudianteDto){
        return this.categoriaestudianteService.createCategoriaE(newCategoriaE);
    }
    
    @Get(':id')
    getCategoriaE(@Param('id') id:string){
        return this.categoriaestudianteService.getCategoriaE(id);
    }
    
    @Delete(':id')
    deleteCiclo(@Param('id') id:string){
        return this.categoriaestudianteService.deleteCategoriaE(id)
    }
}
