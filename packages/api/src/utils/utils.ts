export const returnPath = (filename: string) => {
    return `src/media/${filename}`;
};

export const isUrlValid = (url: string) => {
    const desktopPattern =
        /((https:\/\/)?|(www.)?)tiktok.com\/@[a-zA-Z0-9_.]{1,}\/video\/[0-9]{1,}.*/;
    const mobilePattern = /((https:\/\/)?|(www.))?vm.tiktok.com\/[a-zA-Z0-9]{1,}\/?/;

    return desktopPattern.test(url) || mobilePattern.test(url);
};

const urlType = (url: string) => {
    if (url.includes('item_id=')) {
        return 1;
    } else if (url.includes('m.tiktok')) {
        return 2;
    } else if (url.includes('/video/')) {
        return 3;
    }

    return undefined;
};

export const retrieveTikTokId = (url: string) => {
    const type = urlType(url);

    if (type === 1) {
        return url.split('item_id=')[1];
    } else if (type === 2) {
        return url.substring(23, 42);
    } else if (type === 3) {
        return url.split('/video/')[1].split('?')[0];
    }

    throw new Error('Unknown url type');
};
