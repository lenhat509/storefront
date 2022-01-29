CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR CHECK( status IN ('complete', 'active')),
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);