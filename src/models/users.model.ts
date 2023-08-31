import { Model, ModelObject } from 'objection';
import { Usuario } from '@interfaces/users.interface';

export class UserModel extends Model implements Usuario {
  id!: number;
  email!: string;
  contraseña!: string;

  static tableName = 'users'; // Nombre de la base de datos
  static idColumn = 'id'; // Nombre de la tabla id
}

export type UserShape = ModelObject<UserModel>;
