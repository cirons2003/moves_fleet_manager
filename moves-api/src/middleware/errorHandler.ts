import { NextFunction, Request, Response } from 'express';

export class HttpError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export const errorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error(err || 500);

    res.status(err.status).json({
        message: err.message || 'Something went wrong :(',
        success: false,
        stack: err.stack,
    });
    next();
};
