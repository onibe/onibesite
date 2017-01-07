'use strict';

const _ = require('lodash');
const model = require('../models');

const post = model.post;

const basisRequestValidation = (post, callback) => {
    return post && _.isObject(post);
};

class Post {
    constructor() {

    }

    add (req, res, next) {
        if(basisRequestValidation(req.body)) {
            // Add Validation
            const reqPost = req.body;

            post.create(reqPost)
                .then(post => {
                    res.status(200).json(post);
                })
                .catch(err => {
                    next(err);
                });
        } else {
            next();
        }
    }


    update (req, res, next) {
        if(basisRequestValidation(req.body)) {
            // Add Validation
            const reqPost = req.body;

            post.update(reqPost)
                .then(post => {
                    res.status(200).json(post);
                })
                .catch(err => next(err));
        } else {
            next();
        }
    }


    browse (req, res, next) {
        if(basisRequestValidation(req.body)) {
            const options = req.body;

            post.findAll(options)
                .then(posts => {
                    res.status(200).json(posts);
                })
                .catch(err => next(err));
        } else {
            next();
        }
    }


    read (req, res, next) {
        if(req.params.id) {
            const id = req.params.id;

            post.findOne()
                .then(posts => {
                    res.status(200).json(posts);
                })
                .catch(err => next(err));
        } else {
            next();
        }
    }

    remove (req, res, next)  {
        if(req.params.id) {
            const id = req.params.id;

            post.remove({id: id})
                .then(posts => {
                    res.status(200).json(posts);
                })
                .catch(err => next(err));
        } else {
            next();
        }
    }

}

module.exports = Post;