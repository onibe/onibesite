"use strict";

const User = require('./user');
const Post = require('./post');
const Session = require('./session');
const Schema = require('./schema');

class Model {
    constructor(sequelize) {
        const schema = new Schema(sequelize);

        this.user = new User(schema.user);
        this.post = new Post(schema.post);
        this.session = new Session(sequelize);

    }

    sync() {
        const { user, post, session } = this;

        return Promise.all([
            user.forceSync(),
            post.forceSync(),
            session.forceSync()
        ]);
    }
}

module.exports = Model;