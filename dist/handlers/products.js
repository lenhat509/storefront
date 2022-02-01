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
Object.defineProperty(exports, "__esModule", { value: true });
exports.myProductsRoutes = void 0;
const products_1 = require("../models/products");
const authentication_1 = require("../middleware/authentication");
const store = new products_1.ProductStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error.messages);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const product = yield store.show(id);
        res.json(product);
    }
    catch (error) {
        res.status(400);
        res.json(error.message);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const price = req.body.price;
        const product = yield store.create(name, price);
        res.json(product);
    }
    catch (error) {
        res.status(400);
        res.json(error.message);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const name = req.body.name;
        const price = req.body.price;
        const product = yield store.update(id, name, price);
        res.json(product);
    }
    catch (error) {
        res.status(400);
        res.json(error.message);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const product = yield store.delete(id);
        res.json(product);
    }
    catch (error) {
        res.status(400);
        res.json(error.message);
    }
});
const myProductsRoutes = (app) => {
    app.get('/products', index);
    app.get('/product/:id', show);
    app.post('/product/create', authentication_1.verifiedAuthentication, create);
    app.put('/product/update/:id', authentication_1.verifiedAuthorization, update);
    app.delete('/product/delete/:id', authentication_1.verifiedAuthorization, destroy);
};
exports.myProductsRoutes = myProductsRoutes;
