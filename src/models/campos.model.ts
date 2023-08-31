import { Model, ModelObject } from 'objection';
import { campos } from '@/interfaces/campos.interface';

export class camposModel extends Model implements campos {
  id!: number;
  nombre: string;
  ubicacion: string; 

  static tableName = 'campos'; // Nombre de la base de datos
  static idColumn = 'id'; // Nombre de la tabla id
}

export type UserShape = ModelObject<camposModel>;
