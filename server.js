const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const scanRoutes = require('./routes/scan');
const threatRoutes = require('./routes/threat');

app.use('/api/auth', authRoutes);
app.use('/api/scan', scanRoutes);
app.use('/api/threats', threatRoutes);

const PORT = process.env.PORT || 5000;
const rawMongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/quickphish';

const normalizeMongoUri = (uri) => {
  try {
    const normalizedUri = uri.replace(/([?&])app(?=(&|$))/g, '$1').replace(/[?&]$/g, '');
    return normalizedUri;
  } catch (err) {
    return uri;
  }
};

const MONGO_URI = normalizeMongoUri(rawMongoUri);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
