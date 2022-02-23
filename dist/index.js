"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = require("./handlers/users");
const products_1 = require("./handlers/products");
const orders_1 = require("./handlers/orders");
const order_products_1 = require("./handlers/order_products");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
(0, users_1.myUsersRoutes)(app);
(0, products_1.myProductsRoutes)(app);
(0, orders_1.myOrdersRoutes)(app);
(0, order_products_1.myOrderProductRoutes)(app);
app.listen(port, () => {
    console.log(`Listening to ${port}`);
});
