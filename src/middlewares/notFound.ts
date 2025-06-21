import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `API Not Found!`,
    error: `Route ${req.originalUrl} does not exist.`,
  });
};

export default notFound;
