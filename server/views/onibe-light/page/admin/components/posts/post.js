'use strict';

import React, { PropTypes, Component } from 'react';
import api from '../../api/api';

// CONSTANTS
const FETCH_POST = 'FETCH_POST';
const FETCH_POST_PENDING = 'FETCH_POST';
const FETCH_POST_FULFILLED = 'FETCH_POST_FULFILLED';
const FETCH_POST_REJECTED = 'FETCH_POST_REJECTED';

const SELECT_POST = 'SELECT_POST';

const EDIT_MARKDOWN = 'EDIT_MARKDOWN';

const UPDATE_POST = 'UPDATE_POST';

// ACTIONS
const fetchPost = (id) => {
    return {
        type: FETCH_POST,
        payload: api.getPost(id)
    };
};

const selectPost = (post) => {
    return {
        type: SELECT_POST,
        payload: post
    }
};

const updatePost = (post) => {
    return {
        type: UPDATE_POST,
        payload: api.postPost()
    }
};

const editMarkdown = (markdown) => {
    return {
        type: EDIT_MARKDOWN,
        markdown: markdown
    }
};

const postInitialFetchState = {
    fetching: false,
    fetched: false,
    payload: {},
    error: false
};

// REDUCERS
const fetchPostReducer = (state = postInitialFetchState, action) => {
    if(action.type === FETCH_POST_PENDING) {
        return Object.assign({}, state, {
            fetching: true,
            fetched: false,
            error: false,
        });
    } else if(action.type === FETCH_POST_FULFILLED) {
        return Object.assign({}, state, {
            fetching: false,
            fetched: true,
            error: false,
            payload: action.payload
        });
    } else if(action.type === FETCH_POST_REJECTED) {
        return Object.assign({}, state, {
            fetching: false,
            fetched: true,
            error: true,
            payload: action.payload
        });
    } else if(action.type === SELECT_POST){
        return Object.assign({}, state, {
            fetching: false,
            fetched: true,
            error: false,
            payload: action.payload
        });
    } else if(action.type === EDIT_MARKDOWN) {
        return Object.assign({}, state, {
            payload: Object.assign({},state.payload, {markdown: action.markdown})
        });
    }

    return state;
};

const postInitialState = {

};

const postCreationReducer = (state = postInitialState, action) => {


};

export const actions = {
    fetchPost,
    selectPost,
    editMarkdown
};

export const reducers = {
    fetchPostReducer
};

const post = {
    actions,
    reducers
};

export default post;

