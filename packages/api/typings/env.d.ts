declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'production' | 'development' | 'testing';
        readonly PORT: number;
        readonly SHAZAM_API_KEY: string;
        readonly POSTGRES_CONNECTION: string;
    }
}
