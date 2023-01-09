import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ appName: 'Moeslem Journey', version: '1.0.0' });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
