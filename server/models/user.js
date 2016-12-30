"use strict";

const helper = require('./helper');

class User {
    constructor(instance) {
        this.db = instance;
    }

    sync() {
        return this.db.sync();
    }

    forceSync() {
        return this.db.sync({force: true});
    }

    get (user) {

    }

    update(data) {
        const { db } = this;

        data = helper.update(data);

        return db.sync()
            .then(db.update(data));
    }

    create(data) {
        const { db } = this;

        data = helper.create(data);

        return db.sync()
            .then(db.create(data));
    }

    remove(data) {
        const { db } = this;

        return db.sync()
            .then(db.destroy({where: data}));
    }

}

module.exports = User;