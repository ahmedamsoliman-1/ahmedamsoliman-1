import express from 'express';
import mongoose from 'mongoose';
import { register, login } from './controllers/authController';
import { User } from './models/User';
import { Config } from './utils/config';
import logger from './utils/logger';

const app = express();
app.use(express.json());

const port = Config.port;
const mongoURI = Config.mongo_uri;



mongoose.connect(mongoURI!)
  .then(() => {
    User.collection.createIndex({ username: 1 }, { unique: true })
      .then(() => logger.info('Unique index created on username field'))
      .catch(err => console.error('Error creating unique index', err));
  })
  .catch(err => console.error('MongoDB connection error', err));


// Connect to MongoDB
mongoose.connect(mongoURI!)
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error', err));

app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

app.listen(port, () => {
  logger.info(`Authentication Server running on port ${port}`);
});
