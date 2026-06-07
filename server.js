const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'QuickPhish API is running successfully 🚀'
  });
});

// Routes
const authRoutes = require('./routes/auth');
const scanRoutes = require('./routes/scan');
const threatRoutes = require('./routes/threat');

app.use('/api/auth', authRoutes);
app.use('/api/scan', scanRoutes);
app.use('/api/threats', threatRoutes);

// Environment Variables
const PORT = process.env.PORT || 5000;
const rawMongoUri =
  process.env.MONGO_URI || 'mongodb://localhost:27017/quickphish';

// Fix malformed Mongo URI
const normalizeMongoUri = (uri) => {
  try {
    return uri
      .replace(/([?&])app(?=(&|$))/g, '$1')
      .replace(/[?&]$/g, '');
  } catch (err) {
    return uri;
  }
};

const MONGO_URI = normalizeMongoUri(rawMongoUri);

// Database Connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
  });