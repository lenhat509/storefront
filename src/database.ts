import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const {
    POSTGRES_DB,
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_DB_TEST,
    POSTGRES_PASSWORD,
    ENV
} = process.env

let db: Pool;
if(ENV == "test")
{
    db = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })
}
else
{
    db = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })
}

export default db;