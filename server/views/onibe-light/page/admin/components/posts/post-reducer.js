'use strict';

import api from '../../api/api';

// CONSTANTS
const EDIT_NEW_POST = 'EDIT_NEW_POST';
const ADD_TAG_TO_NEW_POST = 'ADD_TAG_TO_NEW_POST';
const DELETE_TAG_FROM_NEW_POST = 'DELETE_TAG_FROM_NEW_POST';
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

const addTagToNewPost = (tag) => {
    return {
        type: ADD_TAG_TO_NEW_POST,
        tag: tag
    };
};

const deleteTagFromNewPost = (tag) => {
    return {
        type: DELETE_TAG_FROM_NEW_POST,
        tag: tag
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
            modified: true,
            tags: []
        },
        error: false
    };
};

// REDUCERS
const postReducer = (state = newPost(), action) => {

    switch (action.type) {
        case EDIT_NEW_POST:
            return Object.assign({}, state, {
                payload: mergePost(state.payload, action.post)
            });
        case CLEAR_NEW_POST:
            return Object.assign({}, state, {
                payload: newPost().payload
            });
        case ADD_TAG_TO_NEW_POST:
            return Object.assign({}, state, {
                payload: mergePost(state.payload, { tags: state.payload.tags.concat(action.tag) })
            });
        case DELETE_TAG_FROM_NEW_POST:
            return Object.assign({}, state, {
                payload: mergePost(state.payload, { tags: state.payload.tags.filter(tag => tag.name !== action.tag.name) })
            });
        default:
            return state;
    }

};

export const mergePost = (post, newPost, modified = true) => {
    return Object.assign({},post, newPost, {modified: modified});
};

export const actions = {
    editNewPost,
    addTagToNewPost,
    deleteTagFromNewPost,
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

