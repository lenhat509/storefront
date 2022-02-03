import { OrderProduct, OrderProductStore } from "../models/order_products";
import express, {Request, Response} from 'express';
import { store as productStore } from "./products";
import { store as orderStore } from "./orders";
import { verifiedAuthentication, verifyOrderPossession } from "../middleware/authentication";

export const store = new OrderProductStore();

const index = async (req: Request, res: Response) => {
    try {
        const orderProduct = await store.index();
        res.json(orderProduct);
    } catch (error: any) {
        res.status(400);
        res.json(error.messages);
    }
}
const getProductsDetail = async (products: OrderProduct[]) => {
    const productsList = products.map(async (item: OrderProduct) => {
        const productDetail = await productStore.show(item.product_id)
        return {          
            product_id: productDetail.id,
            name: productDetail.name,
            price: productDetail.price,
            quantity: item.quantity
        }
    })
    return Promise.all(productsList);
}
const showProducts = async (req: Request, res: Response) => {
    try {
        const order_id = parseInt(req.params.id);
        const products = await store.showProducts(order_id);
        const details = await getProductsDetail(products);
        res.json({ [order_id]:  details })
    } catch (error: any) {
        res.status(400);
        res.json(error.message);
    }
}

const addProduct = async (req: Request, res: Response) => {
    try {
        const user_id = parseInt(req.body.userJWTId);
        const product_id = parseInt(req.body.product_id);
        const quantity = parseInt(req.body.quantity);
        const order = await orderStore.showActive(user_id);
        const orderProduct = await store.create({order_id: order.id, product_id, quantity});
        res.json(orderProduct)
    } catch (error: any) {
        res.status(400);
        res.json(error.message);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const user_id = parseInt(req.body.userJWTId);
        const product_id = parseInt(req.body.product_id);
        const quantity = parseInt(req.body.quantity);
        const order = await orderStore.showActive(user_id);
        const orderProduct = await store.update({order_id: order.id, product_id, quantity});
        res.json(orderProduct);
    } catch (error: any) {
        res.status(400);
        res.json(error.message)
    }
} 

const destroy = async (req: Request, res: Response) => {
    try {
        const user_id = parseInt(req.body.userJWTId);
        const product_id = parseInt(req.params.product_id);
        const order = await orderStore.showActive(user_id);
        const deleted = await store.delete(order.id, product_id);
        res.json(deleted);
    } catch (error: any) {
        res.status(400);
        res.json(error.message)
    }
}

export const myOrderProductRoutes = (app: express.Application) => {
    app.get('/cart', index);
    app.get('/cart/:id', verifyOrderPossession, showProducts);
    app.post('/cart/add', verifiedAuthentication, addProduct);
    app.put('/cart/update', verifiedAuthentication, update);
    app.delete('/cart/delete/:product_id', verifiedAuthentication, destroy);
}