'use strict';

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
const post = model.post;

const testPostTitle = 'Test Title';

test('Generate Table Schema', t => {
    model.sync().then(() => {
        t.end();
    });
});

test('Post add/create', t => {
    post.create({
        title: testPostTitle,
        tags: [
            {name: 'k'},
            {name: 'l'}
        ]
    }).then((data) => {
        t.pass('nice',data);
        t.end();
    });
});

test('Post update clean', t => {
    post.update({
        id: 1,
        title: testPostTitle + '1',
    }).then((data) => {
        t.pass('nice',data);
        t.end();
    });
});


test('Post update with association', t => {
    post.update({
        id: 1,
        title: testPostTitle,
        tags: [
            {id: 2},
            {name: 'new value'}
        ]
    }).then((data) => {
        t.pass('nice',data);
        t.end();
    });
});
//
// test('post found', t => {
//     post.findOneById(1)
//         .then(post => {
//             t.pass(post.title === testPostTitle);
//             t.end();
//         });
// });
//
