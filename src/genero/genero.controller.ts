import { Controller,
            Post,
            Body,
            Get,
            Param,
            Delete} from '@nestjs/common';
import { GeneroService } from './genero.service';
import { Genero } from './genero.entity';
import { CreateGeneroDto } from './dto/create-genero.dto';

@Controller('genero')
export class GeneroController {

    constructor(private generoService: GeneroService){}

    @Get()
    getGeneros(): Promise<Genero[]>{
        return this.generoService.getGeneros();
    }

    @Post()
    createGeneros(@Body() newGenero: CreateGeneroDto){
        return this.generoService.createGenero(newGenero);
    }

    @Get(':id')
    getGenerp(@Param('id') id:string){
        return this.generoService.getGenero(id);
    }

    @Delete(':id')
    deleteGenero(@Param('id') id:string){
        return this.generoService.deleteGenero(id);
    }

}
