import express from 'express';
import { myUsersRoutes } from './src/handlers/users'
import { myProductsRoutes } from './src/handlers/products';
import { myOrdersRoutes } from './src/handlers/orders';
import { myOrderProductRoutes } from './src/handlers/order_products';
import bodyParser from 'body-parser'
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json());

myUsersRoutes(app);
myProductsRoutes(app);
myOrdersRoutes(app);
myOrderProductRoutes(app);

app.listen(port, () => {
    console.log(`Listening to ${port}`)
});
