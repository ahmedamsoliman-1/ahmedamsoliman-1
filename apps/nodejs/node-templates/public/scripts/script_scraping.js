document.addEventListener('DOMContentLoaded', () => {
  const getRandomQuote = async () => {
    try {
      const response = await fetch('/scraping/random-quote');
      if (!response.ok) {
        throw new Error(`Failed to fetch quote: ${response.statusText}`);
      }

      const data = await response.json();

      const quoteContainer = document.getElementById('random-quote');
      quoteContainer.innerHTML = `
        <div class="quote">
          <p>${data.quote.quote}</p>
          <p class="author">By ${data.quote.author}</p>
          <p class="tags">Tags: ${data.quote.tags.join(', ')}</p>
        </div>
      `;

    } catch (error) {
      console.error('Error fetching random quote:', error);
      const quoteContainer = document.getElementById('random-quote');
      quoteContainer.innerHTML = 'Error fetching quote. Please try again.';
    }
  };

  // Load a random quote initially
  // getRandomQuote();

  // Set up a click event to get a new random quote
  const getRandomQuoteButton = document.getElementById('get-random-quote');
  getRandomQuoteButton.addEventListener('click', getRandomQuote);
});




document.addEventListener('DOMContentLoaded', () => {
  const genericScrapeForm = document.getElementById('generic-scrape-form-title');
  const websiteTitleContainer = document.getElementById('website-title');

  genericScrapeForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const websiteUrlInput = document.getElementById('websiteUrl');
    const websiteUrl = websiteUrlInput.value;

    try {
      const response = await fetch(`/scraping/generic-scrape-page-title/title?websiteUrl=${encodeURIComponent(websiteUrl)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch website title: ${response.statusText}`);
      }

      const data = await response.json();
      websiteTitleContainer.innerHTML = `<p>${data.title}</p>`;
    } catch (error) {
      console.error('Error fetching website title:', error);
      websiteTitleContainer.innerHTML = 'Error fetching title. Please try again.';
    }
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const genericScrapeForm = document.getElementById('generic-scrape-content');
  const websiteTitleContainer = document.getElementById('website-content');

  genericScrapeForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const websiteUrlInput = document.getElementById('websiteUrl');
    const websiteUrl = websiteUrlInput.value;

    try {
      const response = await fetch(`/scraping/generic-scrape-content/content?websiteUrl=${encodeURIComponent(websiteUrl)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch website content: ${response.statusText}`);
      }

      const data = await response.json();
      websiteTitleContainer.innerHTML = `<p>${data.title}</p>`;
    } catch (error) {
      console.error('Error fetching website title:', error);
      websiteTitleContainer.innerHTML = 'Error fetching title. Please try again.';
    }
  });
});

