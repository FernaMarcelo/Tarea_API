import { Model, ModelObject } from 'objection';
import { cosechas } from '@/interfaces/cosechas.interface';

export class cosechasModel extends Model implements cosechas {
  id!: number;
  agricultor_id!: number;
  cliente_id!: number;
  campo_id!: number;
  fruta: string;
  variedad: string; 

  static tableName = 'cosechas'; // Nombre de la base de datos
  static idColumn = 'id'; // Nombre de la tabla id
}

export type UserShape = ModelObject<cosechasModel>;
