import type { Request, Response, NextFunction } from 'express';
import type { Schema } from 'joi';
import { InvalidBodyError } from '../utils/errors';

export const bodyValidationPipe =
    (schema: Schema) => (req: Request, _res: Response, next: NextFunction) => {
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return next(new InvalidBodyError('Invalid body has been provided'));
        }

        return next();
    };
