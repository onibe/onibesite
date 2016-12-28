'use strict';

const Sequelize = require('sequelize');
const path = require('path');

class Database {
    constructor(config) {
        this.Sequelize = Sequelize;

        let sequelizeConfig = {};

        if(config.dialect === 'sqlite') {
            const dbPath = path.resolve(config.database.storage) || path.resolve(global.__base, 'content/db.sqlite');

            sequelizeConfig = {
                dialect: config.dialect,
                storage: dbPath
            };
        } else {
            sequelizeConfig = Object.assign({}, {dialect: config.dialect}, config.database);
        }

        this.sequelize = new Sequelize(null,null,null,sequelizeConfig);
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

module.exports = Database;