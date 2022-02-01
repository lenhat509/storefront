CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    price NUMERIC,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);