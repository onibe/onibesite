'use strict';

// Additional fields to sanitize or update before an operation
const create = data => {
    return Object.assign({}, data, {

    });
};

const update = data => {
    return Object.assign({}, data, {

    });
};

const remove = data => {
    return data;
};

const findOneErrorHandler = data => {
    if(!data){
        const err = new Error('No Data');
        err.status = 404;

        return Promise.reject(err);
    }

    return data;
};

module.exports = {
    create: create,
    update: update,
    remove: remove,
    findOneErrorHandler: findOneErrorHandler
};