import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { envConfig } from '../config/env'

dotenv.config()

interface ITokenPayload {
  id: string
}

const JWT_SECRET = envConfig.jwt_secret
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables')
}

export function generateToken(id: string): string {
  return jwt.sign({ id: id }, envConfig.jwt_secret, {
    expiresIn: '1w',
  })
}

export function verifyToken(token: string): ITokenPayload | null {
  try {
    return jwt.verify(token, envConfig.jwt_secret) as ITokenPayload
  } catch (error) {
    return null
  }
}
