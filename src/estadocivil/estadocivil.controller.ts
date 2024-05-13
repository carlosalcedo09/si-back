import { Controller,
            Post,
            Body,
            Get,
            Param,
            Delete
    } from '@nestjs/common';
import { EstadocivilService } from './estadocivil.service';
import { EstadoCivil } from './estadocivil.entity';
import { CreateEstadoCivilDto } from './dto/create-estadocivil.dto';

@Controller('estadocivil')
export class EstadocivilController {

    constructor(private estadocivilService: EstadocivilService){}

    @Get()
    getEstados(): Promise<EstadoCivil[]>{
        return this.estadocivilService.getEstados();
    }

    @Post()
    createEstadoCivil( @Body() newEstado: CreateEstadoCivilDto){
        return this.estadocivilService.createEstadoCivil(newEstado);
    }

    @Get(':id')
    getEstado(@Param('id') id:string){
        return this.estadocivilService.deleteEstado(id);
    }
}
