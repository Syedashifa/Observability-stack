const express = require('express');
const client = require('prom-client');

const app = express();
const PORT = 3000;

// Collect default OS and Node.js process metrics (CPU, Memory, Event Loop lag)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

// 1. Metric: Total HTTP Request Counter
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests processed',
  labelNames: ['method', 'route', 'status_code']
});

// 2. Metric: Request Duration Histogram (Latency Tracker)
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 3, 5] // Latency buckets up to 5 seconds
});

// Middleware to record metrics for every incoming request
app.use((req, res, next) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const durationInSeconds = diff[0] + diff[1] / 1e9;

    const route = req.route ? req.route.path : req.path;
    httpRequestCounter.inc({ method: req.method, route: route, status_code: res.statusCode });
    httpRequestDuration.observe({ method: req.method, route: route, status_code: res.statusCode }, durationInSeconds);
  });

  next();
});

// Prometheus Scrape Endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// App Routes
app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Everything is running smoothly!' });
});

app.get('/slow', (req, res) => {
  setTimeout(() => {
    res.json({ status: 'success', delay: '3000ms', message: 'This took 3 seconds to respond.' });
  }, 3000);
});

app.get('/error', (req, res) => {
  res.status(500).json({ status: 'error', code: 500, message: 'Internal Server Error: Database query failed!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Instrumented server running on http://0.0.0.0:${PORT}`);
});
