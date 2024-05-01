import { Module } from '@nestjs/common';
import { PabellonController } from './pabellon.controller';
import { PabellonService } from './pabellon.service';
import { Pabellon } from './pabellon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Pabellon])],
  controllers: [PabellonController],
  providers: [PabellonService],
  exports: [PabellonService]
})
export class PabellonModule {
  
}
