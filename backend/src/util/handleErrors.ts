import { NextFunction, Request, Response } from 'express'
import { HttpClientError, HttpErrorNotFound, HttpStatusCode } from './httpErrors'
import appConfig, { AppMode } from '../config/config'
import { ValidationError } from 'class-validator'

// Just throw the client side error unknowns requests
export const notFoundError = (req: Request, res: Response) => {
    throw new HttpErrorNotFound('Method not found.')
}

export const clientError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpClientError) {
        res.status(err.statusCode).send({
            message: err.message
        })
    } else if (err instanceof ValidationError) {
        res.status(HttpStatusCode.BadRequest).send({
            message: err.message
        })
    } else if (err instanceof Array) {
        res.status(HttpStatusCode.BadRequest).send({
            message: JSON.stringify(err)
        })
    } else {
        next(err)
    }
}

export const serverError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (appConfig.appMode === AppMode.Prod) {
        console.error(err)
        res.status(HttpStatusCode.InternalServerError).send('Internal Server Error')
    } else if (appConfig.appMode === AppMode.Test) {
        res.status(HttpStatusCode.InternalServerError).send(err)
    } else {
        console.error(err.stack)
        res.status(HttpStatusCode.InternalServerError).send(err.stack)
    }
}
