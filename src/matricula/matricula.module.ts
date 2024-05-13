import { Module } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { MatriculaController } from './matricula.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matricula } from './matricula.entity';
import { EstudianteService } from 'src/estudiante/estudiante.service';
import { EstudianteModule } from 'src/estudiante/estudiante.module';
import { ProfesorModule } from 'src/profesor/profesor.module';
import { PabellonModule } from 'src/pabellon/pabellon.module';


@Module({
  imports:[TypeOrmModule.forFeature([Matricula]),EstudianteModule],
  providers: [MatriculaService],
  controllers: [MatriculaController],
  exports: [MatriculaService]
})
export class MatriculaModule {}
