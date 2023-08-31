import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi'
import { UserService } from '@services/users.service';
import { clientesService } from '@/services/clientes.service';
import { cliente } from '@/interfaces/cliente.interface';

export class clientesController {
  public clientes = Container.get(clientesService);

  public getclientes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllclientesData: cliente[] = await this.clientes.findAllcliente();

      res.status(200).json({ data: findAllclientesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getclienteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clienteId = Number(req.params.id);
      const findOneclienteData: cliente = await this.clientes.findclienteById(clienteId);

      res.status(200).json({ data: findOneclienteData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createcliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clienteData: cliente = req.body;
      const createclienteData: cliente = await this.clientes.createcliente(clienteData);

      res.status(201).json({ data: createclienteData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatecliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clienteId = Number(req.params.id);
      const clienteData: cliente = req.body;
      const updateclienteData: cliente = await this.clientes.updatecliente(clienteId, clienteData);

      res.status(200).json({ data: updateclienteData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletecliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clienteId = Number(req.params.id);
      const deleteclienteData: cliente = await this.clientes.deletecliente(clienteId);

      res.status(200).json({ data: deleteclienteData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
