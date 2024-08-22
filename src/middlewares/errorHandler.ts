// middlewares/errorHandler.ts

import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { errorResponse } from '../helpers/responses';
import { literals } from '../constants/literals';

/**
 * Middleware function to handle errors in the application.
 * 
 * This function processes different types of errors:
 * - Joi validation errors from Celebrate.
 * - General errors.
 * 
 * @param err - The error object.
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @param next - The next middleware function.
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Check if the error is a Celebrate validation error
    if (isCelebrateError(err)) {
        // Extract validation errors from the Celebrate error
        const validationError = err.details.get('body') || err.details.get('params') || err.details.get('query');
        // Remove backslashes and quotes from the error message for cleaner output
        const errorMessage = validationError?.message.replace(/['"]/g, ""); 

        // Send a 400 Bad Request response with the validation error details
        return errorResponse(res, 400, {
            status: 'error',
            message: errorMessage || literals.validationError,
        });
    }

    // Handle general errors
    // Send a response with the error status and message
    errorResponse(res, err.status || 500, {
        status: 'error',
        message: err.message || literals.internalServerError,
    });
};
