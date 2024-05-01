import { Module } from '@nestjs/common';
import { EstadocivilController } from './estadocivil.controller';
import { EstadocivilService } from './estadocivil.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoCivil } from './estadocivil.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoCivil])],
  controllers: [EstadocivilController],
  providers: [EstadocivilService],
  exports:[EstadocivilService]
})
export class EstadocivilModule {}
