var path = require('path');

var PATH = {
    entry: './js',
    dist: 'public/dist'
};

var settings = {
    entry: {
        "homepage": [
            path.resolve(__dirname) + "/js/homepage.js"
        ]
    },
    output: {
        path: PATH.dist + "/onibe-light/js" ,
        filename: "[name].js"
    },
    stats: {
        colors: true,
        reasons: true
    },
    cache: true,
    debug: true,
    devtool: "eval",
    resolve: {
        root: [
            path.resolve("./node_modules")
        ]
    }
};


module.exports = settings;
