const { getLeads, getOrders, saveLead, saveOrder } = require('../services/leadService');

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(payload));
}

function getAdminLeads(req, res) {
  sendJson(res, 200, { success: true, leads: getLeads() });
}

function getAdminOrders(req, res) {
  sendJson(res, 200, { success: true, orders: getOrders() });
}

async function createLead(req, res) {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const payload = body ? JSON.parse(body) : {};
      if (!payload.name || (!payload.phone && !payload.email)) {
        sendJson(res, 400, { success: false, message: 'Name and phone or email are required' });
        return;
      }

      const lead = saveLead(payload);
      sendJson(res, 201, { success: true, lead });
    });
  } catch (error) {
    sendJson(res, 400, { success: false, message: error.message || 'Unable to save lead' });
  }
}

async function createOrder(req, res) {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const payload = body ? JSON.parse(body) : {};
      if (!payload.name || !payload.phone || !payload.address) {
        sendJson(res, 400, { success: false, message: 'Name, phone, and address are required' });
        return;
      }

      const order = saveOrder(payload);
      sendJson(res, 201, { success: true, order });
    });
  } catch (error) {
    sendJson(res, 400, { success: false, message: error.message || 'Unable to save order' });
  }
}

module.exports = {
  getAdminLeads,
  getAdminOrders,
  createLead,
  createOrder,
};
