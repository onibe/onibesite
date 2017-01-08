'use strict';

import 'whatwg-fetch';

const validRequestStatus = (response) => {
    if(response.status >= 200 && response.status < 300) {
        return response.json();
    }

    return Promise.reject(response);
};

const defaultFetchOptions = {
    credentials: 'include'
};

// API requests
const loginRequest = (data) => {
    return fetch('/api/login', defaultFetchOptions)
        .then(validRequestStatus);
};

// API requests
const testRequest = (data) => {
    return fetch('/api/test', defaultFetchOptions)
        .then(validRequestStatus);
};


// API requests
const getPosts = (requestOptions) => {
    return fetch('/api/posts', Object.assign({}, defaultFetchOptions,requestOptions))
        .then(validRequestStatus);
};

// API requests
const getPost= (id, requestOptions) => {
    return fetch('/api/posts/' + id, Object.assign({}, defaultFetchOptions,requestOptions))
        .then(validRequestStatus);
};

const api = {
    loginRequest,
    testRequest,
    getPosts,
    getPost
};

export default api;