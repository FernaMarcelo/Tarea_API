import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { agricultoresController } from '@/controllers/agricultores.controller';
import { CreateagricultoresDto, UpdateagricultoresDto } from '@/dtos/agricultores.dto';

export class agricultorRoute implements Routes {
  public path = '/agricultores';
  public router = Router();
  public agricultores = new agricultoresController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.agricultores.getagricultores);
    this.router.get(`${this.path}/:id(\\d+)`, this.agricultores.getagricultoresById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateagricultoresDto), this.agricultores.createagricultores);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateagricultoresDto), this.agricultores.updateagricultores);
    this.router.delete(`${this.path}/:id(\\d+)`, this.agricultores.deleteagricultores);
  }
}
