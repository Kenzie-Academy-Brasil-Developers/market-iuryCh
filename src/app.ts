import express, { Application, json } from 'express';
import {
  createProduct,
  eraseProduct,
  listProductById,
  listProducts,
  updateProduct,
} from './logic';
import { ensureProductExist, nonRepeatedProductName } from './middlewares';

const app: Application = express();
app.use(json());

app.post('/products', nonRepeatedProductName, createProduct);
app.get('/products', listProducts);
app.get('/products/:id', ensureProductExist, listProductById);
app.patch(
  '/products/:id',
  ensureProductExist,
  nonRepeatedProductName,
  updateProduct
);
app.delete('/products/:id', ensureProductExist, eraseProduct);

const port: number = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
