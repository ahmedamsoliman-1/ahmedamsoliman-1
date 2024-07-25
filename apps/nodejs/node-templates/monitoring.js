// monitoring.js
const prometheus = require('prom-client');
const middleare = require('./middlewares/utils');




// Define metrics
const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
});





// Middleware to measure request duration
function measureRequestDuration(req, res, next) {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.url, status_code: res.statusCode });
  });
  res.locals.message = 'Started Measuring Request Duration';
  const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`
  const connected = `- ${middleare.colorMiddleware.cyan} ${res.locals.message}`
  console.log(time, connected);
  next();
}



async function exposeMetrics(req, res) {
  try {
    const metrics = await prometheus.register.metrics();
    res.set('Content-Type', prometheus.register.contentType);
    res.locals.message = 'Metrics Exposed Successfully';
    res.end(metrics);
  } catch (error) {
    console.error('Error while exposing metrics:', error);
    res.status(500).send('Error while exposing metrics');
  }
}





module.exports = { measureRequestDuration, exposeMetrics };


