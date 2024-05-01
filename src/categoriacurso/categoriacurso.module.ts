import { Module } from '@nestjs/common';
import { CategoriacursoController } from './categoriacurso.controller';
import { CategoriacursoService } from './categoriacurso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaCurso } from './categoriacurso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaCurso])],
  controllers: [CategoriacursoController],
  providers: [CategoriacursoService],
  exports:[CategoriacursoService]
})
export class CategoriacursoModule {}
