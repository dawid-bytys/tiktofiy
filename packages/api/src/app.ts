import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import express from 'express';
import path from 'path';
import { router } from './routes/index';
import type { Response } from 'express';
import { errorHandler } from './handlers/errorHandler';

const PORT = process.env.PORT || 4000;

export const app = express();

// If the app is running in the production mode, serve the built version of front-end
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('../client/build')));

    app.get('*', (_, res: Response) => {
        res.sendFile(path.resolve('../client/build/index.html'));
    });
}

// Server configuration
app.use(express.json());
app.use('/api/v1', router);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'testing') {
    const server = app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });

    server.on('error', err => console.error(err));
}
