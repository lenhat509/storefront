import { Product, ProductStore } from '../models/products'
import express, { Request, Response } from 'express';
import { verifiedAuthentication, verifyPossession} from '../middleware/authentication'


export const store = new ProductStore();

const index = async (req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (error: any) {
        res.status(400);
        res.json(error.messages);
    }
}
const show = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const product = await store.show(id);
        res.json(product)
    } catch (error: any) {
        res.status(400);
        res.json(error.message);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const name = req.body.name;
        const price = req.body.price;
        const user_id = req.body.userJWTId;
        const product = await store.create(name, price, user_id);
        res.json(product);
    } catch (error: any) {
        res.status(400);
        res.json(error.message);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const name = req.body.name;
        const price = req.body.price;
        const product = await store.update(id, name, price);
        res.json(product);
    } catch (error: any) {
        res.status(400);
        res.json(error.message)
    }
} 

const destroy = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const product = await store.delete(id);
        res.json(product);
    } catch (error: any) {
        res.status(400);
        res.json(error.message)
    }
}

export const myProductsRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/product/:id', show);
    app.post('/product/create', verifiedAuthentication, create);
    app.put('/product/update/:id', verifyPossession, update);
    app.delete('/product/delete/:id', verifyPossession, destroy);
}