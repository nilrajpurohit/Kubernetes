const express = require('express');
const mysql = require('mysql2/promise');
const client = require('prom-client');
const pino = require('pino');

const logger = pino();
const app = express();

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequests = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP Requests'
});

register.registerMetric(httpRequests);

const pool = mysql.createPool({
  host: 'mysql-service',
  user: 'root',
  password: 'password',
  database: 'testdb'
});

app.get('/', async (req, res) => {
  httpRequests.inc();

  logger.info('Root endpoint called');

  try {
    const [rows] = await pool.query('SELECT NOW() as time');

    res.json({
      message: 'Observability Stack Working',
      mysqlTime: rows[0]
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(3000, () => {
  logger.info('Server running on port 3000');
});