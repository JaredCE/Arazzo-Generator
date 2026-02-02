'use strict';

const OpenAPIFile = require('./OpenAPIFile');
const ArazzoFile = require('./ArazzoFile');

class Generator {
    constructor(options) {
        this.options = options;
    }

    async generate(openAPIURL) {
        const openAPIFile = new OpenAPIFile(openAPIURL);
        await openAPIFile.getAndBundle();

        const arazzoDocument = new ArazzoFile(openAPIFile);
        await arazzoDocument.generate();
    }
}

module.exports = Generator;
