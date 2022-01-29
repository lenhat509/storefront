import { User, UserStore } from '../../models/users';

const store = new UserStore();
const dummyUsers: User[] = [
    {
        id : 1,
        firstname: 'Nhat',
        lastname: 'Le',
        password: 'lenhat'
    },
    {
        id : 2,
        firstname: 'Alex',
        lastname: 'Le',
        password: 'lenhat'
    },
    {
        id : 3,
        firstname: 'Steve',
        lastname: 'Phan',
        password: 'lenhat'
    }
]
describe("Tests User Model", () => {
    describe('Test create function', () => {
        it('Expecting user Nhat Le is created', async() => {
            const user = dummyUsers[0];
            const result: User = await store.create(
                user.firstname, 
                user.lastname,
                user.password
            );
            expect(result).toBeTruthy();
        });
        it('Expecting user Alex Le is created', async() => {
            const user = dummyUsers[1];
            const result: User = await store.create(
                user.firstname, 
                user.lastname,
                user.password
            );
            expect(result.firstname).toEqual('Alex');
        });
        it('Expecting user Steve Phan is created', async() => {
            const user = dummyUsers[2];
            const result: User = await store.create(
                user.firstname, 
                user.lastname,
                user.password
            );
            expect(result.password).toEqual('lenhat');
        });
        it('Expecting error thrown', async() => {
            const user = dummyUsers[0];
            await expectAsync(store.create(
                user.firstname, 
                user.lastname,
                user.password
            )).toBeRejectedWithError();
        })
    })

    describe('Testing index function', () => {
        it('Expecting 3 users', async () => {
            const users = await store.index();
            expect(users.length).toEqual(3);
        })
    })

    describe('Testing show function', () => {
        it('Expecting Nhat Le user', async () => {
            const user = await store.show(1);
            expect(user.firstname + ' ' + user.lastname).toEqual('Nhat Le');
        })
        it('Expecting an error', async () => {
            await expectAsync(store.show(4)).toBeRejectedWithError();
        })
    })

    describe('Testing update function', () => {
        it('Expecting new Andy Stephen user', async () => {
            const user = await store.update(1, 'Andy', 'Stephen');
            expect(user.firstname).toEqual('Andy');
        })
        it('Expecting an Error', async () => {
            await expectAsync(store.update(4, 'Andy', 'Le')).toBeRejectedWithError();
        })
        it('Expecting an Error', async () => {
            await expectAsync(store.update(2, 'Andy', 'Stephen')).toBeRejectedWithError();
        })
    })

    describe('Testing delete function', () => {
        it('Expecting an user deleted', async () => {
            const user = await store.delete(3);
            expect(user.firstname).toEqual('Steve');
        })
        it('Expecting an error', async () => {
            await expectAsync(store.delete(3)).toBeRejectedWithError();
        })
    })
})