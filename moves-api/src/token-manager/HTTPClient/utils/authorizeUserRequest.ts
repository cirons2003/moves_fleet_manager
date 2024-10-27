import { getTeslaAccessToken } from '../../../database/utils/getTeslaAccessToken';
import { AuthorizationError } from '../../../middleware/errorHandler';
import { RequestConfig } from '../HTTPClient';

// throws http errors
export const authorizeUserRequest = async (
    config: RequestConfig,
    user_id: number,
) => {
    try {
        const access_token = await getTeslaAccessToken(user_id);
        const authorizedConfig = { ...config };
        authorizedConfig.headers.Authorization = `Bearer ${access_token}`;
        return authorizedConfig;
    } catch (err) {
        throw new AuthorizationError('Failed to Authorize Request');
    }
};
