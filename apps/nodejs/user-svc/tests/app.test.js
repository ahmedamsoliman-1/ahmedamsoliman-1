const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const { getUser, createUser, resetUsers } = require('../src/user');
const ll = require('../src/middleware/utils');

jest.mock('../src/middleware/utils', () => ({
  llog: jest.fn(),
}));

const app = express();
app.use(bodyParser.json());
app.get('/users', (req, res) => {
  ll.llog("Users returned");
  res.json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ]);
});

app.get('/users/:userId', (req, res) => {
  const user = getUser(req.params.userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.post('/users', (req, res) => {
  const user = createUser(req.body);
  res.status(201).json(user);
});

describe('User API', () => {
  beforeEach(() => {
    resetUsers();
  });

  test('should return all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ]);
  });

  test('should return a single user by id', async () => {
    createUser({ name: 'Alice', email: 'alice@example.com' });
    const response = await request(app).get('/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ name: 'Alice', email: 'alice@example.com' });
  });

  test('should return 404 for non-existent user', async () => {
    const response = await request(app).get('/users/999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'User not found' });
  });

  test('should create a new user', async () => {
    const userData = { name: 'Alice', email: 'alice@example.com' };
    const response = await request(app)
      .post('/users')
      .send(userData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: '1', ...userData });
  });
});
