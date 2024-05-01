import { Module } from '@nestjs/common';
import { GeneroController } from './genero.controller';
import { GeneroService } from './genero.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genero } from './genero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genero])],
  controllers: [GeneroController],
  providers: [GeneroService],
  exports:[GeneroService]
})
export class GeneroModule {}
