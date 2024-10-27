import { NextFunction, Request, Response, Router } from 'express';
import { hashPassword } from './utils/encryption';
import { HttpError } from '../../../../middleware/errorHandler';
import { knexObj } from '../../../../database/knexObj';
import { User } from '../../../../database/schema/User';

const register = Router();

register.post(
    '/register',
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new HttpError('email and username are required', 400));
        }

        try {
            const existingUser = await knexObj('users')
                .where('email', email)
                .first();
            if (existingUser) {
                return next(
                    new HttpError('User with this email already exists', 400),
                );
            }
        } catch (err) {
            return next(
                new HttpError(`Failed to query users table: ${err}`, 500),
            );
        }

        try {
            const hashedPassword = await hashPassword(password);

            const newUser: User = {
                email,
                password: hashedPassword,
            };

            await knexObj('users').insert(newUser);
            return res.status(200).json({
                success: true,
                message: `successfully registered user with email:${email}`,
            });
        } catch (err) {
            return next(
                new HttpError(`Failed to insert new user: ${err}`, 500),
            );
        }
    },
);

export default register;
