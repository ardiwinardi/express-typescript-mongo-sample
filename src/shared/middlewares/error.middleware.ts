import { logger } from '@/shared/utils/logger';
import { HttpException } from '@exceptions/HttpException';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (error instanceof z.ZodError) {
      const message = fromZodError(error).message.replace(
        /body.|query|params/gi,
        ''
      );

      res.status(400).json(message);
    } else {
      const status: number = error.status || 500;
      const message: string = error.message || 'Something went wrong';

      logger.error(
        `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`
      );
      res.status(status).json({ message });
    }
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
