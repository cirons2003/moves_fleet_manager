import { redisClient } from '../../index';
import { extractUserId } from './helpers';
import { scheduleRefresh } from './tokenRefreshJobs';

type Tokens = {
    access_token: string;
    refresh_token: string;
    id_token: string;
};

const initiateUserSession = async (tokens: Tokens) => {
    const { access_token, refresh_token, id_token } = tokens;

    try {
        const userId = extractUserId(id_token);

        if (userId) {
            scheduleRefresh(userId as string);

            await redisClient.set(
                `tokens_${userId as string}`,
                JSON.stringify({ access_token, refresh_token }),
            );
        } else {
            console.error('Could not extract user Id');
        }
    } catch (err) {
        console.error(`Failed to initiate user session: ${err}`);
    }
};

export default initiateUserSession;
