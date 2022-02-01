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
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Can not get products ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products WHERE id = $1';
                const result = yield conn.query(sql, [id]);
                if (result.rowCount == 0)
                    throw new Error('Product does not exist');
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not get product ${error}`);
            }
        });
    }
    create(name, price) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
                const result = yield conn.query(sql, [name, price]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not create product ${error}`);
            }
        });
    }
    update(id, name, price) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *';
                const result = yield conn.query(sql, [name, price, id]);
                conn.release();
                if (result.rowCount == 0)
                    throw new Error('Product does not exist');
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not update product ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM products WHERE id = $1 RETURNING *';
                const result = yield conn.query(sql, [id]);
                conn.release();
                if (result.rowCount == 0)
                    throw new Error('Product does not exist');
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not delete product ${error}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
