'use strict';

const OpenAPIFile = require('./OpenAPIFile');
const ArazzoFile = require('./ArazzoFile');

class Generator {
    constructor(options) {
        this.options = options;

        try {
            this.config = require(path.resolve("./options", "generatorConfig.js"));
        } catch (err) {
            this.config = {};
        }
    }

    async generate(openAPIURL, output) {
        const openAPIFile = new OpenAPIFile(openAPIURL, this.config);
        await openAPIFile.getAndBundle();

        const arazzoDocument = new ArazzoFile(openAPIFile, output);
        await arazzoDocument.generate();
    }
}

module.exports = Generator;
