import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CreateclienteDto, UpdateclienteDto } from '@/dtos/clientes.dto';
import { clientesController } from '@/controllers/clientes.controller';

export class clientesRoute implements Routes {
  public path = '/clientes';
  public router = Router();
  public user = new clientesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getclientes);
    this.router.get(`${this.path}/:id(\\d+)`, this.user.getclienteById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateclienteDto), this.user.createcliente);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateclienteDto), this.user.updatecliente);
    this.router.delete(`${this.path}/:id(\\d+)`, this.user.deletecliente);
  }
}
