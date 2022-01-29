export class InvalidUrlError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, InvalidUrlError.prototype);
    }
}

export class ShazamRequestError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, ShazamRequestError.prototype);
    }
}

export class InvalidUrlFormatError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, InvalidUrlFormatError.prototype);
    }
}

export class PrismaSaveError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, PrismaSaveError.prototype);
    }
}

export class TikTokUnavailableError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, TikTokUnavailableError.prototype);
    }
}

export class AudioDownloadError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, AudioDownloadError.prototype);
    }
}

export class AudioSaveError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, AudioSaveError.prototype);
    }
}

export class AudioCutError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, AudioCutError.prototype);
    }
}

export class AudioConvertError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, AudioConvertError.prototype);
    }
}

export class ClearMediaError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, ClearMediaError.prototype);
    }
}
