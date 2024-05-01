import { Module } from '@nestjs/common';
import { CicloController } from './ciclo.controller';
import { CicloService } from './ciclo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciclo } from './ciclo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ciclo])],
  controllers: [CicloController],
  providers: [CicloService],
  exports:[CicloService]
})
export class CicloModule {}
