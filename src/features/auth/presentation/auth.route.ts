import { Routes } from '@/shared/interfaces/routes.interface';
import authMiddleware from '@/shared/middlewares/auth.middleware';
import validate from '@/shared/middlewares/validate.middleware';

import { Router } from 'express';
import {
  ChangePasswordSchema,
  ForgotPasswordSchema,
  LoginSchema,
  ResetPasswordSchema,
  SignUpSchema
} from '../data/auth.request';

import AuthController from './auth.controller';

export default class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/signup`,
      validate(SignUpSchema),
      this.authController.signUp
    );
    this.router.post(
      `${this.path}/login`,
      validate(LoginSchema),
      this.authController.logIn
    );
    this.router.post(
      `${this.path}/logout`,
      authMiddleware,
      this.authController.logOut
    );

    this.router.post(
      `${this.path}/forgot-password`,
      validate(ForgotPasswordSchema),
      this.authController.forgotPassword
    );

    this.router.post(
      `${this.path}/reset-password`,
      validate(ResetPasswordSchema),
      this.authController.resetPassword
    );

    this.router.post(
      `${this.path}/change-password`,
      authMiddleware,
      validate(ChangePasswordSchema),
      this.authController.changePassword
    );
  }
}
