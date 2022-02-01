"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifiedAuthorization = exports.verifiedAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifiedAuthentication = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
        next();
    }
    catch (error) {
        //res.json(error.messages);
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
        //res.json(error.messages);
        return res.sendStatus(403);
    }
};
exports.verifiedAuthorization = verifiedAuthorization;
