"use strict";

const express = require('express');

const authRoute = require('./auth');

const router = express.Router();

router.use(authRoute);

router.get('/test', (req,res,next) => {
    console.log(req.session,'session');
});

module.exports = router;
