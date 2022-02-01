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
const users_1 = require("../../models/users");
const store = new users_1.UserStore();
const dummyUsers = [
    {
        id: 1,
        firstname: 'Nhat',
        lastname: 'Le',
        password: 'lenhat'
    },
    {
        id: 2,
        firstname: 'Alex',
        lastname: 'Le',
        password: 'lenhat'
    },
    {
        id: 3,
        firstname: 'Steve',
        lastname: 'Phan',
        password: 'lenhat'
    }
];
xdescribe("Tests User Model", () => {
    describe('Test create function', () => {
        it('Expecting user Nhat Le is created', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = dummyUsers[0];
            const result = yield store.create(user.firstname, user.lastname, user.password);
            expect(result).toBeTruthy();
        }));
        it('Expecting user Alex Le is created', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = dummyUsers[1];
            const result = yield store.create(user.firstname, user.lastname, user.password);
            expect(result.firstname).toEqual('Alex');
        }));
        it('Expecting user Steve Phan is created', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = dummyUsers[2];
            const result = yield store.create(user.firstname, user.lastname, user.password);
            expect(result.password).toEqual('lenhat');
        }));
        it('Expecting error thrown', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = dummyUsers[0];
            yield expectAsync(store.create(user.firstname, user.lastname, user.password)).toBeRejectedWithError();
        }));
    });
    describe('Testing index function', () => {
        it('Expecting 3 users', () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield store.index();
            expect(users.length).toEqual(3);
        }));
    });
    describe('Testing show function', () => {
        it('Expecting Nhat Le user', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield store.show(1);
            expect(user.firstname + ' ' + user.lastname).toEqual('Nhat Le');
        }));
        it('Expecting an error', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expectAsync(store.show(4)).toBeRejectedWithError();
        }));
    });
    describe('Testing update function', () => {
        it('Expecting new Andy Stephen user', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield store.update(1, 'Andy', 'Stephen');
            expect(user.firstname).toEqual('Andy');
        }));
        it('Expecting an Error', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expectAsync(store.update(4, 'Andy', 'Le')).toBeRejectedWithError();
        }));
        it('Expecting an Error', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expectAsync(store.update(2, 'Andy', 'Stephen')).toBeRejectedWithError();
        }));
    });
    describe('Testing delete function', () => {
        it('Expecting an user deleted', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield store.delete(3);
            expect(user.firstname).toEqual('Steve');
        }));
        it('Expecting an error', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expectAsync(store.delete(3)).toBeRejectedWithError();
        }));
    });
});
