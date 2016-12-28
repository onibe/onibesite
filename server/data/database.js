'use strict';

const Sequelize = require('sequelize');
const path = require('path');
const dbConfig = require('../../config.json');

const dbPath = path.resolve(global.__base, 'content/db.sqlite') || dbConfig.sqlite.storage;

class Database {
    constructor() {
        this.Sequelize = Sequelize;
        this.sequelize = new Sequelize(null,null,null,{
            dialect: dbConfig.dialect,
            storage: dbPath,
        });
    }

    authenticate() {
        const { sequelize } = this;
        // Test Database Connection
        return sequelize
            .authenticate()
            .then(function(err) {
                console.log('Connection has been established successfully.');
            })
            .catch(function (err) {
                console.log('Unable to connect to the database:', err);
                return Promise.reject(err);
            });
    }
}

module.exports = Database;