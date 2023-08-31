import { cosechas } from '@/interfaces/cosechas.interface';
import { cosechasService } from '@/services/cosechas.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi'

export class cosechasController {
  public cosechas = Container.get(cosechasService);

  public getcosechas = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllcosechasData: cosechas[] = await this.cosechas.findAllcosechas();

      res.status(200).json({ data: findAllcosechasData, message: 'Buscas todo' });
    } catch (error) {
      next(error);
    }
  };

  public getcosechasById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cosechasId = Number(req.params.id);
      const findOnecosechasData: cosechas = await this.cosechas.findcosechasById(cosechasId);

      res.status(200).json({ data: findOnecosechasData, message: 'Buscar' });
    } catch (error) {
      next(error);
    }
  };

  public createcosechas = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cosechasData: cosechas = req.body;
      const createcosechasData: cosechas = await this.cosechas.createcosechas(cosechasData);

      res.status(201).json({ data: createcosechasData, message: 'Creada' });
    } catch (error) {
      next(error);
    }
  };

  public updatecosechas = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cosechasId = Number(req.params.id);
      const cosechasData: cosechas = req.body;
      const updatecosechasData: cosechas = await this.cosechas.updatecosechas(cosechasId, cosechasData);

      res.status(200).json({ data: updatecosechasData, message: 'Subido' });
    } catch (error) {
      next(error);
    }
  };

  public deletecosechas = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cosechasId = Number(req.params.id);
      const deletecosechasData: cosechas = await this.cosechas.deletecosechas(cosechasId);

      res.status(200).json({ data: deletecosechasData, message: 'Borrado' });
    } catch (error) {
      next(error);
    }
  };
}
