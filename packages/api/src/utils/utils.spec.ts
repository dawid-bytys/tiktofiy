import { isUrlValid, returnPath } from './utils';

const VALID_URLS = [
    'https://www.tiktok.com/@dobrypolityk1/video/7050216749261688070?is_copy_url=1&is_from_webapp=v1',
    'https://vm.tiktok.com/ZM8KTJGTv/',
];
const INVALID_URLS = [
    'https://www.tikok.com/@dobrypolityk1/video/7050216749261688070?is_copy_url=1&is_from_webapp=v1',
    'https://vm.titok.com/ZM8KTJGTv/',
    'https://v.tiktok.com/ZM8KTJGTv/',
    'https://www.tikok.com/dobrypolityk1/video/7050216749261688070?is_copy_url=1&is_from_webapp=v1',
];

describe('UTILS VALIDATION', () => {
    it('it should return the urls are valid', () => {
        const areUrlsValid = VALID_URLS.map(url => isUrlValid(url));

        expect(areUrlsValid).not.toContain(false);
    });

    it('it should return the urls are not valid', () => {
        const areUrlsValid = INVALID_URLS.map(url => isUrlValid(url));

        expect(areUrlsValid).not.toContain(true);
    });

    it('it should return a correct path', () => {
        const path = returnPath('video.mp3');

        expect(path).toEqual('src/mp3/video.mp3');
    });
});
