import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { AuthenticatedRequest } from '../middleware/authenticate'
import { getMe, login, register } from '../services/user.service'
import { generateToken } from '../utils/jwtUtils'

export const registerUserHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body
  const user = await register(name, email, password)
  const token = generateToken(user._id.toString())
  res.status(StatusCodes.CREATED).json({
    token,
  })
}

export const loginUserHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await login(email, password)
  const token = generateToken(user._id.toString())
  res.status(StatusCodes.OK).json({
    token,
  })
}

export const getMeHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.user!
  const user = await getMe(id)
  res.status(StatusCodes.OK).json({ user })
}
