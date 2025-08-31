import { prisma } from '../lib/prisma';
import { nanoid } from 'nanoid';
import { logger } from '../utils/logger';

type LinkResult = {
    shortCode: string,
    created: boolean
}

class LinkService {
    public async createOrGetLink(originalUrl: string): Promise<LinkResult | null> {        
        try {
            logger.info({ originalUrl }, "Attempting to create or get a link");
            // check if exists a link with that url first
            const existingLink = await prisma.link.findFirst({
                where: { originalUrl: originalUrl }
            });

            // returns the existing link
            if (existingLink !== null) {
                logger.info({ originalUrl, shortCode: existingLink.shortCode }, "Existing link found");
                return { shortCode: existingLink.shortCode, created: false };
            }

            logger.info({ originalUrl }, "No existing link found, creating a new one");
            // creates a new link
            let newLink = await prisma.link.create({
                data: {
                    shortCode: nanoid(8),
                    originalUrl: originalUrl
                }
            });

            logger.info({ link: newLink }, "New link created successfully");
            return { shortCode: newLink.shortCode, created: true };

        } catch (error) {
            logger.error({ err: error, originalUrl }, "Database error while creating or getting a link");
            return null;
        }
    }
    
    public async handleRedirect(shortCode: string): Promise<string | null> {
        try {
            logger.info({ shortCode }, "Searching for link to redirect");
            // get the existing link
            const existingLink = await prisma.link.findUnique({
                where: { shortCode: shortCode }
            });

            if (existingLink === null) {
                logger.warn({ shortCode }, "Link not found for short code");
                return null;
            }

            logger.info({ shortCode, originalUrl: existingLink.originalUrl }, "Link found, updating click count");

            // increments by one the click counter of the link
            await prisma.link.updateMany({
                where: {
                    shortCode: shortCode
                },
                data: {
                    clicks: {
                        increment: 1
                    }
                }
            });

            return existingLink.originalUrl;

        } catch (error) {
            logger.error({ err: error, shortCode }, "Database error while handling redirect");
            return null;
        }
    }
}

export default new LinkService();