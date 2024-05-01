import { Module } from '@nestjs/common';
import { DetallematriculaController } from './detallematricula.controller';
import { DetallematriculaService } from './detallematricula.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleMatricula } from './detallematricula.entity';
import { MatriculaModule } from 'src/matricula/matricula.module';
import { ProfesorModule } from 'src/profesor/profesor.module';
import { PabellonModule } from 'src/pabellon/pabellon.module';
import { ModalidadModule } from 'src/modalidad/modalidad.module';
import { CursoModule } from 'src/curso/curso.module';

@Module({
  imports:[TypeOrmModule.forFeature([DetalleMatricula]),MatriculaModule,ProfesorModule,PabellonModule,ModalidadModule,CursoModule],
  controllers: [DetallematriculaController],
  providers: [DetallematriculaService],
  exports:[DetallematriculaService]
})
export class DetallematriculaModule {}
