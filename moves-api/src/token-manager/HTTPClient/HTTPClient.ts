import axios from 'axios';
import { authorizeConfig } from './utils/authorizeConfig';
import { signConfig } from './utils/signConfig';
import { getVehicleOwnerId } from '../../database/utils/getVehicleOwnerId';
import { handleTeslaErrors } from './utils/handleTeslaErrors';

export type RequestConfig = {
    method: 'GET' | 'POST';
    headers?: any;
    data?: any;
    params?: any;
    [key: string]: any;
};

const expandConfig = (config: RequestConfig, requestUrl: string) => {
    const expandedConfig = { ...config };
    expandedConfig.baseURL = 'https://fleet-api.prd.na.vn.cloud.tesla.com';
    expandedConfig.url = requestUrl;
    return expandedConfig;
};

// throws HTTP Errors
export const HTTPClient = {
    tesla: {
        userRequest: async <T>(
            requestUrl: string,
            userId: number,
            config: RequestConfig,
        ) => {
            const expandedConfig = expandConfig(config, requestUrl);
            const authorizedConfig = await authorizeConfig(
                expandedConfig,
                userId,
            );
            try {
                return await axios.request<T>(authorizedConfig);
            } catch (err) {
                return handleTeslaErrors(err, userId);
            }
        },
        vehicleRequest: async <T>(
            requestUrl: string,
            config: RequestConfig,
        ) => {
            const expandedConfig = expandConfig(config, requestUrl);
            const userId = 7; //await getVehicleOwnerId(vehicleId);
            const authorizedConfig = await authorizeConfig(
                expandedConfig,
                userId,
            );
            const signedConfig = signConfig(authorizedConfig);
            console.log(signedConfig);
            try {
                return await axios.request<T>(signedConfig);
            } catch (err) {
                console.error(err); //return handleTeslaErrors(err, userId, 1);
            }
        },
    },
};
