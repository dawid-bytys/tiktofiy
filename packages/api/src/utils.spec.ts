import { returnPath, generateRandomString, getTikTokID } from './utils';

const TIKTOK_URLS = [
  'https://www.tiktok.com/foryou?is_copy_url=1&is_from_webapp=v1&item_id=7028886519125462277',
  'https://www.tiktok.com/@aviaviiler/video/7057977809578331398?is_copy_url=1&is_from_webapp=v1',
  'https://m.tiktok.com/v/7052300162391133445.html?_d=secCgwIARCbDRjEFSACKAESPgo8CVO8vCQnwVHPnqXGaQcMeiGeRolqbwdJgRZCob3fczGfBSSNnrF9ZC0wiISSb8VaR0fymqgSVVGiOp%2BQGgA%3D&checksum=b23c98c0aa74f7ec9468f8c968b483342c5780a76172bef2f6254f68052022ab&language=en&preview_pb=0&sec_user_id=MS4wLjABAAAAmWZwepaaGb0AfYYEACaKR37AHmL0zBZKUpAU_ul0Vdohq5avlYxQXbpKUAVcJbWi&share_app_id=1233&share_item_id=7052300162391133445&share_link_id=BD11601D-029B-47F1-9C70-265AF414D690&source=h5_m&timestamp=1642159337&tt_from=copy&u_code=d7kb4lij1bac07&user_id=6725395876230366214&utm_campaign=client_share&utm_medium=ios&utm_source=copy',
];

describe('UTILS VALIDATION', () => {
  it('it should return a correct path', () => {
    const path = returnPath('audio.mp3');

    expect(path).toEqual('src/media/audio.mp3');
  });

  it('it should return 16 random digits', () => {
    const sequence = generateRandomString(16);

    expect(sequence).toHaveLength(32);
  });

  it('it should return 19 digits (TikTok ID, url type 1)', () => {
    const results = TIKTOK_URLS.map(url => getTikTokID(url));

    expect(results.every(id => id?.toString().length === 19)).toBe(true);
  });
});
