'use strict';

import React, { PropTypes, Component } from 'react';
import api from '../../api/api';

// CONSTANTS
const FETCH_POSTS = 'FETCH_POSTS';
const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING';
const FETCH_POSTS_FULFILLED = 'FETCH_POSTS_FULFILLED';
const FETCH_POSTS_REJECTED = 'FETCH_POSTS_REJECTED';
const FETCH_POSTS_SEARCH = 'FETCH_POSTS_SEARCH';

const EDIT_POST = 'EDIT_POST';

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

const editPost = (post) => {
    return {
        type: EDIT_POST,
        post: post
    }
};

const initialState =  {
    search: {},
    fetching: false,
    fetched: true,
    payload: {},
    error: null
};

// REDUCERS
const fetchPostsReducer = (state = initialState, action) => {
    if(action.type === FETCH_POSTS_SEARCH) {
        return Object.assign({}, state, {
            search: action.search
        });
    } else if(action.type === FETCH_POSTS_PENDING) {
        return Object.assign({}, state, {
            fetching: true
        });
    } else if(action.type === FETCH_POSTS_FULFILLED) {
        return Object.assign({}, state, {
            fetching: false,
            fetched: true,
            payload: action.payload
        });
    } else if(action.type === FETCH_POSTS_REJECTED) {
        return Object.assign({}, state, {
            fetching: false,
            fetched: true,
            error: action.payload
        });
    } else if (action.type === EDIT_POST) {
        return Object.assign({}, state, {
            payload: Object.assign({}, state.payload,{
                [action.post.id]:  Object.assign({}, state.payload[action.post.id], action.post, {modified: true})
            })
        })
    }

    return state;
};

export const actions = {
    fetchPosts,
    fetchPostSearch,
    editPost
};

export const reducers = {
    fetchPostsReducer
};

const posts = {
    actions,
    reducers
};

export default posts;

