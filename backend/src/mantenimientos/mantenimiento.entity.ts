import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Equipo } from '../equipos/equipo.entity';
import { User } from '../users/user.entity';

@Entity('mantenimientos')
export class Mantenimiento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descripcion: string;

  @Column({ default: 'PENDIENTE' })
  estado: string;

  @Column({ nullable: true })
  tipo: string; // preventivo / correctivo

  @ManyToOne(() => Equipo, { eager: true })
  equipo: Equipo;

  @ManyToOne(() => User, { eager: true })
  tecnico: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}