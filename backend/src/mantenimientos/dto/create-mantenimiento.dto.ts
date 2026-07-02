export class CreateMantenimientoDto {
  descripcion: string;
  tipo?: string;
  estado?: string;

  equipoId: string;
  tecnicoId: string;
}