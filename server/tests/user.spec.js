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

const user = model.user;
const post = model.post;

const testName = 'testuser';

test('user Schema', t => {
    user.forceSync().then(() => {
        t.end();
    });
});

test('user Can Be Added', t => {
    user.create({
        username: testName
    }).then(() => {
        t.pass('nice');
        t.end();
    });
});

test('user Can Be Found', t => {
    user.db.findOne({ where: {username: testName}}).then(user => {
        t.pass(user.username === testName);
        t.end();
    });
});

test('post Schema', t => {
    post.forceSync().then(() => {
        t.end();
    });
});

const testPostTitle = 'New post';

test('post Can Be Added', t => {
    post.create({
        title: 'New post',
        published_by_id: 1
    }).then(() => {
        t.pass('nice');
        t.end();
    });
});

test('post Can Be Found', t => {
    post.db.findOne({ where: {id: 1}})
        .then(post => {
            t.pass(post.title === testPostTitle);
            t.end();
        });
});


test('Posts can be found by user_id', t => {
    user.db.findOne({ where: {id: 1}}).then(user => {
        post.db.findOne({ where: {published_by_id: user.id}})
            .then(post => {
                t.pass(post.title === testPostTitle);
                t.end();
            });
    });
});

// Get Userposts
test('user Posts Can Found from user', t => {
    user.db.findOne({ where: {id: 1}}).then(user => {

        user.getPosts().then(posts => {
            t.pass(posts.find(post => post.published_by_id === 1));

            t.end();
        });
    });
});