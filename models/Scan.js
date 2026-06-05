const mongoose = require('mongoose');

const ScanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  url: { type: String, required: true },
  result: { type: String, enum: ['Safe', 'Suspicious', 'Malicious'], required: true },
  scannedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scan', ScanSchema);
