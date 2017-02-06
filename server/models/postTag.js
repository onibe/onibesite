'use strict';

const CRUD = require('./crud');

class PostTag extends CRUD {
    constructor(schema) {
        super(schema.postTags);
    }
}

module.exports = PostTag;