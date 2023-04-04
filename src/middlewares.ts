import { NextFunction, Request, Response } from 'express';
import { market } from './database';
import { IProduct } from './interfaces';

const ensureProductExist = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const { id } = req.params;

  const findProductIndex: number = market.findIndex(
    (product) => product.id === Number(id)
  );

  if (findProductIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.locals.product = {
    productId: id,
    productIndex: findProductIndex,
  };

  return next();
};

const nonRepeatedProductName = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name } = req.query;

  const filteredProduct = market.filter((product) => product.name === name);

  if (filteredProduct.length > 0) {
    res.status(409).json({ error: 'Product already registered' });
    return next();
  }

  res.locals.product = market;
  return next();
};

export { ensureProductExist, nonRepeatedProductName };
