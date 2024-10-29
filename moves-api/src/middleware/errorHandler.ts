import { NextFunction, Request, Response } from 'express';

export class HttpError extends Error {
    status: number;
    raw: any;

    constructor(raw: any, message: string, status: number) {
        super(message);
        this.status = status;
        this.raw = raw;
    }
}

export class UserNotFoundError extends HttpError {
    constructor(raw?: any, user_id?: number) {
        super(
            raw,
            user_id !== undefined
                ? `User with id ${user_id} not found`
                : 'User not found',
            404,
        );
    }
}

export class ValidationError extends HttpError {
    constructor(raw: any, message: string = 'Validation failed') {
        super(raw, message, 400);
    }
}

export class DatabaseError extends HttpError {
    constructor(raw: any, message: string = 'Failed to query database') {
        super(raw, message, 500);
    }
}

export class TeslaError extends HttpError {
    constructor(raw: any, message: string = 'Failed to query Tesla Fleet API') {
        super(raw, message, 500);
    }
}

export class AuthorizationError extends HttpError {
    constructor(raw: any, message: string = 'Authorization Error') {
        super(raw, message, 401);
    }
}

export const Httpify = (
    err: any,
    fallbackMessage?: string,
    fallbackStatus?: number,
) =>
    err instanceof HttpError
        ? err
        : new HttpError(
              err,
              fallbackMessage ?? 'Unexpected Error',
              fallbackStatus ?? 500,
          );

export const errorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (!(err instanceof HttpError)) {
        console.error(`Unexpected error received: ${err}`);
        return;
    }

    const verbose = true;
    if (verbose) {
        console.error(
            '\n****************\nVerbose Logging: \n****************\n\n',
            err.raw,
        );
    }

    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong :(',
        success: false,
    });
};
