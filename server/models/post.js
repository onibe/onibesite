"use strict";

class Post {
    constructor(instance) {
        this.db = instance;
    }

    forceSync() {
        const { db } = this;

        return db.sync({force: true});
    }

    update(post) {
        const { db } = this;

        // Generate Update Data
        return db.sync()
            .then(db.create(post));
    }

    create(post) {
        const { db } = this;

        return db.sync()
            .then(db.create(post));
    }

    remove(data) {
        const { db } = this;

        return db.sync()
            .then(db.destroy({where: data}));
    }

}

module.exports = Post;