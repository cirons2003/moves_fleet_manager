import { Request, Response, Router } from 'express';

const tokenRouter = Router();

tokenRouter.get(`/extractToken/`, (req: Request, res: Response) => {
    return
});

export default tokenRouter;