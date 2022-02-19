import type { NextFunction, Response, Request } from 'express';
import { isNodeEnv } from '../config';
import { CustomError } from '../errors';

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (!isNodeEnv('testing')) {
    console.error(err);
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(500).send({
    message: 'An unexpected error has occured',
  });
};
