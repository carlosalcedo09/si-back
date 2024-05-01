import { Module } from '@nestjs/common';
import { CarreraController } from './carrera.controller';
import { CarreraService } from './carrera.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrera } from './carrera.entity';
import { FacultadModule } from 'src/facultad/facultad.module';

@Module({
  imports:[TypeOrmModule.forFeature([Carrera]),FacultadModule],
  controllers: [CarreraController],
  providers: [CarreraService],
  exports: [CarreraService]
})
export class CarreraModule {}
