import { Order, OrderStore, Status } from '../models/orders'
import express, { Request, Response } from 'express';
import { verifyOrderPossession} from '../middleware/authentication'


export const store = new OrderStore();

const index = async (req: Request, res: Response) => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch (error: any) {
        res.status(400);
        res.json(error.messages);
    }
}
const show = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const order = await store.show(id);
        res.json(order)
    } catch (error: any) {
        res.status(400);
        res.json(error.message);
    }
}

const showActive = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.user_id);
        const order = await store.showActive(id);
        res.json(order)
    } catch (error: any) {
        res.status(400);
        res.json(error.message);
    }
}

const complete = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const order = await store.complete(id);
        const newOrder = await store.create(order.user_id);
        res.json({order, newOrder});
    } catch (error: any) {
        res.status(400);
        res.json(error.message)
    }
} 

const destroy = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const order = await store.delete(id);
        res.json(order);
    } catch (error: any) {
        res.status(400);
        res.json(error.message)
    }
}

export const myOrdersRoutes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/order/:id', show);
    app.get('/order/active/:user_id', showActive);
    app.put('/order/complete/:id', verifyOrderPossession, complete);
    app.delete('/order/delete/:id', verifyOrderPossession, destroy);
}