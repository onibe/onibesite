"use strict";

class Post {
    constructor(instance) {
        this.db = instance;
    }

    forceSync() {
        const { db } = this;

        return db.sync({force: true});
    }

    find(post) {
        const { db } = this;

        return db.sync()
            .then(db.find({where: post}));
    }

    findOne(post) {
        const { db } = this;

        return db.sync()
            .then(db.findOne({where: post}));
    }

    create(post) {
        const { db } = this;

        return db.sync()
            .then(db.create(post));
    }

    update(post) {
        const { db } = this;

        // Generate Update Data
        return db.sync()
            .then(db.update(post, {where: { id: post.id }}));
    }


    remove(data) {
        const { db } = this;

        return db.sync()
            .then(db.destroy({where: data}));
    }

}

module.exports = Post;