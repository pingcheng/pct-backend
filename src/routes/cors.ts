import { NextFunction, Request, Response } from "express";

/**
 * Enable the cors.
 *
 * @param request
 * @param response
 * @param next
 */
export function enableCors(request: Request, response: Response, next: NextFunction) {
    response.header("Access-Control-Allow-Origin", "http://new.pingchengtech.com");
    response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}