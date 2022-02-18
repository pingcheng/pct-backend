import { NextFunction, Request, Response } from "express";

/**
 * Enable the cors.
 *
 * @param request
 * @param response
 * @param next
 */
export function enableCors(request: Request, response: Response, next: NextFunction) {

    // If the CORS_SITE is not defined, or it is an empty string.
    // Then no CORS is allowed.
    if (process.env.CORS_SITE && process.env.CORS_SITE !== "") {
        response.header("Access-Control-Allow-Origin", process.env.CORS_SITE);
        response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
}