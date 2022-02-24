import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const {
    POSTGRES_DB,
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_DB_TEST,
    POSTGRES_PASSWORD,
    ENV,
    POSTGRES_PORT
} = process.env

let db: Pool;
if(ENV == "test")
{
    db = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: parseInt(POSTGRES_PORT as string)
    })
}
else
{
    db = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: parseInt(POSTGRES_PORT as string)
    })
}

export default db;