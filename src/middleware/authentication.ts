import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express, {Request, Response } from 'express';
import { User } from '../models/users';
import { store as productStore } from '../handlers/products';
import { store as orderStore} from '../handlers/orders'
dotenv.config();

export const verifiedAuthentication = (req: Request, res: Response, next: any) => {
    try {
        const authHeader = req.headers.authorization as string;
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.SECRET_TOKEN as string) as User;
        req.body.userJWTId = payload.id;
        next()
    } catch (error: any) {
        return res.sendStatus(401);
    }
    
}

export const verifiedAuthorization = (req: Request, res: Response, next: any) => {
    try {
        const authHeader = req.headers.authorization as string;
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.SECRET_TOKEN as string) as User;
        const id = parseInt(req.params.id);
        if(id !== payload.id)
            return res.sendStatus(403)
        next()
    } catch (error: any) {
        return res.sendStatus(403);
    }
    
}
export const verifyPossession =  async (req: Request, res: Response, next: any) => {
    try {
        const authHeader = req.headers.authorization as string;
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.SECRET_TOKEN as string) as User;
        const id = parseInt(req.params.id);
        const product = await productStore.show(id);
        if(product.user_id !== payload.id)
            return res.sendStatus(403)
        next()
    } catch (error: any) {
        return res.sendStatus(403);
    }
    
}

export const verifyOrderPossession =  async (req: Request, res: Response, next: any) => {
    try {
        const authHeader = req.headers.authorization as string;
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.SECRET_TOKEN as string) as User;
        const id = parseInt(req.params.id);
        const order = await orderStore.show(id);
        if(order.user_id !== payload.id)
            return res.sendStatus(403)
        next()
    } catch (error: any) {
        return res.sendStatus(403);
    }
    
}