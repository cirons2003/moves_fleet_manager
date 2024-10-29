import axios from 'axios';
import { redisClient } from '../../index';
import { knexObj } from '../../database/knexObj';
import {
    AuthorizationError,
    DatabaseError,
    Httpify,
} from '../../middleware/errorHandler';

export const secondsToExpiration = (timestamp: number) => {
    const currTimestamp = Math.floor(Date.now() / 1000);
    const secondsLeft = timestamp - currTimestamp;
    return secondsLeft;
};

// throws http errors
export const refreshToken = async (userId: string) => {
    const userQuery = await knexObj('users').where('id', userId).first();
    const refresh_token = userQuery?.tesla_refresh_token;

    if (!refresh_token) {
        throw new AuthorizationError('User had not provided a refresh token');
    }

    const params = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: process.env.CLIENT_ID ?? 'No-Client-Id',
        refresh_token: refresh_token,
    });

    const response = await axios.post(
        'https://auth.tesla.com/oauth2/v3/token',
        params.toString(),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
    );

    const { access_token } = response.data;

    try {
        await userQuery.update({ tesla_access_token: access_token });
    } catch (err) {
        throw new DatabaseError(
            `Failed to update acccess_token for user ${userId}`,
        );
    }
    return access_token;
};
