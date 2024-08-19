import axios from 'axios';
import express from 'express';

const app = express();
const port = 3001;

app.get('/send-data', async (req, res) => {
  try {
    const response = await axios.post('http://service-b:3002/receive-data', { data: 'Hello from Service A' });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error sending data to Service B');
  }
});

app.listen(port, () => {
  console.log(`Service A listening at http://localhost:${port}`);
});
