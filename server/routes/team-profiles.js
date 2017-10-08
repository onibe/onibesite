'use strict';

const profiles = require('../data/profiles.json');
const uniqBy = require('lodash/uniqBy');
const menu = require('./menu');

class TeamProfileRoute {

    constructor() {


    }

    static getProfiles() {
        const roles = [
            "translator",
            "admin",
            "typesetter",
            "qc",
            "website",
            "designer",
            "manager",
            "social_media"
        ];

        const roledProfiles = uniqBy(roles.map(role =>
            profiles.filter((profile) => profile.role.map(profileRole => profileRole.toLowerCase()).includes(role))
        ).reduce((a,b) => a.concat(b)), 'username');

        const nonRoleProfiles = profiles.filter((profile) => profile.role.length === 0);

        return roledProfiles.concat(nonRoleProfiles);
    }

    getTeam(req, res, next) {
        const getProfiles = TeamProfileRoute.getProfiles;

        res.render("team/team", menu.defaultMenu({
            "team": getProfiles()
        }));
    }

    getTeamProfile (req, res, next) {
        const username = req.params.username ? req.params.username.toLowerCase() : null;
        const profile = username ? profiles.find(profile => profile.username.toLowerCase() === username) : null;

        if(profile) {
            res.render("profile/profile", menu.defaultMenu({
                "profile": profile
            }));
        } else {
            next();
        }
    }

}


module.exports = new TeamProfileRoute();