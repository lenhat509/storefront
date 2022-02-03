import db from "../database";

export type OrderProduct = {
    order_id: number,
    product_id: number,
    quantity: number
}

export class OrderProductStore {
    async index (): Promise<OrderProduct[]> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM order_products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get order_products ${error}`)
        }
    }
    async showProducts(order_id: number): Promise<OrderProduct[]> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM order_products WHERE order_id = $1';
            const result = await conn.query(sql, [order_id]);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get order_product ${error}`)
        }
    }
    async create(cart: OrderProduct): Promise<OrderProduct> {
        try {
            const conn = await db.connect();
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [cart.order_id, cart.product_id, cart.quantity]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not create order_product ${error}`)
        }
    }
    async update(cart: OrderProduct): Promise<OrderProduct>
    {
        try {
            const conn = await db.connect();
            const sql = 'UPDATE order_products SET quantity = $3 WHERE order_id = $1 AND product_id = $2 RETURNING *';
            const result = await conn.query(sql, [cart.order_id, cart.product_id, cart.quantity]);
            conn.release();
            if(result.rowCount == 0)
                throw new Error('OrderProduct does not exist');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not update order_product ${error}`)
        }
    }
    async delete(order_id: number, product_id: number) : Promise<OrderProduct> {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM order_products WHERE order_id = $1 AND product_id = $2 RETURNING *';
            const result = await conn.query(sql, [order_id, product_id]);
            conn.release();
            if(result.rowCount == 0)
                throw new Error('OrderProduct does not exist');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not delete order_product ${error}`)
        }
    }
}