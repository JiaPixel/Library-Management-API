import express from 'express';
import { BookRoutes } from '../modules/Book/book.route';
import { BorrowRoutes } from '../modules/Borrow/borrow.route';

const router = express.Router();

const moduleRoutes = [
  { path: '/books', route: BookRoutes },
  { path: '/borrow', route: BorrowRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
