import { Schema, model } from 'mongoose';
import { INoteDocument } from './types';

const NoteSchema = new Schema<INoteDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        movieId: { type: String, required: true },
        note: { type: String, required: true }
    },
    { timestamps: true }
);

export const NoteModel = model<INoteDocument>('Note', NoteSchema);