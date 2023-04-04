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

const listProductById = (req: Request, res: Response): Response => {
  const productToSearch = res.locals.product.productIndex;

  return res.status(200).json(market[productToSearch]);
};

const listProducts = (req: Request, res: Response): Response => {
  return res.status(200).json(market);
};

const updateProduct = (req: Request, res: Response): Response => {
  const IndexProductToUpdate = res.locals.product.productIndex;

  const productUpdateData = req.body;

  market[IndexProductToUpdate] = {
    ...market[IndexProductToUpdate],
    ...productUpdateData,
  };

  return res.status(200).json(market[IndexProductToUpdate]);
};

const eraseProduct = (req: Request, res: Response): Response => {
  const { productIndex } = res.locals;

  market.splice(productIndex, 1);

  return res.status(204).json();
};

export {
  createProduct,
  listProductById,
  listProducts,
  updateProduct,
  eraseProduct,
};
