
const cards = [
    {
        title: 'Example Site 1',
        description: 'This is an example description for site 1.',
        image: '/images/ahmed.png',
        link: 'https://example1.com'
    },
    {
        title: 'Example Site 2',
        description: 'This is an example description for site 2.',
        image: '/images/ahmed.png',
        link: 'https://example2.com'
    },
    {
        title: 'Example Site 1',
        description: 'This is an example description for site 1.',
        image: '/images/ahmed.png',
        link: 'https://example1.com'
    },
];

const express = require('express');
const router = express.Router();
const ll = require('../middleware/utils');
const Card = require('../models/Card'); // Assuming Card is your Mongoose model

// List all cards
router.get('/', async (req, res) => {
  const cards = await Card.find();
  res.render('index', { cards });
  ll.llog('Index page rendered');
});

// Add a new card
router.post('/add', async (req, res) => {
  const { title, description, image, link } = req.body;
  const newCard = new Card({ title, description, image, link });
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
  const { title, description, image, link } = req.body;
  await Card.findByIdAndUpdate(id, { title, description, image, link });
  ll.llog('Card updated');
  res.redirect('/');
});

module.exports = router;
