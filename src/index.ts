import express from 'express';
import dotenv from 'dotenv';
import { myUsersRoutes } from './handlers/users'
import { myProductsRoutes } from './handlers/products';
import { myOrdersRoutes } from './handlers/orders';
import { myOrderProductRoutes } from './handlers/order_products';
import bodyParser from 'body-parser'
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json());

myUsersRoutes(app);
myProductsRoutes(app);
myOrdersRoutes(app);
myOrderProductRoutes(app);

app.listen(port, () => {
    console.log(`Listening to ${port}`)
});
