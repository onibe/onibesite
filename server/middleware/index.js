'use strict';


const authenticationSession = (req, res, next) => {
    if(req.session && req.session.user) {
        next();
    }
};

const middleware = {
    api: {
        authenticateSession: ''
    }
};

export default middleware;