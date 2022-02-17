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

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type WriteableSettings = Writeable<Settings>;

export type Settings = Omit<Body, 'url'>;

export const isSongFound = (song: RecognitionResult): song is AudioFound => {
  return song.found;
};
