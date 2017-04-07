"use strict";

const express = require('express');
const profiles = require('../data/profiles.json');
const uniqBy = require('lodash/uniqBy');

// Middleware
const middleware = require('../middleware');

const model = require('../models');
const menu = require('./menu');
const postRoute = require('./posts');
const authRoute = require('./auth');
const teamProfileRoute = require('./team-profiles');

class SiteRoute {
    constructor() {
        this.router = express.Router();
        this.setRoutes();
    }

    setRoutes() {
        const router = this.router;

        // Render Pages
        router.get('/', (req, res, next) => {
            res.render("homepage/homepage",menu.defaultMenu({

            }));
        });

        router.get('/about', (req, res, next) => {
            req.session.regenerate(function(err) {
                res.render("about/about", menu.defaultMenu({}));
            });
        });

        router.get('/login', authRoute.getLoginPage);
        router.post('/login', authRoute.postLoginCredentials);
        router.get('/logout', authRoute.logout);

        router.get('/team', teamProfileRoute.getTeam);
        router.get('/team/:username', teamProfileRoute.getTeamProfile);

        router.get('/version', function(req, res, next) {
            res.json({'version':'alpha-0.0.1'});
        });

        router.get('/posts/', postRoute.pageList);
        router.get('/posts/:page', postRoute.pageList);
        router.get('/post/:id', postRoute.page);

        // !IMPORTANT @TODO: HARD CODED LINK PLS FIX
        router.get('/callguide', (req, res, next) => {
            const post = model.post;

            post.findOne({where: { id: 4, draft: 0}})
                .then(post => {
                    res.render("posts/post", menu.defaultMenu({
                        "post": post,
                        "meta": {
                            title: post.title
                        }
                    }));
                })
                .catch(() => {
                    next();
                });

        });

        // !IMPORTANT @TODO: HARD CODED LINK PLS FIX
        router.get('/concertguide', (req, res, next) => {
            const post = model.post;

            post.findOne({where: { id: 5, draft: 0}})
                .then(post => {
                    res.render("posts/post", menu.defaultMenu({
                        "post": post,
                        "meta": {
                            title: post.title
                        }
                    }));
                })
                .catch(() => {
                    next();
                });

        });
    }
}

module.exports = new SiteRoute();
