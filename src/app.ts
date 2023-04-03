import express, { Application, json } from 'express';
import { createProduct, readProducts } from './logic';
import { ensureProductExist } from './middlewares';

const app: Application = express();
app.use(json());

//create products
app.post('/products', createProduct);
//list all products
app.get('/products', readProducts);
//list especif product
app.get('/products/:id', ensureProductExist);
//update product
app.patch('/products/:id', ensureProductExist);
//delete product
app.delete('/products/:id');

const port: number = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
