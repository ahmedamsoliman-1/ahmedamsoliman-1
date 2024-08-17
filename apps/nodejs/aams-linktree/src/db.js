const mongoose = require('mongoose');
require('dotenv').config(); 
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cardsDB';

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
