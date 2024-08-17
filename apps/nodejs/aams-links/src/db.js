const mongoose = require('mongoose');
require('dotenv').config(); 
const ll = require('./middleware/utils');

(async () => {
  mongoose.connect(process.env.MONGO_URL_AAMS_LINKS);
})();
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  ll.llog('Connected to MongoDB');
});

module.exports = db;
