import { User } from '@/features/user/domain/user.entity';
import { Request } from 'express';

export interface Auth {
  cookie: string;
  user: User;
}

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
