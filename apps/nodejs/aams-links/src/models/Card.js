const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: { type: String, default: 'images/www.png' },
  link: String,
  category: { type: String, default: 'default' } 
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
