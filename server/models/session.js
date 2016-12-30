'use strict';

const session = require('express-session');

// initialize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

class Session {
    constructor (sequelize) {
        this.db = sequelize;
    }

    forceSync () {
        return this.db.sync();
    }

    start() {
        const store = new SequelizeStore({
            table: 'sessions',
            db: this.db,
            checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
            expiration: 24 * 60 * 60 * 1000, // The maximum age (in milliseconds) of a valid session.
            extraDefaultFields: function (defaults, session) {
                return {
                    data: defaults.data,
                    expires: defaults.expires,
                    user_id: session.user.id
                };
            }
        });

        return session({
            name: 'onibe_sid',
            secret: 'keyboard cat',
            store: store,
            saveUninitialized: false,
            resave: true,
            cookie: {
                sameSite: true,
                httpOnly: true
            },
            proxy: true // if you do SSL outside of node.
        })
    }

}

module.exports = Session;