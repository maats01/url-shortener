import { prisma } from '../lib/prisma';
import { nanoid } from 'nanoid';

type LinkResult = {
    shortCode: string,
    created: boolean
}

class LinkService {
    public async createOrGetLink(originalUrl: string): Promise<LinkResult | null> {
        // verify if the url is valid first
        if (!URL.canParse(originalUrl)) {
            return null;
        }
        
        try {
            // check if exists a link with that url first
            const existingLink = await prisma.link.findFirst({
                where: { originalUrl: originalUrl }
            });

            // returns the existing link
            if (existingLink !== null) {
                return { shortCode: existingLink.shortCode, created: false };
            }

            // creates a new link
            let newLink = await prisma.link.create({
                data: {
                    shortCode: nanoid(8),
                    originalUrl: originalUrl
                }
            });

            return { shortCode: newLink.shortCode, created: true };

        } catch (error) {
            console.log(error);
            return null;
        }
    }
    
    public async handleRedirect(shortCode: string): Promise<string | null> {
        // TODO
        return null;
    }
}

export default new LinkService();