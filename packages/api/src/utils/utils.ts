export const returnPath = (filename: string) => {
    return `src/mp3/${filename}`;
};

export const isUrlValid = (url: string) => {
    const desktopPattern =
        /((https:\/\/)?|(www.)?)tiktok.com\/@[a-zA-Z0-9_.]{1,}\/video\/[0-9]{1,}.*/;
    const mobilePattern = /((https:\/\/)?|(www.))?vm.tiktok.com\/[a-zA-Z0-9]{1,}\/?/;

    return desktopPattern.test(url) || mobilePattern.test(url);
};
