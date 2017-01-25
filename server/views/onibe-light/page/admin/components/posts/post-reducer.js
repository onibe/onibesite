'use strict';

import api from '../../api/api';

// CONSTANTS
const EDIT_NEW_POST = 'EDIT_NEW_POST';
const CLEAR_NEW_POST = 'CLEAR_NEW_POST';

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

const clearNewPost = (post) => {
    return {
        type: CLEAR_NEW_POST,
        post: post
    };
};

const newPost = () => {
    return {
        fetching: false,
        fetched: false,
        payload: {
            id: null,
            title: '',
            markdown: '',
            draft: false,
            createdAt: (new Date()).toISOString(),
            updatedAt: (new Date()).toISOString(),
            modified: true
        },
        error: false
    };
};

// REDUCERS
const postReducer = (state = newPost(), action) => {
    if(action.type === EDIT_NEW_POST) {
        return Object.assign({}, state, {
            payload: Object.assign({},state.payload, action.post)
        });
    }

    else if(action.type === CLEAR_NEW_POST) {
        return Object.assign({}, state, {
            payload: newPost().payload
        });
    }

    return state;
};


export const actions = {
    editNewPost,
    createPost,
    clearNewPost
};

export const reducers = {
    postReducer
};

const post = {
    actions,
    reducers
};

export default post;

