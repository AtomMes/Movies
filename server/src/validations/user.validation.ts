import Joi from 'joi';
import { validate } from '../middlewares/validate';

export const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const userIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

export const validateRegisterUser = validate(registerUserSchema);
export const validateLoginUser = validate(loginUserSchema);
export const validateUserId = validate(userIdSchema);