import db from "../database";

export type Product = {
    id: number,
    name: string,
    price: number,
    user_id: number
}

export class ProductStore {
    async index (): Promise<Product[]> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get products ${error}`)
        }
    }
    async show(id: number): Promise<Product> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM products WHERE id = $1';
            const result = await conn.query(sql, [id]);
            if(result.rowCount == 0)
                throw new Error('Product does not exist');
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not get product ${error}`)
        }
    }
    async create(name: number, price: string, user_id: number): Promise<Product> {
        try {
            const conn = await db.connect();
            const sql = 'INSERT INTO products (name, price, user_id) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [name, price, user_id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not create product ${error}`)
        }
    }
    async update(id: number, name: number, price: string): Promise<Product>
    {
        try {
            const conn = await db.connect();
            const sql = 'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *';
            const result = await conn.query(sql, [name, price, id]);
            conn.release();
            if(result.rowCount == 0)
                throw new Error('Product does not exist');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not update product ${error}`)
        }
    }
    async delete(id: number) : Promise<Product> {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM products WHERE id = $1 RETURNING *';
            const result = await conn.query(sql, [id]);
            conn.release();
            if(result.rowCount == 0)
                throw new Error('Product does not exist');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not delete product ${error}`)
        }
    }
}