const express = require('express');
const router = express.Router();

// Start with /auth

router.get('/login', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
