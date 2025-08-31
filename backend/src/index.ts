import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import linkController from './controllers/link.controller';
import cors from 'cors';
import { logger } from './utils/logger';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.get('/:shortCode', linkController.redirectToOriginal);
app.post('/api/shorten', linkController.shortenUrl);

app.listen(PORT, () => {
    logger.info(`Server running listening on port ${PORT}`)
});