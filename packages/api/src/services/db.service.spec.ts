import { prisma } from '../db';
import type { AudioFound } from '@tiktofiy/common';

describe('PRISMA TESTS', () => {
    afterAll(async () => {
        await prisma.songs.delete({
            where: {
                url: '12345',
            },
        });
    });

    it('it should save the song to the database without albumImage', async () => {
        const song: Omit<AudioFound, 'found'> & { url: string } = {
            url: '12345',
            artist: 'lil wayne',
            title: 'incredible',
            albumImage: undefined,
        };

        const saveResult = await prisma.songs.create({
            data: song,
        });

        expect(saveResult).toHaveProperty('id');
    });
});
