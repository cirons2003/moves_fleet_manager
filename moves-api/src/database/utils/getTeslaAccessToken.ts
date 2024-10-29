import {
    AuthorizationError,
    DatabaseError,
} from '../../middleware/errorHandler';
import { knexObj } from '../knexObj';

// throws http errors
export const getTeslaAccessToken = async (user_id: number) => {
    try {
        const result = await knexObj('users')
            .where('id', user_id)
            .first()
            .select('tesla_access_token');
        const access_token = result?.tesla_access_token;
        if (!access_token) {
            throw new AuthorizationError(
                undefined,
                'User has not authorized access to Tesla',
            );
        }
        return access_token;
    } catch (err) {
        throw new DatabaseError(err);
    }
};
