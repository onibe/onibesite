const express = require('express');
const router = express.Router();

// Start with /auth

router.get('/', function(req, res, next) {
    req.session.regenerate(function(err) {
        res.send('respond with a resource');
    })
});

module.exports = router;
