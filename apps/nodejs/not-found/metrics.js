const promClient = require('prom-client');;
const middlewares = require('./utils/middlewares');

// Initialize the Registry and Metrics
const register = new promClient.Registry();

// Default system metrics
promClient.collectDefaultMetrics({ register });

// Create custom HTTP request counter
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'status_code'],
  registers: [register], // Make sure to register the metric
});

// Function to expose metrics middleware
const setupMetrics = (app) => {
  app.use((req, res, next) => {
    res.on('finish', () => {
      httpRequestCounter.labels(req.method, res.statusCode).inc();
    });
    next();
  });

  // Expose /metrics endpoint
  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  });
};

middlewares.llog("Prom Initialize the Registry and Metrics")

module.exports = { setupMetrics };
