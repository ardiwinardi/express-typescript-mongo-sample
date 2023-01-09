import { Routes } from '@/shared/interfaces/routes.interface';
import authMiddleware from '@/shared/middlewares/auth.middleware';
import validate from '@/shared/middlewares/validate.middleware';
import { Router } from 'express';
import { CreateUserSchema, UpdateUserSchema } from './../data/user.request';
import UserController from './user.controller';

export default class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.path, authMiddleware);

    this.router.get(this.path, this.usersController.getAll);
    this.router.get(`${this.path}/:id`, this.usersController.getById);
    this.router.post(
      this.path,
      validate(CreateUserSchema),
      this.usersController.create
    );
    this.router.put(
      `${this.path}/:id`,
      validate(UpdateUserSchema),
      this.usersController.update
    );
    this.router.delete(`${this.path}/:id`, this.usersController.delete);
  }
}
