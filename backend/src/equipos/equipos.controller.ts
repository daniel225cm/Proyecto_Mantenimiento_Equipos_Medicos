import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard) // 🔐 JWT + ROLES
@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  // 🟢 SOLO ADMIN PUEDE CREAR EQUIPOS
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateEquipoDto) {
    return this.equiposService.create(dto);
  }

  // 🟢 ADMIN Y TECNICO PUEDEN VER
  @Roles('ADMIN', 'TECNICO')
  @Get()
  findAll() {
    return this.equiposService.findAll();
  }

  @Roles('ADMIN', 'TECNICO')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equiposService.findOne(id);
  }

  // 🔴 SOLO ADMIN BORRA
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equiposService.remove(id);
  }
}