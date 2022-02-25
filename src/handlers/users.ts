import { User, UserStore } from '../models/users';
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { store as orderStore } from './orders';
import { verifiedAuthentication, verifiedAuthorization} from '../middleware/authentication'

const {
    SECRET_PASSWORD: pepper,
    SALT_ROUNDS: saltRounds,
    SECRET_TOKEN: secret
} = process.env;

const store = new UserStore();

const index = async (req: Request, res: Response) => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (error: any) {
        res.status(400);
        res.json(error.messages);
    }
}
const show = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const user = await store.show(id);
        res.json(user)
    } catch (error: any) {
        res.status(400);
        res.json(error.message);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const password = req.body.password;
        const passwordEncrypted = bcrypt.hashSync(
            password + pepper, 
            parseInt(saltRounds as string)
        );
        const user = await store.create(firstname, lastname, passwordEncrypted);
        const token = jwt.sign(user, secret as string);
        const cart = await orderStore.create(user.id);
        res.json({user, cart, token});
    } catch (error: any) {
        res.status(400);
        res.json(error.message);
    }
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const password = req.body.password;
        const user = await store.authenticate(firstname, lastname);
        const authenticated = bcrypt.compareSync(password + pepper, user.password);
        if(!authenticated)
        {
            //res.json('Wrong password');
            return res.sendStatus(401);
        }
        const token = jwt.sign(user, secret as string);
        res.json({ user, token });
    } catch (error: any) {
        res.status(400);
        res.json(error.message);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const user = await store.update(id, firstname, lastname);
        res.json(user);
    } catch (error: any) {
        res.status(400);
        res.json(error.message)
    }
} 

const destroy = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const user = await store.delete(id);
        res.json(user);
    } catch (error: any) {
        res.status(400);
        res.json(error.message)
    }
}

export const myUsersRoutes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/user/:id', verifiedAuthentication, show);
    app.post('/user/signup', create);
    app.post('/user/signin', authenticate);
    app.put('/user/update/:id',verifiedAuthorization, update);
    app.delete('/user/delete/:id', verifiedAuthorization, destroy);
}