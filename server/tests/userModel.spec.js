
"use strict";

const tap = require('tap');

const UserModel = require('../models/user');
const User = new UserModel();

const testName = 'testuser';

tap.test('User Schema', t => {
    User.forceSync().then(() => {
        t.end();
    });
});

tap.test('User Can Be Added', t => {
    User.create({
        username: testName
    }).then(() => {
        t.pass('nice');
        t.end();
    });
});

tap.test('User Can Be Found', t => {
    User.db.findOne({ where: {username: testName}}).then(user => {
        t.pass(user.username === testName);
        t.end();
    });
});

tap.test('User Can Be Deleted', t => {
    User.remove({username: testName})
        .then(User.db.findOne({ where: {username: testName}}))
        .then(user => {
            t.type(user.username, 'undefined');
            t.end();
        });
});