import db from "../database";

export type User = {
    id: number,
    firstname: string,
    lastname: string,
    password: string
}

export class UserStore {
    async index() : Promise<User[]> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get users ${error}`)
        }
    }
    async show(id: number): Promise<User> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM users WHERE id = $1';
            const result = await conn.query(sql, [id]);
            if(result.rowCount == 0)
                throw new Error('User does not exist');
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not get users ${error}`)
        }
    }
    async create(firstname: string, lastname: string, password: string): Promise<User> {
        try {
            const conn = await db.connect();
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [firstname, lastname, password]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not create user ${error}`)
        }
    }
    async update(id: number, firstname: string, lastname: string): Promise<User>
    {
        try {
            const conn = await db.connect();
            const sql = 'UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *';
            const result = await conn.query(sql, [firstname, lastname, id]);
            conn.release();
            if(result.rowCount == 0)
                throw new Error('User does not exist');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not update user ${error}`)
        }
    }
    async delete(id: number) : Promise<User> {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
            const result = await conn.query(sql, [id]);
            conn.release();
            if(result.rowCount == 0)
                throw new Error('User does not exist');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not delete user ${error}`)
        }
    }

    async authenticate(firstname: string, lastname: string): Promise<User> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM users WHERE firstname = $1 AND lastname = $2';
            const result = await conn.query(sql, [firstname, lastname]);
            if(result.rowCount == 0)
                throw new Error('User does not exist');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not get user ${error}`)
        }
    }
}