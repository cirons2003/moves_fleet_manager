import { NextFunction, Request, Response, Router } from 'express';

const addVehicle = Router();

addVehicle.post((req: Request, res: Response, next: NextFunction) => {
    const { email, uid };
});
