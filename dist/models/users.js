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
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Can not get users ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE id = $1';
                const result = yield conn.query(sql, [id]);
                if (result.rowCount == 0)
                    throw new Error('User does not exist');
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not get users ${error}`);
            }
        });
    }
    create(firstname, lastname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
                const result = yield conn.query(sql, [firstname, lastname, password]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not create user ${error}`);
            }
        });
    }
    update(id, firstname, lastname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *';
                const result = yield conn.query(sql, [firstname, lastname, id]);
                conn.release();
                if (result.rowCount == 0)
                    throw new Error('User does not exist');
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not update user ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
                const result = yield conn.query(sql, [id]);
                conn.release();
                if (result.rowCount == 0)
                    throw new Error('User does not exist');
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not delete user ${error}`);
            }
        });
    }
}
exports.UserStore = UserStore;
