import { Module } from '@nestjs/common';
import { ModalidadController } from './modalidad.controller';
import { ModalidadService } from './modalidad.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modalidad } from './modalidad.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Modalidad])],
  controllers: [ModalidadController],
  providers: [ModalidadService],
  exports:[ModalidadService]
})
export class ModalidadModule {}
