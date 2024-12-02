const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  text: { type: String, required: true, maxlength: 60 },
});

module.exports = mongoose.model('Event', eventSchema);
