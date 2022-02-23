"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM order_products';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Can not get order_products ${error}`);
            }
        });
    }
    showProducts(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM order_products WHERE order_id = $1';
                const result = yield conn.query(sql, [order_id]);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Can not get order_product ${error}`);
            }
        });
    }
    create(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
                const result = yield conn.query(sql, [cart.order_id, cart.product_id, cart.quantity]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not create order_product ${error}`);
            }
        });
    }
    update(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE order_products SET quantity = $3 WHERE order_id = $1 AND product_id = $2 RETURNING *';
                const result = yield conn.query(sql, [cart.order_id, cart.product_id, cart.quantity]);
                conn.release();
                if (result.rowCount == 0)
                    throw new Error('OrderProduct does not exist');
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not update order_product ${error}`);
            }
        });
    }
    delete(order_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM order_products WHERE order_id = $1 AND product_id = $2 RETURNING *';
                const result = yield conn.query(sql, [order_id, product_id]);
                conn.release();
                if (result.rowCount == 0)
                    throw new Error('OrderProduct does not exist');
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not delete order_product ${error}`);
            }
        });
    }
}
exports.OrderProductStore = OrderProductStore;
