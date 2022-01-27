import type { NextFunction, Request, Response } from 'express';
import { getAudioBase64, recognizeAudio } from '../services/audio.service';
import { getStoredTiktok, storeTiktok } from '../services/db.service';
import { isUrlValid } from '../utils/utils';
import { isSongFound, Body } from '@tiktofiy/common';
import { isTest } from '../config';

export const audioRecognize = async (req: Request, res: Response, next: NextFunction) => {
    const { url, shazamApiKey, start, end }: Body = req.body;
    if (typeof url === 'undefined' || !isUrlValid(url)) {
        return next(new Error('Provide a valid url'));
    }

    try {
        if (!isTest) {
            const storedTiktok = await getStoredTiktok(url);
            if (storedTiktok) {
                return res.status(200).send({
                    found: true,
                    artist: storedTiktok.artist,
                    title: storedTiktok.title,
                    albumImage: storedTiktok.albumImage,
                });
            }
        }

        const audio = await getAudioBase64(url, start, end);
        const recognizedAudio = await recognizeAudio(audio, shazamApiKey);

        // If the song has been recognized, save it to the database
        if (!isTest && isSongFound(recognizedAudio)) {
            await storeTiktok({
                url: url,
                artist: recognizedAudio.artist,
                title: recognizedAudio.title,
                albumImage: recognizedAudio.albumImage,
            });
        }

        return res.status(200).send(recognizedAudio);
    } catch (err) {
        return next(err);
    }
};
