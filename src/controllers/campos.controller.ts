import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi'
import { Usuario } from '@interfaces/users.interface';
import { camposService } from '@/services/campos.service';
import { campos } from '@/interfaces/campos.interface';

export class camposController {
  public campos = Container.get(camposService);

  public getcampos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllcamposData: campos[] = await this.campos.findAllcampos();

      res.status(200).json({ data: findAllcamposData, message: 'Buscar todo' });
    } catch (error) {
      next(error);
    }
  };

  public getcamposById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const camposId = Number(req.params.id);
      const findOnecamposData: campos = await this.campos.findcamposById(camposId);

      res.status(200).json({ data: findOnecamposData, message: 'Buscar' });
    } catch (error) {
      next(error);
    }
  };

  public createcampos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const camposData: campos = req.body;
      const createcamposData: campos = await this.campos.createcampos(camposData);

      res.status(201).json({ data: createcamposData, message: 'Creado' });
    } catch (error) {
      next(error);
    }
  };

  public updatecampos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const camposId = Number(req.params.id);
      const camposData: campos = req.body;
      const updatecamposData: campos = await this.campos.updatecampos(camposId, camposData);

      res.status(200).json({ data: updatecamposData, message: 'Subido' });
    } catch (error) {
      next(error);
    }
  };

  public deletecampos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const camposId = Number(req.params.id);
      const deletecamposData: campos = await this.campos.deletecampo(camposId);

      res.status(200).json({ data: deletecamposData, message: 'Borrado' });
    } catch (error) {
      next(error);
    }
  };
}
