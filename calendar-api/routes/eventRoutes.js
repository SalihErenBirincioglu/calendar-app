const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

// Get all events for a user
router.get('/:userId', async (req, res) => {
  try {
    const events = await Event.find({ userId: req.params.userId }).sort('date');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Create a new event
router.post('/', async (req, res) => {
  try {
    const { userId, date, time, text } = req.body;
    const newEvent = new Event({ userId, date, time, text });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;
