"use strict";

const { Sequelize, sequelize } = require('../data');

class Post {
    constructor() {
        // Refer to http://docs.sequelizejs.com/en/v3/api/model
        this.db = sequelize.define('post', {
            uuid: Sequelize.STRING,
            title: Sequelize.TEXT,
            blurb: Sequelize.TEXT,
            markdown: Sequelize.TEXT,
            html: Sequelize.TEXT,
            image: Sequelize.TEXT,
            is_page: Sequelize.BOOLEAN,
            status: Sequelize.STRING,
            draft: Sequelize.BOOLEAN,
            visibility: Sequelize.STRING,
            meta_title: Sequelize.STRING,
            meta_description: Sequelize.STRING,
            author_id: Sequelize.INTEGER,
            publish_date: Sequelize.STRING,
            published_by_id: Sequelize.INTEGER,
            create_date: Sequelize.DATE,
            created_by_id: Sequelize.INTEGER,
            update_date: Sequelize.STRING,
            updated_by_id: Sequelize.INTEGER,
        });
    }

    forceSync() {
        const { db } = this;

        return db.sync({force: true});
    }

    update(post) {
        const { db } = this;

        // Generate Update Data
        return db.sync()
            .then(db.create(post));
    }

    create(post) {
        const { db } = this;

        // Generate Date
        //
        return db.sync()
            .then(db.create(post));
    }

}

module.exports = Post;