import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { cosechasController } from '@/controllers/cosechas.controller';
import { CreatecosechasDto, UpdatecosechasDto } from '@/dtos/cosechas.dto';

export class cosechasRoute implements Routes {
  public path = '/cosechas';
  public router = Router();
  public cosechas = new cosechasController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.cosechas.getcosechas);
    this.router.get(`${this.path}/:id(\\d+)`, this.cosechas.getcosechasById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreatecosechasDto), this.cosechas.createcosechas);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdatecosechasDto), this.cosechas.updatecosechas);
    this.router.delete(`${this.path}/:id(\\d+)`, this.cosechas.deletecosechas);
  }
}
