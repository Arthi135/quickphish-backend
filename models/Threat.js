const mongoose = require('mongoose');

const ThreatSchema = new mongoose.Schema({
  url: { type: String, required: true },
  riskLevel: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  category: { type: String, default: 'Phishing' },
  detectedAt: { type: Date, default: Date.now },
  source: { type: String, default: 'QuickPhish AI' }, // e.g., 'PhishTank', 'Safe Browsing', 'AI Prediction'
  details: { type: String }
});

module.exports = mongoose.model('Threat', ThreatSchema);
