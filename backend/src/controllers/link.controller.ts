import { Request, Response } from 'express';
import linkService from '../services/link.service';
import { logger } from '../utils/logger';

class LinkController {
    public async shortenUrl(req: Request, res: Response) {
        logger.info({ originalUrl: req.body.originalUrl }, "Shorten URL request received");
        const originalUrl = req.body.originalUrl;

        if (!URL.canParse(originalUrl)) {
            logger.warn({ body: req.body }, "Validation failed");
            return res.status(400).json({ message: "Invalid url to shorten" });
        }

        const linkResult = await linkService.createOrGetLink(originalUrl);
    
        if (!linkResult) {
            logger.error({ originalUrl }, "Service layer failed to create or get link");
            return res.status(500);
        }

        const { shortCode, created } = linkResult;
        const shortUrl: string = `${req.protocol}://${req.get('host')}/${shortCode}`;
        const statusCode: number = created ? 201 : 200;

        logger.info({ shortUrl, statusCode, created }, "URL processed successfully");

        return res.status(statusCode).json({ shortUrl });
    }
    
    public async redirectToOriginal(req: Request, res: Response) {
        const shortCode: string = req.params.shortCode;

        logger.info({ shortCode }, "Redirect request received");

        const originalUrl: string | null = await linkService.handleRedirect(shortCode);

        if (!originalUrl) {
            logger.warn({ shortCode }, "Short code not found");
            return res.status(404).send();
        }

        logger.info({ shortCode, redirectTo: originalUrl }, "Redirecting to original URL");
        return res.redirect(originalUrl);
    }
}

export default new LinkController();