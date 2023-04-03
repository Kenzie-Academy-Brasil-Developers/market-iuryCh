import express, { Application, json } from 'express';
import { createProduct, eraseProduct, readProducts } from './logic';
import { ensureProductExist, filterProductByName } from './middlewares';

const app: Application = express();
app.use(json());


app.post('/products', filterProductByName, createProduct);
app.get('/products', readProducts);
app.get('/products/:id', ensureProductExist);
app.patch('/products/:id', ensureProductExist, filterProductByName);
app.delete('/products/:id', ensureProductExist, eraseProduct);

const port: number = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
