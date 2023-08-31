import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { cosechasModel } from "@/models/cosechas.model";
import { cosechas } from "@/interfaces/cosechas.interface";
import { CreatecosechasDto } from "@/dtos/cosechas.dto";
import { AgricultorModel } from "@/models/agricultor.model";
import { camposModel } from "@/models/campos.model";
import { clienteModel } from "@/models/cliente.model";

@Service()
export class cosechasService {
  // Metodo para encontrar las cosechas
  public async findAllcosechas(): Promise<cosechas[]> {
    const cosechas: cosechas[] = await cosechasModel
      .query()
      .select()
      .from("cosechas");
    return cosechas;
  }
  // Metodo para encontrar una cosecha por su ID
  public async findcosechasById(cosechasId: number): Promise<cosechas> {
    const findcosechas: cosechas = await cosechasModel
      .query()
      .findById(cosechasId);
    if (!findcosechas) throw new HttpException(409, "Cosecha no existe");

    return findcosechas;
  }
  // Metodo para crear una nueva cosecha
  public async createcosechas(
    cosechasData: CreatecosechasDto
  ): Promise<cosechas> {
    const { agricultor_id, campo_id, cliente_id, fruta, variedad } =
      cosechasData;

    // Verificar si los IDs de agricultor, campo y cliente existen
    const existingAgricultor = await AgricultorModel.query()
      .select()
      .from("Agricultores")
      .where("id", "=", agricultor_id)
      .first();

    const existingCampo = await camposModel
      .query()
      .select()
      .from("Campos")
      .where("id", "=", campo_id)
      .first();

    const existingCliente = await clienteModel
      .query()
      .select()
      .from("Clientes")
      .where("id", "=", cliente_id)
      .first();

    // Verificar si ya existe una cosecha con la misma fruta y variedad
    const existingCosecha = await cosechasModel
      .query()
      .select()
      .from("cosechas")
      .where("fruta", "=", fruta)
      .andWhere("variedad", "=", variedad)
      .first();

    if (existingAgricultor && existingCampo && existingCliente) {
      if (existingCosecha) {
        throw new HttpException(409, `Esta fruta ${fruta} ya existe`);
      }

      // Insertar el registro en la tabla "Cosechas"
      const createcosechasData: cosechas = await cosechasModel
        .query()
        .insert({ ...cosechasData })
        .into("cosechas");

      return createcosechasData;
    } else {
      throw new HttpException(400, "Agricultor, campo o cliente no existen");
    }
  }
  
  // Metodo para actualizar una cosecha existentes
  public async updatecosechas(
    cosechasId: number,
    cosechasData: cosechas
  ): Promise<cosechas> {
    const findcosechas: cosechas[] = await cosechasModel
      .query()
      .select()
      .from("cosechas")
      .where("id", "=", cosechasId);
    if (!findcosechas) throw new HttpException(409, "Esta fruta no existe");

    await cosechasModel
      .query()
      .update({ ...cosechasData })
      .where("id", "=", cosechasId)
      .into("cosechas");

    const updatecosechasData: cosechas = await cosechasModel
      .query()
      .select()
      .from("cosechas")
      .where("id", "=", cosechasId)
      .first();
    return updatecosechasData;
  }

  // Metodo para eliminar una cosecha
  public async deletecosechas(cosechasId: number): Promise<cosechas> {
    const findcosechas: cosechas = await cosechasModel
      .query()
      .select()
      .from("cosechas")
      .where("id", "=", cosechasId)
      .first();
    if (!findcosechas) throw new HttpException(409, "Esta fruta no existe");

    // Elimina la cosecha de la base de datos
    await cosechasModel
      .query()
      .delete()
      .where("id", "=", cosechasId)
      .into("cosechas");
    
    //Devuelve la cosecha eliminada  
    return findcosechas;
  }
}
