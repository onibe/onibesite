"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import UIRouterReact, {UIView} from 'ui-router-react';
import Dashboard from './components/dashboard.jsx';
import Posts from './components/posts/posts.jsx';
import Post from './components/posts/post.jsx';

import store from './components/reducers';

// Create a new instance of the Router
const Router = new UIRouterReact();

Router.html5Mode(true);

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
        ]
    },
    {
        name: 'main.posts',
        url: '/posts',
        component: Posts
    },
    {
        name: 'main.posts.post',
        url: '/:postId',
        component: Post
    }
];

// Add States to Router
states.forEach(state => Router.stateRegistry.register(state));

// Start the router
Router.start();

// Router.transitionService.onBefore(log => console.log(log));

ReactDOM.render(
    <UIView/>,
    document.getElementById('root')
);