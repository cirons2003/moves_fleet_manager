import { Router } from 'express';
import getVehicles from './getVehicles';

const userVehicles = Router();

userVehicles.use(getVehicles);

export default userVehicles;
