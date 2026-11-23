const crypto = require('crypto');

/**
 * Express middleware that only lets requests through when they carry
 * `Authorization: Bearer <ADMIN_API_TOKEN>`.
 * If ADMIN_API_TOKEN is not configured, admin routes are disabled entirely.
 */
function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_API_TOKEN;

  if (!expected) {
    return res.status(503).json({
      success: false,
      message: 'Admin API is not configured',
    });
  }

  const header = req.get('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  return next();
}

module.exports = requireAdmin;
