"use strict";

const express = require('express');
const profiles = require('../data/profiles.json');

const router = express.Router();

const defaultMenu = function(data) {
    return {
        data: Object.assign({},{
            "title": "ONIBE",
            "header": "Team ONIBE Translations",
            "meta": {
                "title": "ONIBE",
                "description": "Love Live Translators",
                "facebook": {
                    "type": "blog",
                    "title": "onibe" || data.title,
                    "site_name": "onibe",
                }
            },
            "slogan": "",
            "nav": {
                "team": "/team",
                "about": "/about",
            },
            "social_media": {
                "facebook": "https://www.facebook.com/teamonibe/",
                "twitter": "https://twitter.com/teamonibe"
            },
            "copyright": "Team ONIBE ©"
        },data)
    };
};

// Render Pages
router.get('/', function(req, res, next) {
    res.render("homepage",defaultMenu({

    }));
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

    const username = req.params.username || null;
    const profile = username ? profiles.find(profile => profile.name.toLowerCase() === username) : null;

    if(profile) {
        res.render("profile", defaultMenu({
            "profile": profile
        }));
    } else {
        next();
    }

});


/* GET home page. */
router.get('/version', function(req, res, next) {
    res.json({'version':'alpha-0.0.1'});
});

module.exports = router;
