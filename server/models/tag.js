'use strict';

const { findOneErrorHandler } = require('./helper');
const CRUD = require('./crud');

class Tag extends CRUD{
    constructor(schema) {
        super(schema.tag);
        this.db = schema;
    }

    findAll(options) {
        const { db } = this;

        const mergedOptions = Object.assign({}, {
        }, options);

        return db.tag.findAll(mergedOptions);
    }

}

module.exports = Tag;