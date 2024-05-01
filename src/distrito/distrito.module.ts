import { Module } from '@nestjs/common';
import { DistritoController } from './distrito.controller';
import { DistritoService } from './distrito.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distrito } from './distrito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Distrito])],
  controllers: [DistritoController],
  providers: [DistritoService],
  exports:[DistritoService]
})
export class DistritoModule {}
