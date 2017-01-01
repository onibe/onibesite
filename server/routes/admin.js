"use strict";

const express = require('express');

const router = express.Router();

// Load Client Side Application
router.get('/*', function(req,res,next) {
    res.render('admin/admin');
});


module.exports = router;