import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { indexService } from '@/services/index.service';

export class indexController {
  public index = Container.get(indexService);

  public getindex = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.index.uploadFileService(req.file);

      res.status(200).json({ data: result, message: 'Buscas todo' });
    } catch (error) {
      next(error);
    }
  };
}
