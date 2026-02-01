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
            expect(expected).to.have.property('arazzo');
        });
    });

    describe(`generate`, function () {
        it(`generates an info object from an OpenAPI Document info object`, async function () {
            const openAPIPath = 'https://example.com/openAPI.json'
            const openAPIFile = new OpenAPIFile(openAPIPath);
            openAPIFile.openAPILocation = `${path.resolve(__dirname, '../../..')}/Arazzo-Generator/test/mocks/openapi/bundled/user.json`;

            const arazzoFile = new ArazzoFile(openAPIFile);

            try {
                await arazzoFile.generate();

                expect(arazzoFile.arazzo).to.have.property('info');
                expect(arazzoFile.arazzo.info).to.be.eql({
                    title: "Petstore User",
                    "description": "This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.\n",
                    "version": "1.0.0",
                })
            } catch (err) {
                console.error(err);
                expect(err).to.not.be.instanceOf(Error);
            }
        });

        it(`generates a sourceDescriptions array from an OpenAPI Document`, async function () {
            const openAPIPath = 'https://example.com/openAPI.json'
            const openAPIFile = new OpenAPIFile(openAPIPath);
            openAPIFile.openAPILocation = `${path.resolve(__dirname, '../../..')}/Arazzo-Generator/test/mocks/openapi/bundled/user.json`;
            openAPIFile.name = 'openAPI';

            const arazzoFile = new ArazzoFile(openAPIFile);

            try {
                await arazzoFile.generate();

                expect(arazzoFile.arazzo).to.have.property('sourceDescriptions');
                expect(arazzoFile.arazzo.sourceDescriptions).to.be.an('array');
                expect(arazzoFile.arazzo.sourceDescriptions).to.have.lengthOf(1);
                expect(arazzoFile.arazzo.sourceDescriptions[0]).to.be.eql({
                    url: openAPIPath,
                    type: 'openapi',
                    name: 'openAPI'
                })
            } catch (err) {
                console.error(err);
                expect(err).to.not.be.instanceOf(Error);
            }
        });

        describe(`workflows`, function () {
            it(`generates the expected workflows`, async function () {
                const openAPIPath = 'https://example.com/openAPI.json'
                const openAPIFile = new OpenAPIFile(openAPIPath);
                openAPIFile.openAPILocation = `${path.resolve(__dirname, '../../..')}/Arazzo-Generator/test/mocks/openapi/bundled/user.json`;
                openAPIFile.name = 'openAPI';

                const arazzoFile = new ArazzoFile(openAPIFile);

                try {
                    await arazzoFile.generate();

                    expect(arazzoFile.arazzo).to.have.property('workflows');
                } catch (err) {
                    console.error(err);
                    expect(err).to.not.be.instanceOf(Error);
                }
            });
        });
    });
});
