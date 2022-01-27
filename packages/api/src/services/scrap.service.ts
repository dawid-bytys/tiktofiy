import puppeteer from 'puppeteer';

const VIDEO_SELECTOR = 'video';

export const getTiktokVideo = async (url: string) => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    try {
        await Promise.all([
            page.setExtraHTTPHeaders({
                'Accept-Language': 'en-US,en;q=0.9',
            }),
            page.setUserAgent(
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
            ),
            page.setDefaultTimeout(30000),
        ]);
        await page.goto(url, {
            waitUntil: 'networkidle0',
        });
        await page.waitForSelector(VIDEO_SELECTOR);

        const videoUrl = await page.$eval(VIDEO_SELECTOR, el => el.getAttribute('src'));
        return videoUrl;
    } catch (err) {
        throw new Error(
            'Failed to retrieve the video url, if you are hosting it yourself, check your internet connection, if not, it may be caused by our server connection, try again'
        );
    } finally {
        await browser.close();
    }
};
