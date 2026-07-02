import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { MantenimientosService } from './mantenimientos.service';
import { CreateMantenimientoDto } from './dto/create-mantenimiento.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard) // 🔐 JWT + ROLES
@Controller('mantenimientos')
export class MantenimientosController {
  constructor(private readonly service: MantenimientosService) {}

  // 🟢 ADMIN Y TECNICO CREAN MANTENIMIENTOS
  @Roles('ADMIN', 'TECNICO')
  @Post()
  create(@Body() dto: CreateMantenimientoDto) {
    return this.service.create(dto);
  }

  // 🟢 ADMIN Y TECNICO VEN TODO
  @Roles('ADMIN', 'TECNICO')
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // 🟢 ADMIN Y TECNICO VEN UNO
  @Roles('ADMIN', 'TECNICO')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}