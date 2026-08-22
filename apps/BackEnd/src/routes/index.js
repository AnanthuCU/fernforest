const express = require('express');
const healthRouter = require('./health');
const leadsRouter = require('./leads');
const ordersRouter = require('./orders');

const router = express.Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(ordersRouter);

module.exports = router;
