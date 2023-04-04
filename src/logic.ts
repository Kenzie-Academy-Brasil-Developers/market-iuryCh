import { Response, Request } from 'express';
import { IProduct, ICleaningProduct, TRequestProduct } from './interfaces';
import { market } from './database';

let incrementId = 1;

const createProduct = (req: Request, res: Response): Response => {
  const data: Array<TRequestProduct> = req.body;

  const date = new Date();
  date.setFullYear(date.getFullYear());

  const total = data.reduce((pV, cV) => pV + cV.price, 0);

  const newProduct: Array<IProduct> = data.map((product) => {
    return {
      id: incrementId++,
      ...product,
      expirationDate: date,
    };
  });
  market.push(...newProduct);

  return res.status(201).json({
    total: total,
    marketProducts: market,
  });
};

const readProducts = (req: Request, res: Response): Response => {
  return res.status(200).json(market);
};

const findProduct = (req: Request, res: Response): Response => {
  const { productIndex } = res.locals;

  return res.status(200).json();
};

const updateProduct = (req: Request, res: Response): Response => {
  return res.status(201).json();
};

const eraseProduct = (req: Request, res: Response): Response => {
  const { productIndex } = res.locals;

  market.splice(productIndex, 1);

  return res.status(204).json();
};

export {
  createProduct,
  readProducts,
  findProduct,
  updateProduct,
  eraseProduct,
};
