import { Controller,
         Post, 
         Body ,
         Get, 
         Param, 
         ParseIntPipe, 
         Delete,
        Patch,
        ValidationPipe,
        BadRequestException,
        HttpException,
        HttpStatus} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { validate } from 'class-validator';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

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
    
    @Get(':codigoD')
    getUsuario(@Param('codigoD', ParseIntPipe) codigoD:number){
        return this.usuarioService.getUsuario(codigoD);
    }
    
    @Delete(':id')
    deleteUsuario(@Param('id', ParseIntPipe) id:number){
        return this.usuarioService.deleteUsuario(id)
    }

    @Patch(':id')
    updateUsuario(@Param('id', ParseIntPipe)id:number, @Body() usuario: UpdateUsuarioDto){
        this.usuarioService.updateUsuario(id,usuario)
    }

    @Post('validar')
    async validarEmpleado(@Body() loginDto: LoginUsuarioDto): Promise<any> {
      try {
        const usuario = await this.usuarioService.validarDocente(loginDto.username, loginDto.password);
        if (!usuario) {
          throw new HttpException('Credenciales incorrectas', HttpStatus.UNAUTHORIZED);
        }
        return { message: 'Autenticación exitosa' };
      } catch (error) {
        throw new HttpException('Credenciales incorrectas', HttpStatus.UNAUTHORIZED);
      }
    }
}
