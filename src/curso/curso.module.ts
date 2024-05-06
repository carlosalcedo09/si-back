import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './curso.entity';
import { CicloModule } from 'src/ciclo/ciclo.module';
import { CategoriacursoModule } from 'src/categoriacurso/categoriacurso.module';
import { DetalleMatricula } from 'src/detallematricula/detallematricula.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Curso,DetalleMatricula]),CicloModule,CategoriacursoModule],
  providers: [CursoService],
  controllers: [CursoController],
  exports:[CursoService],
})
export class CursoModule {}