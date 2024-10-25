import { Router } from 'express';
import userAuth from './auth';

const userRouter = Router();
userRouter.use('/auth', userAuth);

export default userRouter;
