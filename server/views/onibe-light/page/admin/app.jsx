"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import UIRouterReact, {UIView} from 'ui-router-react';
import Dashboard from './components/dashboard.jsx';

// Create a new instance of the Router
const router = new UIRouterReact();

router.html5Mode(true);

const basePath = function(path) {
    return '/admin' + path;
};

// Register state
router.stateRegistry.register({
    name: 'home',
    url: basePath(''),
    component: Dashboard
});

// Start the router
router.start();


ReactDOM.render(
    <UIView/>,
    document.getElementById('root')
);