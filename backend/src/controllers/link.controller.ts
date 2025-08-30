import { Request, Response } from 'express';
import linkService from '../services/link.service';

class LinkController {
    public async shortenUrl(req: Request, res: Response) {
        const originalUrl = req.body.originalUrl;

        if (!originalUrl) {
            return res.status(400).json({ message: "Invalid url to shorten" });
        }

        const linkResult = await linkService.createOrGetLink(originalUrl);

        if (!linkResult) {
            return res.status(500);
        }

        const { shortCode, created } = linkResult;
        const shortUrl: string = `${req.protocol}://${req.get('host')}/${shortCode}`;
        const statusCode: number = created ? 201 : 200;

        return res.status(statusCode).json({ shortUrl });
    }
    
    public async redirectToOriginal(req: Request, res: Response) {
        // TODO
    }
}

export default new LinkController();