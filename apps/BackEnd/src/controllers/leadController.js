const { saveLead, getLeads } = require('../services/leadService');

/**
 * POST /api/leads — Create a new lead.
 */
async function createLead(req, res, next) {
  const { name, phone, email } = req.body;

  if (!name || (!phone && !email)) {
    return res.status(400).json({
      success: false,
      message: 'Name and phone or email are required',
    });
  }

  try {
    const lead = await saveLead({ name, phone, email });
    return res.status(201).json({ success: true, lead });
  } catch (error) {
    console.error('Error saving lead:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to save lead right now',
    });
  }
}

/**
 * GET /api/admin/leads — List all leads.
 */
async function getAdminLeads(req, res, next) {
  try {
    const leads = await getLeads();
    return res.json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve leads',
    });
  }
}

module.exports = {
  createLead,
  getAdminLeads,
};
