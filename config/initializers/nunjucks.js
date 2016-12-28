'use strict';

// Enable Nunjucks for templating
const nunjucks = require('nunjucks');

function configure(app, config) {

    // Autosets viewengine to njs
    app.set('view engine', 'njs');

    const njsViews = nunjucks.configure(config.viewDirectory, {
        autoescape: true,
        express: app,
        ext: [ "njs" ]
    });

    // Filters
    njsViews.addFilter('shorten', (str, count) => str.slice(0, count || 5));

    // Convert Data to JSON Format
    njsViews.addFilter('json', data => {
        let jsonString = null;

        try {
            jsonString = JSON.stringify(data);
        } catch(e) {
            jsonString = null;
        }

        return jsonString;
    });

    njsViews.addFilter('extractLocalAddress', (subject) => subject.replace(/.*?:\/\//g, ""));

    // Convert Data to JSON Format
    njsViews.addFilter('getLengthOfObjectWithValues', data => {
        let length = 0;

        for(const key in data) {
            if(data[key]) {
                length = length + 1;
            }
        }

        return length;
    });
}

module.exports = configure;