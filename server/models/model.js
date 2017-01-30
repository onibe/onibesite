'use strict';

const User = require("./user");
const Post = require('./post');
const Tag = require('./tag');
const PostTag = require('./postTag');
const Session = require('./session');
const Schema = require('./schema');

class Model {
    constructor(sequelize) {
        const schema = new Schema(sequelize);

        this.user = new User(schema);
        this.post = new Post(schema);
        this.tag = new Tag(schema);
        this.postTag = new PostTag(schema);
        this.session = new Session(sequelize);
    }

    sync() {
        const { user, post, session, tag, postTag } = this;

        return Promise.all([
            user.forceSync(),
            post.forceSync(),
            session.forceSync(),
            tag.forceSync(),
            postTag.forceSync()
        ]);
    }
}

module.exports = Model;