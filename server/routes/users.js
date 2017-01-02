'use strict';

const _ = require('lodash');
const model = require('../models');

const user = model.post;

const basisRequestValidation = (body, callback) => {
    return body && _.isObject(body);
};

class User {
    constructor() {

    }

    add (req, res, next) {
        if(basisRequestValidation(req.body)) {
            user.create(req.body)
                .then(post => {
                    res.status(200).json(post);
                })
                .catch(err => {
                    next(err);
                })
        } else {
            next(err);
        }
    }


    update (req, res, next) {
        if(basisRequestValidation(req.body)) {
            // Add Validation
            user.update(req.body)
                .then(post => {
                    res.status(200).json(post);
                })
                .catch(err => next(err))
        } else {
            next(err);
        }
    }


    browse (req, res, next) {
        if(basisRequestValidation(req.body)) {
            user.find({where: req.body})
                .then(posts => {
                    res.status(200).json(posts);
                })
                .catch(err => next(err))
        } else {
            next(err)
        }
    }


    read (req, res, next) {
        if(req.params.id) {
            const id = req.params.id;

            user.findOne({where: {id: id}})
                .then(posts => {
                    res.status(200).json(posts);
                })
                .catch(err => next(err))
        } else {
            next(err);
        }
    }

    remove (req, res, next)  {
        if(req.params.id) {
            const id = req.params.id;

            user.remove({where: {id: id}})
                .then(posts => {
                    res.status(200).json(posts);
                })
                .catch(err => next(err))
        } else {
            next(err);
        }
    }

}

module.exports = User;