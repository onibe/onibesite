'use strict';

const defaultMenu = (data) => {
    return {
        data: Object.assign({},{
            "title": "ONIBE",
            "header": "ONIBE Translations",
            "meta": {
                "title": "ONIBE",
                "description": "Love Live Translators",
                "facebook": {
                    "type": "blog",
                    "title": "onibe" || data.title,
                    "site_name": "onibe",
                }
            },
            "slogan": "",
            "nav": {
                "team": "/team",
                "posts": "/posts",
                "about": "/about",
            },
            "social_media": {
                "facebook": "https://www.facebook.com/teamonibe/",
                "twitter": "https://twitter.com/teamonibe"
            },
            "copyright": "Team ONIBE ©"
        },data)
    };
};


module.exports = {
    defaultMenu
};