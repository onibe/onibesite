'use strict';

const http = require('http');

const authenticateSession = (req, res, next) => {
    if(req.session && req.session.user) {
        next();
    } else {
        const err = new Error("Forbidden");
        err.status = 403;

        next(err);
        // res.status(401).json({status: 401, error: http.STATUS_CODES[401]});
    }
};

const middleware = {
    authenticateSession
};

module.exports = middleware;