import { prisma } from '../lib/prisma';
import { nanoid } from 'nanoid';

class LinkService {
    public async create(originalUrl: string): Promise<{link: object, created: boolean} | null> {
        if (!URL.canParse(originalUrl)) {
            return null;
        }
        
        try {
            const existingLink = prisma.link.findFirst({
                where: { originalUrl: originalUrl }
            });

            if (existingLink !== null) {
                return { link: existingLink, created: false }
            }

            let newLink = await prisma.link.create({
                data: {
                    shortCode: nanoid(8),
                    originalUrl: originalUrl
                }
            });

            return { link: newLink, created: true };

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