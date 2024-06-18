import { Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    ParseIntPipe, } from '@nestjs/common';
import { DetallematriculaService } from './detallematricula.service';
import { DetalleMatricula } from './detallematricula.entity';
import { CreateDetalleMatriculaDto } from './dto/create-detallematricula.dto';

@Controller('detallematricula')
export class DetallematriculaController {
    constructor(private detalleMService: DetallematriculaService){}

    @Get()
    getDetallesM(): Promise<DetalleMatricula[]>{
        return this.detalleMService.getDetallesM();
    }

    @Post()
    createDetalleM( @Body() newDetalleMatricula: CreateDetalleMatriculaDto){
        return this.detalleMService.createDetalleM(newDetalleMatricula);
    }

    @Get('/cantidadCurso')
    async CantidadTotalPorCurso():Promise<any[]> {
        return this.detalleMService.CantidadTotalPorCurso();
    }
    
    @Get(':idM/:idCurso')
    getDetalleM(@Param('idM', ParseIntPipe) id:number,@Param('idCurso') idC:string){
        return this.detalleMService.getDetalleM(id,idC);
    }
    
    @Delete(':idM/:idCurso')
    deleteDetalleM(@Param('idM', ParseIntPipe) id:number,@Param('idCurso') idC:string){
        return this.detalleMService.deleteDetalleM(id,idC);
    }

    @Get('secciones/:idCurso/:codigoD')
    SeccionesCursoProfesor(@Param('idCurso') idCurso:string,@Param('codigoD', ParseIntPipe) codigoD:number){
        return this.detalleMService.SeccionesCursoProfesor(idCurso,codigoD);
    }
}
