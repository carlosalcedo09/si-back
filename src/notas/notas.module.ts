import { Module } from '@nestjs/common';
import { NotasController } from './notas.controller';
import { NotasService } from './notas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notas } from './notas.entity';
import { DetallematriculaModule } from 'src/detallematricula/detallematricula.module';

@Module({
  imports:[TypeOrmModule.forFeature([Notas]),DetallematriculaModule],
  controllers: [NotasController],
  providers: [NotasService],
  exports: [NotasService]
})
export class NotasModule {}
