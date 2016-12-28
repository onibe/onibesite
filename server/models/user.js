"use strict";

const helper = require('./helper');

const { Sequelize, sequelize } = require('../data');

class User {
    constructor() {
        // Refer to http://docs.sequelizejs.com/en/v3/api/model
        this.db = sequelize.define('user', {
            username: {
                type: Sequelize.STRING,
                validation: {
                    isAlphanumeric: true
                },
                unique: true
            },
            uuid:  {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                unique: true
            },
            password: {
                type: Sequelize.STRING
            },
            display_name: Sequelize.STRING,
            twitter: Sequelize.STRING,
            facebook: Sequelize.STRING,
            youtube: Sequelize.STRING,
        });
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