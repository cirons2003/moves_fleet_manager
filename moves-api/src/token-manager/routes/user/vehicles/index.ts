import { Router } from 'express';
import getVehicles from './getVehicles';
import honkHorn from './honkHorn';

const userVehicles = Router();

userVehicles.use(getVehicles);
userVehicles.use(honkHorn);

export default userVehicles;
