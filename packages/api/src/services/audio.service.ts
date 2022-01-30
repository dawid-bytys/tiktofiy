import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import axios from 'axios';
import fetch from 'node-fetch';
import type { RecognitionResult } from '@tiktofiy/common';
import { getTikTokID, returnPath } from '../utils/utils';
import { SHAZAM_API_URL, TIKTOK_API_URL } from '../constants';
import {
    AudioConvertError,
    AudioCutError,
    AudioDownloadError,
    AudioSaveError,
    InvalidUrlFormatError,
    ShazamApiKeyError,
    ShazamRequestError,
    TikTokRequestError,
    TikTokUnavailableError,
} from '../utils/errors';

// Configure ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath.path);

// Using node-fetch here because on Linux axios does not work as expected
export const getTikTokFinalURL = async (url: string) => {
    const response = await fetch(url);

    const tiktokId = getTikTokID(response.url);
    if (!tiktokId) {
        throw new InvalidUrlFormatError('Provide a valid format of TikTok url');
    }

    return TIKTOK_API_URL + tiktokId;
};

// User-Agent header is required by TikTok API to perform a successful request
export const getTikTokAudioURL = async (url: string) => {
    try {
        const response = await axios.get(url, {
            headers: {
                'user-agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
            },
        });
        if (response.data.statusCode === 10217) {
            throw new TikTokUnavailableError('Provided TikTok is not currently available');
        }

        return response.data.itemInfo.itemStruct.music.playUrl as string;
    } catch (err) {
        throw new TikTokRequestError(
            'Something went wrong while performing the TikTok request, try again'
        );
    }
};

export const downloadAudio = async (url: string, output: string) => {
    try {
        const response = await axios.get(url, {
            responseType: 'stream',
        });

        return new Promise((resolve, reject) => {
            response.data
                .pipe(fs.createWriteStream(returnPath(`${output}.mp3`)))
                .on('close', () => {
                    resolve(console.log('Successfully downloaded the audio file'));
                })
                .on('error', () => {
                    reject(new AudioSaveError('Failed to save the audio file'));
                });
        });
    } catch (err) {
        throw new AudioDownloadError('Failed to download the audio file, try again');
    }
};

export const cutAudio = (input: string, output: string, start?: string, end?: string) => {
    return new Promise((resolve, reject) => {
        ffmpeg(returnPath(`${input}.mp3`))
            .outputOptions('-ss', start || '0', '-to', end && end !== '0' ? end : '5')
            .output(returnPath(`${output}.mp3`))
            .on('end', () => {
                resolve(console.log('Successfully cut the audio'));
            })
            .on('error', () => {
                reject(new AudioCutError('Could not cut the audio'));
            })
            .run();
    });
};

export const convertAudio = (input: string, output: string) => {
    return new Promise((resolve, reject) => {
        ffmpeg(returnPath(`${input}.mp3`))
            .outputOptions('-f', 's16le', '-ac', '1', '-ar', '44100')
            .output(returnPath(`${output}.mp3`))
            .on('end', () => {
                resolve(console.log('Successfully converted the audio'));
            })
            .on('error', () => {
                reject(new AudioConvertError('Could not convert the audio'));
            })
            .run();
    });
};

export const getAudioBase64 = async (filename: string) => {
    return fs.readFileSync(returnPath(`${filename}.mp3`), {
        encoding: 'base64',
    });
};

export const recognizeAudio = async (
    audio: string,
    shazamApiKey?: string
): Promise<RecognitionResult> => {
    try {
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
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.data.message === 'You are not subscribed to this API.') {
                throw new ShazamApiKeyError(err.response?.data.message);
            }
        }

        throw new ShazamRequestError(
            'Something went wrong while performing the Shazam request, try again'
        );
    }
};
