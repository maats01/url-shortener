import { Request, Response } from 'express';
import linkService from '../services/link.service';

class LinkController {
    public async shortenUrl(req: Request, res: Response) {
        // TODO
    }
    
    public async redirectToOriginal(req: Request, res: Response) {
        // TODO
    }
}

export default new LinkController();