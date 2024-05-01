import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './estudiante.entity';
import { EstadocivilModule } from 'src/estadocivil/estadocivil.module';
import { DistritoModule } from 'src/distrito/distrito.module';
import { GeneroModule } from 'src/genero/genero.module';
import { CategoriaestudianteModule } from 'src/categoriaestudiante/categoriaestudiante.module';
import { CarreraModule } from 'src/carrera/carrera.module';

@Module({
  imports:[TypeOrmModule.forFeature([Estudiante]),EstadocivilModule,DistritoModule,GeneroModule,CategoriaestudianteModule,CarreraModule],
  providers: [EstudianteService],
  controllers: [EstudianteController],
  exports:[EstudianteService]
})
export class EstudianteModule {}
