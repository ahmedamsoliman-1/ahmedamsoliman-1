const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB URIs
const mongoURIs = [
  'mongodb://localhost:27017',
  'mongodb://localhost:27018',
  'mongodb://localhost:27019',
  'mongodb://localhost:27020'
];

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Function to connect to MongoDB and get collections
const getCollections = async (uri) => {
  let client;
  try {
    client = await MongoClient.connect(uri); // Removed deprecated options
    const db = client.db();
    const collections = await db.listCollections().toArray();
    return {
      status: 'Connected',
      collections: collections.map(col => col.name),
  };
  } catch (error) {
    return { 
        status: `Error: ${error.message}`, 
        collections: []
    };
  } finally {
    if (client) {
      await client.close();
    }
  }
};

// // Route to get MongoDB status
// app.get('/', async (req, res) => {
//   const statuses = await Promise.all(mongoURIs.map(uri => getCollections(uri)));
//   res.render('status', { statuses });
// });


app.get('/', async (req, res) => {
  // const statuses = await Promise.all(mongoURIs.map(uri => getCollections(uri)));
  res.render('index', { mongoURIs });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
