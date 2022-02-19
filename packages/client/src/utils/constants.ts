export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.tiktofiy.com/audio/recognize'
    : 'http://localhost:4000/audio/recognize';
