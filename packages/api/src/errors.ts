export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export class AudioDownloadError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);

    this.statusCode = 502;
    Object.setPrototypeOf(this, AudioDownloadError.prototype);
  }
}

export class ShazamRequestError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);

    this.statusCode = 503;
    Object.setPrototypeOf(this, ShazamRequestError.prototype);
  }
}

export class ShazamApiKeyError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);

    this.statusCode = 403;
    Object.setPrototypeOf(this, ShazamApiKeyError.prototype);
  }
}

export class TikTokRequestError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);

    this.statusCode = 502;
    Object.setPrototypeOf(this, TikTokRequestError.prototype);
  }
}

export class PrismaError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);

    this.statusCode = 503;
    Object.setPrototypeOf(this, PrismaError.prototype);
  }
}

export class TikTokUnavailableError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);

    this.statusCode = 503;
    Object.setPrototypeOf(this, TikTokUnavailableError.prototype);
  }
}

export class AudioSaveError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);

    this.statusCode = 507;
    Object.setPrototypeOf(this, AudioSaveError.prototype);
  }
}

export class AudioCutError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);

    this.statusCode = 507;
    Object.setPrototypeOf(this, AudioCutError.prototype);
  }
}

export class AudioConvertError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);

    this.statusCode = 507;
    Object.setPrototypeOf(this, AudioConvertError.prototype);
  }
}

export class ClearMediaError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);

    this.statusCode = 500;
    Object.setPrototypeOf(this, ClearMediaError.prototype);
  }
}

export class InvalidUrlError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);

    this.statusCode = 400;
    Object.setPrototypeOf(this, InvalidUrlError.prototype);
  }
}

export class InvalidUrlFormatError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);

    this.statusCode = 400;
    Object.setPrototypeOf(this, InvalidUrlFormatError.prototype);
  }
}

export class InvalidBodyError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);

    this.statusCode = 400;
    Object.setPrototypeOf(this, InvalidBodyError.prototype);
  }
}
