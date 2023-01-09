import {
  AuthChangePasswordRequest,
  AuthForgotPasswordRequest,
  AuthLoginRequest,
  AuthResetPasswordRequest,
  AuthSignUpRequest
} from '@/features/auth/data/auth.request';
import { NextFunction, Request, Response } from 'express';
import AuthRepositoryImpl from '../data/auth.repository.impl';
import { RequestWithUser } from '../domain/auth.entity';

class AuthController {
  public authService = new AuthRepositoryImpl();

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: AuthLoginRequest = req.body;
      const { cookie, user } = await this.authService.logIn(request);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: user, message: 'login succeed' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;
      await this.authService.logOut(user);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: null, message: 'logout succeed' });
    } catch (error) {
      next(error);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: AuthSignUpRequest = req.body;
      const signUpUserData = await this.authService.signUp(request);

      res.status(201).json({ data: signUpUserData, message: 'signup succeed' });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const request: AuthForgotPasswordRequest = req.body;
      await this.authService.forgotPassword(request);

      res.status(201).json({ message: 'forgot password request succeed' });
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const request: AuthResetPasswordRequest = req.body;
      await this.authService.resetPassword(request);

      res.status(201).json({ message: 'reset password succeed' });
    } catch (error) {
      next(error);
    }
  };

  public changePassword = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;
      const request: AuthChangePasswordRequest = req.body;
      await this.authService.changePassword(request, user);

      res.status(201).json({ message: 'reset password succeed' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
