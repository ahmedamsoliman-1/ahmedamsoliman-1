import express from 'express';

const app = express();
const port = 3003;

app.use(express.json());

app.post('/process-data', (req, res) => {
  const { data } = req.body;
  console.log(`Service C processed: ${data}`);
  res.send('Data processed by Service C');
});

app.listen(port, () => {
  console.log(`Service C listening at http://localhost:${port}`);
});
