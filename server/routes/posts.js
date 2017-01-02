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
                })
        } else {
            next(err);
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
                .catch(err => next(err))
        } else {
            next(err);
        }
    }


    browse (req, res, next) {
        if(basisRequestValidation(req.body)) {
            const reqPost = req.body;

            post.db.find({where: reqPost})
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

            post.db.findOne({where: {id: id}})
                .then(posts => {
                    res.status(200).json(posts);
                })
                .catch(err => next(err))
        } else {
            next(err);
        }
    }

    remove (req, res, next)  {

    }

}

module.exports = new Post();