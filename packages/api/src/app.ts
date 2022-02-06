import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import express from 'express';
import cors from 'cors';
import { router } from './routes/index';
import { errorMiddleware } from './handlers/errorHandler';
import { getConfig, isNodeEnv } from './config';

export const app = express();

const PORT = getConfig('PORT');
const corsOptions = {
    credentials: true,
    preflightContinue: true,
    methods: ['POST'],
    origin: isNodeEnv('production')
        ? ['https://tiktofiy.com', 'https://www.tiktofiy.com']
        : 'http://localhost:4001',
};

// Server configuration
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);
app.use(errorMiddleware);

if (!isNodeEnv('testing')) {
    const server = app.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`);
    });

    server.on('error', () => console.error);

    const serverShutdown = () => {
        console.log('Closing server gracefully...');

        server.close(() => {
            console.log('Server has been closed');
            process.exit(0);
        });
    };

    process.on('SIGTERM', serverShutdown);
    process.on('SIGINT', serverShutdown);
}
