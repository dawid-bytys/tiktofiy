import validUrl from 'valid-url';
import type { NextFunction, Request, Response } from 'express';
import {
    getAudioBase64,
    getTikTokAudioURL,
    getTikTokFinalURL,
    recognizeAudio,
    downloadAudio,
    cutAudio,
    convertAudio,
} from '../services/audio.service';
import { isSongFound, Body } from '@tiktofiy/common';
import { isTest } from '../config';
import { generateRandomString, clearMedia } from '../utils/utils';
import { getStoredTiktok, storeTiktok } from '../services/db.service';
import { InvalidUrlError } from '../utils/errors';

export const audioRecognize = async (req: Request, res: Response, next: NextFunction) => {
    const { url, shazamApiKey, start, end }: Body = req.body;
    if (!validUrl.isUri(url)) {
        return next(new InvalidUrlError('Provide a valid url'));
    }

    try {
        const finalUrl = await getTikTokFinalURL(url);
        const audioUrl = await getTikTokAudioURL(finalUrl);

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

        /*
        const audioFilename = generateRandomString(16);
        const cutAudioFilename = generateRandomString(16);
        const cutConvertedAudioFilename = generateRandomString(16);
        */

        // xD
        const [audioFilename, cutAudioFilename, cutConvertedAudioFilename]: string[] = new Array(3)
            .fill(null)
            .map(() => generateRandomString(16));

        await downloadAudio(audioUrl, audioFilename);
        await cutAudio(audioFilename, cutAudioFilename, start, end);
        await convertAudio(cutAudioFilename, cutConvertedAudioFilename);

        const audio = await getAudioBase64(cutConvertedAudioFilename);
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

        await clearMedia([audioFilename, cutAudioFilename, cutConvertedAudioFilename]);

        return res.status(200).send(recognizedAudio);
    } catch (err) {
        return next(err);
    }
};
