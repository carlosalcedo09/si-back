import { Controller,
            Post,
            Body,
            Get,
            Param,
            Delete
    } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { Unidad } from './unidad.entity';
import { CreateUnidadDto } from './dto/create-unidad.dto';

@Controller('unidad')
export class UnidadController {
    
    constructor(private unidadService: UnidadService){}

    @Get()
    getUnidades(): Promise<Unidad[]>{
        return this.unidadService.getUnidades();
    }

    @Post()
    createUnidad( @Body() newUnidad: CreateUnidadDto){
        return this.unidadService.createUnidad(newUnidad);
    }
    
    @Get(':id')
    getUnidad(@Param('id') id:string){
        return this.unidadService.getUnidad(id);
    }
    
    @Delete(':id')
    deleteUnidad(@Param('id') id:string){
        return this.unidadService.deleteUnidad(id)
    }
}
