import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { Agricultor } from "@/interfaces/agricultor.interface";
import { AgricultorModel } from "@/models/agricultor.model";
import { CreateagricultoresDto } from "@/dtos/agricultores.dto";

@Service()
export class agricultoresService {

  // Busca todos los agricultores en la base de datos
  public async findAllagricultores(): Promise<Agricultor[]> {
    const agricultores: Agricultor[] = await AgricultorModel.query()
      .select()
      .from("agricultores");
    return agricultores;
  }

  // Busca un agricultor por su id
  public async findagricultoresById(
    agricultoresId: number
  ): Promise<Agricultor> {
    const findagricultores: Agricultor = await AgricultorModel.query().findById(
      agricultoresId
    );
    if (!findagricultores)
      throw new HttpException(409, "Este agricultor no existe");

    return findagricultores;
  }

  // Busca un agricultor por su email
  public async createagricultores(
    agricultoresData: CreateagricultoresDto
  ): Promise<Agricultor> {
    const findagricultores: Agricultor = await AgricultorModel.query()
      .select()
      .from("agricultores")
      .where("email", "=", agricultoresData.email)
      .first();
    if (findagricultores)
      throw new HttpException(
        409,
        `Este email ${agricultoresData.email} ya existe`
      );

    const createagricultoresData: Agricultor = await AgricultorModel.query()
      .insert({ ...agricultoresData })
      .into("agricultores");

    return createagricultoresData;
  }

  // Actualiza un agricultor por su id
  public async updateagricultores(
    agricultoresId: number,
    agricultoresData: Agricultor
  ): Promise<Agricultor> {
    const findagricultores: Agricultor[] = await AgricultorModel.query()
      .select()
      .from("agricultores")
      .where("id", "=", agricultoresId);
    if (!findagricultores)
      throw new HttpException(409, "Este agricultor ya existe");

    await AgricultorModel.query()
      .update({ ...agricultoresData })
      .where("id", "=", agricultoresId)
      .into("agricultores");

    const updateagricultoresData: Agricultor = await AgricultorModel.query()
      .select()
      .from("agricultores")
      .where("id", "=", agricultoresId)
      .first();
    return updateagricultoresData;
  }

  // Elimina un agricultor por su id
  public async deleteagricultores(agricultoresId: number): Promise<Agricultor> {
    const findagricultores: Agricultor = await AgricultorModel.query()
      .select()
      .from("agricultores")
      .where("id", "=", agricultoresId)
      .first();
    if (!findagricultores) throw new HttpException(409, "Este campo no existe");

    await AgricultorModel.query()
      .delete()
      .where("id", "=", agricultoresId)
      .into("agricultores");
    return findagricultores;
  }
}
