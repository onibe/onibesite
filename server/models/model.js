"use strict";

const User = require('./user');
const Post = require('./post');
const Schema = require('./schema');

class Model {
    constructor(sequelize) {
        const schema = new Schema(sequelize);

        this.User = new User(schema.User);
        this.Post = new Post(schema.Post);
    }

    sync() {
        const { User, Post } = this;

        return Promise.all([
            User.forceSync(),
            Post.forceSync()
        ]);
    }
}

module.exports = Model;