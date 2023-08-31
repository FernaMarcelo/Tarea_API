import { Model, ModelObject } from 'objection';
import { cliente } from '@/interfaces/cliente.interface';

export class clienteModel extends Model implements cliente {
  id!: number;
  email!: string;
  nombre: string; 
  apellido: string; 

  static tableName = 'clientes'; // Nombre de la base de datos
  static idColumn = 'id'; // Nombre de la tabla id
}

export type UserShape = ModelObject<clienteModel>;
