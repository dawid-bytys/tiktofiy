import request from 'supertest';
import { app } from '../app';

describe('[POST] - /recognize', () => {
    it('returns status code 400 --> url not provided', async () => {
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

    it('returns status code 400 --> url is not valid', async () => {
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

    it('returns status code 200 --> success request with desktop url (not found)', async () => {
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

    it('returns status code 200 --> success request with mobile url (not found)', async () => {
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

    it('returns status code 200 --> success request with desktop url (found)', async () => {
        const response = await request(app).post('/api/v1/audio/recognize').send({
            url: 'https://www.tiktok.com/@adi.adalante/video/7032364672162516229?is_copy_url=1&is_from_webapp=v1',
            shazamApiKey: '',
            start: '0',
            end: '0',
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.found).toBe(true);
    });

    it('returns status code 200 --> success request with mobile url (found)', async () => {
        const response = await request(app).post('/api/v1/audio/recognize').send({
            url: 'https://vm.tiktok.com/ZM8otTVW6/',
            shazamApiKey: '',
            start: '0',
            end: '0',
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.found).toBe(true);
    });

    it('returns status code 400 --> axios error, shazam api key is not valid', async () => {
        const response = await request(app).post('/api/v1/audio/recognize').send({
            url: 'https://www.tiktok.com/@adi.adalante/video/7032364672162516229?is_copy_url=1&is_from_webapp=v1',
            shazamApiKey: '12345',
            start: '0',
            end: '0',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual('You are not subscribed to this API.');
    });
});
