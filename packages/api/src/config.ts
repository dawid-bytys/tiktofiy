import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const getConfig = (name: string) => {
    const value = process.env[name];

    if (['NODE_ENV', 'PORT', 'SHAZAM_API_KEY'].indexOf(name) !== -1) {
        return value as string;
    }

    return '';
};

export const origin = {
    origin:
        getConfig('NODE_ENV') === 'production'
            ? ['tiktofiy.com', 'www.tiktofiy.com']
            : 'http://localhost:4001',
};

export const isProd = getConfig('NODE_ENV') === 'production';
export const isDev = getConfig('NODE_ENV') === 'development';
export const isTest = getConfig('NODE_ENV') === 'testing';
