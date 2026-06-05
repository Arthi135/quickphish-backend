const express = require('express');
const router = express.Router();
const Threat = require('../models/Threat');

router.get('/', async (req, res) => {
  try {
    const threats = await Threat.find().sort({ detectedAt: -1 });
    res.json(threats);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/stats', async (req, res) => {
  try {
    const total = await Threat.countDocuments();
    const high = await Threat.countDocuments({ riskLevel: 'High' });
    const critical = await Threat.countDocuments({ riskLevel: 'Critical' });
    res.json({ total, high, critical });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
