'use strict';

const model = require('../models');
const user = model.user;

class AuthRoute {
    constructor() {

    }

    getLoginPage (req, res, next) {
        let data = {};

        if(req.query.invalid) {
            data.invalid = 'Invalid Username or Password';
        }

        res.render('login/login', data);
    }

    postLoginCredentials (req, res, next) {
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
    }

    logout (req, res, next) {
        if(req.session) {
            req.session.destroy(err => {
                res.redirect('/login');
            });
        } else {
            res.redirect('/login');
        }
    }
}


module.exports = new AuthRoute();