import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { agricultoresService } from "@/services/agricultores.service";
import { Agricultor } from "@/interfaces/agricultor.interface";

export class agricultoresController {
  public agricultores = Container.get(agricultoresService);

  public getagricultores = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllagricultoresData: Agricultor[] =
        await this.agricultores.findAllagricultores();

      res
        .status(200)
        .json({ data: findAllagricultoresData, message: "Buscar todo" });
    } catch (error) {
      next(error);
    }
  };

  public getagricultoresById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const agricultoresId = Number(req.params.id);
      const findOneagricultoresData: Agricultor =
        await this.agricultores.findagricultoresById(agricultoresId);

      res
        .status(200)
        .json({ data: findOneagricultoresData, message: "Buscar" });
    } catch (error) {
      next(error);
    }
  };

  public createagricultores = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const agricultoresData: Agricultor = req.body;
      const createagricultorData: Agricultor =
        await this.agricultores.createagricultores(agricultoresData);

      res.status(201).json({ data: createagricultorData, message: "Creado" });
    } catch (error) {
      next(error);
    }
  };

  public updateagricultores = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const agricultoresId = Number(req.params.id);
      const agricultoresData: Agricultor = req.body;
      const updateagricultoresData: Agricultor =
        await this.agricultores.updateagricultores(
          agricultoresId,
          agricultoresData
        );

      res.status(200).json({ data: updateagricultoresData, message: "Subido" });
    } catch (error) {
      next(error);
    }
  };

  public deleteagricultores = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const agricultoresId = Number(req.params.id);
      const deleteagricultoresData: Agricultor =
        await this.agricultores.deleteagricultores(agricultoresId);

      res
        .status(200)
        .json({ data: deleteagricultoresData, message: "Borrado" });
    } catch (error) {
      next(error);
    }
  };
}
