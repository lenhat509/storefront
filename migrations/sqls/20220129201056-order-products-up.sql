CREATE TABLE order_products (
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    PRIMARY KEY(order_id, product_id),
    quantity INTEGER
);