import { NextFunction, Request, Response, Router } from 'express';
import { knexObj } from '../../../../database/knexObj';
import {
    Httpify,
    VehicleNotFoundError,
} from '../../../../middleware/errorHandler';
import { Vehicle } from '../../../../database/schema/Vehicle';
import { HTTPClient, RequestConfig } from '../../../HTTPClient/HTTPClient';

const honkHorn = Router();

honkHorn.get(
    '/honkHorn/:vehicle_id',
    async (req: Request, res: Response, next: NextFunction) => {
        /*const { vehicle_id } = req.params;

        const vehicle = await knexObj<Vehicle>('vehicles')
            .where('id', vehicle_id)
            .first();

        if (!vehicle) {
            return next(new VehicleNotFoundError(undefined, +vehicle_id));
        }
*/
        const vin = '7SAYGDEE1PF800170';

        const config: RequestConfig = {
            method: 'POST',
            data: {},
        };

        try {
            const response = await HTTPClient.tesla.vehicleRequest(
                `/api/1/vehicles/${vin}/command/honk_horn`,
                config,
            );
            console.log(response);
            res.status(200).json({
                data: response?.data,
                success: true,
            });
        } catch (err) {
            next(Httpify(err));
        }
    },
);

export default honkHorn;