const express = require('express');
const cors = require('cors');
require('dotenv').config();

const healthRouter = require('./src/routes/health');
const leadsRouter = require('./src/routes/leads');
const ordersRouter = require('./src/routes/orders');

const app = express();
const PORT = process.env.PORT || 4000;

// CORS setup - allow all origins in development or configured host
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// Routes
app.use('/api', healthRouter);
app.use('/api', leadsRouter);
app.use('/api', ordersRouter);

// Root fallback
app.get('/', (req, res) => {
  res.json({
    message: 'Fernforest API Backend',
    endpoints: ['/api/health', '/api/leads', '/api/orders', '/api/admin/leads', '/api/admin/orders'],
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Fernforest Backend API server listening on port ${PORT}`);
});

module.exports = app;
