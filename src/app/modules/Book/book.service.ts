import { TBook } from './book.interface';
import { Book } from './book.model';

const createBookIntoDB = async (payload: TBook) => {
  const result = await Book.create(payload);
  return result;
};

const getAllBooksFromDB = async (query: Record<string, unknown>) => {
  const { filter, sortBy, sort, limit = 10 } = query;

  const filterQuery: Record<string, unknown> = {};
  if (filter) {
    filterQuery.genre = filter;
  }

  const sortOptions: { [key: string]: 'asc' | 'desc' } = {};
  if (sortBy && sort) {
    sortOptions[sortBy as string] = sort as 'asc' | 'desc';
  } else {
    sortOptions.createdAt = 'desc'; // Default sort
  }

  const result = await Book.find(filterQuery)
    .sort(sortOptions)
    .limit(Number(limit));
  return result;
};

const getBookByIdFromDB = async (id: string) => {
  const result = await Book.findById(id);
  return result;
};

const updateBookByIdIntoDB = async (id: string, payload: Partial<TBook>) => {
  const result = await Book.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBookByIdFromDB = async (id: string) => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookService = {
  createBookIntoDB,
  getAllBooksFromDB,
  getBookByIdFromDB,
  updateBookByIdIntoDB,
  deleteBookByIdFromDB,
};
