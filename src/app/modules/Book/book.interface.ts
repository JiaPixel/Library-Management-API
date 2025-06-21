// src/app/modules/Book/book.interface.ts

import { Model, Document } from 'mongoose'; // <-- Import Document

// The TBook type now extends a Mongoose Document
export type TBook = Document & {
  title: string;
  author: string;
  genre:
    | 'FICTION'
    | 'NON_FICTION'
    | 'SCIENCE'
    | 'HISTORY'
    | 'BIOGRAPHY'
    | 'FANTASY';
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
};

// Interface for Static Method
export interface BookModel extends Model<TBook> {
  isBookAvailable(id: string): Promise<TBook | null>;
}
