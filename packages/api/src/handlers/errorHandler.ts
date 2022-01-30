import type { NextFunction, Response, Request } from 'express';
import { isTest } from '../config';
import { CustomError } from '../utils/errors';

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (!isTest()) {
        console.error(err);
    }

    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ message: err.message });
    }

    return res.status(500).send({
        message: 'An unexpected error has occured',
    });
};
