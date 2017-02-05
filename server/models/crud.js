'use strict';

const { findOneErrorHandler, updateFindOneHandler } = require('./helper');

class CRUD {
    constructor(dbInstance) {
        this.dbInstance = dbInstance;
    }

    sync() {
        return this.dbInstance.sync();
    }

    forceSync() {
        const { dbInstance } = this;

        return dbInstance.sync({force: true});
    }

    findAll(options) {
        const { dbInstance } = this;

        const mergedOptions = Object.assign({}, {
            include: [ {all: true} ]
        }, options);

        return dbInstance.findAll(mergedOptions);
    }

    findOne(options) {
        const { dbInstance } = this;

        const mergedOptions = Object.assign({}, {
            include: [ {all: true} ]
        }, options);

        return dbInstance.findOne(mergedOptions)
            .then(findOneErrorHandler);
    }

    findOneById(id, options) {
        const mergedOptions = Object.assign({}, {
            where: {id: id}
        }, options);

        return this.findOne(mergedOptions)
            .then(findOneErrorHandler);
    }

    create(entity, options) {
        const { dbInstance } = this;

        const mergedOptions = Object.assign({}, {
            include: [ {all: true} ]
        }, options);

        return dbInstance.create(entity, mergedOptions);
    }

    update(entity, options) {
        const { dbInstance } = this;

        const mergedOptions = Object.assign({}, {
            where: { id: entity.id }
        }, options);

        return dbInstance.update(entity, mergedOptions)
            .then(data => updateFindOneHandler(dbInstance,data,entity));
    }

    remove(data) {
        const { dbInstance } = this;

        return dbInstance.destroy(data);
    }

    removeById(id) {
        return this.remove({where: {id: id}});
    }

}

module.exports = CRUD;