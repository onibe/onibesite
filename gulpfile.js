// SET LOCAL require: usage: require(__base + '/path');
var path = require('path');
var rootPath = path.normalize(__dirname);
global.__base = rootPath;

require('./gulp');