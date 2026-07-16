const http = require('http');
const { getHealth } = require('../controllers/healthController');
const { getAdminLeads, getAdminOrders, createLead, createOrder } = require('../controllers/leadController');

function createApp() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      res.end();
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/health') {
      getHealth(req, res);
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/admin/leads') {
      getAdminLeads(req, res);
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/admin/orders') {
      getAdminOrders(req, res);
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/leads') {
      createLead(req, res);
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/orders') {
      createOrder(req, res);
      return;
    }

    res.writeHead(404, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end(JSON.stringify({ success: false, message: 'Route not found' }));
  });
}

module.exports = createApp;
