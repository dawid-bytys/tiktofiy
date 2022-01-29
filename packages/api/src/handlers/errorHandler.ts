import type { NextFunction, Response, Request } from 'express';
import { isTest } from '../config';
import { AudioDownloadError, PrismaSaveError, ShazamRequestError } from '../utils/errors';

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    !isTest() && console.error(err);

    if (err instanceof ShazamRequestError || err instanceof AudioDownloadError) {
        return res.status(502).send({
            message: err.message,
        });
    } else if (err instanceof PrismaSaveError) {
        return res.status(503).send({
            message: err.message,
        });
    } else if (err instanceof Error) {
        return res.status(400).send({
            message: err.message,
        });
    }

    return res.status(500).send({
        message: 'An unexpected error has occured',
    });
};
