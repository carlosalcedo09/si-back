import { Module } from '@nestjs/common';
import { TipoController } from './tipo.controller';
import { TipoService } from './tipo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tipo } from './tipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tipo])],
  controllers: [TipoController],
  providers: [TipoService],
  exports:[TipoService]
})
export class TipoModule {}
