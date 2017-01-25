'use strict';

import api from '../../api/api';
import omit from 'lodash/omit';

// CONSTANTS
const FETCH_POSTS = 'FETCH_POSTS';
const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING';
const FETCH_POSTS_FULFILLED = 'FETCH_POSTS_FULFILLED';
const FETCH_POSTS_REJECTED = 'FETCH_POSTS_REJECTED';
const FETCH_POSTS_SEARCH = 'FETCH_POSTS_SEARCH';

const EDIT_POST = 'EDIT_POST';

const FETCH_POST = 'FETCH_POST';
const FETCH_POST_PENDING = 'FETCH_POST_PENDING';
const FETCH_POST_FULFILLED = 'FETCH_POST_FULFILLED';
const FETCH_POST_REJECTED = 'FETCH_POST_REJECTED';

const UPDATE_POST = 'UPDATE_POST';
const UPDATE_POST_PENDING = 'UPDATE_POST_PENDING';
const UPDATE_POST_FULFILLED = 'UPDATE_POST_FULFILLED';
const UPDATE_POST_REJECTED = 'UPDATE_POST_REJECTED';

const DELETE_POST = 'DELETE_POST';
const DELETE_POST_PENDING = 'DELETE_POST_PENDING';
const DELETE_POST_FULFILLED = 'DELETE_POST_FULFILLED';
const DELETE_POST_REJECTED = 'DELETE_POST_REJECTED';

// ACTIONS
// Using Promise Middleware: payload is required for async http requests

const fetchPosts = (options) => {
    return {
        type: FETCH_POSTS,
        payload: api.getPosts(options)
    };
};

const fetchPost = (id) => {
    return {
        type: FETCH_POST,
        payload: api.getPost(id)
    };
};

const updatePost = (post) => {
    return {
        type: UPDATE_POST,
        payload: api.updatePost(post)
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
    };
};

const deletePost = (id) => {
    return {
        type: DELETE_POST,
        meta: {
            id: id
        },
        payload: api.deletePost(id)
    };
};

const initialState =  {
    search: {},
    fetching: false,
    fetched: false,
    payload: {},
    error: null
};

// REDUCERS
const fetchPostsReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_POSTS_SEARCH:
            return Object.assign({}, state, {
                search: action.search
            });
        case FETCH_POSTS_PENDING:
            return Object.assign({}, state, {
                fetching: true
            });
        case FETCH_POSTS_FULFILLED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                payload: Object.assign({},state.payload, action.payload)
            });
        case FETCH_POSTS_REJECTED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                error: action.payload
            });
        case FETCH_POST:
            return Object.assign({}, state, {
                fetching: true
            });
        case FETCH_POST_PENDING:
            return Object.assign({}, state, {
                fetching: true
            });
        case FETCH_POST_FULFILLED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                payload: Object.assign({}, state.payload, {
                    [action.payload.id]: Object.assign({}, state.payload[action.payload.id], action.payload, {
                        modified: false
                    })
                })
            });
        case FETCH_POST_REJECTED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                error: action.payload
            });
        case EDIT_POST:
            return Object.assign({}, state, {
                payload: Object.assign({}, state.payload,{
                    [action.post.id]:  Object.assign({}, state.payload[action.post.id], action.post, {modified: true})
                })
            });
        case UPDATE_POST_PENDING:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true
            });
        case UPDATE_POST_FULFILLED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                payload: Object.assign({}, state.payload, {
                    [action.payload.id]: Object.assign({}, state.payload[action.payload.id], action.payload, {
                        modified: false
                    })
                })
            });
        case UPDATE_POST_REJECTED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                error: action.payload
            });
        case DELETE_POST_PENDING:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true
            });
        case DELETE_POST_FULFILLED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                payload: omit(state.payload, action.meta.id)
            });
        case DELETE_POST_REJECTED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                error: action.payload
            });
        default:
            return state;
    }
};

export const actions = {
    fetchPosts,
    fetchPost,
    fetchPostSearch,
    editPost,
    updatePost,
    deletePost
};

export const reducers = {
    fetchPostsReducer
};

const posts = {
    actions,
    reducers
};

export default posts;

