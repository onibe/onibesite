'use strict';

import React, { PropTypes, Component } from 'react';
import api from '../../api/api';

// CONSTANTS
const EDIT_NEW_POST = 'EDIT_NEW_POST';

const CREATE_POST = 'CREATE_POST';
const CREATE_POST_PENDING = 'CREATE_POST_PENDING';
const CREATE_POST_FULFILLED = 'CREATE_POST_FULFILLED';
const CREATE_POST_REJECTED = 'CREATE_POST_REJECTED';

// ACTIONS
const createPost = (post) => {
    return {
        type: CREATE_POST,
        payload: api.createPost(post)
    };
};

const editNewPost = (post) => {
    return {
        type: EDIT_NEW_POST,
        post: post
    };
};

const postInitialFetchState = {
    fetching: false,
    fetched: false,
    payload: {
        id: 'newPost',
        title: 'New Post',
        markdown: '',
        createdAt: new Date(),
        modified: true
    },
    error: false
};

// REDUCERS
const postReducer = (state = postInitialFetchState, action) => {
    if(action.type === EDIT_NEW_POST) {
        return Object.assign({}, state, {
            payload: Object.assign({},state.payload, action.post)
        });
    }

    return state;
};


export const actions = {
    editNewPost,
};

export const reducers = {
    postReducer
};

const post = {
    actions,
    reducers
};

export default post;

