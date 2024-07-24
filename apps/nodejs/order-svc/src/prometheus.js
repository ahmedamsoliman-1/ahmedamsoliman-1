const client = require('prom-client');
const ll = require('./middleware/utils');

ll.llog('Initializing Prometheus metrics');

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const requestCounter = new client.Counter({
  name: 'node_request_operations_total',
  help: 'The total number of processed requests',
  labelNames: ['method', 'endpoint']
});
register.registerMetric(requestCounter);

const requestDuration = new client.Gauge({
  name: 'node_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'endpoint']
});
register.registerMetric(requestDuration);

const statusCounter = new client.Counter({
  name: 'node_request_status_codes_total',
  help: 'The total number of HTTP status codes returned',
  labelNames: ['status_code']
});
register.registerMetric(statusCounter);

const getMetrics = async (req, res) => {
  ll.llog(`Metrics endpoint hit at ${new Date().toLocaleString()}`);
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
};

const countRequests = (req, res, next) => {
  ll.llog(`Incrementing counter for ${req.method} ${req.path} at ${new Date().toLocaleString()}`);
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000; 
    requestCounter.inc({ method: req.method, endpoint: req.path });
    requestDuration.set({ method: req.method, endpoint: req.path }, duration);
    statusCounter.inc({ status_code: res.statusCode });
  });
  next();
};

module.exports = {
  getMetrics,
  countRequests
};
