'use strict';

const path = require('path');
const webpack = require('webpack');

const PATH = {
    entry: './js',
    dist: 'public/dist'
};

const settings = {
    entry: {
        "homepage": [
            path.resolve(__dirname) + "/js/homepage.js"
        ],
        "admin": [
            path.resolve(__dirname) + "/page/admin/index.js"
        ],
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
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};


module.exports = settings;
