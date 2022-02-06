import express from 'express';
import cors from 'cors';
import { router } from './routes/index';
import { errorMiddleware } from './handlers/errorHandler';
import { getConfig, isNodeEnv, origin } from './config';

export const app = express();

const PORT = getConfig('PORT');

// Server configuration
app.use(express.json());
app.use(cors(origin));
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
