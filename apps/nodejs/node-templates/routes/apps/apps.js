const express = require('express');
const router = express.Router();

const middlewares = require('../../middlewares/utils');
const SVGs = require('../../SVGs')
const config = require('../../config');


// router.get('/aams/apps',  async (req, res) => {
//   try {
//     res.locals.message = 'Running Aps Page Loaded';
//     res.render('apps/apps', {
//       time: new Date(),
//       pageTitle: 'AAMS Running Apps',
//       user: req.user,
//       svgs: SVGs,
//     });
    
//   } catch (error) {
//     middlewares.llog(`Error: '${error}'`);
//   }
// });

router.get('/aams/apps', (req, res) => {
  // Hardcoded data
  const cards = [
    {
      _id: '66cb32f93e36868337f419f6',
      title: 'Web resume',
      description: 'aams pdf dev resume',
      image: '/images/www.png',
      link: 'https://webresume.aamsd.com/',
      category: 'resumes'
    },
    {
      _id: '66cb32f93e36868337f419f7',
      title: 'Project Tracker',
      description: 'Manage your projects effectively',
      image: '/images/project.png',
      link: 'https://projecttracker.example.com/',
      category: 'projects'
    },
    {
      _id: '66cb32f93e36868337f419f6',
      title: 'Web resume',
      description: 'aams pdf dev resume',
      image: '/images/www.png',
      link: 'https://webresume.aamsd.com/',
      category: 'resumes'
    },
    {
      _id: '66cb32f93e36868337f419f7',
      title: 'Project Tracker',
      description: 'Manage your projects effectively',
      image: '/images/project.png',
      link: 'https://projecttracker.example.com/',
      category: 'projects'
    }
    // Add more hardcoded card objects as needed
  ];

  // Simulate status check
  const cardStatuses = cards.map(card => {
    // Simulate status; for example, randomly set the status
    const isUp = Math.random() > 0.5; // 50% chance of being 'up'
    return { ...card, status: isUp ? 'up' : 'down' };
  });

  // Group cards by category
  const categories = [...new Set(cardStatuses.map(card => card.category))];
  const categorizedCards = categories.reduce((acc, category) => {
    acc[category] = cardStatuses.filter(card => card.category === category);
    return acc;
  }, {});

  res.render('apps/apps', {
    time: new Date(),
    pageTitle: 'AAMS Running Apps',
    user: req.user,
    svgs: SVGs,
    categorizedCards: categorizedCards
  });

  ll.llog('Index page rendered');
});



module.exports = router