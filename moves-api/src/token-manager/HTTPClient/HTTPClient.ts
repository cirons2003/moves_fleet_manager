import axios from 'axios';
import { authorizeUserRequest } from './utils/authorizeUserRequest';
import { TeslaError } from '../../middleware/errorHandler';

export type RequestConfig = {
    method: 'GET' | 'POST';
    headers?: any;
    data?: any;
    params?: any;
    [key: string]: any;
};

const teslaUrl = 'https://fleet-api.prd.na.vn.cloud.tesla.com';

// throws HTTP Errors
export const HTTPClient = {
    tesla: {
        vehicleRequest: (
            requestUrl: string,
            vehicleId: number,
            config: RequestConfig,
        ) => {},
        userRequest: async <T>(
            requestUrl: string,
            userId: number,
            config: RequestConfig,
        ) => {
            authorizeUserRequest(config, userId);
            config.baseURL = 'https://fleet-api.prd.na.vn.cloud.tesla.com';
            config.url = requestUrl;
            try {
                return await axios.request<T>(config);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    throw new TeslaError(
                        `Request to ${requestUrl} failed with code ${err.response?.status ?? 'Unknown'}: ${err.message}`,
                    );
                } else {
                    throw new TeslaError(
                        `Request to ${requestUrl} failed: ${err}`,
                    );
                }
            }
        },
    },
};
