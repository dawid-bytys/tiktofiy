import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import axios from 'axios';
import type { RecognitionResult } from '@tiktofiy/common';
import { retrieveTikTokId, returnPath } from '../utils/utils';
import { SHAZAM_API_URL, TIKTOK_API_URL } from '../constants';

// Configure ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath.path);

export const getTikTokFinalUrl = async (url: string) => {
    const response = await axios.get(url);
    const responseUrl: string = response.request.res.responseUrl;

    return TIKTOK_API_URL + retrieveTikTokId(responseUrl);
};

export const getTikTokAudioUrl = async (url: string) => {
    const response = await axios.get(url, {
        headers: {
            'user-agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
        },
    });
    if (response.data.statusCode === 10217) {
        throw new Error('Provided TikTok is not currently available');
    }

    return response.data.itemInfo.itemStruct.music.playUrl as string;
};

const downloadAudio = async (url: string) => {
    try {
        const response = await axios.get(url, {
            responseType: 'stream',
        });

        return new Promise((resolve, reject) => {
            response.data
                .pipe(fs.createWriteStream(returnPath('audio.mp3')))
                .on('close', () => {
                    resolve(console.log('Successfully downloaded the audio file'));
                })
                .on('error', () => {
                    reject(new Error('Failed to save the audio file'));
                });
        });
    } catch (err) {
        throw new Error('Failed to download the audio file, try again');
    }
};

const cutAudio = (input: string, output: string, start: string, end: string) => {
    return new Promise((resolve, reject) => {
        ffmpeg(input)
            .outputOptions('-ss', start || '0', '-to', end && end !== '0' ? end : '4')
            .output(output)
            .on('end', () => {
                resolve(console.log('Successfully cut the audio'));
            })
            .on('error', () => {
                reject(new Error('Could not cut the audio'));
            })
            .run();
    });
};

const convertAudio = (input: string, output: string) => {
    return new Promise((resolve, reject) => {
        ffmpeg(input)
            .outputOptions('-f', 's16le', '-ac', '1', '-ar', '44100')
            .output(output)
            .on('end', () => {
                resolve(console.log('Successfully converted the audio'));
            })
            .on('error', () => {
                reject(new Error('Could not convert the audio'));
            })
            .run();
    });
};

export const getAudioBase64 = async (url: string, start: string, end: string) => {
    await downloadAudio(url);
    await cutAudio(returnPath('audio.mp3'), returnPath('cuttedAudio.mp3'), start, end);
    await convertAudio(returnPath('cuttedAudio.mp3'), returnPath('cuttedConvertedAudio.mp3'));

    // Return base64 format of the audio
    return fs.readFileSync(returnPath('cuttedConvertedAudio.mp3'), {
        encoding: 'base64',
    });
};

export const recognizeAudio = async (
    audio: string,
    shazamApiKey?: string
): Promise<RecognitionResult> => {
    const response = await axios.post(SHAZAM_API_URL, audio, {
        headers: {
            'content-type': 'text/plain',
            'x-rapidapi-host': 'shazam.p.rapidapi.com',
            'x-rapidapi-key': shazamApiKey || process.env.SHAZAM_API_KEY,
        },
    });
    if (typeof response.data.track === 'undefined') {
        return {
            found: false,
        };
    }

    return {
        found: true,
        artist: response.data.track.subtitle,
        title: response.data.track.title,
        albumImage: response.data.track.images?.background,
    };
};
