import { NextFunction, Request, Response } from 'express';
import UserRepositoryImpl from '../data/user.repository.impl';
import {
  UserCreateRequest,
  UserGetAllRequest,
  UserUpdateRequest
} from '../data/user.request';
import { User } from '../domain/user.entity';

export default class UserController {
  public userService = new UserRepositoryImpl();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: UserGetAllRequest = req.body;
      const getAllUsersData: User[] = await this.userService.getAll(request);

      res.status(200).json({ data: getAllUsersData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const getOneUserData: User = await this.userService.getById(userId);

      res.status(200).json({ data: getOneUserData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserCreateRequest = req.body;
      await this.userService.create(userData);

      res.status(201).json({ message: 'user has been created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: UserUpdateRequest = {
        ...req.body,
        id: userId
      };
      await this.userService.update(userData);

      res.status(200).json({ message: 'user has been updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      await this.userService.delete(userId);

      res.status(200).json({ message: 'user has been deleted' });
    } catch (error) {
      next(error);
    }
  };
}
