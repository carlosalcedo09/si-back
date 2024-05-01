import { Module } from '@nestjs/common';
import { UnidadController } from './unidad.controller';
import { UnidadService } from './unidad.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidad } from './unidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unidad])],
  controllers: [UnidadController],
  providers: [UnidadService],
  exports:[UnidadService]
})
export class UnidadModule {}
