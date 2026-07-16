const path = require('path');
const { readJson, writeJson } = require('../utils/storage');

const LEADS_FILE = path.join(__dirname, '..', '..', 'data', 'leads.json');
const ORDERS_FILE = path.join(__dirname, '..', '..', 'data', 'orders.json');

function getLeads() {
  return readJson(LEADS_FILE, []);
}

function getOrders() {
  return readJson(ORDERS_FILE, []);
}

function saveLead(lead) {
  const leads = getLeads();
  const newLead = {
    id: `${Date.now()}`,
    ...lead,
    createdAt: new Date().toISOString(),
  };

  leads.push(newLead);
  writeJson(LEADS_FILE, leads);
  return newLead;
}

function saveOrder(order) {
  const orders = getOrders();
  const newOrder = {
    id: `${Date.now()}`,
    ...order,
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  writeJson(ORDERS_FILE, orders);
  return newOrder;
}

module.exports = {
  getLeads,
  getOrders,
  saveLead,
  saveOrder,
};
