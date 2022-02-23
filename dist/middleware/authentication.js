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
exports.verifyOrderPossession = exports.verifyPossession = exports.verifiedAuthorization = exports.verifiedAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const products_1 = require("../handlers/products");
const orders_1 = require("../handlers/orders");
dotenv_1.default.config();
const verifiedAuthentication = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
        req.body.userJWTId = payload.id;
        next();
    }
    catch (error) {
        return res.sendStatus(401);
    }
};
exports.verifiedAuthentication = verifiedAuthentication;
const verifiedAuthorization = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
        const id = parseInt(req.params.id);
        if (id !== payload.id)
            return res.sendStatus(403);
        next();
    }
    catch (error) {
        return res.sendStatus(403);
    }
};
exports.verifiedAuthorization = verifiedAuthorization;
const verifyPossession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
        const id = parseInt(req.params.id);
        const product = yield products_1.store.show(id);
        if (product.user_id !== payload.id)
            return res.sendStatus(403);
        next();
    }
    catch (error) {
        return res.sendStatus(403);
    }
});
exports.verifyPossession = verifyPossession;
const verifyOrderPossession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
        const id = parseInt(req.params.id);
        const order = yield orders_1.store.show(id);
        if (order.user_id !== payload.id)
            return res.sendStatus(403);
        next();
    }
    catch (error) {
        return res.sendStatus(403);
    }
});
exports.verifyOrderPossession = verifyOrderPossession;
