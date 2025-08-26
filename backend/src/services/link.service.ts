import { prisma } from '../lib/prisma';

class LinkService {
    public async create(originalUrl: string): Promise<string> {
        // TODO
        return "";
    }
    
    public async handleRedirect(shortCode: string): Promise<string | null> {
        // TODO
        return null;
    }
}

export default new LinkService();