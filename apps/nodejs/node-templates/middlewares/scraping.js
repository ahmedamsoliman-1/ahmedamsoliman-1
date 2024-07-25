const puppeteer = require('puppeteer');


const middlewares = {};



middlewares.scrapingQuotesMiddleware = async function (req, res, next) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://quotes.toscrape.com');

    const quotes = await page.evaluate(() => {
      const quoteElements = document.querySelectorAll('.quote');
      return Array.from(quoteElements).map(quoteElement => {
        const quoteText = quoteElement.querySelector('.text').textContent.trim();
        const author = quoteElement.querySelector('.author').textContent.trim();
        const tags = Array.from(quoteElement.querySelectorAll('.tag')).map(tag => tag.textContent.trim());
        return { quote: quoteText, author, tags };
      });
    });

    await browser.close();

    req.quotes = quotes;

    next();
  } catch (error) {
    console.error('Error during scraping middleware:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






middlewares.genericScraperMiddlewarepageTitle = async function (req, res, next) {
  const { websiteUrl } = req.query;

  if (!websiteUrl) {
    return res.status(400).json({ error: 'Missing websiteUrl parameter' });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(websiteUrl);

    const pageTitle = await page.title();

    await browser.close();

    req.pageTitle = pageTitle;

    next();
  } catch (error) {
    console.error('Error during generic scraping middleware:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


middlewares.genericScraperMiddlewareContent = async function (req, res, next) {
  const { websiteUrl } = req.query;

  if (!websiteUrl) {
    return res.status(400).json({ error: 'Missing websiteUrl parameter' });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(websiteUrl);

    const pageContent = await page.content();

    await browser.close();

    req.pageContent = pageContent;

    next();
  } catch (error) {
    console.error('Error during generic scraping middleware:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





module.exports = middlewares;
