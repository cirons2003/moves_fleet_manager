import { Router, Request, Response } from 'express';
import exchangeCode from '../processes/exchangeCode';
import initiateUserSession from '../processes/initiateUserSession';
import { refreshToken } from '../processes/refreshToken';

const extractToken = Router();

extractToken.get('/extractToken', async (req: Request, res: Response) => {
    const { code } = req.query;
    const tokens = await exchangeCode(code as string);
    if (tokens !== undefined) {
        initiateUserSession(tokens);
    }
    res.redirect('/');
});

export default extractToken;
