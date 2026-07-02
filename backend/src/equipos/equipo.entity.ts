import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('equipos')
export class Equipo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column({ nullable: true })
  serial: string;

  @Column({ default: 'ACTIVO' })
  estado: string;

  @Column({ nullable: true })
  ubicacion: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}