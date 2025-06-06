import { Document, Schema, Types } from 'mongoose'

export interface INote {
  userId: Schema.Types.ObjectId
  movieId: string
  note: string
}

export interface INoteDocument extends INote, Document {
  _id: Types.ObjectId | string
  createdAt: Date
  updatedAt: Date
}
