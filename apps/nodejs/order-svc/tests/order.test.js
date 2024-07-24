const { getOrder, createOrder, resetOrders } = require('../src/order');
const axios = require('axios');
jest.mock('axios');

describe('Order Service', () => {
  beforeEach(() => {
    resetOrders();
  });

  test('should create a new order', async () => {
    const orderData = { userId: '1', item: 'Laptop', quantity: 1, price: 1500 };

    axios.get.mockResolvedValue({ status: 200 });

    const result = await createOrder(orderData);
    expect(result.order).toEqual({ id: '1', ...orderData });
  });

  // test('should return the correct order by id', () => {
  //   const orderData = { userId: '1', item: 'Laptop', quantity: 1, price: 1500 };
  //   createOrder(orderData);

  //   const order = getOrder('1');
  //   expect(order).toEqual(orderData);
  // });

  test('should return undefined for non-existent order', () => {
    const order = getOrder('999');
    expect(order).toBeUndefined();
  });
});
