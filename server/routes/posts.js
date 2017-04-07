'use strict';

const _ = require('lodash');
const model = require('../models');
const validator = require('./validator');
const post = model.post;

const menu = require('./menu');

class PostRoute {

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

    pageList (req, res, next) {
        const postTrimLength = 900;
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
            }).map(data => {
                return post.escapeAndTrim(data,postTrimLength);
            });

            res.render("posts/posts", menu.defaultMenu({
                "data": posts,
                "offset": offset,
                "total": total,
                "next":  (pageNumber * count < total - count) ? "/posts/" + (pageNumber + 1) : null,
                "previous": pageNumber > 1 ? "/posts/" + (pageNumber - 1) : null
            }));
        });
    }

    page (req, res, next) {
        const post = model.post;
        const id = req.params.id;

        post.findOne({where: { id: id, draft: 0}})
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

    }

}

module.exports = new PostRoute();