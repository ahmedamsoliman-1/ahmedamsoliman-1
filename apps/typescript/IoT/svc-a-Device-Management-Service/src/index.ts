import express from 'express';

const app = express();
const port = 3001;

interface Device {
  id: string;
  name: string;
  type: string;
  status: string;
}

let devices: Device[] = [];

app.use(express.json());

app.post('/devices', (req, res) => {
  const { id, name, type, status } = req.body;
  devices.push({ id, name, type, status });
  res.status(201).send('Device registered successfully');
});

app.get('/devices', (req, res) => {
  res.json(devices);
});

app.listen(port, () => {
  console.log(`Device Management Service listening at http://localhost:${port}`);
});
