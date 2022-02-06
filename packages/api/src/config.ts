import type { NodeEnv } from './types';

export const getConfig = (name: string) => {
    const value = process.env[name];

    if (['NODE_ENV', 'PORT', 'SHAZAM_API_KEY'].indexOf(name) !== -1) {
        return value as string;
    }

    return '';
};

export const isNodeEnv = (env: NodeEnv) => getConfig('NODE_ENV') === env;
