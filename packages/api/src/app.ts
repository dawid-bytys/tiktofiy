import express from 'express';
import path from 'path';
import { router } from './routes/index';
import type { Response } from 'express';
import { errorHandler } from './handlers/errorHandler';
import { isProd, isTest } from './config';

const PORT = process.env.PORT || 4000;

export const app = express();

// If the app is running in the production mode, serve the built version of front-end
if (isProd()) {
    app.use(express.static(path.join(__dirname, '..', '..', '..', 'client', 'build')));

    app.get('*', (_, res: Response) => {
        res.sendFile(path.join(__dirname, '..', '..', '..', 'client', 'build', 'index.html'));
    });
}

// Server configuration
app.use(express.json());
app.use('/api/v1', router);
app.use(errorHandler);

if (!isTest()) {
    const server = app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
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
