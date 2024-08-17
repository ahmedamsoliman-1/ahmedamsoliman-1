const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  link: String,
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
