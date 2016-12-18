"use strict";

const express = require('express');
const profiles = require('../data/profiles.json');

const router = express.Router();

const defaultMenu = function(data) {
    return {
        data: Object.assign({},{
            "title": "onibe",
            "header": "Team Onibe Translation Group",
            "description": "Love Live Translators",
            "slogan": "",
            "nav": {
                "team": "/team",
                "about": "/about",
            },
            "social_media": {
                "facebook": "https://www.facebook.com/teamonibe/",
                "twitter": "https://twitter.com/teamonibe"
            },
            "copyright": "Copyright © 2016, Team Onibe | All rights reserved"
        },data)
    };
};

// Render Pages
router.get('/', function(req, res, next) {
    res.render("homepage",defaultMenu({

    }));
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
    res.render("about", defaultMenu({

    }));
});


router.get('/team', function(req, res, next) {
    res.render("team",defaultMenu({
        "team": profiles
    }));
});


router.get('/team/:username', function(req, res, next) {

    console.log(req.params.username);
    res.render("profile",defaultMenu({
        "profile": profiles.find(profile => profile.name === req.params.username)
    }));
});


/* GET home page. */
router.get('/version', function(req, res, next) {
    res.json({'version':'alpha-0.0.1'});
});

module.exports = router;
