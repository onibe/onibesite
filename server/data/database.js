'use strict';

// THIS IS SEQUELIZE MODEL
const db = require('../../models');

class Database {
    constructor(config) {
        this.Sequelize = db.Sequelize;
        this.sequelize = db.sequelize;
    }

    authenticate() {
        const { sequelize } = this;
        // Test Database Connection
        return sequelize
            .authenticate()
            .then(function() {
                console.log('Connection has been established successfully.');
            })
            .catch(function (err) {
                console.log('Unable to connect to the database:', err);
                return Promise.reject();
            });
    }
}

module.exports = new Database();