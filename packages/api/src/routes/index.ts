import express from 'express';
import { audioRouter } from './audio';

export const router = express.Router();

router.use('/audio', audioRouter);
