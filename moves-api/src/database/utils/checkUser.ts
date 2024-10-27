import { HttpError } from '../../middleware/errorHandler';
import { knexObj } from '../knexObj';

// throws http error
export const checkUser = async (user_id: number) => {
    try {
        const user = await knexObj('users').where('id', user_id).first();
        return !!user;
    } catch (err) {
        throw new HttpError('Failed to query user table', 500);
    }
};
