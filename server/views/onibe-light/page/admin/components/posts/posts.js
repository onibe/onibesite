'use strict';

import React, { PropTypes, Component } from 'react';
import api from '../../api/api';

// CONSTANTS
const FETCH_POSTS = 'FETCH_POSTS';
const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING';
const FETCH_POSTS_FULFILLED = 'FETCH_POSTS_FULFILLED';
const FETCH_POSTS_REJECTED = 'FETCH_POSTS_REJECTED';
const FETCH_POSTS_SEARCH = 'FETCH_POSTS_SEARCH';

// ACTIONS
const fetchPosts = (options) => {
    return {
        type: FETCH_POSTS,
        payload: api.getPosts(options)
    };
};

const fetchPostSearch = (search) => {
    return {
        type: FETCH_POSTS,
        search: search
    };
};

// REDUCERS
const fetchPostsReducer = (state = {search: {}, fetching: false, fetched: true, payload: [], error: null}, action) => {
    if(action.type === FETCH_POSTS_SEARCH) {
        return Object.assign({}, state, {search: action.search});
    } else if(action.type === FETCH_POSTS_PENDING) {
        return Object.assign({}, state, {fetching: true});
    } else if(action.type === FETCH_POSTS_FULFILLED) {
        return Object.assign({}, state, {fetching: false, fetched: true, payload: action.payload});
    } else if(action.type === FETCH_POSTS_REJECTED) {
        return Object.assign({}, state, {fetching: false, fetched: true, error: action.payload});
    }

    return state;
};

export const actions = {
    fetchPosts,
    fetchPostSearch
};

export const reducers = {
    fetchPostsReducer
};

const posts = {
    actions,
    reducers
};

export default posts;

