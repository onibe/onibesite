'use strict';

const CRUD = require('./crud');
const { differenceBy, pick } = require('lodash');

class Post extends CRUD {
    constructor(schema) {
        super(schema.post);
        this.db = schema;
    }

    findAll(options) {
        const { db } = this;

        const mergedOptions = Object.assign({}, {
            include: [
                { model: db.tag },
                { model: db.user, as: 'published_user' }
            ]
        }, options);

        return db.post.findAll(mergedOptions)
            .then(posts => posts.map(post => Post.sanitize(post.get({ plain: true }))));
    }

    findAndCountAll(options) {
        const { db } = this;

        const mergedOptions = Object.assign({}, {
            include: [
                { model: db.tag },
                { model: db.user, as: 'published_user' }
            ]
        }, options);

        return db.post.findAndCountAll(mergedOptions)
            .then(results => {
                return {
                    count: results.count,
                    data: results.rows.map(post => Post.sanitize(post.get({ plain: true })))
                };
            });
    }

    update(entity, options) {
        const { db } = this;

        const mergedOptions = Object.assign({}, {
            where: {id: entity.id},
            individualHooks: true,
        }, options);

        return db.post.findOne(mergedOptions)
            .then(post => post.update(entity))
            .then(post => Post.updateAssociations(db, post, entity));
    }

    create(entity, options) {
        const { db } = this;

        const mergedOptions = Object.assign({}, {
            individualHooks: true,
            include: [
                { model: db.tag },
                { model: db.user, as: 'published_user' }
            ]
        }, options);

        return db.post.create(entity, mergedOptions)
            .then(post => Post.updateAssociations(db, post, entity));
    }

    static updateAssociations(db, post, entity) {
        return db.tag.findAll({ where: { name: entity.tags.map(tag => tag.name) } })
            .then(existingTags => {
                const newTags = differenceBy(entity.tags, existingTags, 'name');
                return db.tag.bulkCreate(newTags, {individualHooks: true})
                    .then(newTags => post.setTags(existingTags.concat(newTags)));
            })
            .then(() => db.post.findOne({
                where: {id:post.id},
                include: { all: true }
            }))
            .then(post => Post.sanitize(post.get({ plain: true })));
    }

    static sanitize(post) {
        return Object.assign({}, post, {
            tags: post.tags.map(tag => ({id: tag.id, name: tag.name})),
            published_user: pick(post.published_user,['username','id'])
        });
    }
}

module.exports = Post;