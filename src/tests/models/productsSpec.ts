import { Product , ProductStore} from '../../models/products';

const store = new ProductStore();

// describe('Testing Product model', () => {
//     it('Expecting a product', async () => {
//         const product = await store.show(1);
//         console.log(product);
//         expect(product.name).toBeInstanceOf(String);
//     })
// })