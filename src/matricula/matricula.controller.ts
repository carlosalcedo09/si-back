import { Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    ParseIntPipe,} from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { Matricula } from './matricula.entity';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { BoletaNotasDto } from './dto/boleta-notas.dto';

@Controller('matricula')
export class MatriculaController {

    constructor(private matriculaService: MatriculaService){}

    @Get()
    getMatriculas(): Promise<Matricula[]>{
        return this.matriculaService.getMatriculas();
    }

    @Post()
    createMatricula( @Body() newMatricula: CreateMatriculaDto){
        return this.matriculaService.createMatricula(newMatricula);
    }
    
    @Get(':id')
    getMatricula(@Param('id', ParseIntPipe) id:number){
        return this.matriculaService.getMatricula(id);
    }
    
    @Delete(':id')
    deleteMatricula(@Param('id', ParseIntPipe) id:number){
        return this.matriculaService.deleteMatricula(id);
    }

    @Get('listaestudiante/:codigoD/:idCurso/:aula')
    ListaCodigoCursoAula (@Param('codigoD', ParseIntPipe) codigoD:number, @Param('idCurso') idCurso:string,@Param('aula') aula:string){
        return this.matriculaService.ListaCodigoCursoAula(codigoD,idCurso,aula);
    }

    @Get('condicion-nota/:codigoD/:idCurso/:aula/:idUnidad')
    async getCondicionNota(
        @Param('codigoD') codigoD: number,
        @Param('idCurso') idCurso: string,
        @Param('aula') aula: string,
        @Param('idUnidad') idUnidad:string,
    ) {
        return this.matriculaService.getCondicionNota(codigoD, idCurso, aula, idUnidad);
    }


    @Get('boleta-nota/:codigoD/:idCurso/:aula')
    async BoletaNotas(
        @Param('codigoD') codigoD: number,
        @Param('idCurso') idCurso: string,
        @Param('aula') aula: string
    ): Promise<BoletaNotasDto[]> {
        return this.matriculaService. BoletaNotas(codigoD, idCurso, aula);
    }



}
