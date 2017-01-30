'use strict';

const CRUD = require('./crud');
const differenceBy = require('lodash/differenceBy');

const { findOneErrorHandler, updateFindOneHandler } = require('./helper');

class Post extends CRUD {
    constructor(schema) {
        super(schema.post);
        this.db = schema;
    }

    findAll(options) {
        const { db } = this;

        const mergedOptions = Object.assign({}, {
            include: [
                { model: db.tag }
            ]
        }, options);

        return db.post.findAll(mergedOptions);
    }

    update(entity, options) {
        const { db } = this;

        const mergedOptions = Object.assign({}, {
            where: {id: entity.id}
        }, options);

        return db.post.update(entity, mergedOptions)
            .then(data => updateFindOneHandler(db.post, data, entity))
            .then(post => {
                return db.tag.findAll({ where: { name: entity.tags.map(tag => tag.name) } })
                    .then(existingTags => {
                        const newTags = differenceBy(entity.tags, existingTags, 'name');
                        return db.tag.bulkCreate(newTags, {individualHooks: true})
                            .then(newTags => {
                                return post.setTags(existingTags.concat(newTags));
                            });
                    });
            })
            .then(() => super.findOneById(entity.id).then(findOneErrorHandler))
            .then(post => Post.sanitize(post.get({ plain: true })));
    }

    findOneById(id, options) {
        return super.findOneById(id, options)
            .then(post => Post.sanitize(post.get({ plain: true })));
    }

    static sanitize(post) {
        return Object.assign({}, post, {
            tags: post.tags.map(tag => ({id: tag.id, name: tag.name}))
        });
    }
}

module.exports = Post;