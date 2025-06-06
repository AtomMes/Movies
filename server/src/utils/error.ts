import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'

export class AppError extends Error {
  statusCode: number
  errorMessage?: string

  constructor(statusCode: number, message: string, errorMessage?: string) {
    super(message)
    this.statusCode = statusCode
    this.errorMessage = errorMessage
    Error.captureStackTrace(this, this.constructor)
  }
}

export const errorHandler = (
  err: Error | AppError,
  _: Request,
  res: Response
): Response => {
  if (err instanceof ValidationError) {
    const message = err.details[0].message
    console.error(`${new Date().toISOString()} - Error: ${message}`)
    return res.status(StatusCodes.BAD_REQUEST).json({
      message,
    })
  }

  if (err instanceof AppError) {
    const logMessage = err.errorMessage || err.message
    console.error(`${new Date().toISOString()} - Error: ${logMessage}`)
    return res.status(err.statusCode).json({
      message: err.message,
    })
  }
  const message = ReasonPhrases.INTERNAL_SERVER_ERROR
  console.error(`${new Date().toISOString()} - Error: ${err.message}`)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message,
  })
}

export const notFoundHandler = (_: Request, res: Response): void => {
  res.status(StatusCodes.NOT_FOUND).json({
    message: ReasonPhrases.NOT_FOUND,
  })
}
