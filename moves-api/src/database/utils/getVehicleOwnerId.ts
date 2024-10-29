import { HttpError } from '../../middleware/errorHandler';
import { knexObj } from '../knexObj';

// throws http errors
export const getVehicleOwnerId = async (vid: number) => {
    const result = await knexObj('vehicles')
        .where('id', vid)
        .first()
        .select('user_id');

    const owner_id = result?.user_id;
    if (!owner_id) {
        throw new HttpError(
            undefined,
            `Could not find owner of vehicle with id ${vid}`,
            404,
        );
    }
    return owner_id;
};
