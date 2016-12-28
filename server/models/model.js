"use strict";

const UserModel = require('./user');
const PostModel = require('./post');

class Model {
    constructor() {
        this.User = new UserModel();
        this.Post = new PostModel();
    }

    sync() {
        const { User, Post } = this;

        User.forceSync();
        Post.forceSync();
    }
}

module.exports = Model;