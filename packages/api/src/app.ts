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
    app.use(express.static(path.join('..', 'client', 'build')));

    app.get('*', (_, res: Response) => {
        res.sendFile(path.join('..', 'client', 'build', 'index.html'));
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
}
