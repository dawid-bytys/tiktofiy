import express from 'express';
import { audioRecognize } from '../controllers/audio.controller';

export const audioRouter = express.Router();

audioRouter.post('/recognize', audioRecognize);
