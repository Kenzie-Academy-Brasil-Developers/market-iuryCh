import { NextFunction, Request, Response } from 'express';
import { market } from './database';
import { TRequestProduct } from './interfaces';

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
): void | Response => {
  if (req.method === 'POST') {
    const productData: Array<TRequestProduct> = req.body;

    const checkRepeatedName = productData.some((product) =>
      market.some((productMarket) => productMarket.name === product.name)
    );

    if (checkRepeatedName) {
      return res.status(409).json({ error: 'Product already registered' });
    }

    return next();
  } else if (req.method === 'PATCH') {
    const productData: TRequestProduct = req.body;

    const checkRepeatedName = market.some(
      (product) => productData.name === product.name
    );
    console.log(checkRepeatedName);
    if (checkRepeatedName) {
      return res.status(409).json({ error: 'Product already registered' });
    }
    return next();
  }
};

export { ensureProductExist, nonRepeatedProductName };
