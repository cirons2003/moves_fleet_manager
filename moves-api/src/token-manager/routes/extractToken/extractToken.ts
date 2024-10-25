import { Router, Request, Response } from 'express';
import exchangeCode from './utils/exchangeCode';
import initiateUserSession from '../../processes/initiateUserSession';
import { refreshToken } from '../../processes/refreshToken';
import { decode } from 'jsonwebtoken';

const extractToken = Router();

extractToken.get('/extractToken', async (req: Request, res: Response) => {
    const { code } = req.query;
    const tokens = await exchangeCode(code as string);
    if (tokens !== undefined) {
        //initiateUserSession(tokens);
    }
    console.log(`authToken: ${tokens?.access_token}`);
    console.log(`refresh Token: ${tokens?.refresh_token}`);
    console.log(decode(tokens?.access_token));
    res.redirect('/');
});

export default extractToken;
