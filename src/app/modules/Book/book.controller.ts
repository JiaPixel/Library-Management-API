// src/app/modules/Book/book.controller.ts

import { Request, Response, NextFunction } from 'express'; // <-- Import NextFunction
import { BookService } from './book.service';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  // <-- Use NextFunction
  try {
    const bookData = req.body;
    const result = await BookService.createBookIntoDB(bookData);
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  // <-- Use NextFunction
  try {
    const result = await BookService.getAllBooksFromDB(req.query);
    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  // <-- Use NextFunction
  try {
    const { bookId } = req.params;
    const result = await BookService.getBookByIdFromDB(bookId);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  // <-- Use NextFunction
  try {
    const { bookId } = req.params;
    const updateData = req.body;
    const result = await BookService.updateBookByIdIntoDB(bookId, updateData);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  // <-- Use NextFunction
  try {
    const { bookId } = req.params;
    await BookService.deleteBookByIdFromDB(bookId);
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
