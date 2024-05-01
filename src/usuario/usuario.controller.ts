import { Controller,
         Post, 
         Body ,
         Get, 
         Param, 
         ParseIntPipe, 
         Delete,
        Patch} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService){}

    @Get()
    getUsuarios(): Promise<Usuario[]>{
        return this.usuarioService.getUsuarios();
    }

    @Post()
    createUsuarios( @Body() newUsuario: CreateUsuarioDto){
        return this.usuarioService.createUsuario(newUsuario)
    }
    
    @Get(':id')
    getUsuario(@Param('id', ParseIntPipe) id:number){
        return this.usuarioService.getUsuario(id);
    }
    
    @Delete(':id')
    deleteUsuario(@Param('id', ParseIntPipe) id:number){
        return this.usuarioService.deleteUsuario(id)
    }

    @Patch(':id')
    updateUsuario(@Param('id', ParseIntPipe)id:number, @Body() usuario: UpdateUsuarioDto){
        this.usuarioService.updateUsuario(id,usuario)
    }
}
