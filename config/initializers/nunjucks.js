// Enable Nunjucks for templating
var nunjucks = require('nunjucks');

function configure(app, config) {
    app.set('view engine', 'njs');

    var njsViews = nunjucks.configure('server/views/' + config.theme, {
        autoescape: true,
        express: app,
        ext: [ "njs" ]
    });

    njsViews.addFilter('shorten', function(str, count) {
        return str.slice(0, count || 5);
    });

    // Alternatively dump filter
    njsViews.addFilter('json', function(data) {
        return JSON.stringify(data);
    });
}

module.exports = configure;