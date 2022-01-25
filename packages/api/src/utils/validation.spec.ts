import { isUrlValid } from './utils';

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

describe('URL VALIDATION', () => {
    it('returns the urls are valid', async () => {
        const areUrlsValid = VALID_URLS.map(url => isUrlValid(url));

        expect(areUrlsValid).not.toContain(false);
    });

    it('returns the urls are not valid', async () => {
        const areUrlsValid = INVALID_URLS.map(url => isUrlValid(url));

        expect(areUrlsValid).not.toContain(true);
    });
});
