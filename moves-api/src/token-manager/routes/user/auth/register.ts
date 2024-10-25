import { NextFunction, Request, Response, Router } from 'express';
import { hashPassword } from './utils/encryption';
import { HttpError } from '../../../../middleware/errorHandler';
import { knexObj } from '../../../../database/knexObject';

const register = Router();

register.post(
    '/register',
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                message: 'email and username are required',
            });
        }

        try {
            const hashedPassword = await hashPassword(password);
        } catch (err) {
            next(new HttpError('Failed to encrypt password', 500));
        }

        try {
            const existingUser = await knexObj.select('users')
        }

        try {
        } catch (err) {}
    },
);

export default register;
