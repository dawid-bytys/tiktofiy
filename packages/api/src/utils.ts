import crypto from 'crypto';
import { unlink } from 'fs/promises';
import { ClearMediaError } from './errors';

export const returnPath = (filename: string) => {
  return `src/media/${filename}`;
};

export const generateRandomString = (length: number) => {
  return crypto.randomBytes(length).toString('hex');
};

export const getTikTokID = (url: string) => {
  const patternOne =
    /https:\/\/www.tiktok.com\/foryou\?is_copy_url=1&is_from_webapp=v1&item_id=[0-9]{19}/;
  const patternTwo = /https:\/\/www.tiktok.com\/@[a-zA-Z0-9_.]{1,}\/video\/[0-9]{19}.*/;
  const patternThree = /https:\/\/m.tiktok.com\/v\/[0-9]{19}.html.*/;

  if (patternOne.test(url)) {
    return url.substring(70, 90);
  }

  if (patternTwo.test(url)) {
    return url.split('video/')[1].substring(0, 19);
  }

  if (patternThree.test(url)) {
    return url.substring(23, 42);
  }

  return;
};

export const clearMedia = async (files: string[]) => {
  const operations = files.map(file => unlink(returnPath(`${file}.mp3`)));

  try {
    await Promise.all(operations);
    console.log('Successfully cleared media');
  } catch (err) {
    throw new ClearMediaError('Failed to clear media');
  }
};
