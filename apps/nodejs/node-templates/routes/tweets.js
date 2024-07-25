// const express = require('express');
// const router = express.Router();
// var tweetService = require("../services/tweetService");





// async function chaos(res) {
//   const codes = [400, 401, 403, 404, 409, 500];
//   const rand = Math.floor(Math.random() * 500);

//   if (rand < 450) {
//     const pause = Math.floor(Math.random() * 500);
//     return setTimeout(() => {}, pause);
//   }
//   res.statusCode = codes[Math.floor(Math.random() * codes.length)];
//   throw new Error('BOOM !');
// }

  



// router.get('/tweets', async (req, res) => {
//   const route = req.route.path;
//   try {
//     await chaos(res);
//     const tweets = await tweetService.listTweets();
//     res.json(tweets);
//     res.locals.message = `Tweet Listed Successfully`;
//   } catch (err) {
//     res.send(err.message);
//   }
// });


// router.post('/tweets', async (req, res) => {
//   const route = req.route.path;
//   try {
//     const { message } = req.body;
//     await chaos(res);
//     const created = await tweetService.createTweet(message);
//     res.locals.message = `Tweet Posted Successfully`;
//     res.status(201).json(created);
//   } catch (err) {
//     res.send(err.message);
//   }
// });


// module.exports = router;
