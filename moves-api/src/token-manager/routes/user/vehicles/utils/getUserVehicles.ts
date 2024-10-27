import axios from 'axios';
import { getTeslaAccessToken } from '../../../../../database/utils/getTeslaAccessToken';
import {
    AuthorizationError,
    Httpify,
} from '../../../../../middleware/errorHandler';
import { HTTPClient } from '../../../../HTTPClient/HTTPClient';

// throws http error
export const getTeslaVehicles = async (user_id: number) => {
    try {
        const accessToken = await getTeslaAccessToken(user_id);

        const response = await HTTPClient.tesla.userRequest(
            '/api/1/vehicles',
            user_id,
            { method: 'GET' },
        );
    } catch (err) {
        throw Httpify(err);
    }
};
