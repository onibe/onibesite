'use strict';

const { findOneErrorHandler } = require('./helper');

class Post {
    constructor(instance) {
        this.db = instance;
    }

    forceSync() {
        const { db } = this;

        return db.sync({force: true});
    }

    findAll(options) {
        const { db } = this;

        return db.findAll(options);
    }

    findOne(options) {
        const { db } = this;

        return db.findOne(options)
            .then(findOneErrorHandler);
    }

    create(post) {
        const { db } = this;

        return db.create(post);
    }

    update(post) {
        const { db } = this;

        return db.update(post, {where: { id: post.id }})
            .then(data => {
                if(data[0]) {
                    return db.findOne({where: { id: post.id }});
                }

                return Promise.reject('Failed to update');
            });
    }

    remove(data) {
        const { db } = this;

        return db.destroy({where: data});
    }

}

module.exports = Post;