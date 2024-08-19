import express from 'express';

const app = express();
const port = 3002;

interface DeviceData {
  deviceId: string;
  temperature: number;
  humidity: number;
  timestamp: Date;
}

let deviceData: DeviceData[] = [];

app.use(express.json());

app.post('/data', (req, res) => {
  const { deviceId, temperature, humidity } = req.body;
  deviceData.push({ deviceId, temperature, humidity, timestamp: new Date() });
  res.status(201).send('Data collected successfully');
});

app.get('/data', (req, res) => {
  res.json(deviceData);
});

app.listen(port, () => {
  console.log(`Data Collection Service listening at http://localhost:${port}`);
});
