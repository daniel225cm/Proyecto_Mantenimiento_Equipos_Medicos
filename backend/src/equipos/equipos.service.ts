import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from './equipo.entity';
import { CreateEquipoDto } from './dto/create-equipo.dto';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>,
  ) {}

  create(dto: CreateEquipoDto) {
    const equipo = this.equipoRepository.create(dto);
    return this.equipoRepository.save(equipo);
  }

  findAll() {
    return this.equipoRepository.find();
  }

  findOne(id: string) {
    return this.equipoRepository.findOne({ where: { id } });
  }

  remove(id: string) {
    return this.equipoRepository.delete(id);
  }
}