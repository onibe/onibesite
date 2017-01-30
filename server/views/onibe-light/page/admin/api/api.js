'use strict';

import 'whatwg-fetch';
import keyBy from 'lodash/keyBy';

const validRequestStatus = (response) => {
    if(response.status >= 200 && response.status < 300) {
        return response.json();
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

const defaultFetchOptions = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    }
};

// API requests
const loginRequest = (data) => {
    return fetch('/api/login', defaultFetchOptions)
        .then(validRequestStatus);
};

const testRequest = (data) => {
    return fetch('/api/test', defaultFetchOptions)
        .then(validRequestStatus);
};

const getPosts = (requestOptions) => {
    return fetch('/api/posts', Object.assign({}, defaultFetchOptions,requestOptions))
        .then(validRequestStatus)
        .then(data => keyBy(data,'id'));
};

const getPost = (id, requestOptions) => {
    return fetch('/api/posts/' + id, Object.assign({}, defaultFetchOptions,requestOptions))
        .then(validRequestStatus);
};

const updatePost = (post, requestOptions) => {
    return fetch('/api/posts/' + post.id, Object.assign({
        method: 'POST',
        body: JSON.stringify(post)
    }, defaultFetchOptions,requestOptions))
        .then(validRequestStatus);
};

const createPost = (post, requestOptions) => {
    return fetch('/api/posts/', Object.assign({
        method: 'POST',
        body: JSON.stringify(post)
    }, defaultFetchOptions,requestOptions))
        .then(validRequestStatus);
};

const deletePost = (id, requestOptions) => {
    return fetch('/api/posts/' + id, Object.assign({
        method: 'DELETE'
    }, defaultFetchOptions,requestOptions))
        .then(validRequestStatus);
};

const getTags = (id, requestOptions) => {
    return fetch('/api/tags', Object.assign({}, defaultFetchOptions,requestOptions))
        .then(validRequestStatus)
        .then(data => keyBy(data,'id'));
};

const api = {
    loginRequest,
    testRequest,
    getPosts,
    getPost,
    updatePost,
    createPost,
    deletePost,
    getTags
};

export default api;