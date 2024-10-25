import axios from 'axios';
import { authorizeRequestConfig } from './utils/authorizeRequest';

export type RequestConfig = {
    method: 'GET' | 'POST';
    [key: string]: any;
};

const teslaUrl = 'https://fleet-api.prd.na.vn.cloud.tesla.com';

export const HTTPClient = {
    tesla: {
        vehicleRequest: (
            requestUrl: string,
            vehicleId: string,
            config: RequestConfig,
        ) => {
            authorizeRequestConfig(config, vehicleId);
            return axios.request({
                url: teslaUrl + requestUrl,
            });
        },
    },
};
