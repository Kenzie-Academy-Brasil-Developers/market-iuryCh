import express, { Application, json } from 'express';
import { createProduct, eraseProduct, readProducts } from './logic';
import { ensureProductExist, filterProductByName } from './middlewares';

const app: Application = express();
app.use(json());

//create products
app.post('/products', filterProductByName, createProduct);
//list all products
app.get('/products', readProducts);
//list especif product
app.get('/products/:id', ensureProductExist);
//update product
app.patch('/products/:id', ensureProductExist, filterProductByName);
//delete product
app.delete('/products/:id', ensureProductExist, eraseProduct);

const port: number = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
