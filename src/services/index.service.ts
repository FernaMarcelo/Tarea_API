import { Service } from "typedi";
import * as fs from "fs";
import * as papa from "papaparse";
import { CSVRow } from "@/interfaces/csv.interface";
import { knex } from "@/database";

@Service()
export class indexService {
  public async uploadFileService(file: any): Promise<string> {


    const data = fs.readFileSync(file.path, "utf-8");
    const parsedData = papa.parse(data, { header: true }).data as CSVRow[];

    const trx = knex();

    try {
      for (const row of parsedData) {
        if (
          row["Mail Agricultor"] &&
          row["Nombre Agricultor"] &&
          row["Apellido Agricultor"] &&
          row["Mail Cliente"] &&
          row["Nombre Cliente"] &&
          row["Apellido Cliente"] &&
          row["Nombre Campo"] &&
          row["Ubicación de Campo"] &&
          row["Fruta Cosechada"] &&
          row["Variedad Cosechada"]
        ) {
          let [agricultorId, clienteId, campoId] = [0, 0, 0];

          const existingAgricultor = await trx("Agricultores")
            .where({
              email: row["Mail Agricultor"],
              nombre: row["Nombre Agricultor"],
              apellido: row["Apellido Agricultor"],
            })
            .first();

          if (!existingAgricultor) {
            [agricultorId] = await trx("Agricultores")
              .insert({
                email: row["Mail Agricultor"],
                nombre: row["Nombre Agricultor"],
                apellido: row["Apellido Agricultor"],
              })
              .onConflict("email")
              .ignore();
          }

          const existingCliente = await trx("Clientes")
            .where({
              email: row["Mail Cliente"], 
              nombre: row["Nombre Cliente"],
              apellido: row["Apellido Cliente"],
            })
            .first();

          if (!existingCliente) {
            [clienteId] = await trx("Clientes")
              .insert({
                email: row["Mail Cliente"],
                nombre: row["Nombre Cliente"],
                apellido: row["Apellido Cliente"],
              })
              .onConflict("email")
              .ignore();
          }

          const existingCampo = await trx("Campos")
            .where({
              nombre: row["Nombre Campo"],
              ubicacion: row["Ubicación de Campo"],
            })
            .first();

          if (!existingCampo) {
            [campoId] = await trx("Campos")
              .insert({
                nombre: row["Nombre Campo"],
                ubicacion: row["Ubicación de Campo"],
              })
              .onConflict(["nombre", "ubicacion"])
              .ignore();
          }

          await trx("Cosechas")
            .insert({
              agricultor_id: agricultorId,
              cliente_id: clienteId,
              campo_id: campoId,
              fruta: row["Fruta Cosechada"],
              variedad: row["Variedad Cosechada"],
            })
            .onConflict(["fruta", "variedad"])
            .ignore();
        }
      }
      return "CSV data inserted successfully";
    } catch (error) {
      throw new Error("Error inserting CSV data: " + error.message);
    } finally {
      trx.destroy();
    }
  }
}
