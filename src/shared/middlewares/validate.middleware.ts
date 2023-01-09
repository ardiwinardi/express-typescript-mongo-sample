import { RequestHandler } from 'express';
import { ZodSchema } from 'zod';

const validate =
  (schema: ZodSchema): RequestHandler =>
  (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (err) {
      next(err);
    }
  };

export default validate;
