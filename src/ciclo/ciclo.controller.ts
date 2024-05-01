import { Controller,
    Post,
    Body,
    Get,
    Param,
    Delete, 
    ParseIntPipe
} from '@nestjs/common';
import { CicloService } from './ciclo.service';
import { Ciclo } from './ciclo.entity';
import { CreateCicloDto } from './dto/create-ciclo.dto';

@Controller('ciclo')
export class CicloController {
    
    constructor(private cicloService: CicloService){}

    @Get()
    getCiclos(): Promise<Ciclo[]>{
        return this.cicloService.getCiclos();
    }

    @Post()
    createCiclo( @Body() newCiclo: CreateCicloDto){
        return this.cicloService.createCiclo(newCiclo);
    }
    
    @Get(':id')
    getCiclo(@Param('id',ParseIntPipe) id:number){
        return this.cicloService.getCiclo(id);
    }
    
    @Delete(':id')
    deleteCiclo(@Param('id',ParseIntPipe) id:number){
        return this.cicloService.deleteCiclo(id)
    }
}
