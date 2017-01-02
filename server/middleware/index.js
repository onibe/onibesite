'use strict';

const http = require('http');

const authenticateSession = (req, res, next) => {
    if(req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({status: '', error: http.STATUS_CODES[401]});
    }
};

const middleware = {
    authenticateSession
};

module.exports = middleware;