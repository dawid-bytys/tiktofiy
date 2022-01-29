import type { NextFunction, Request, Response } from 'express';
import {
    getAudioBase64,
    getTikTokAudioUrl,
    getTikTokFinalUrl,
    recognizeAudio,
} from '../services/audio.service';
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
        const finalUrl = await getTikTokFinalUrl(url);
        const audioUrl = await getTikTokAudioUrl(finalUrl);

        if (!isTest()) {
            const storedTiktok = await getStoredTiktok(audioUrl);
            if (storedTiktok) {
                return res.status(200).send({
                    found: true,
                    artist: storedTiktok.artist,
                    title: storedTiktok.title,
                    albumImage: storedTiktok.albumImage,
                });
            }
        }

        const audio = await getAudioBase64(audioUrl, start, end);
        const recognizedAudio = await recognizeAudio(audio, shazamApiKey);

        // If the song has been recognized, save it to the database
        if (!isTest() && isSongFound(recognizedAudio)) {
            await storeTiktok({
                url: audioUrl,
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
