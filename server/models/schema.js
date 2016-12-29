"use strict";

// Refer to http://docs.sequelizejs.com/en/v3/api/model

const Sequelize = require('sequelize');

class Schema {
    constructor(sequelize) {
        const User = sequelize.define('user', {
            username: {
                type: Sequelize.STRING,
                validation: {
                    isAlphanumeric: true
                },
                unique: true
            },
            uuid:  {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                unique: true
            },
            password: {
                type: Sequelize.STRING
            },
            display_name: Sequelize.STRING,
            twitter: Sequelize.STRING,
            facebook: Sequelize.STRING,
            youtube: Sequelize.STRING,
        });

        const Post = sequelize.define('post', {
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
            publish_date: Sequelize.STRING,
            published_by_id: {
                type: Sequelize.INTEGER,
            },
            create_date: Sequelize.DATE,
            created_by_id: Sequelize.INTEGER,
            update_date: Sequelize.STRING,
            updated_by_id: Sequelize.INTEGER,
        });

        // User.hasMany add getPosts to user instance
        User.hasMany(Post, { foreignKey: 'published_by_id' });
        Post.belongsTo(User, { foreignKey: 'published_by_id', constraints: false });

        this.User = User;
        this.Post = Post;
    }
}

module.exports = Schema;
