const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// CORS setup - only allow the configured frontend origin(s), comma-separated
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// Mount all API routes under /api
app.use('/api', routes);

// Root fallback
app.get('/', (req, res) => {
  res.json({
    message: 'Fernforest API Backend',
    endpoints: ['/api/health', '/api/leads', '/api/orders', '/api/admin/leads', '/api/admin/orders'],
  });
});

// Centralized error handling (must be registered after routes)
app.use(errorHandler);

module.exports = app;
