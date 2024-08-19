import express from 'express';

const app = express();
const port = 3003;

interface DeviceData {
  deviceId: string;
  temperature: number;
  humidity: number;
  timestamp: Date;
}

let deviceData: DeviceData[] = [];

// For simplicity, let's collect data directly here. In a real project, this data would come from Service B.
app.post('/data', (req, res) => {
  const { deviceId, temperature, humidity } = req.body;
  deviceData.push({ deviceId, temperature, humidity, timestamp: new Date() });
  res.status(201).send('Data received for analysis');
});

app.get('/analytics', (req, res) => {
  // Perform some basic analytics, e.g., average temperature
  const averageTemperature = deviceData.reduce((sum, data) => sum + data.temperature, 0) / deviceData.length;
  res.json({ averageTemperature });
});

app.listen(port, () => {
  console.log(`Analytics and Notification Service listening at http://localhost:${port}`);
});
