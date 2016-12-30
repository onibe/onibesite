"use strict";

const express = require('express');
const profiles = require('../data/profiles.json');
const uniqBy = require('lodash/uniqBy');

const router = express.Router();

const defaultMenu = (data) => {
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
router.get('/', (req, res, next) => {
    res.render("homepage/homepage",defaultMenu({

    }));
});

router.get('/about', (req, res, next) => {

    req.session.regenerate(function(err) {
        res.render("about/about", defaultMenu({

        }));
    })

});


// @todo: Move this to getProfiles();
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

const roledProfiles = uniqBy(roles.map(role =>
     profiles.filter((profile) => profile.role.map(profileRole => profileRole.toLowerCase()).includes(role))
).reduce((a,b) => a.concat(b)), 'username');

const nonRoleProfiles = profiles.filter((profile) => profile.role.length === 0);

const sortedProfiles = roledProfiles.concat(nonRoleProfiles);

router.get('/team', function(req, res, next) {
    res.render("team/team",defaultMenu({
        "team": sortedProfiles
    }));
});


router.get('/team/:username', (req, res, next) => {

    const username = req.params.username ? req.params.username.toLowerCase() : null;
    const profile = username ? profiles.find(profile => profile.username.toLowerCase() === username) : null;

    if(profile) {
        res.render("profile/profile", defaultMenu({
            "profile": profile
        }));
    } else {
        next();
    }

});

// router.get('/article', function(req, res, next) {
//     res.render("article/article", defaultMenu({}));
// });


router.get('/version', function(req, res, next) {
    res.json({'version':'alpha-0.0.1'});
});

module.exports = router;
