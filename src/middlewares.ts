import { NextFunction, Request, Response } from 'express';
import { market } from './database';
import { IProduct } from './interfaces';

const ensureProductExist = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const { id } = req.params;

  const findProductId: number = market.findIndex(
    (product) => product.id === Number(id)
  );
  if (findProductId === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.locals.productIndex = findProductId;

  return next();
};

const filterProductByName = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name } = req.query;

  const filterProducts: IProduct[] = market.filter(
    (product) => product.name === name
  );

  if (filterProducts.length > 0) {
    res.locals.product = filterProducts;
    return next();
  }
  res.locals.product = market;

  return next();
};

export { ensureProductExist, filterProductByName };
