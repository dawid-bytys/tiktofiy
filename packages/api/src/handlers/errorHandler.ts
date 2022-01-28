import axios from 'axios';
import type { NextFunction, Response, Request } from 'express';
import { isTest } from '../config';

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    !isTest() && console.error(err);

    if (axios.isAxiosError(err)) {
        return res.status(400).send({
            message: err.response?.data.message,
        });
    } else if (err instanceof Error) {
        return res.status(400).send({
            message: err.message,
        });
    }

    return res.status(400).send({
        message: 'Unexpected error has occured',
    });
};
