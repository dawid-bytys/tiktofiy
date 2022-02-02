import express from 'express';
import cors from 'cors';
import { router } from './routes/index';
import { errorHandler } from './handlers/errorHandler';
import { isTest } from './config';

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
        console.log(`Main server has started running on port ${PORT}`);
    });

    server.on('error', err => console.error(err));

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
