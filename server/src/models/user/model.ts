import { Model, Schema, model } from 'mongoose';
import { IUserDocument } from './types';

const UserSchema = new Schema<IUserDocument>(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

export const UserModel = model<IUserDocument>('User', UserSchema);