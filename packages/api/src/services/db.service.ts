import { AudioFound } from '@tiktofiy/common';
import { prisma } from '../db';

export const getStoredTiktok = async (url: string) => {
    const storedTiktok = await prisma.songs.findUnique({
        where: {
            url: url,
        },
    });

    return storedTiktok;
};

export const storeTiktok = async (song: Omit<AudioFound, 'found'> & { url: string }) => {
    await prisma.songs.create({
        data: {
            url: song.url,
            artist: song.artist,
            title: song.title,
            albumImage: song.albumImage,
        },
    });
};
