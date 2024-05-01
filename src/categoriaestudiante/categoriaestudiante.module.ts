import { Module } from '@nestjs/common';
import { CategoriaestudianteController } from './categoriaestudiante.controller';
import { CategoriaestudianteService } from './categoriaestudiante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEstudiante } from './categoriaestudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaEstudiante])],
  controllers: [CategoriaestudianteController],
  providers: [CategoriaestudianteService],
  exports: [CategoriaestudianteService]
})
export class CategoriaestudianteModule {}
