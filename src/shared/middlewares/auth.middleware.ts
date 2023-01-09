import {
  DataStoredInToken,
  RequestWithUser
} from '@/features/auth/domain/auth.entity';
import userModel from '@/features/user/data/user.model';
import { SECRET_KEY } from '@/shared/config';

import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { HttpException } from '../exceptions/HttpException';
import { logger } from '../utils/logger';

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(req.cookies['Authorization']);
    logger.info(req.header('Authorization'));

    const Authorization =
      req.cookies['Authorization'] ||
      (req.header('Authorization')
        ? req.header('Authorization').split('Bearer ')[1]
        : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = verify(
        Authorization,
        secretKey
      ) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(
          new HttpException(401, 'Wrong authentication tokens' + Authorization)
        );
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(
      new HttpException(401, 'Authentication token missing' + error.message)
    );
  }
};

export default authMiddleware;
