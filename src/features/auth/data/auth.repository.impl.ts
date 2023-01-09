import userModel from '@/features/user/data/user.model';
import { User } from '@/features/user/domain/user.entity';
import { HttpException } from '@/shared/exceptions/HttpException';
import { isEmpty } from '@/shared/utils/util';
import { compare } from 'bcrypt';
import { Auth } from '../domain/auth.entity';
import AuthRepository from '../domain/auth.repository';
import {
  AuthChangePasswordRequest,
  AuthForgotPasswordRequest,
  AuthLoginRequest,
  AuthResetPasswordRequest,
  AuthSignUpRequest
} from './auth.request';

import { SECRET_KEY } from '@/shared/config';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { DataStoredInToken, TokenData } from '../domain/auth.entity';

export default class AuthRepositoryImpl implements AuthRepository {
  public users = userModel;

  public async logIn(request: AuthLoginRequest): Promise<Auth> {
    if (isEmpty(request))
      throw new HttpException(400, 'login request is empty');

    const findUser = await this.users.findOne<User>({
      username: request.username
    });

    if (!findUser)
      throw new HttpException(
        409,
        `This username ${request.username} was not found`
      );

    const isPasswordMatching: boolean = await compare(
      request.password,
      findUser.password
    );
    if (!isPasswordMatching)
      throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return {
      cookie,
      user: {
        _id: findUser._id,
        username: findUser.username
      }
    };
  }

  public async logOut(request: User): Promise<void> {
    if (isEmpty(request)) throw new HttpException(400, 'User request is empty');

    const findUser = await this.users.findOne<User>({
      username: request.username,
      password: request.password
    });

    if (!findUser)
      throw new HttpException(
        409,
        `This email ${request.username} was not found`
      );
  }

  public async signUp(request: AuthSignUpRequest): Promise<void> {
    if (isEmpty(request))
      throw new HttpException(400, 'Signup request is empty');

    const findUser = await this.users.findOne<User>({
      username: request.username
    });
    if (findUser)
      throw new HttpException(
        409,
        `This username ${request.username} already exists`
      );

    const hashedPassword = await hash(request.password, 10);

    await this.users.create({
      ...request,
      password: hashedPassword
    });
  }

  private createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn })
    };
  }

  private createCookie(tokenData: TokenData): string {
    return `Authorization=Bearer ${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public async forgotPassword(
    request: AuthForgotPasswordRequest
  ): Promise<void> {
    if (isEmpty(request))
      throw new HttpException(400, 'forgot password request is empty');

    const findUser: User = await this.users.findOneAndUpdate(
      {
        username: request.username
      },
      {
        $set: {
          reset_password_token: await hash(request.username, 10)
        }
      }
    );

    if (!findUser)
      throw new HttpException(
        409,
        `This username ${request.username} was not found`
      );
  }

  public async resetPassword(request: AuthResetPasswordRequest): Promise<void> {
    if (isEmpty(request))
      throw new HttpException(400, 'reset password request is empty');

    const findUser: User = await this.users.findOneAndUpdate(
      {
        username: request.username,
        reset_password_token: request.token
      },
      {
        $set: {
          ...request,
          reset_password_token: null
        }
      }
    );

    if (!findUser)
      throw new HttpException(
        409,
        `This username ${request.username} was not found`
      );
  }

  public async changePassword(
    request: AuthChangePasswordRequest,
    user: User
  ): Promise<void> {
    if (isEmpty(request))
      throw new HttpException(400, 'change password request is empty');

    const findUser = await this.users.findById(user._id);

    if (!findUser) throw new HttpException(409, `This user was not found`);

    const isPasswordMatching: boolean = await compare(
      request.oldPassword,
      findUser.password
    );
    if (!isPasswordMatching)
      throw new HttpException(409, 'Old password is not valid');

    const hashedPassword = await hash(request.password, 10);
    findUser.overwrite({ password: hashedPassword });
  }
}
