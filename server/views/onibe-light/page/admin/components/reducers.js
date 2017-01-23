'use strict';

import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk  from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

import posts from './posts/posts-reducer';
import post from './posts/post-reducer';

const middleware = composeWithDevTools(applyMiddleware(promise(), thunk, logger()));

const rootReducer = combineReducers({
    posts: posts.reducers.fetchPostsReducer,
    post: post.reducers.postReducer
});

const store = createStore(rootReducer, middleware);


export default store;