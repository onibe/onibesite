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

module.exports = {
    create: create,
    update: update,
    remove: remove
};