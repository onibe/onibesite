"use strict";

const express = require('express');
const profiles = require('../data/profiles.json');
const uniqBy = require('lodash/uniqBy');

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

const roles = [
    "admin",
    "translator",
    "typesetter",
    "qc",
    "website",
    "manager",
    "social_media",
    ""
];

const sortedProfile = uniqBy(roles.map(role =>
     profiles.filter((profile) => profile.role.map(profileRole => profileRole.toLowerCase()).includes(role))
).reduce((a,b) => a.concat(b)), 'username');

router.get('/team', function(req, res, next) {
    res.render("team",defaultMenu({
        "team": sortedProfile
    }));
});


router.get('/team/:username', function(req, res, next) {

    const username = req.params.username ? req.params.username.toLowerCase() : null;
    const profile = username ? profiles.find(profile => profile.username.toLowerCase() === username) : null;

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
