import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { campos } from '@/interfaces/campos.interface';
import { camposModel } from '@/models/campos.model';
import { CreatecamposDto } from '@/dtos/campos.dto';

@Service()
export class camposService {
  
  // Metodo para encontrar todos los campos
  public async findAllcampos(): Promise<campos[]> {
    const campos: campos[] = await camposModel.query().select().from('campos');
    return campos;
  }

  // Metodo para encontrar un campo por su ID
  public async findcamposById(camposId: number): Promise<campos> {
    const findcampos: campos = await camposModel.query().findById(camposId);
    if (!findcampos) throw new HttpException(409, "Este campo no existe");

    return findcampos;
  }
  
  // Metodo para crear un nuevo campo
  public async createcampos(camposData: CreatecamposDto): Promise<campos> {
    const findcampos: campos = await camposModel.query().select().from('campos').where('ubicacion', '=', camposData.ubicacion).andWhere('nombre', '=', camposData.nombre).first();
    if (findcampos) throw new HttpException(409, `Esta ubicación ${camposData.ubicacion} ya existe`);

    const createcamposData: campos = await camposModel.query()
      .insert({ ...camposData })
      .into('campos');

    return createcamposData;
  }

  // Metodo para actualizar un campo existente
  public async updatecampos(camposId: number, camposData: campos): Promise<campos> {
    const findcampos: campos[] = await camposModel.query().select().from('campos').where('id', '=', camposId);
    if (!findcampos) throw new HttpException(409, "Este campo ya existe");

    await camposModel.query()
      .update({ ...camposData})
      .where('id', '=', camposId)
      .into('campos');

    const updatecamposData: campos = await camposModel.query().select().from('campos').where('id', '=', camposId).first();
    return updatecamposData;
  }

  // Metodo para eliminar un campo
  public async deletecampo(camposId: number): Promise<campos> {
    const findcampos: campos = await camposModel.query().select().from('campos').where('id', '=', camposId).first();
    if (!findcampos) throw new HttpException(409, "Este campo no existe");

    // Elimina el campo de la base de datos
    await camposModel.query().delete().where('id', '=', camposId).into('campos');
    return findcampos;
  }
}
