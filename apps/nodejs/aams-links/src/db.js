const mongoose = require('mongoose');
require('dotenv').config(); 
const ll = require('./middleware/utils');

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  ll.llog('Connected to MongoDB');
});

module.exports = db;
