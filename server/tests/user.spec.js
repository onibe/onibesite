"use strict";

// http://www.node-tap.org

const test = require('tap').test;
const path = require('path');
const Model = require('../models/model');
const Database = require('../data/database');

const dbInstance = new Database({
    dialect: 'sqlite',
    database: {
        storage: path.resolve( __dirname + '/../../content/db.test.sqlite')
    }
});

const model = new Model(dbInstance.sequelize);

const User = model.User;
const Post = model.Post;

const testName = 'testuser';

test('User Schema', t => {
    User.forceSync().then(() => {
        t.end();
    });
});

test('User Can Be Added', t => {
    User.create({
        username: testName
    }).then(() => {
        t.pass('nice');
        t.end();
    });
});

test('User Can Be Found', t => {
    User.db.findOne({ where: {username: testName}}).then(user => {
        t.pass(user.username === testName);
        t.end();
    });
});

test('Post Schema', t => {
    Post.forceSync().then(() => {
        t.end();
    });
});

const testPostTitle = 'New Post';

test('Post Can Be Added', t => {
    Post.create({
        title: 'New Post',
        published_by_id: 1
    }).then(() => {
        t.pass('nice');
        t.end();
    });
});

test('Post Can Be Found', t => {
    Post.db.findOne({ where: {id: 1}})
        .then(post => {
            t.pass(post.title === testPostTitle);
            t.end();
        });
});


test('Posts can be found by user_id', t => {
    User.db.findOne({ where: {id: 1}}).then(user => {
        Post.db.findOne({ where: {published_by_id: user.id}})
            .then(post => {
                t.pass(post.title === testPostTitle);
                t.end();
            });
    });
});

// Get Userposts
test('User Posts Can Found from User', t => {
    User.db.findOne({ where: {id: 1}}).then(user => {

        user.getPosts().then(posts => {
            t.pass(posts.find(post => post.published_by_id === 1));

            t.end();
        });
    });
});