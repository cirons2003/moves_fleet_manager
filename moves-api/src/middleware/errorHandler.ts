import { NextFunction, Request, Response } from 'express';

export class HttpError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class UserNotFoundError extends HttpError {
    constructor(user_id?: number) {
        super(
            user_id !== undefined
                ? `User with id ${user_id} not found`
                : 'User not found',
            404,
        );
    }
}

export class ValidationError extends HttpError {
    constructor(message: string = 'Validation failed') {
        super(message, 400);
    }
}

export class DatabaseError extends HttpError {
    constructor(message: string = 'Failed to query database') {
        super(message, 500);
    }
}

export class TeslaError extends HttpError {
    constructor(message: string = 'Failed to query Tesla Fleet API') {
        super(message, 500);
    }
}

export class AuthorizationError extends HttpError {
    constructor(message: string = 'Authorization Error') {
        super(message, 401);
    }
}

export const Httpify = (err: any) =>
    err instanceof HttpError ? err : new HttpError('Unexpected Error', 500);

export const errorHandler = (err: HttpError, req: Request, res: Response) => {
    console.error('Error:', err.message);

    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong :(',
        success: false,
    });
    //console.error(err.stack);
};
