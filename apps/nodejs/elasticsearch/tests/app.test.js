const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const indexRouter = require('../src/routes/index');
const ll = require('../src/middleware/utils');

jest.mock('axios');
jest.mock('../src/middleware/utils', () => ({
  llog: jest.fn(),
}));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));

app.use('/', indexRouter);

describe('Elastic search App', () => {
  test('should render index page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Ahmed');
  });
});
