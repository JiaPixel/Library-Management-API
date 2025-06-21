// src/app/modules/Borrow/borrow.controller.ts

import { Request, Response, NextFunction } from 'express'; // <-- Import NextFunction
import { BorrowService } from './borrow.service';

const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  // <-- Use NextFunction
  try {
    const borrowData = req.body;
    const result = await BorrowService.borrowBookIntoDB(borrowData);
    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getBorrowedSummary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // <-- Use NextFunction
  try {
    const result = await BorrowService.getBorrowedSummaryFromDB();
    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BorrowController = {
  borrowBook,
  getBorrowedSummary,
};
