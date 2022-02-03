import express from 'express';
import { validateBodySchema } from '../middlewares/validation.middleware';
import { AudioSchema } from '../schemas/audio.schema';
import { audioRouter } from './audio';

export const router = express.Router();

router.use('/audio', [validateBodySchema(AudioSchema), audioRouter]);
