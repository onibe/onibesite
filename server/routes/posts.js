'use strict';

const _ = require('lodash');
const model = require('../models');
const validator = require('./validator');
const post = model.post;

class Post {

    constructor() {

    }

    add (req, res, next) {
        const err = validator.isUpdateValid(req);

        if(err !== true) {
            return next(err);
        }

        // Add Validation
        const reqPost = req.body;

        post.create(reqPost)
            .then(data => res.status(200).json(data))
            .catch(err => {
                next(err);
            });
    }

    update (req, res, next) {
        const err = validator.isUpdateValid(req);

        if(err !== true) {
            return next(err);
        }

        // Add Validation
        const reqPost = req.body;

        return post.update(reqPost)
            .then(data => res.status(200).json(data))
            .catch(err => next(err));
    }

    browse (req, res, next) {
        const err = validator.isBodyJSON(req.body);

        if(err !== true) {
            return next(err);
        }


        return post.findAll(req.body)
            .then(data => res.status(200).json(data))
            .catch(err => next(err));
    }


    read (req, res, next) {
        if(!req.params.id) {
            next();
        }

        return post.findOneById(req.params.id)
            .then(data => res.status(200).json(data))
            .catch(err => next(err));
    }

    remove (req, res, next)  {
        if(!req.params.id) {
            return next();
        }

        return post.removeById(req.params.id)
            .then(data => res.status(200).json(data))
            .catch(err => next(err));
    }

}

module.exports = Post;