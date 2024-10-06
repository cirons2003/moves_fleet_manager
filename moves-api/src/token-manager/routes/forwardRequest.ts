import axios from 'axios';
import { Request, Response, Router } from 'express';
import { authorizeRequest } from '../processes/helpers';

const forwardRequest = Router();

type Details = {
    url: string;
    data?: {[key: string]: any};
    config?: {[key: string]: any};
}

forwardRequest.post('/forwardRequest', async (req: Request, res: Response) => {
    const {request_type, url, data, config, vehicle_id} = req.body;

    const requestTypes = ['GET', 'POST'];
    if (!request_type || !requestTypes.includes(request_type)) {
        return res.status(400).send(`Validation error: request_type must be GET or POST, received ${request_type}}`);
    }
    
    if (!url) {
        return res.status(400).send(`Validation error: url is required, received ${request_type}}`);
    }

    try {
        if (request_type === 'GET') {
            const response = await axios.get(url, config);
            const authorizedConfig = authorizeRequest(config, authToken);
            return response.data;
        } else if (request_type === 'POST') {
            const response = await axios.post(url, data, config);
            return response.data;
        }
    } catch (err) {
        return res.send(500).send(`Something went wrong: ${err}`);
    }
});

const forwardGet = async(details: Details)

export default forwardRequest;
