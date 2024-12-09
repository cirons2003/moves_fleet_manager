import { decode, JwtPayload } from 'jsonwebtoken';
import {
    AuthorizationError,
    DatabaseError,
    TeslaError,
} from '../../middleware/errorHandler';
import { knexObj } from '../knexObj';
import { timeStamp } from 'console';
import { refreshToken } from '../../token-manager/processes/refreshToken';

// throws http errors
export const getTeslaAccessToken = async (user_id: number) => {
    const result = await knexObj('users')
        .where('id', user_id)
        .first()
        .select('tesla_access_token');
    let access_token = result?.tesla_access_token;
    if (!access_token) {
        throw new AuthorizationError(
            undefined,
            'User has not authorized access to Tesla',
        );
    }

    const decodedToken = decode(access_token) as JwtPayload;
    const expiration = decodedToken?.exp;
    const refreshBuffer = 120; //seconds
    const expiringIn = (expiration ?? 0) - Math.floor(Date.now() / 1000);
    if (expiringIn < refreshBuffer) {
        console.log('Unscheduled Token Refresh Needed...');
        access_token = await refreshToken(user_id);
    }

    return access_token;
};
