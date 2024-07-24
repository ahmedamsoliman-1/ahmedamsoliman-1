const express = require('express');
const axios = require('axios');
const router = express.Router();
const ll = require('../middleware/utils');


const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:5001/orders';
ll.llog('Order service URL: ' + ORDER_SERVICE_URL);

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(ORDER_SERVICE_URL);
    ll.llog('Orders fetched: ' + response.data.length);
    res.render('orders', { orders: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.post('/', async (req, res) => {
  try {
    await axios.post(ORDER_SERVICE_URL, req.body);
    ll.llog('Order created');
    res.redirect('/orders');
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = router;
