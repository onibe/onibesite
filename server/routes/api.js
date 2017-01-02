"use strict";

const express = require('express');
const Post = require('./posts');
const User = require('./users');

class ApiRoutes {
    constructor(middleware) {
        const router = express.Router();

        this.router = router;

        const posts = new Post();
        const users = new User();

        const authenticatePrivate = [
            middleware.authenticateSession
        ];

        router.get('/test', (req,res,next) => {
            console.log(req.session,'session');
        });

        // Posts
        router.get('/posts', authenticatePrivate, posts.browse);
        router.get('/posts/:id', authenticatePrivate, posts.read);
        router.post('/posts', authenticatePrivate, posts.add);
        router.put('/posts/:id', authenticatePrivate, posts.update);
        router.delete('/posts/:id', authenticatePrivate, posts.remove);

        // Users
        router.get('/users', authenticatePrivate, users.browse);
        router.get('/users/:id', authenticatePrivate, users.read);
        router.post('/users', authenticatePrivate, users.add);
        router.put('/users/:id', authenticatePrivate, users.update);
        router.delete('/users/:id', authenticatePrivate, users.remove);

    }
}

module.exports = ApiRoutes;
