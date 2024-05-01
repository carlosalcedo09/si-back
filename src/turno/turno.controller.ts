import { Controller,
    Post,
    Body,
    Get,
    Param,
    Delete, 
} from '@nestjs/common';
import { TurnoService } from './turno.service';
import { Turno } from './turno.entity';
import { CreateTurnoDto } from './dto/create-turno.dto';

@Controller('turno')
export class TurnoController {
    
    constructor(private turnoService: TurnoService){}

    @Get()
    getTurnos(): Promise<Turno[]>{
        return this.turnoService.getTurnos();
    }

    @Post()
    createTurno( @Body() newTurno: CreateTurnoDto){
        return this.turnoService.createTurno(newTurno);
    }
    
    @Get(':id')
    getTurno(@Param('id') id:string){
        return this.turnoService.getTurno(id);
    }
    
    @Delete(':id')
    deleteTurno(@Param('id') id:string){
        return this.turnoService.deleteTurno(id)
    }
}
