import { Module } from '@nestjs/common';
import { ProfesorController } from './profesor.controller';
import { ProfesorService } from './profesor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './profesor.entity';
import { EstadocivilModule } from 'src/estadocivil/estadocivil.module';
import { DistritoModule } from 'src/distrito/distrito.module';
import { GeneroModule } from 'src/genero/genero.module';

@Module({
  imports:[TypeOrmModule.forFeature([Profesor]),EstadocivilModule,DistritoModule,GeneroModule],
  controllers: [ProfesorController],
  providers: [ProfesorService],
  exports:[ProfesorService]
})
export class ProfesorModule {}
