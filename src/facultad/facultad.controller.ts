import { Controller,
            Post,
            Body,
            Get,
            Param,
            Delete, 
            ParseIntPipe} from '@nestjs/common';
import { FacultadService } from './facultad.service';
import { Facultad } from './facultad.entity';
import { CreateFacultadDto } from './dto/create-facultad.dto';

@Controller('facultad')
export class FacultadController {

    constructor(private facultadService: FacultadService){}

    @Get()
    getFacultades(): Promise<Facultad[]>{
        return this.facultadService.getFacultades();
    }

    @Post()
    createFacultad( @Body() newFacultad: CreateFacultadDto){
        return this.facultadService.createFacultad(newFacultad);
    }
    
    @Get(':id')
    getFacultad(@Param('id',ParseIntPipe) id:number){
        return this.facultadService.getFacultad(id);
    }
    
    @Delete(':id')
    deleteFacultad(@Param('id',ParseIntPipe) id:number){
        return this.facultadService.deleteFacultad(id)
    }
}
