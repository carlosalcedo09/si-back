import { Controller,
            Post,
            Body,
            Get,
            Param,
            Delete} from '@nestjs/common';
import { PabellonService } from './pabellon.service';
import { Pabellon } from './pabellon.entity';
import { CreatePabellonDto } from './dto/create-pabellon.dto';

@Controller('pabellon')
export class PabellonController {
    
    constructor(private pabellonService: PabellonService){}

    @Get()
    getPabellones(): Promise<Pabellon[]>{
        return this.pabellonService.getPabellones();
    }

    @Post()
    createPabellon(@Body() newPabellon: CreatePabellonDto){
        return this.pabellonService.createPabellon(newPabellon);
    }

    @Get(':id')
    getPabellon(@Param('id') id:string){
        return this.pabellonService.getPabellon(id);
    }

    @Delete(':id')
    deletePabellon(@Param('id') id:string){
        return this.pabellonService.deletePabellon(id);
    }

}
