const express = require('express');
const router = express.Router();
const axios = require('axios');
const ll = require('../middleware/utils');
const Card = require('../models/Card');

// List all cards, grouped by category
router.get('/', async (req, res) => {
  const cards = await Card.find();
  const cardStatuses = await Promise.all(cards.map(async (card) => {
    try {
      const response = await axios.get(card.link);
      return { ...card._doc, status: response.status === 200 ? 'up' : 'down' };
    } catch (error) {
      return { ...card._doc, status: 'down' };
    }
  }));

  // Group cards by category
  const categories = [...new Set(cardStatuses.map(card => card.category))];
  const categorizedCards = categories.reduce((acc, category) => {
    acc[category] = cardStatuses.filter(card => card.category === category);
    return acc;
  }, {});

  res.render('index', { categorizedCards });
  ll.llog('Index page rendered');
});

// Add a new card
router.post('/add', async (req, res) => {
  const { title, description, image, link, category } = req.body;
  const newCard = new Card({ title, description, image, link, category });
  await newCard.save();
  ll.llog('New card added');
  res.redirect('/');
});

// Delete a card
router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Card.findByIdAndDelete(id);
  ll.llog('Card deleted');
  res.redirect('/');
});

// Update a card
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, image, link, category } = req.body;
  await Card.findByIdAndUpdate(id, { title, description, image, link, category });
  ll.llog('Card updated');
  res.redirect('/');
});

module.exports = router;
