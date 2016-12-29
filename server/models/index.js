"use strict";

const { sequelize } = require('../data');
const Model = require('./model');

module.exports = new Model(sequelize);