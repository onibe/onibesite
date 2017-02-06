'use strict';

const _ = require('lodash');
const model = require('../models');
const validator = require('./validator');

const user = model.data;

class User {
    constructor() {

    }

    add (req, res, next) {
        if(validator.isObject(req.body)) {
            user.create(req.body)
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => {
                    next(err);
                });
        } else {
            next();
        }
    }


    update (req, res, next) {
        if(validator.isObject(req.body)) {
            // Add Validation
            user.update(req.body)
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => next(err));
        } else {
            next();
        }
    }


    browse (req, res, next) {
        if(validator.isObject(req.body)) {
            user.find({where: req.body})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => next(err));
        } else {
            next();
        }
    }


    read (req, res, next) {
        if(req.params.id) {
            const id = req.params.id;

            user.findOne({where: {id: id}})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => next(err));
        } else {
            next();
        }
    }

    remove (req, res, next)  {
        if(req.params.id) {
            const id = req.params.id;

            user.remove({where: {id: id}})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => next(err));
        } else {
            next();
        }
    }

}

module.exports = User;