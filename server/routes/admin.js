"use strict";

const express = require('express');

class AdminApp {
    constructor(middleware) {

        const router = express.Router();

        const authenticatePrivate = [
            middleware.authenticateSession
        ];

        // Load Client Side Application
        router.get('/*', authenticatePrivate, function(req,res,next) {
            res.render('admin/admin');
        });

        this.router = router;
    }
}


module.exports = AdminApp;