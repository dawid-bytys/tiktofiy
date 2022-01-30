import express from 'express';
import { audioRecognition } from '../controllers/audio.controller';

export const audioRouter = express.Router();

audioRouter.post('/recognize', audioRecognition);
