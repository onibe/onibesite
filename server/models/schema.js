'use strict';

// Refer to http://docs.sequelizejs.com/en/v3/api/model

const Sequelize = require('sequelize');

class Schema {
    constructor(sequelize) {
        const user = sequelize.define('users', {
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

        const post = sequelize.define('posts', {
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
            published_by_id: Sequelize.INTEGER,
            create_date: Sequelize.DATE,
            created_by_id: Sequelize.INTEGER,
            update_date: Sequelize.STRING,
            updated_by_id: Sequelize.INTEGER,
        });

        // User.hasMany add getPosts to user instance
        user.hasMany(post, { foreignKey: 'published_by_id' });
        post.belongsTo(user, { foreignKey: 'published_by_id', constraints: false });

        const session = sequelize.define('sessions', {
            sid: {
                type: Sequelize.STRING,
                primaryKey: true
            },
            user_id: Sequelize.STRING,
            uuid: Sequelize.STRING,
            expires: Sequelize.DATE,
            data: Sequelize.STRING(50000)
        }, {
            freezeTableName: true
        });

        this.user = user;
        this.post = post;
        this.session = session;
    }
}

module.exports = Schema;
