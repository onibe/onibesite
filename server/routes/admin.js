"use strict";

const express = require('express');

class AdminApp {
    constructor(middleware) {

        const router = express.Router();

        // Load Client Side Application
        router.get('/*', function(req,res,next) {
            res.render('admin/admin');
        });

        this.router = router;
    }
}


module.exports = AdminApp;