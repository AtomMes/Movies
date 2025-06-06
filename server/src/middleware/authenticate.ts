import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/jwtUtils'

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string
  }
}

export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    res.status(401).json({ message: 'No token provided' })
    return 
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    res.status(401).json({ message: 'Invalid token' })
    return
  }
  req.user = decoded
  next()
}

export function authenticateOptional(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return 
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return
  }
  req.user = decoded
  next()
}
