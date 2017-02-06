"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import {UIRouter, UIView, pushStateLocationPlugin} from 'ui-router-react';
import Dashboard from './components/dashboard.jsx';
import Posts from './components/posts/posts.jsx';
import Post from './components/posts/post.jsx';
import PostWelcome from './components/posts/post-welcome.jsx';
import Tags from './components/tags/tags.jsx';

import store from './components/reducers';

const basePath = function(path) {
    return '/admin' + path;
};

const states = [
    {
        name: 'main',
        url: basePath(''),
        component: Dashboard,
        resolve: [
            {
                token: 'store',
                resolveFn: () => store
            }
        ],
        redirectTo: 'main.welcome'
    },
    {
        name: 'main.welcome',
        url: '/welcome',
        component: PostWelcome
    },
    {
        name: 'main.posts',
        url: '/posts',
        component: Posts,
        redirectTo: 'main.posts.start'
    },
    {
        name: 'main.posts.start',
        url: '/welcome',
        component: PostWelcome
    },
    {
        name: 'main.posts.create',
        url: '/create',
        component: Post,
        resolve: [
            {
                token: 'mode',
                resolveFn: () => ({
                    create: true
                })
            },
        ]
    },
    {
        name: 'main.posts.post',
        url: '/:postId',
        component: Post,
        resolve: [
            {
                token: 'mode',
                resolveFn: () => ({
                    create: false
                })
            },
        ]
    },
    {
        name: 'main.tags',
        url: '/tags',
        component: Tags
    }
];

const configRouter = (router) => {
    router.urlRouter.otherwise('/admin/posts');
};

ReactDOM.render(
    <UIRouter config={configRouter} plugins={[pushStateLocationPlugin]} states={states} >
        <UIView />
    </UIRouter>,
    document.getElementById('root')
);