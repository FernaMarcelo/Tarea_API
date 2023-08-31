import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { cliente } from '@/interfaces/cliente.interface';
import { clienteModel } from '@/models/cliente.model';
import { CreateclienteDto } from '@/dtos/clientes.dto';

@Service()
export class clientesService {

  // Metodo para obtener todos los clientes
  public async findAllcliente(): Promise<cliente[]> {
    const cliente: cliente[] = await clienteModel.query().select().from('clientes');
    return cliente;
  }

  // Metodo para buscar a un cliente por su ID
  public async findclienteById(clienteId: number): Promise<cliente> {
    const findcliente: cliente = await clienteModel.query().findById(clienteId);
    if (!findcliente) throw new HttpException(409, "cliente no existe");

    return findcliente;
  }

  // Metodo para crear un nuevo cliente
  public async createcliente(clienteData: CreateclienteDto): Promise<cliente> {
    const findcliente: cliente = await clienteModel.query().select().from('clientes').where('email', '=', clienteData.email).first();
    if (findcliente) throw new HttpException(409, `Este email ${clienteData.email} ya existe`);

    const createclienteData: cliente = await clienteModel.query()
      .insert({ ...clienteData})
      .into('clientes');

    return createclienteData;
  }

  // Metodo para actulizar un cliente existente
  public async updatecliente(clienteId: number, clienteData: cliente): Promise<cliente> {
    const findcliente: cliente[] = await clienteModel.query().select().from('clientes').where('id', '=', clienteId);
    if (!findcliente) throw new HttpException(409, "cliente no existe");

    await clienteModel.query()
      .update({ ...clienteData})
      .where('id', '=', clienteId)
      .into('clientes');

    const updateclienteData: cliente = await clienteModel.query().select().from('clientes').where('id', '=', clienteId).first();
    return updateclienteData;
  }

  // Metodo para eliminar un cliente
  public async deletecliente(clienteId: number): Promise<cliente> {
    const findcliente: cliente = await clienteModel.query().select().from('clientes').where('id', '=', clienteId).first();
    if (!findcliente) throw new HttpException(409, "cliente no existe");

    // Elimina el cliente de la base de datos
    await clienteModel.query().delete().where('id', '=', clienteId).into('clientes');
    return findcliente;
  }
}
