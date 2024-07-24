const axios = require('axios');

let orders = {};
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:5000/users';

const getOrder = (orderId) => orders[orderId];

const createOrder = async (orderData) => {
  const userId = orderData.userId;
  try {
    const userResponse = await axios.get(`${USER_SERVICE_URL}/${userId}`);
    if (userResponse.status !== 200) {
      return { error: 'User not found' };
    }

    const orderId = (Object.keys(orders).length + 1).toString();
    orders[orderId] = orderData;
    return { order: { id: orderId, ...orderData } };
  } catch (error) {
    return { error: 'User service error' };
  }
};

const resetOrders = () => {
  orders = {};
};

module.exports = { getOrder, createOrder, resetOrders };
