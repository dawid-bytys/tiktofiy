import type { AudioFound } from '@tiktofiy/common';
import { prisma } from '../db';
import { PrismaError } from '../errors';

export const getStoredTiktok = async (url: string) => {
  try {
    const storedTiktok = await prisma.songs.findUnique({
      where: {
        url: url,
      },
    });

    return storedTiktok;
  } catch (err) {
    throw new PrismaError('Something went wrong with database connection, try again');
  }
};

export const storeTiktok = async (song: Omit<AudioFound, 'found'> & { url: string }) => {
  try {
    await prisma.songs.create({
      data: {
        url: song.url,
        artist: song.artist,
        title: song.title,
        albumImage: song.albumImage,
      },
    });
  } catch (err) {
    throw new PrismaError('Something went wrong with database connection, try again');
  }
};
