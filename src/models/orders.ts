import db from "../database";

export enum Status {
    ACTIVE = 'active',
    COMPLETE = 'complete'
}

export type Order = {
    id: number,
    status: Status,
    user_id: number
}

export class OrderStore {
    async index() : Promise<Order[]> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get orders ${error}`)
        }
    }
    async show(id: number): Promise<Order> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM orders WHERE id = $1';
            const result = await conn.query(sql, [id]);
            if(result.rowCount == 0)
                throw new Error('Order does not exist');
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not get orders ${error}`)
        }
    }
    async showActive(user_id: number): Promise<Order> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM orders WHERE status = $1 AND user_id = $2';
            const result = await conn.query(sql, [Status.ACTIVE, user_id]);
            if(result.rowCount == 0)
                throw new Error('Order does not exist/alrealy complete');
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not get orders ${error}`)
        }
    }
    async create(user_id: number): Promise<Order> {
        try {
            const conn = await db.connect();
            const sql = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *';
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not create Order ${error}`)
        }
    }
    async complete(id: number): Promise<Order>
    {
        try {
            const conn = await db.connect();
            const sql = 'UPDATE orders SET status = $1 WHERE id = $2 AND status = $3 RETURNING *';
            const result = await conn.query(sql, [Status.COMPLETE, id, Status.ACTIVE]);
            conn.release();
            if(result.rowCount == 0)
                throw new Error('Order does not exist/already completed');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not complete Order ${error}`)
        }
    }
    async delete(id: number) : Promise<Order> {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM orders WHERE id = $1 AND status = $2 RETURNING *';
            const result = await conn.query(sql, [id, Status.COMPLETE]);
            conn.release();
            if(result.rowCount == 0)
                throw new Error('Order does not exist/is still active');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not delete Order ${error}`)
        }
    }
}