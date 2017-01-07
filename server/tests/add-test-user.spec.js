"use strict";

// http://www.node-tap.org

const test = require('tap').test;
const path = require('path');
const Model = require('../models/model');
const Database = require('../data/database');

const dbInstance = new Database({
    dialect: 'sqlite',
    database: {
        storage: path.resolve( __dirname + '/../../content/db.sqlite')
    }
});

const model = new Model(dbInstance.sequelize);

const user = model.user;

const testUser = {
    username: 'testuser',
    password: '12345678'
};

test('User Schema', t => {
    user.forceSync().then(() => {
        t.end();
    });
});

test('User Can Be Added', t => {
    const userPromises = [...Array(5)].map((value, index) =>
        user.create(Object.assign({}, testUser, {username: testUser.username + index})));

    Promise.all(userPromises)
        .then(() => {
            t.pass('nice');
            t.end();
        });
});


const post = model.post;

const testPost = {
    title: 'testPost',
    markdown: 'Body Insert Here - Markdown',
    html: 'Body Insert Here'
};

test('Post Schema Create', t => {
    post.forceSync().then(() => {
        t.end();
    });
});

test('Posts Can Be Added', t => {
    const postPromises = [...Array(5)].map((value, index) =>
        post.create(Object.assign({}, testPost, {title: testPost.title + index})));

    Promise.all(postPromises)
        .then(() => {
            t.pass('nice');
            t.end();
        });
});