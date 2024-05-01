import { Controller ,
    Post,
    Body,
    Get,
    Param,
    Delete,} from '@nestjs/common';
import { ModalidadService } from './modalidad.service';
import { Modalidad } from './modalidad.entity';
import { CreateModalidadDto } from './dto/create-modalidad.dto';

@Controller('modalidad')
export class ModalidadController {
    
    constructor(private modalidadService: ModalidadService){}

    @Get()
    getModalidades(): Promise<Modalidad[]>{
        return this.modalidadService.getModalidades();
    }

    @Post()
    createModalidad( @Body() newModalidad: CreateModalidadDto){
        return this.modalidadService.createModalidad(newModalidad);
    }
    
    @Get(':id')
    getModalidad(@Param('id') id:string){
        return this.modalidadService.getModalidad(id);
    }
    
    @Delete(':id')
    deleteModalidad(@Param('id') id:string){
        return this.modalidadService.deleteModalidad(id)
    }
}
