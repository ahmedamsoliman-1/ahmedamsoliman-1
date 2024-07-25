const express = require('express');
const router = express.Router();
var middleware = require("../middlewares/scraping");


const authController = require('../controllers/authController');

router.get('/scraping',  (req, res) => {
  res.render('scraping', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'Scraping'
  });
  res.locals.message = `Scraping Main Page Loaded!`;
});


// const puppeteer = require('puppeteer');
// const { execSync } = require('child_process');

// router.get('/trigger-aws-login', async (req, res) => {
//   try {
//     // Execute command to fetch the verification code
//     const output = execSync('aws sso login --profile chess-dev').toString();
//     console.log('Output of AWS SSO login command:', output);

    // // Extract verification code from output
    // const codeMatch = output.match(/Then enter the code:\s+(\S+)/);
    // if (!codeMatch || codeMatch.length < 2) {
    //   throw new Error('Verification code not found in command output.');
    // }
    // const verificationCode = codeMatch[1];
    // console.log('Verification code:', verificationCode);

    // // Launch puppeteer browser
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    
    // // Navigate to AWS SSO authorization page
    // await page.goto('https://device.sso.eu-west-1.amazonaws.com/');
    
    // // Wait for input field to be visible
    // await page.waitForSelector('#verification_code');
    
    // // Enter verification code
    // await page.type('#verification_code', verificationCode);
    
    // // Click on the submit button
    // await page.click('#submit_button');
    
    // // Close the browser
    // await browser.close();

    // res.send('AWS SSO login successful.');
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Error occurred during AWS SSO login.');
//   }
// });


router.get('/scraping/random-quote',  middleware.scrapingQuotesMiddleware, (req, res) => {
  const { quotes } = req;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  res.locals.message = ``;

  res.json({ quote: randomQuote });
});


router.get('/scraping/generic-scrape-page-title/title',  middleware.genericScraperMiddlewarepageTitle, (req, res) => {
  const { pageTitle } = req;
  res.locals.message = ``;
  res.json({ title: pageTitle });
});

router.get('/scraping/generic-scrape-content/content',  middleware.genericScraperMiddlewareContent, (req, res) => {
  const { pageContent } = req;
  res.locals.message = ``;
  res.json({ title: pageContent });
});



module.exports = router;
