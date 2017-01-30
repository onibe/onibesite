'use strict';

const _ = require('lodash');
const model = require('../models');
const validator = require('./validator');
const tag = model.tag;

class Tag {

    constructor() {

    }

    add (req, res, next) {
        const err = validator.isUpdateValid(req);

        if(err !== true) {
            return next(err);
        }

        // Add Validation
        tag.create(req.body)
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

        return tag.update(req.body)
            .then(data => res.status(200).json(data))
            .catch(err => next(err));
    }

    browse (req, res, next) {
        const err = validator.isBodyJSON(req.body);

        if(err !== true) {
            return next(err);
        }

        return tag.findAll(req.body)
            .then(data => res.status(200).json(data))
            .catch(err => next(err));
    }


    read (req, res, next) {
        if(!req.params.id) {
            next();
        }

        return tag.findOneById(req.params.id)
            .then(data => res.status(200).json(data))
            .catch(err => next(err));
    }

    remove (req, res, next)  {
        if(!req.params.id) {
            return next();
        }

        return tag.removeById(req.params.id)
            .then(data => res.status(200).json(data))
            .catch(err => next(err));
    }

}

module.exports = Tag;