import { NextFunction, Request, Response, Router } from 'express';
import { HttpError, Httpify } from '../../../../middleware/errorHandler';
import { checkUser } from '../../../../database/utils/checkUser';

const getVehicles = Router();

getVehicles.get(
    '/getVehicles/:user_id',
    async (req: Request, res: Response, next: NextFunction) => {
        const { user_id } = req.params;

        if (!user_id) {
            return next(new HttpError('user_id is required', 400));
        }

        try {
            const userExists = await checkUser(+user_id);
            if (!userExists) {
                throw new HttpError(`User with id ${user_id} not found`, 404);
            }
        } catch (err) {
            next(Httpify(err));
        }
    },
);
