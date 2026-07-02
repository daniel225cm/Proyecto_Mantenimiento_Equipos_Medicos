import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Mantenimiento } from './mantenimiento.entity';
import { MantenimientosService } from './mantenimientos.service';
import { MantenimientosController } from './mantenimientos.controller';

import { Equipo } from '../equipos/equipo.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mantenimiento, Equipo, User])],
  controllers: [MantenimientosController],
  providers: [MantenimientosService],
})
export class MantenimientosModule {}