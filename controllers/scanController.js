const axios = require('axios');
const Scan = require('../models/Scan');
const Threat = require('../models/Threat');

exports.scanUrl = async (req, res) => {
  try {
    const { url, userId } = req.body;
    
    // Simulate PhishTank / AI scan logic for now
    // In a real app, you'd call PhishTank or Google Safe Browsing API here
    
    const maliciousKeywords = ['phish', 'malware', 'login', 'signin', 'verify', 'confirm', 'account', 'update', 'secure-login', 'banking', 'credential', 'login-security', 'verify-account', 'update-info', 'secure-bank', 'paypal-update'];
    const suspiciousTlds = ['.ru', '.tk', '.xyz', '.top', '.buzz'];
    
    const normalizedUrl = url.toLowerCase();
    let isMalicious = maliciousKeywords.some(kw => normalizedUrl.includes(kw)) ||
                      suspiciousTlds.some(tld => normalizedUrl.endsWith(tld));
    
    let result = isMalicious ? 'Malicious' : 'Safe';
    let riskLevel = isMalicious ? 'High' : 'Low';
    
    if (!isMalicious && (url.includes('bit.ly') || url.includes('tinyurl'))) {
      result = 'Suspicious';
      riskLevel = 'Medium';
    }

    if (result !== 'Safe') {
      const newThreat = new Threat({
        url,
        riskLevel,
        category: 'Phishing',
        details: 'Detected by QuickPhish heuristic engine.'
      });
      await newThreat.save();
    }

    const newScan = new Scan({
      userId,
      url,
      result,
    });
    await newScan.save();

    res.json({ url, result, riskLevel });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
