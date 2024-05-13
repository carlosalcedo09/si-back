import { Controller,
            Post,
            Body,
            Get,
            Param,
            ParseIntPipe,
            Delete,
            Patch} from '@nestjs/common';
import { DistritoService } from './distrito.service';
import { CreateDistritoDto } from './dto/create-distrito.dto';
import { Distrito } from './distrito.entity';

@Controller('distrito')
export class DistritoController {

    constructor(private distritoService: DistritoService){}

    @Get()
    getDistritos(): Promise<Distrito[]>{
        return this.distritoService.getDistritos();
    }

    @Post()
    createDistritos(@Body() newDistrito: CreateDistritoDto ){
        return this.distritoService.createDistrito(newDistrito);
    }

    @Get(':id')
    getDistrito(@Param('id', ParseIntPipe) id:number){
        return this.distritoService.getDistrito(id);
    }

    @Delete(':id')
    deleteDistrito(@Param('id',ParseIntPipe) id:number){
        return this.distritoService.deleteDistrito(id)
    }

}
