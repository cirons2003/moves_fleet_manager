import { Request, Response, Router } from 'express';

import extractToken from './extractToken';
import forwardRequest from './forwardRequest';

const mainRouter = Router();
mainRouter.use(extractToken);
mainRouter.use(forwardRequest);

export default mainRouter;
