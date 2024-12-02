
/*
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/events', require('./routes/events'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/events', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


/*