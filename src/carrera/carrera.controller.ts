import { Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    ParseIntPipe, } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { Carrera } from './carrera.entity';
import { CreateCarreraDto } from './dto/create-carrera.dto';

@Controller('carrera')
export class CarreraController {

    constructor(private carreraService: CarreraService){}

    @Get()
    getCarreras(): Promise<Carrera[]>{
        return this.carreraService.getCarreras();
    }

    @Post()
    createCarrera( @Body() newCarrera: CreateCarreraDto){
        return this.carreraService.createCarrera(newCarrera);
    }
    
    @Get(':id')
    getCarrera(@Param('id', ParseIntPipe) id:number){
        return this.carreraService.getCarrera(id);
    }
    
    @Delete(':id')
    deleteCarrera(@Param('id',ParseIntPipe) id:number){
        return this.carreraService.deleteCarrera(id);
    }

}
