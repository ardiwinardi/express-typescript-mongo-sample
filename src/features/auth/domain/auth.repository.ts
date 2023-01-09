import { User } from '@/features/user/domain/user.entity';
import {
  AuthChangePasswordRequest,
  AuthForgotPasswordRequest,
  AuthLoginRequest,
  AuthResetPasswordRequest,
  AuthSignUpRequest
} from '../data/auth.request';
import { Auth } from './auth.entity';

export default interface AuthRepository {
  logIn(request: AuthLoginRequest): Promise<Auth>;
  logOut(request: User): Promise<void>;
  signUp(request: AuthSignUpRequest): Promise<void>;
  forgotPassword(request: AuthForgotPasswordRequest): Promise<void>;
  resetPassword(request: AuthResetPasswordRequest): Promise<void>;
  changePassword(request: AuthChangePasswordRequest, user: User): Promise<void>;
}
