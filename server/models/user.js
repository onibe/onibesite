"use strict";

const helper = require('./helper');

const { Sequelize, sequelize } = require('../data');

class User {
    constructor() {
        // Refer to http://docs.sequelizejs.com/en/v3/api/model
        this.db = sequelize.define('user', {
            username: Sequelize.STRING,
            uuid: Sequelize.UUID,
            password: Sequelize.STRING,
            display_name: Sequelize.STRING,
            twitter: Sequelize.STRING,
        });
    }

    forceSync() {
        return this.db.sync({force: true});
    }

    update(data) {
        const { db } = this;

        data = helper.update(data);

        return db.sync()
            .then(db.create(data));
    }

    create(data) {
        const { db } = this;

        data = helper.create(data);
        console.log(data,'data');

        return db.sync()
            .then(db.create(data));
    }

}

module.exports = User;