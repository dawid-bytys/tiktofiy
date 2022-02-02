import express from 'express';
import cors from 'cors';
import { router } from './routes/index';
import { errorHandler } from './handlers/errorHandler';
import { isTest } from './config';
import { getCurrentTime } from './utils/utils';

const PORT = process.env.PORT || 4000;

export const app = express();

// Server configuration
app.use(express.json());
app.use(
    cors({
        origin: ['tiktofiy.com', 'www.tiktofiy.com'],
    }),
);
app.use(router);
app.use(errorHandler);

if (!isTest()) {
    const server = app.listen(PORT, () => {
        console.log('\x1b[32m', `[${getCurrentTime()}] Listening on ${PORT}`);
    });

    server.on('error', err => console.error(err));

    const serverShutdown = () => {
        console.log('\x1b[36m', `[${getCurrentTime()}] Closing server gracefully...`);

        server.close(() => {
            console.log('\x1b[31m', `[${getCurrentTime()}] Server has been closed`);
            process.exit(0);
        });
    };

    process.on('SIGTERM', serverShutdown);
    process.on('SIGINT', serverShutdown);
}
