'use strict';

import React, { PropTypes, Component } from 'react';
import api from '../../api/api';

// CONSTANTS
const FETCH_POST = 'FETCH_POST';
const FETCH_POST_PENDING = 'FETCH_POST';
const FETCH_POST_FULFILLED = 'FETCH_POST_FULFILLED';
const FETCH_POST_REJECTED = 'FETCH_POST_REJECTED';

// ACTIONS
const fetchPost = (id) => {
    return {
        type: FETCH_POST,
        payload: api.getPost(id)
    };
};

// REDUCERS
const fetchPostReducer = (state = {fetching: false, fetched: false, payload: [], error: false}, action) => {
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
    }

    return state;
};

export const actions = {
    fetchPost
};

export const reducers = {
    fetchPostReducer
};

const post = {
    actions,
    reducers
};

export default post;

