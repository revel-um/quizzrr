// helpers/controllerHandler.ts

import { NextFunction, Request, Response } from 'express';

/**
 * A higher-order function that wraps an Express route handler to provide
 * centralized error handling. This function ensures that any errors thrown
 * by the handler are passed to the next middleware for error handling.
 * 
 * @param handler - The route handler function to be wrapped.
 * @returns A new function that handles requests and passes errors to the next middleware.
 */
export const controller = (handler: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Execute the handler function and wait for it to complete
            await handler(req, res, next);
        } catch (error) {
            // Pass any caught errors to the next middleware (typically an error handler)
            next(error);
        }
    };
};
