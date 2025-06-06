import { StatusCodes } from 'http-status-codes'
import { UserModel } from '../models/user'
import { IUserDocument } from '../models/user/types'
import { AppError } from '../utils/error'
import { hashPassword, verifyPassword } from '../utils/passwordUtils'

const sanitizeUser = (user: IUserDocument): Omit<IUserDocument, 'password'> => {
  const userObject = user.toObject()
  delete userObject.password
  return userObject
}

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<Omit<IUserDocument, 'password'>> => {
  try {
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      throw new AppError(StatusCodes.CONFLICT, 'Email already in use')
    }
    const hashedPassword = await hashPassword(password)
    const user = await UserModel.create({ name, email, password: hashedPassword })
    return sanitizeUser(user)
  } catch (error) {
    throw error
  }
}

export const login = async (email: string, password: string): Promise<Omit<IUserDocument, 'password'>> => {
  try {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Invalid credentials')
    }
    const isPasswordCorrect = await verifyPassword(password, user.password)
    if (!isPasswordCorrect) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials')
    }
    return sanitizeUser(user)
  } catch (error) {
    throw error
  }
}

export const getMe = async (userId: string): Promise<Omit<IUserDocument, 'password'>> => {
  try {
    const user = await UserModel.findById(userId)
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found')
    }
    return sanitizeUser(user)
  } catch (error) {
    throw error
  }
}