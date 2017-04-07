"use strict";

const express = require('express');
const Post = require('./posts');
const User = require('./users');
const Tag = require('./tags');

// Middleware
const middleware = require('../middleware');

class ApiRoutes {
    constructor() {
        this.router =  express.Router();
        this.setRoutes();
    }

    setRoutes() {
        const router = this.router;
        const posts = Post;
        const users = User;
        const tags = Tag;

        const authenticatePrivate = [
            middleware.authenticateSession
        ];

        // Posts
        router.get('/posts', authenticatePrivate, posts.browse);
        router.get('/posts/:id', authenticatePrivate, posts.read);
        router.post('/posts', authenticatePrivate, posts.add);
        router.post('/posts/:id', authenticatePrivate, posts.update);
        router.delete('/posts/:id', authenticatePrivate, posts.remove);

        // Tags
        router.get('/tags', authenticatePrivate, tags.browse);
        router.get('/tag/:id', authenticatePrivate, tags.read);
        router.post('/tags', authenticatePrivate, tags.add);
        router.post('/tags/:id', authenticatePrivate, tags.update);
        router.delete('/tags/:id', authenticatePrivate, tags.remove);

        // Users
        router.get('/users', authenticatePrivate, users.browse);
        router.get('/users/:id', authenticatePrivate, users.read);
        router.post('/users', authenticatePrivate, users.add);
        router.post('/users/:id', authenticatePrivate, users.update);
        router.delete('/users/:id', authenticatePrivate, users.remove);

        // API Error Handling
        router.use(function(err, req, res, next) {
            if(err){
                res.status(err.status || 500).json({
                    message: err.message,
                    status: err.status
                });
            } else {
                next();
            }
        });
    }
}

module.exports = new ApiRoutes();
