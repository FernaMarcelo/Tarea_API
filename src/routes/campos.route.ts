import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { camposController } from '@/controllers/campos.controller';
import { CreatecamposDto, UpdatecamposDto } from '@/dtos/campos.dto';

export class camposRoute implements Routes {
  public path = '/campos';
  public router = Router();
  public campos = new camposController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.campos.getcampos);
    this.router.get(`${this.path}/:id(\\d+)`, this.campos.getcamposById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreatecamposDto), this.campos.createcampos);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdatecamposDto), this.campos.updatecampos);
    this.router.delete(`${this.path}/:id(\\d+)`, this.campos.deletecampos);
  }
}
