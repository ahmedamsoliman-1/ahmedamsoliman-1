const express = require('express');
const bodyParser = require('body-parser');
const { getOrder, createOrder } = require('./order');
const ll = require('./middleware/utils');

const prometheus = require('./prometheus');

const app = express();
app.use(prometheus.countRequests);
app.get('/metrics', prometheus.getMetrics);app.use(bodyParser.json());

const orders = [
  { id: 1, item: 'Laptop', quantity: 1, price: 1500 },
  { id: 2, item: 'Phone', quantity: 2, price: 800 }
];

app.get('/orders', (req, res) => {
  ll.llog("Orders returned");
  res.json(orders);
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

const port = process.env.PORT || 5001;
const node = require("os").hostname();
const currentDate = new Date();
const currentTime = currentDate.toLocaleString();

app.listen(port, () => {
  ll.llog("Service Information:");
  console.table({
    "App Name": 'ServiceHub-Orders-SVC',
    "Server Name": node,
    "Start Time": currentTime,
    "Server URL": `http://localhost:${port}`,
  });
});
