"use strict";

import 'whatwg-fetch'

const validRequestStatus = (response) => {
    if(response.status >= 200 && response.status < 300) {
        return response.text();
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


const api = {
    loginRequest,
    testRequest
};

export default api;