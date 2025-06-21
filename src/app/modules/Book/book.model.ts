import { Schema, model } from 'mongoose';
import { TBook, BookModel } from './book.interface';

const bookSchema = new Schema<TBook, BookModel>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        'FICTION',
        'NON_FICTION',
        'SCIENCE',
        'HISTORY',
        'BIOGRAPHY',
        'FANTASY',
      ],
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

// Mongoose Middleware (pre-save hook)
// If copies are 0, set 'available' to false before saving
bookSchema.pre('save', function (next) {
  if (this.copies === 0) {
    this.available = false;
  }
  next();
});

// Static Method to check book availability by ID
bookSchema.statics.isBookAvailable = async function (id: string) {
  return this.findById(id);
};

export const Book = model<TBook, BookModel>('Book', bookSchema);
