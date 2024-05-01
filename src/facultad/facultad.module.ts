import { Module } from '@nestjs/common';
import { FacultadController } from './facultad.controller';
import { FacultadService } from './facultad.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facultad } from './facultad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Facultad])],
  controllers: [FacultadController],
  providers: [FacultadService],
  exports:[FacultadService]
})
export class FacultadModule {}
