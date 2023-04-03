import { NextFunction, Request, Response } from 'express';
import { market } from './database';
import { IProduct } from './interfaces';

const ensureProductExist = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const { name } = req.params;

  const findProductIndex = market.findIndex((product) => product.name === name);
  if (findProductIndex === -1) {
    return res.status(409).json({ error: 'Product already registered' });
  }
  res.locals.productIndex = findProductIndex;

  return next();
};

export { ensureProductExist };
