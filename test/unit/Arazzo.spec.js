'use strict';

const expect = require("chai").expect;
const sinon = require('sinon')

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
        describe(`info`, function () {
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

            it(`will create an info object when a minimal info object exsists on the OpenAPI Document`, async function () {
                const openAPIPath = 'https://example.com/openAPI.json'
                const openAPIFile = new OpenAPIFile(openAPIPath);
                openAPIFile.openAPILocation = `${path.resolve(__dirname, '../../..')}/Arazzo-Generator/test/mocks/openapi/bundled/user.json`;

                const stub = sinon.stub(openAPIFile, 'streamToInfo').resolves({})

                const arazzoFile = new ArazzoFile(openAPIFile);

                try {
                    await arazzoFile.generate();

                    expect(arazzoFile.arazzo).to.have.property('info');
                    expect(arazzoFile.arazzo.info).to.be.eql({
                        title: "Arazzo Workflow for https://example.com/openAPI.json",
                        "version": "0.0.1",
                    })
                } catch (err) {
                    console.error(err);
                    expect(err).to.not.be.instanceOf(Error);
                }

                stub.restore();
            });

            it(`will create an info object when a full info object exsists on the OpenAPI Document`, async function () {
                const openAPIPath = 'https://example.com/openAPI.json'
                const openAPIFile = new OpenAPIFile(openAPIPath);
                openAPIFile.openAPILocation = `${path.resolve(__dirname, '../../..')}/Arazzo-Generator/test/mocks/openapi/bundled/user.json`;

                const stub = sinon.stub(openAPIFile, 'streamToInfo').resolves({ title: "arazzo workflow", version: '2.0.0', description: 'An Arazzo Document', summary: "a summary" })

                const arazzoFile = new ArazzoFile(openAPIFile);

                try {
                    await arazzoFile.generate();

                    expect(arazzoFile.arazzo).to.have.property('info');
                    expect(arazzoFile.arazzo.info).to.be.eql({ title: "arazzo workflow", version: '2.0.0', description: 'An Arazzo Document', summary: "a summary" })
                } catch (err) {
                    console.error(err);
                    expect(err).to.not.be.instanceOf(Error);
                }

                stub.restore();
            });
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

            it(`generates an operationPath if operationId is missing`, async function () {
                const openAPIPath = 'https://example.com/openAPI.json'
                const openAPIFile = new OpenAPIFile(openAPIPath);
                openAPIFile.openAPILocation = `${path.resolve(__dirname, '../../..')}/Arazzo-Generator/test/mocks/openapi/bundled/missing-operationId.json`;
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

            describe(`security types`, function () {
                it(`generates workflows without security`, async function () {
                    const openAPIPath = 'https://example.com/openAPI.json'
                    const openAPIFile = new OpenAPIFile(openAPIPath);
                    openAPIFile.openAPILocation = `${path.resolve(__dirname, '../../..')}/Arazzo-Generator/test/mocks/openapi/bundled/no-security.json`;
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

                it(`generates workflows with global security`, async function () {
                    const openAPIPath = 'https://example.com/openAPI.json'
                    const openAPIFile = new OpenAPIFile(openAPIPath);
                    openAPIFile.openAPILocation = `${path.resolve(__dirname, '../../..')}/Arazzo-Generator/test/mocks/openapi/bundled/global-security.json`;
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

                it(`generates workflows with security at operation level`, async function () {
                    const openAPIPath = 'https://example.com/openAPI.json'
                    const openAPIFile = new OpenAPIFile(openAPIPath);
                    openAPIFile.openAPILocation = `${path.resolve(__dirname, '../../..')}/Arazzo-Generator/test/mocks/openapi/bundled/operation-security.json`;
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

                it(`generates workflows with global security and optional securtity at operation level`, async function () {
                    const openAPIPath = 'https://example.com/openAPI.json'
                    const openAPIFile = new OpenAPIFile(openAPIPath);
                    openAPIFile.openAPILocation = `${path.resolve(__dirname, '../../..')}/Arazzo-Generator/test/mocks/openapi/bundled/optional-security.json`;
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

            describe(`successCriteria`, function () {
                it(`should create a simple successCriteria object for a 200 response`, async function () {
                    const openAPIPath = 'https://example.com/openAPI.json'
                    const openAPIFile = new OpenAPIFile(openAPIPath);
                    openAPIFile.openAPILocation = `${path.resolve(__dirname, '../../..')}/Arazzo-Generator/test/mocks/openapi/bundled/responses/200-response.json`;
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

                it(`should create a regex successCriteria object for a 2xx response`, async function () {
                    const openAPIPath = 'https://example.com/openAPI.json'
                    const openAPIFile = new OpenAPIFile(openAPIPath);
                    openAPIFile.openAPILocation = `${path.resolve(__dirname, '../../..')}/Arazzo-Generator/test/mocks/openapi/bundled/responses/2XX-response.json`;
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

                it(`should not create a successCriteria object when there are no 2xx responses`, async function () {
                    const openAPIPath = 'https://example.com/openAPI.json'
                    const openAPIFile = new OpenAPIFile(openAPIPath);
                    openAPIFile.openAPILocation = `${path.resolve(__dirname, '../../..')}/Arazzo-Generator/test/mocks/openapi/bundled/responses/no-2xx-response.json`;
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

                it(`should create a successCriteria object when there are multiple 2xx responses`, async function () {
                    const openAPIPath = 'https://example.com/openAPI.json'
                    const openAPIFile = new OpenAPIFile(openAPIPath);
                    openAPIFile.openAPILocation = `${path.resolve(__dirname, '../../..')}/Arazzo-Generator/test/mocks/openapi/bundled/responses/multple-2xx-responses.json`;
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
});
