'use strict';

const CRUD = require('./crud');

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
                const newTags = entity.tags ? entity.tags.filter(tag => !tag.id) : [];
                const existingTags = entity.tags ? entity.tags.filter(tag => tag.id) : [];

                const newTagInstances = db.tag.bulkCreate(newTags, {individualHooks: true});
                const existingTagInstances = db.tag.findAll({ where: { id: existingTags.map(tag => tag.id) } });

                return Promise.all([newTagInstances,existingTagInstances])
                    .then(data => {
                        const newTags = data[0];
                        const existingTags = data[1];

                        return post.setTags(newTags.concat(existingTags));
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