import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import multer from 'multer';
import { indexController } from '@/controllers/index.controller';

export class indexRoute implements Routes {
  public path = '/archivo';
  public router = Router();
  public index = new indexController();
  upload = multer({ dest: 'uploads/' });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.upload.single('archivo'), this.index.getindex);
  }
}
