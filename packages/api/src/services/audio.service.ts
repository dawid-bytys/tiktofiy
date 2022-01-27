import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import axios from 'axios';
import type { RecognitionResult } from '@tiktofiy/common';
import { getTiktokVideo } from './scrap.service';
import { returnPath } from '../utils/utils';

// Configure ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath.path);

const SHAZAM_URL = 'https://shazam.p.rapidapi.com/songs/v2/detect';

const downloadVideo = async (url: string) => {
    try {
        const response = await axios.get(url, {
            responseType: 'stream',
        });

        return new Promise((resolve, reject) => {
            response.data
                .pipe(fs.createWriteStream(returnPath('video.mp4')))
                .on('close', () => {
                    resolve(console.log('Successfully downloaded the video'));
                })
                .on('error', () => {
                    reject(new Error('Failed to save the video file'));
                });
        });
    } catch (err) {
        throw new Error('Failed to download the video, try again');
    }
};

const videoToAudio = (input: string, output: string) => {
    return new Promise((resolve, reject) => {
        ffmpeg(input)
            .toFormat('mp3')
            .output(output)
            .on('end', () => {
                resolve(console.log('Successfully converted the video to mp3'));
            })
            .on('error', () => {
                reject(
                    new Error(
                        'Could not convert the video to audio, check audio range or try again'
                    )
                );
            })
            .run();
    });
};

const cutAudio = (input: string, output: string, start: string, end: string) => {
    return new Promise((resolve, reject) => {
        ffmpeg(input)
            .outputOptions('-ss', start || '0', '-to', end && end !== '0' ? end : '7')
            .output(output)
            .on('end', () => {
                resolve(console.log('Successfully cut the mp3'));
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
                resolve(console.log('Successfully converted the mp3'));
            })
            .on('error', () => {
                reject(new Error('Could not convert the audio'));
            })
            .run();
    });
};

export const getAudioBase64 = async (url: string, start: string, end: string) => {
    const video = await getTiktokVideo(url);
    if (!video) {
        throw new Error('Something went wrong');
    }

    await downloadVideo(video);
    await videoToAudio(returnPath('video.mp4'), returnPath('audio.mp3'));
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
    const response = await axios.post(SHAZAM_URL, audio, {
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
