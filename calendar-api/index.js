const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./config/passport');


dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173/', credentials: true })); // Update with your frontend URL
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY], // Replace with a secure key
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(passport.initialize());
app.use(passport.session());
console.log('MongoDB URI:', process.env.MONGO_URI);

// Database connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
