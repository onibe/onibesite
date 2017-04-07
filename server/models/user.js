'use strict';

const helper = require('./helper');

class User {
    constructor(schema) {
        this.db = schema.user;
    }

    sync() {
        return this.db.sync();
    }

    forceSync() {
        return this.db.sync({force: true});
    }

    update(data) {
        const { db } = this;

        data = helper.update(data);

        return db.update(data);
    }

    validateUser({username, password}) {
        const { db } = this;

        const userPromise = db.findOne({where: {username: username}});

        return Promise.all([userPromise])
            .then(data => {
                const user = data[0];

                if(user === null) {
                    return Promise.reject("No User Found");
                }

                return helper.comparePassword(password, user);
            });

    }

    create(data) {
        const { db } = this;

        data = helper.create(data);

        return helper.hashPassword(data.password).then(hash => {
            data.password = hash;
            return db.sync()
                .then(db.create(data));
        });
    }

    remove(data) {
        const { db } = this;

        return db.sync()
            .then(db.destroy({where: data}));
    }

}

module.exports = User;