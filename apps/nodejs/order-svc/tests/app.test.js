const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const { getOrder, createOrder, resetOrders } = require('../src/order');
const ll = require('../src/middleware/utils');

jest.mock('axios');
jest.mock('../src/middleware/utils', () => ({
  llog: jest.fn(),
}));

const app = express();
app.use(bodyParser.json());

app.get('/orders', (req, res) => {
  ll.llog("Orders returned");
  res.json([
    { id: 1, item: 'Laptop', quantity: 1, price: 1500 },
    { id: 2, item: 'Phone', quantity: 2, price: 800 }
  ]);
});

app.get('/orders/:orderId', (req, res) => {
  const order = getOrder(req.params.orderId);
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.post('/orders', async (req, res) => {
  const orderData = req.body;
  const { order, error } = await createOrder(orderData);
  if (error) {
    res.status(400).json({ error });
  } else {
    res.status(201).json(order);
  }
});

describe('Order API', () => {
  beforeEach(() => {
    resetOrders();
  });

  test('should return all orders', async () => {
    const response = await request(app).get('/orders');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, item: 'Laptop', quantity: 1, price: 1500 },
      { id: 2, item: 'Phone', quantity: 2, price: 800 }
    ]);
  });

  // test('should return a single order by id', async () => {
  //   const orderData = { userId: '1', item: 'Laptop', quantity: 1, price: 1500 };
  //   await createOrder(orderData);

  //   const response = await request(app).get('/orders/1');
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual({ id: '1', ...orderData });
  // });

  test('should return 404 for non-existent order', async () => {
    const response = await request(app).get('/orders/999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Order not found' });
  });

  test('should create a new order', async () => {
    const orderData = { userId: '1', item: 'Laptop', quantity: 1, price: 1500 };

    axios.get.mockResolvedValue({ status: 200 });

    const response = await request(app)
      .post('/orders')
      .send(orderData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: '1', ...orderData });
  });

  test('should return 400 if user does not exist', async () => {
    const orderData = { userId: '999', item: 'Laptop', quantity: 1, price: 1500 };

    axios.get.mockResolvedValue({ status: 404 });

    const response = await request(app)
      .post('/orders')
      .send(orderData);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'User not found' });
  });

  test('should return 400 if user service fails', async () => {
    const orderData = { userId: '1', item: 'Laptop', quantity: 1, price: 1500 };

    axios.get.mockRejectedValue(new Error('Network Error'));

    const response = await request(app)
      .post('/orders')
      .send(orderData);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'User service error' });
  });
});
