"use strict";

var express = require('express');
var router = express.Router();

// Render Pages
router.get('/', function(req, res, next) {
    res.render("homepage",{
        "title": "Onibe",
        "data": {
            "title":"Homepage",
            "permission": ["admin"]
        }
    });
});

/* GET Home Page */
router.get('/main', function(req, res, next) {
    res.render("main",{
        "title": "Onibe",
        "data": {
            "title":"Onibe"
        }
    });
});

router.get('/about', function(req, res, next) {
    res.render("about",{});
});


router.get('/services', function(req, res, next) {
    res.render("services",{});
});

/* GET home page. */
router.get('/version', function(req, res, next) {
    res.json({'version':'alpha-0.0.1'});
});

module.exports = router;
