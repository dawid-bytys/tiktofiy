export interface AudioFound {
    readonly found: true;
    readonly artist: string;
    readonly title: string;
    readonly albumImage?: string;
}

interface AudioNotFound {
    readonly found: false;
}

export type RecognitionResult = AudioFound | AudioNotFound;

export interface Body {
    readonly url: string;
    readonly shazamApiKey: string;
    readonly start: string;
    readonly end: string;
}

export type Settings = Omit<Body, 'url'>;

export const isSongFound = (song: RecognitionResult): song is AudioFound => {
    return song.found;
};
