"use strict";

const express = require('express');
const profiles = require('../data/profiles.json');
const uniqBy = require('lodash/uniqBy');
const DOMPurify = require('../utils/dompurify');

const model = require('../models');
const menu = require('./menu');

const user = model.user;

class Route {
    constructor(middleware) {

        const router = express.Router();
        this.router = router;

        // Render Pages
        router.get('/', (req, res, next) => {
            res.render("homepage/homepage",menu.defaultMenu({

            }));
        });

        router.get('/login', function(req, res, next) {
            let data = {};

            if(req.query.invalid) {
                data.invalid = "Invalid Username or Password";
            }

            res.render('login/login', data);
        });

        router.post('/login', function(req, res, next) {
            const form = req.body;

            if(form.username && form.password) {
                user.validateUser(form)
                    .then(user => {
                        req.session.user = {
                            id: user.id,
                            username: user.username,
                            uuid: user.uuid
                        };
                        req.session.save(err => {
                            res.redirect('/admin');
                        });
                    })
                    .catch(err => {
                        res.redirect('/login?invalid');
                    });
            } else {
                res.redirect('/login?invalid');
            }
        });

        router.get('/logout', function(req, res, next) {
            if(req.session) {
                req.session.destroy(err => {
                    res.redirect('/login');
                });
            } else {
                res.redirect('/login');
            }
        });

        router.get('/about', (req, res, next) => {
            req.session.regenerate(function(err) {
                res.render("about/about", menu.defaultMenu({}));
            });
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
            res.render("team/team",menu.defaultMenu({
                "team": sortedProfiles
            }));
        });

        router.get('/team/:username', (req, res, next) => {
            const username = req.params.username ? req.params.username.toLowerCase() : null;
            const profile = username ? profiles.find(profile => profile.username.toLowerCase() === username) : null;

            if(profile) {
                res.render("profile/profile", menu.defaultMenu({
                    "profile": profile
                }));
            } else {
                next();
            }

        });

        router.get('/version', function(req, res, next) {
            res.json({'version':'alpha-0.0.1'});
        });

        const postsRoute = (req, res, next) => {
            const post = model.post;
            const postTrimLength = 400;
            const count = 10;
            const pageNumber = (parseInt(req.params.page) > 0 ? parseInt(req.params.page) : 1);
            const offset = (pageNumber - 1) * count;

            post.findAndCountAll({
                offset: offset,
                limit: count,
                order: 'createdAt DESC',
                where: { draft: 0 }
            }).then(results => {
                const total = results.count;
                const posts = results.data.map(post => {
                    return Object.assign({}, {link: '/post/' + post.id}, post);
                }).map(post => {
                    return escapeAndTrim(post,postTrimLength);
                });

                res.render("posts/posts", menu.defaultMenu({
                    "data": posts,
                    "offset": offset,
                    "total": total,
                    "next":  (pageNumber * count < total - count) ? "/posts/" + (pageNumber + 1) : null,
                    "previous": pageNumber > 1 ? "/posts/" + (pageNumber - 1) : null
                }));
            });

        };

        router.get('/posts/', postsRoute);
        router.get('/posts/:page', postsRoute);
        router.get('/post/:id', (req, res, next) => {
            const post = model.post;
            const id = req.params.id;

            post.findOne({where: { id: id, draft: 0}})
                .then(post => {
                    res.render("posts/post", menu.defaultMenu({
                        "post": post
                    }));
                })
                .catch(() => {
                    next();
                });

        });
    }
}

// Move this else where
function escapeAndTrim(post,trimLength) {
    const postTrimmed = post.html.substring(0,trimLength);
    const ellipsis = postTrimmed.length < post.html.length ? '...' : '' ;

    return Object.assign({}, post, {
        html: DOMPurify.sanitize(postTrimmed + ellipsis)
    });
}

module.exports = Route;
