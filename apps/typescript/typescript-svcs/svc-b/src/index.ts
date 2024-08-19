import axios from 'axios';
import express from 'express';

const app = express();
const port = 3002;

app.use(express.json());

app.post('/receive-data', async (req, res) => {
  try {
    const { data } = req.body;
    console.log(`Service B received: ${data}`);
    const response = await axios.post('http://service-c:3003/process-data', { data });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error processing data');
  }
});

app.listen(port, () => {
  console.log(`Service B listening at http://localhost:${port}`);
});
