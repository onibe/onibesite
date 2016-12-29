"use strict";

const path = require('path');
const config = require('./config.json');
const rootPath = path.normalize(__dirname);

const gulpInit = require('./gulp');

// Gulp Configuration
gulpInit({
    base_path: rootPath,
    theme: config.theme
});