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
exports.OrderStore = exports.Status = void 0;
const database_1 = __importDefault(require("../database"));
var Status;
(function (Status) {
    Status["ACTIVE"] = "active";
    Status["COMPLETE"] = "complete";
})(Status = exports.Status || (exports.Status = {}));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Can not get orders ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id = $1';
                const result = yield conn.query(sql, [id]);
                if (result.rowCount == 0)
                    throw new Error('Order does not exist');
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not get orders ${error}`);
            }
        });
    }
    showActive(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE status = $1 AND user_id = $2';
                const result = yield conn.query(sql, [Status.ACTIVE, user_id]);
                if (result.rowCount == 0)
                    throw new Error('Order does not exist/alrealy complete');
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not get orders ${error}`);
            }
        });
    }
    create(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *';
                const result = yield conn.query(sql, [user_id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not create Order ${error}`);
            }
        });
    }
    complete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE orders SET status = $1 WHERE id = $2 AND status = $3 RETURNING *';
                const result = yield conn.query(sql, [Status.COMPLETE, id, Status.ACTIVE]);
                conn.release();
                if (result.rowCount == 0)
                    throw new Error('Order does not exist/already completed');
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not complete Order ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM orders WHERE id = $1 AND status = $2 RETURNING *';
                const result = yield conn.query(sql, [id, Status.COMPLETE]);
                conn.release();
                if (result.rowCount == 0)
                    throw new Error('Order does not exist/is still active');
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not delete Order ${error}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
