"use strict";

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

        return db.findOne(options);
    }

    create(post) {
        const { db } = this;

        return db.create(post);
    }

    update(post) {
        const { db } = this;

        // Generate Update Data
        return db.update(post, {where: { id: post.id }});
    }


    remove(data) {
        const { db } = this;

        return db.destroy({where: data});
    }

}

module.exports = Post;