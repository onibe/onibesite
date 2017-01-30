'use strict';

import api from '../../api/api';

// CONSTANTS
const FETCH_TAGS = 'FETCH_TAGS';
const FETCH_TAGS_PENDING = 'FETCH_TAGS_PENDING';
const FETCH_TAGS_FULFILLED = 'FETCH_TAGS_FULFILLED';
const FETCH_TAGS_REJECTED = 'FETCH_TAGS_REJECTED';

// ACTIONS
// Using Promise Middleware: payload is required for async http requests
const fetchTags = (options) => {
    return {
        type: FETCH_TAGS,
        payload: api.getTags(options)
    };
};

const initialState = {
    fetching: false,
    fetched: false,
    payload: {},
    error: null
};

// REDUCERS
const fetchTagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TAGS_PENDING:
            return Object.assign({}, state, {
                fetching: true
            });
        case FETCH_TAGS_FULFILLED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                payload: Object.assign({},state.payload, action.payload)
            });
        case FETCH_TAGS_REJECTED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                payload: null,
                error: action.payload
            });
        default:
            return state;
    }
};

export const actions = {
    fetchTags
};

export const reducers = {
    fetchTagsReducer
};

const posts = {
    actions,
    reducers
};

export default posts;