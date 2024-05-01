import { Controller ,
    Post,
    Body,
    Get,
    Param,
    Delete} from '@nestjs/common';
import { NotasService } from './notas.service';
import { Notas } from './notas.entity';
import { CreateNotasDto } from './dto/create-notas.dto';

@Controller('notas')
export class NotasController {
    constructor(private notaSevice: NotasService){}

    @Get()
    getNotas(): Promise<Notas[]>{
        return this.notaSevice.getNotas();
    }

    @Post()
    createNota( @Body() newNota: CreateNotasDto){
        return this.notaSevice.createNota(newNota);
    }
    
    @Get(':id')
    getNota(@Param('id') id:string){
        return this.notaSevice.getNota(id);
    }
    
    @Delete(':id')
    deleteNota(@Param('id') id:string){
        return this.notaSevice.deleteNota(id);
    }
}
