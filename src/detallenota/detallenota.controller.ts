import { Controller,
    Post,
    Body,
    Get,
    Param,
    Delete
    } from '@nestjs/common';
import { DetallenotaService } from './detallenota.service';
import { DetalleNota } from './detallenota.entity';
import { CreateDetalleNotaDto } from './dto/create-detallenota.dto';

@Controller('detallenota')
export class DetallenotaController {
    
    constructor(private detallenotaService: DetallenotaService){}

    @Get()
    getNotas(): Promise<DetalleNota[]>{
        return this.detallenotaService.getDetalleNotas();
    }

    @Post()
    createNota( @Body() newDetalleNota: CreateDetalleNotaDto){
        return this.detallenotaService.createDetalleNota(newDetalleNota);
    }

    @Get('tipoNota')
    async getTipoNota() {
const result = await this.detallenotaService.getTipoNota();
        return result;
    }
    
    @Get(':id/ :idTipo/ :idUnidad')
    getNota(@Param('id') id:string,@Param('idTipo') idT:string,@Param('idUnidad') idU:string, )
    {
        return this.detallenotaService.getDetalleNota(id,idT,idU);
    }
    
    @Delete(':id/ :idTipo/ :idUnidad')
    deleteNota(@Param('id') id:string,@Param('idTipo') idT:string,@Param('idUnidad') idU:string, )
    {
        return this.detallenotaService.deleteDetalleNota(id,idT,idU);
    }
}
