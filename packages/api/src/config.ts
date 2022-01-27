import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const isProd = () => process.env.NODE_ENV === 'production';
export const isDev = () => process.env.NODE_ENV === 'development';
export const isTest = () => process.env.NODE_ENV === 'testing';
