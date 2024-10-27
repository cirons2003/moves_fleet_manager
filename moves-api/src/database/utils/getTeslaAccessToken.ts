import {
    AuthorizationError,
    DatabaseError,
} from '../../middleware/errorHandler';
import { knexObj } from '../knexObj';

// throws http errors
export const getTeslaAccessToken = async (user_id: number) => {
    try {
        const access_token: string = await knexObj('users')
            .where('id', user_id)
            .first()
            .select('tesla');
        if (!access_token) {
            throw new AuthorizationError(
                'User has not authorized access to Tesla',
            );
        }
        return access_token;
    } catch (err) {
        throw new DatabaseError();
    }
};
