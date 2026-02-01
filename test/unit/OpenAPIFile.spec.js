'use strict'

const expect = require("chai").expect;
const nock = require("nock");

const OpenAPIFile = require('../../src/OpenAPIFile')

describe(`OpenAPI File`, function () {
    describe(`constructor`, function () {
        it(`returns an instance of OpenAPIFile`, function () {
            const openAPIPath = 'https://example.com/openAPI.json'
            const expected = new OpenAPIFile(openAPIPath);

            expect(expected).to.be.instanceOf(OpenAPIFile);
            expect(expected).to.have.property('openAPIPath');
            expect(expected.openAPIPath).to.be.equal(openAPIPath)
        });
    });
});
