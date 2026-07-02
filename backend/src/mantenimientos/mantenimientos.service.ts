import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Mantenimiento } from './mantenimiento.entity';
import { CreateMantenimientoDto } from './dto/create-mantenimiento.dto';
import { Equipo } from '../equipos/equipo.entity';
import { User } from '../users/user.entity';

@Injectable()
export class MantenimientosService {
  constructor(
    @InjectRepository(Mantenimiento)
    private mantenimientoRepo: Repository<Mantenimiento>,

    @InjectRepository(Equipo)
    private equipoRepo: Repository<Equipo>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateMantenimientoDto) {
    const equipo = await this.equipoRepo.findOne({
      where: { id: dto.equipoId },
    });

    const tecnico = await this.userRepo.findOne({
      where: { id: dto.tecnicoId },
    });

    if (!equipo) {
      throw new Error('Equipo no encontrado');
    }

    if (!tecnico) {
      throw new Error('Usuario técnico no encontrado');
    }

    const mantenimiento = this.mantenimientoRepo.create({
      descripcion: dto.descripcion,
      tipo: dto.tipo ?? 'PREVENTIVO',
      estado: dto.estado ?? 'PENDIENTE',
      equipo: equipo,
      tecnico: tecnico,
    });

    return await this.mantenimientoRepo.save(mantenimiento);
  }

  findAll() {
    return this.mantenimientoRepo.find({
      relations: ['equipo', 'tecnico'],
    });
  }

  findOne(id: string) {
    return this.mantenimientoRepo.findOne({
      where: { id },
      relations: ['equipo', 'tecnico'],
    });
  }
}