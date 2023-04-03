import { Response, Request } from 'express';
import { IProduct, ICleaningProduct, TRequestProduct } from './interfaces';
import { market } from './database';

let incrementId = 1;

const createProduct = (req: Request, res: Response): Response => {
  const data: TRequestProduct = req.body;

  const date = new Date();
  date.setFullYear(date.getFullYear());

  const newProduct: IProduct = {
    id: incrementId++,
    ...data,
    expirationDate: date,
  };

  market.push(newProduct);
  return res.status(201).json(newProduct);
};

const readProducts = (req: Request, res: Response): Response => {
  return res.status(200).json(market);
};

const findProduct = (req: Request, res: Response): Response => {
  const { productIndex } = res.locals

  return res.status(200).json();
};

const updateProduct = (req: Request, res: Response): Response => {
  return res.status(201).json();
};

export { createProduct, readProducts, findProduct, updateProduct };
