import { Schema, model } from 'mongoose';
import { TBorrow } from './borrow.interface';

const borrowSchema = new Schema<TBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export const Borrow = model<TBorrow>('Borrow', borrowSchema);
