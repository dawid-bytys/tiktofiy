import { RecognitionResult } from '@tiktofiy/common';
import request from 'supertest';
import { app } from '../app';

const SONGS_TO_RECOGNIZE = [
    'https://www.tiktok.com/@yuliaalexeeva02/video/7049637921975962881?is_copy_url=1&is_from_webapp=v1',
    'https://www.tiktok.com/@.delerzx/video/7024490415302708486?is_copy_url=1&is_from_webapp=v1',
    'https://www.tiktok.com/@zaksiazkowane..fp/video/7026716967587400965?is_copy_url=1&is_from_webapp=v1',
    'https://www.tiktok.com/@jaroslawik2/video/7057527755868605702?is_copy_url=1&is_from_webapp=v1',
    'https://www.tiktok.com/@k4linowski/video/7057502551465413893?is_copy_url=1&is_from_webapp=v1',
    'https://www.tiktok.com/@ksubb0tina/video/7054057365087276290?is_copy_url=1&is_from_webapp=v1',
    'https://www.tiktok.com/@shabiuk_viktor19/video/7038341376471256326?is_copy_url=1&is_from_webapp=v1',
];

describe('[POST] - /recognize', () => {
    it('it should expect status 400, url not provided', async () => {
        const response = await request(app).post('/api/v1/audio/recognize').send({
            url: '',
            shazamApiKey: '',
            start: '0',
            end: '0',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            message: 'Provide a valid url',
        });
    });

    it('it should expect status 400, url is not valid', async () => {
        const response = await request(app).post('/api/v1/audio/recognize').send({
            url: 'https://google.com/',
            shazamApiKey: '',
            start: '0',
            end: '0',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            message: 'Provide a valid url',
        });
    });

    it('it should expect status 200, success request but song was not found (desktop url)', async () => {
        const response = await request(app).post('/api/v1/audio/recognize').send({
            url: 'https://www.tiktok.com/@bombathedog/video/7048014273162792197?is_copy_url=1&is_from_webapp=v1',
            shazamApiKey: '',
            start: '0',
            end: '0',
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            found: false,
        });
    });

    it('it should expect status 200, success request but song was not found (mobile url)', async () => {
        const response = await request(app).post('/api/v1/audio/recognize').send({
            url: 'https://vm.tiktok.com/ZM8KTJGTv/',
            shazamApiKey: '',
            start: '0',
            end: '0',
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            found: false,
        });
    });

    it('it should expect status 200, success request and song has been found (desktop url)', async () => {
        const response = await request(app).post('/api/v1/audio/recognize').send({
            url: 'https://www.tiktok.com/@adi.adalante/video/7032364672162516229?is_copy_url=1&is_from_webapp=v1',
            shazamApiKey: '',
            start: '0',
            end: '0',
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.found).toBe(true);
    });

    it('it should expect status 200, success request and song has been found (mobile url)', async () => {
        const response = await request(app).post('/api/v1/audio/recognize').send({
            url: 'https://vm.tiktok.com/ZM8otTVW6/',
            shazamApiKey: '',
            start: '0',
            end: '0',
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.found).toBe(true);
    });

    it('it should expect status 400, bad request, shazamApiKey is not valid', async () => {
        const response = await request(app).post('/api/v1/audio/recognize').send({
            url: 'https://www.tiktok.com/@adi.adalante/video/7032364672162516229?is_copy_url=1&is_from_webapp=v1',
            shazamApiKey: '12345',
            start: '0',
            end: '0',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual('You are not subscribed to this API.');
    });

    it.only('it should expect status 200, all songs have been recognized or not', async () => {
        const requests = SONGS_TO_RECOGNIZE.map(link => {
            return request(app).post('/api/v1/audio/recognize').send({
                url: link,
                shazamApiKey: '',
                start: '0',
                end: '0',
            });
        });

        const results: RecognitionResult[] = [];
        for await (const request of requests) {
            results.push(request.body);
        }

        expect(results.every(result => typeof result.found !== 'undefined')).toBe(true);
    });
});
