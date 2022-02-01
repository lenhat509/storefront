import express from 'express';
import dotenv from 'dotenv';
import { myUsersRoutes } from './handlers/users'
import { myProductsRoutes } from './handlers/products';
import { myOrdersRoutes } from './handlers/orders';
import bodyParser from 'body-parser'

dotenv.config();
const app = express();
const port = process.env.PORT


app.use(bodyParser.json());

myUsersRoutes(app);
myProductsRoutes(app);
myOrdersRoutes(app);

app.listen(port, () => {
    console.log(`Listening to ${port}`)
});
