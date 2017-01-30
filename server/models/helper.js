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

// Handlers
const findOneErrorHandler = data => {
    if(!data){
        const err = new Error('No Data');
        err.status = 404;

        return Promise.reject(err);
    }

    return data;
};

const updateFindOneHandler = (db, data, entity) => {
    if(data[0] === 1) {
        return db.findOne({where: { id: entity.id }})
            .then(findOneErrorHandler);
    }

    return Promise.reject('Failed to update');
};

module.exports = {
    create: create,
    update: update,
    remove: remove,
    findOneErrorHandler: findOneErrorHandler,
    updateFindOneHandler: updateFindOneHandler
};