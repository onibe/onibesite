'use strict';

const moment = require('moment');
const Sequelize = require('sequelize');

const create = data => {
    return Object.assign({}, data, {
        create_date: moment.valueOf(),
        uuid: Sequelize.Utils.generateUUID()
    });
};

const update = data => {
    return Object.assign({}, data, {
        update_date: moment.valueOf()
    });
};

const remove = data => {
    return data;
};

module.exports = {
    create: create,
    update: update,
    remove: remove
};