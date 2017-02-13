'use strict';

const createDOMPurify = require('dompurify');
const jsdom = require('jsdom');
const window = jsdom.jsdom('', {
    features: {
        FetchExternalResources: false, // disables resource loading over HTTP / filesystem
        ProcessExternalResources: false // do not execute JS within script blocks
    }
}).defaultView;
const DOMPurify = createDOMPurify(window);

const sanitize = (html) => {
    return DOMPurify.sanitize(html, { ADD_TAGS: ['iframe'] });
};

module.exports = {
    DOMPurify: DOMPurify,
    sanitize: sanitize
};