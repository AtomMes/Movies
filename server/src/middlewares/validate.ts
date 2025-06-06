import { NextFunction, Request, Response } from 'express'
import { AnySchema } from 'joi'
import { AppError } from '../utils/error'

type ValidateRequestParts = 'body' | 'params' | 'query'

export const validate =
  (schema: AnySchema, validationType: ValidateRequestParts = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[validationType] || {}, {
      abortEarly: false,
      allowUnknown: false,
      presence: 'required',
    })

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ')
      return next(new AppError(400, errorMessage))
    }
    next()
  }
