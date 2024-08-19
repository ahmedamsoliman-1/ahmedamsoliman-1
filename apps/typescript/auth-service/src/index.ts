import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { register, login } from './controllers/authController';
import winston from 'winston';
import { User } from './models/User';

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
  ),
  transports: [
      new winston.transports.Console(),
  ],
});



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
