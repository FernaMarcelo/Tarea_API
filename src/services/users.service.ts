import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/httpException';
import { Usuario } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';

@Service()
export class UserService {
  public async findAllUser(): Promise<Usuario[]> {
    const users: Usuario[] = await UserModel.query().select().from('users');
    return users;
  }

  public async findUserById(userId: number): Promise<Usuario> {
    const findUser: Usuario = await UserModel.query().findById(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<Usuario> {
    const findUser: Usuario = await UserModel.query().select().from('users').where('email', '=', userData.email).first();
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.contraseña, 10);
    const createUserData: Usuario = await UserModel.query()
      .insert({ ...userData, contraseña: hashedPassword })
      .into('users');

    return createUserData;
  }

  public async updateUser(userId: number, userData: Usuario): Promise<Usuario> {
    const findUser: Usuario[] = await UserModel.query().select().from('users').where('id', '=', userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.contraseña, 10);
    await UserModel.query()
      .update({ ...userData, contraseña: hashedPassword })
      .where('id', '=', userId)
      .into('users');

    const updateUserData: Usuario = await UserModel.query().select().from('users').where('id', '=', userId).first();
    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<Usuario> {
    const findUser: Usuario = await UserModel.query().select().from('users').where('id', '=', userId).first();
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await UserModel.query().delete().where('id', '=', userId).into('users');
    return findUser;
  }
}
