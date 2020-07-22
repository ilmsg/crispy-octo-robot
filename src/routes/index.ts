import { Router, Request, Response, NextFunction } from 'express';

export default class IndexRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/', this.getIndex);
    }

    private getIndex = (_req: Request, res: Response, _next: NextFunction) => {
        res.end('xxxxx');
    }
}
