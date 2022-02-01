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
exports.myUsersRoutes = void 0;
const users_1 = require("../models/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authentication_1 = require("../middleware/authentication");
dotenv_1.default.config();
const { SECRET_PASSWORD: pepper, SALT_ROUNDS: saltRounds, SECRET_TOKEN: secret } = process.env;
const store = new users_1.UserStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (error) {
        res.status(400);
        res.json(error.messages);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const user = yield store.show(id);
        res.json(user);
    }
    catch (error) {
        res.status(400);
        res.json(error.message);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const password = req.body.password;
        const passwordEncrypted = bcrypt_1.default.hashSync(password + pepper, parseInt(saltRounds));
        const user = yield store.create(firstname, lastname, passwordEncrypted);
        const token = jsonwebtoken_1.default.sign(user, secret);
        res.json({ user, token });
    }
    catch (error) {
        res.status(400);
        res.json(error.message);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const password = req.body.password;
        const user = yield store.authenticate(firstname, lastname);
        const authenticated = bcrypt_1.default.compareSync(password + pepper, user.password);
        if (!authenticated) {
            //res.json('Wrong password');
            return res.sendStatus(401);
        }
        const token = jsonwebtoken_1.default.sign(user, secret);
        res.json({ user, token });
    }
    catch (error) {
        res.status(400);
        res.json(error.message);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const user = yield store.update(id, firstname, lastname);
        res.json(user);
    }
    catch (error) {
        res.status(400);
        res.json(error.message);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const user = yield store.delete(id);
        res.json(user);
    }
    catch (error) {
        res.status(400);
        res.json(error.message);
    }
});
const myUsersRoutes = (app) => {
    app.get('/users', authentication_1.verifiedAuthentication, index);
    app.get('/user/:id', authentication_1.verifiedAuthentication, show);
    app.post('/user/signup', create);
    app.post('/user/signin', authenticate);
    app.put('/user/update/:id', authentication_1.verifiedAuthorization, update);
    app.delete('/user/delete/:id', authentication_1.verifiedAuthorization, destroy);
};
exports.myUsersRoutes = myUsersRoutes;
