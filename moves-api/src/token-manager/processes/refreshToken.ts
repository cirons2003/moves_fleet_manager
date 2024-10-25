import axios from 'axios';
import { redisClient } from '../../index';

export const refreshToken = async (userId: string) => {
    try {
        const userTokens = await redisClient.get(userId);
        const refreshToken = JSON.parse(userTokens)?.refresh_token;

        if (refreshToken) {
            const params = new URLSearchParams({
                grant_type: 'refresh_token',
                client_id: process.env.CLIENT_ID ?? 'No-Client-Id',
                refresh_token: refreshToken,
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

            const { refresh_token, access_token, id_token } = response.data;
        }
    } catch (err) {
        console.error(err);
    }
};
