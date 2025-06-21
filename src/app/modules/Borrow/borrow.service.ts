// src/app/modules/Borrow/borrow.service.ts

import mongoose from 'mongoose';
import { TBorrow } from './borrow.interface';
import { Borrow } from './borrow.model';
import { Book } from '../Book/book.model';

const borrowBookIntoDB = async (payload: TBorrow) => {
  const { book: bookId, quantity } = payload;

  // Use findById to get a full Mongoose document instance
  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error('Book not found!');
  }

  if (!book.available || book.copies < quantity) {
    throw new Error('Not enough copies available to borrow.');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Decrement book copies
    book.copies -= quantity;

    // The pre-save hook in book.model.ts will handle setting 'available' to false if copies hit 0
    await book.save({ session }); // This will now work correctly

    // 2. Create the borrow record
    const borrowRecord = await Borrow.create([payload], { session });

    await session.commitTransaction();
    session.endSession();

    return borrowRecord[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getBorrowedSummaryFromDB = async () => {
  const result = await Borrow.aggregate([
    {
      $group: {
        _id: '$book',
        totalQuantity: { $sum: '$quantity' },
      },
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: '_id',
        as: 'bookDetails',
      },
    },
    {
      $unwind: '$bookDetails',
    },
    {
      $project: {
        _id: 0,
        book: {
          title: '$bookDetails.title',
          isbn: '$bookDetails.isbn',
        },
        totalQuantity: 1,
      },
    },
  ]);
  return result;
};

export const BorrowService = {
  borrowBookIntoDB,
  getBorrowedSummaryFromDB,
};
