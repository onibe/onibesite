"use strict";

const express = require('express');

// Middleware
const middleware = require('../middleware');

class AdminRoute {
    constructor() {
        this.router = express.Router();
        this.setRoutes();
    }

    setRoutes() {
        const router = this.router;
        const authenticatePrivate = [
            middleware.authenticateSession
        ];

        // Load Client Side Application
        router.get('/*', authenticatePrivate, function(req,res,next) {
            res.render('admin/admin');
        });

    }
}


module.exports = new AdminRoute();