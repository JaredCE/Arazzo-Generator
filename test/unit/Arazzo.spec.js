'use strict';

const expect = require("chai").expect;

const path = require('node:path');

const OpenAPIFile = require('../../src/OpenAPIFile')

const ArazzoFile = require('../../src/ArazzoFile');

describe(`Arazzo File`, function () {
    describe(`constructor`, function () {
        it(`returns an instance of ArazzoFile`, function () {
            const openAPIPath = 'https://example.com/openAPI.json'
            const openAPIFile = new OpenAPIFile(openAPIPath);
            openAPIFile.openAPILocation = `${path.resolve(__dirname, '../../..')}/Arazzo-Generator/test/mocks/openapi/bundled/user.json`;

            const expected = new ArazzoFile(openAPIFile);

            expect(expected).to.be.instanceOf(ArazzoFile);
            expect(expected).to.have.property('openAPIFile');
        });
    });
});
