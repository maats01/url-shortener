import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import linkController from './controllers/link.controller';
import cors from 'cors';
import { logger } from './utils/logger';

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const allowedOrigins = [
    'https://url-shortener-client-indol.vercel.app',
    'http://localhost:5173'
];

// middlewares
const corsOptionsDelegate = (
    req: Request,
    callback: (err: Error | null, options?: cors.CorsOptions) => void
) => {
    const origin = req.header('Origin');
    let corsOptions: cors.CorsOptions;

    if (origin && allowedOrigins.includes(origin)) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }

    callback(null, corsOptions);
};

app.use(express.json());

// routes
app.get('/:shortCode', linkController.redirectToOriginal);
app.post('/api/shorten', cors(corsOptionsDelegate), linkController.shortenUrl);
app.options('/api/shorten', cors(corsOptionsDelegate));

app.listen(PORT, () => {
    logger.info(`Server running listening on port ${PORT}`)
});