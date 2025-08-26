import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import linkController from './controllers/link.controller';
import cors from 'cors';

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
    console.log(`Server listening on port ${PORT}`)
});