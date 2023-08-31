import { Model, ModelObject } from 'objection';
import { Agricultor } from '@/interfaces/agricultor.interface';

export class AgricultorModel extends Model implements Agricultor {
  id!: number;
  email!: string;
  nombre: string; 
  apellido: string; 

  static tableName = 'agricultor'; // Nombre de la base de datos
  static idColumn = 'id'; // Nombre de la tabla id
}

export type UserShape = ModelObject<AgricultorModel>;
