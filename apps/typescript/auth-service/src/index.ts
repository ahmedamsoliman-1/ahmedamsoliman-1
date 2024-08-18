import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { register, login } from './controllers/authController';
import winston from 'winston';

dotenv.config();

const app = express();
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

app.use(express.json());

// // src/index.ts or another initialization file
// import mongoose from 'mongoose';
import { User } from './models/User';

// const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI!)
  .then(() => {
    console.log('MongoDB connected');
    // Create index if not already created
    User.collection.createIndex({ username: 1 }, { unique: true })
      .then(() => console.log('Unique index created on username'))
      .catch(err => console.error('Error creating unique index', err));
  })
  .catch(err => console.error('MongoDB connection error', err));


// Connect to MongoDB
mongoose.connect(mongoURI!)
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error', err));

// Define routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
