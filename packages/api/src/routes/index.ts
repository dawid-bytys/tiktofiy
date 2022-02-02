import express from 'express';
import { bodyValidationPipe } from '../middlewares/validation.middleware';
import { AudioSchema } from '../schemas/audio.schema';
import { audioRouter } from './audio';

export const router = express.Router();

router.use('/audio', [bodyValidationPipe(AudioSchema), audioRouter]);
