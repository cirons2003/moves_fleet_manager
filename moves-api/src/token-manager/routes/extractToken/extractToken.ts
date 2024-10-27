import { Router, Request, Response, NextFunction } from 'express';
import exchangeCode from './utils/exchangeCode';
import {
    HttpError,
    Httpify,
    UserNotFoundError,
    ValidationError,
} from '../../../middleware/errorHandler';
import initiateUserSession from './utils/initiateUserSession';
import { parseState } from './utils/parseState';
import { checkUser } from '../../../database/utils/checkUser';

const extractToken = Router();

extractToken.get(
    '/extractToken',
    async (req: Request, res: Response, next: NextFunction) => {
        const { code, state } = req.query;

        const { user_id } = parseState(state as string);

        if (!user_id) {
            return next(new ValidationError('user_id is required'));
        }

        if (!code) {
            return next(new ValidationError('code is required'));
        }

        try {
            const userExists = await checkUser(+user_id);
            if (!userExists) {
                throw new UserNotFoundError(+user_id);
            }
            const tokens = await exchangeCode(code as string);
            await initiateUserSession(+user_id, tokens);
            res.redirect('/');
            res.status(200).send({
                message: `Successfully stored tesla tokens for user ${user_id}`,
            });
        } catch (err) {
            next(Httpify(err));
        }
    },
);

export default extractToken;
