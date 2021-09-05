const express = require('express');

// router
const router = express.Router();

// healthcheck route
router.get('/healthcheck', (req, res) => {
  res.status(200).json({ status: 'available' });
});

export default router;
