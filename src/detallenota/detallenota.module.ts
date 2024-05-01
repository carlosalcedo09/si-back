import { Module } from '@nestjs/common';
import { DetallenotaController } from './detallenota.controller';
import { DetallenotaService } from './detallenota.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleNota } from './detallenota.entity';
import { NotasModule } from 'src/notas/notas.module';
import { UnidadModule } from 'src/unidad/unidad.module';
import { TipoModule } from 'src/tipo/tipo.module';

@Module({
  imports:[TypeOrmModule.forFeature([DetalleNota]),NotasModule,UnidadModule,TipoModule],
  controllers: [DetallenotaController],
  providers: [DetallenotaService],
  exports: [DetallenotaService]
})
export class DetallenotaModule {}