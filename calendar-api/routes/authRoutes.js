const express = require('express');
const passport = require('passport');

const router = express.Router();

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Auth Callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:5173/'); // Redirect to frontend
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send(err);
    res.redirect('http://localhost:5173/');
  });
});

// Get Current User
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
