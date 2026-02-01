'use strict'

const expect = require("chai").expect;
const nock = require("nock");
const sinon = require('sinon');

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

    describe(`getAndBundle`, function () {
        it(`can download an OpenAPI Document and bundle it`, async function () {
            nock('https://raw.githubusercontent.com:443', { "encodedQueryParams": true })
                .get('/JaredCE/Arazzo-Runner/refs/heads/main/test/mocks/openapi/microservices/user.json')
                .reply(200, ["1f8b0800000000000013ed59db6e1b37107dd7570c367d680067a5d86e1ffc54c7490aa38113c0098ac235106a35d232d95d6ec95929aae17f2fc8bd88cbbd48beabb0f2e0d84b72387378e670485e0d003c9162c252ee1d8177e08ffc036f4f7f0d449c8a041352de115c0d00003c158418b3d507dd4d2223fca2505a5f013c5aa6a82d8af1370cc8982c5a52295294c451d5460078994299b0189def963545922733cf6abcdeb32d4cb9547476271311bbab058c198f6e3f3c654a2d849cdcc14228923bf8af97e19c1865ee02593678423843e9edd59ba742c68c8a0e07fb6ef3045520794a5c24ba8f660d1433d9de54bf5b7e793f621753afe08ab1b332500eaf067bf7c34edeb3229bc0f1eb613fe43be6ef987fdfccd7019d18859e6c5d02ac715bf5facda4644bdb6d4e18373cee8cb22fcef648d7c6da1fadc3b4ce5ce925ab0d5a3f809a17c706a22740af53ccd605e792a753d26e68a853d86e68e7764be618e914b99bda6995ba1b1ae911bc1b13be217a1bcb9ec3eb1ad19ae2d7297feb35a5c1ca0eb0f2d1c5584f6190494ecb735dfdd608ef1d67140ac9ff6545846db996f23fb0966ca5f7f5c176361ab04264935578854b83c22d8f2753b12acc8953646c7e425224248281a608c05985cf2157c01530502c4e230485728e12aab1f9df3ec05f2283802530e5c904444610eb6636d6bf9e2fd86c861218c14548941e0d872affe47371f973e3d34b10124402175c06fe54222662827e82b4072f8a5e2da3865c06c3973ec07b2181b4e3b9cf7bb02c7ccb140285082ce5f01d97f055a5187016bdfa8ecbaf40020815e53d6cbc61ca2342a9fcbf4be8bd394a5540f4da1ff9a3f23ba18cd5c7e939ca390f0cca4d374d9f6139221009b1806ca6948b5ead73a5269a21842cfe6d65ceabf12fe201260adbac1da72c0811f62b6735d16564f9b8582c7c667af942ce86852d35fc707af2eeecfcddab7d7fe48714479ec3af92f4de115c98a64ece5f5c56432fcdd09451681d1a8759bdfcf652a1a89e2b2a8b6326f55c5ebeeb43a66a7ad34a61bdfa228996304698880461bc34eb1c89d90c27c00d37a46f9bd19b96f1fb54ebaf7d78b52b2026598c9a1c263aab85d84c558058bab2d220bbb7c47f3254f4464c96eed6ea8453943ac65f68db6eb5292e4d314432c35a9b261b26d4544996a6110f4cb8c36fcad1a7127973a26f6901f07e9238d5debd18aeee0286c515c0d082ce19793de8faabbdbc95a852a139e982b43f7add0caa6d47098a4ad1d9dcba80d90c9a7e70d6c16317de8dc1d7fd883961e4fb8041a77b9b3c1cfdb216abd364ce22ae1323cdc805ab6b96e68e5ad326136841863f39856ed1b949b22b88b8221053c37f050b4e21ccf81c93dc556894ab4e601b65b8aadc3b75e2bfb7846f6866fecf59950efd74f1be9d927cb090fc9f28c9eaacf2d442a2e0643b95443d4729d154de5e25d1deed846427243b21d95221b92a0ffcd7b688ccb05b437e47cae93e5ee6ff9b53d6adc46286a479f06679e698a82b44776e9707bcead6c28126bf22d027ad3537cd6e734fdaf6d16b3db58c971b24da63ab6207752e37cbf7d15a06ab2c0850a969164145826d4afbb623da03a5fb7ab0ca742f09032ad3f1378572c3190f373b202682602ab264e3699a0a535daf689dea52902fe9a43ac73ffced456666ebbfbd78048531eb482123481027fac66d8c90fbd6c0fbd9a9cfbdd66436bdf29aacb3249bb2486d4b4df660e5d833519c094648d8293a6f4df323694eeecb936bcee710a1ae3baa109edcc19df06c243ccf32af06e5cff2a1433f76a9e63b47fd1d252d1ec77cebd167bebf7a35c99f3e6a2bdb78ada9a5a81bdec732d154f1c056ef8d3f48031dbd15417dbd5c3bef5bdeea4426c1786f276d3dbe5558aaf9e49807d7eac226d3174f85e5eb58d7c47adeebc1f5e03ff912045a95280000"], {
                    'accept-ranges': 'bytes',
                    'access-control-allow-origin': '*',
                    'cache-control': 'max-age=300',
                    connection: 'keep-alive',
                    'content-encoding': 'gzip',
                    'content-length': '1407',
                    'content-security-policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
                    'content-type': 'text/plain; charset=utf-8',
                    'cross-origin-resource-policy': 'cross-origin',
                    date: 'Sat, 24 Jan 2026 12:37:16 GMT',
                    etag: 'W/"b13187726bd6876ac4a624d7e81f30db75f7e703322c5f9f7bc06d780fb3cf7e"',
                    expires: 'Sat, 24 Jan 2026 12:42:16 GMT',
                    'source-age': '0',
                    'strict-transport-security': 'max-age=31536000',
                    vary: 'Authorization,Accept-Encoding',
                    via: '1.1 varnish',
                    'x-cache': 'HIT',
                    'x-cache-hits': '0',
                    'x-content-type-options': 'nosniff',
                    'x-fastly-request-id': '38c0a5568c729b72cc70f4ab26ce9b7a15981cf2',
                    'x-frame-options': 'deny',
                    'x-github-request-id': 'CB6D:332E6A:41ED07:7E7C68:6974B968',
                    'x-served-by': 'cache-lhr-egll1980052-LHR',
                    'x-timer': 'S1769258236.244061,VS0,VE99',
                    'x-xss-protection': '1; mode=block'
                });

            const openAPIPath = 'https://raw.githubusercontent.com/JaredCE/Arazzo-Runner/refs/heads/main/test/mocks/openapi/microservices/user.json'
            const openAPIFile = new OpenAPIFile(openAPIPath);

            try {
                await openAPIFile.getAndBundle();

                expect(openAPIFile).to.have.property('openAPILocation');
                expect(openAPIFile.openAPILocation).to.be.equal('/Users/jaredevans/Projects/GitHub/Personal/Arazzo-Generator/user.json')
            } catch (err) {
                console.error(err);
                expect(err).to.not.be.instanceOf(Error);
            }
        });

        it(`will error when trying to budle an OpenAPI Document`, async function () {
            nock('https://raw.githubusercontent.com:443', { "encodedQueryParams": true })
                .get('/JaredCE/Arazzo-Runner/refs/heads/main/test/mocks/openapi/microservices/user.json')
                .reply(200, ["1f8b0800000000000013ed59db6e1b37107dd7570c367d680067a5d86e1ffc54c7490aa38113c0098ac235106a35d232d95d6ec95929aae17f2fc8bd88cbbd48beabb0f2e0d84b72387378e670485e0d003c9162c252ee1d8177e08ffc036f4f7f0d449c8a041352de115c0d00003c158418b3d507dd4d2223fca2505a5f013c5aa6a82d8af1370cc8982c5a52295294c451d5460078994299b0189def963545922733cf6abcdeb32d4cb9547476271311bbab058c198f6e3f3c654a2d849cdcc14228923bf8af97e19c1865ee02593678423843e9edd59ba742c68c8a0e07fb6ef3045520794a5c24ba8f660d1433d9de54bf5b7e793f621753afe08ab1b332500eaf067bf7c34edeb3229bc0f1eb613fe43be6ef987fdfccd7019d18859e6c5d02ac715bf5facda4644bdb6d4e18373cee8cb22fcef648d7c6da1fadc3b4ce5ce925ab0d5a3f809a17c706a22740af53ccd605e792a753d26e68a853d86e68e7764be618e914b99bda6995ba1b1ae911bc1b13be217a1bcb9ec3eb1ad19ae2d7297feb35a5c1ca0eb0f2d1c5584f6190494ecb735dfdd608ef1d67140ac9ff6545846db996f23fb0966ca5f7f5c176361ab04264935578854b83c22d8f2753b12acc8953646c7e425224248281a608c05985cf2157c01530502c4e230485728e12aab1f9df3ec05f2283802530e5c904444610eb6636d6bf9e2fd86c861218c14548941e0d872affe47371f973e3d34b10124402175c06fe54222662827e82b4072f8a5e2da3865c06c3973ec07b2181b4e3b9cf7bb02c7ccb140285082ce5f01d97f055a5187016bdfa8ecbaf40020815e53d6cbc61ca2342a9fcbf4be8bd394a5540f4da1ff9a3f23ba18cd5c7e939ca390f0cca4d374d9f6139221009b1806ca6948b5ead73a5269a21842cfe6d65ceabf12fe201260adbac1da72c0811f62b6735d16564f9b8582c7c667af942ce86852d35fc707af2eeecfcddab7d7fe48714479ec3af92f4de115c98a64ece5f5c56432fcdd09451681d1a8759bdfcf652a1a89e2b2a8b6326f55c5ebeeb43a66a7ad34a61bdfa228996304698880461bc34eb1c89d90c27c00d37a46f9bd19b96f1fb54ebaf7d78b52b2026598c9a1c263aab85d84c558058bab2d220bbb7c47f3254f4464c96eed6ea8453943ac65f68db6eb5292e4d314432c35a9b261b26d4544996a6110f4cb8c36fcad1a7127973a26f6901f07e9238d5debd18aeee0286c515c0d082ce19793de8faabbdbc95a852a139e982b43f7add0caa6d47098a4ad1d9dcba80d90c9a7e70d6c16317de8dc1d7fd883961e4fb8041a77b9b3c1cfdb216abd364ce22ae1323cdc805ab6b96e68e5ad326136841863f39856ed1b949b22b88b8221053c37f050b4e21ccf81c93dc556894ab4e601b65b8aadc3b75e2bfb7846f6866fecf59950efd74f1be9d927cb090fc9f28c9eaacf2d442a2e0643b95443d4729d154de5e25d1deed846427243b21d95221b92a0ffcd7b688ccb05b437e47cae93e5ee6ff9b53d6adc46286a479f06679e698a82b44776e9707bcead6c28126bf22d027ad3537cd6e734fdaf6d16b3db58c971b24da63ab6207752e37cbf7d15a06ab2c0850a969164145826d4afbb623da03a5fb7ab0ca742f09032ad3f1378572c3190f373b202682602ab264e3699a0a535daf689dea52902fe9a43ac73ffced456666ebbfbd78048531eb482123481027fac66d8c90fbd6c0fbd9a9cfbdd66436bdf29aacb3249bb2486d4b4df660e5d833519c094648d8293a6f4df323694eeecb936bcee710a1ae3baa109edcc19df06c243ccf32af06e5cff2a1433f76a9e63b47fd1d252d1ec77cebd167bebf7a35c99f3e6a2bdb78ada9a5a81bdec732d154f1c056ef8d3f48031dbd15417dbd5c3bef5bdeea4426c1786f276d3dbe5558aaf9e49807d7eac226d3174f85e5eb58d7c47adeebc1f5e03ff912045a95280000"], {
                    'accept-ranges': 'bytes',
                    'access-control-allow-origin': '*',
                    'cache-control': 'max-age=300',
                    connection: 'keep-alive',
                    'content-encoding': 'gzip',
                    'content-length': '1407',
                    'content-security-policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
                    'content-type': 'text/plain; charset=utf-8',
                    'cross-origin-resource-policy': 'cross-origin',
                    date: 'Sat, 24 Jan 2026 12:37:16 GMT',
                    etag: 'W/"b13187726bd6876ac4a624d7e81f30db75f7e703322c5f9f7bc06d780fb3cf7e"',
                    expires: 'Sat, 24 Jan 2026 12:42:16 GMT',
                    'source-age': '0',
                    'strict-transport-security': 'max-age=31536000',
                    vary: 'Authorization,Accept-Encoding',
                    via: '1.1 varnish',
                    'x-cache': 'HIT',
                    'x-cache-hits': '0',
                    'x-content-type-options': 'nosniff',
                    'x-fastly-request-id': '38c0a5568c729b72cc70f4ab26ce9b7a15981cf2',
                    'x-frame-options': 'deny',
                    'x-github-request-id': 'CB6D:332E6A:41ED07:7E7C68:6974B968',
                    'x-served-by': 'cache-lhr-egll1980052-LHR',
                    'x-timer': 'S1769258236.244061,VS0,VE99',
                    'x-xss-protection': '1; mode=block'
                });

            const openAPIPath = 'https://raw.githubusercontent.com/JaredCE/Arazzo-Runner/refs/heads/main/test/mocks/openapi/microservices/user.json'
            const openAPIFile = new OpenAPIFile(openAPIPath);

            const stub = sinon.stub(openAPIFile, 'writeOpenAPIDocument').rejects(new Error('sinon threw from writeOpenAPIDocument'))

            try {
                await openAPIFile.getAndBundle();

                expect(openAPIFile).to.have.property('openAPILocation');
                expect(openAPIFile.openAPILocation).to.be.equal('downloads/user.json')
            } catch (err) {
                console.error(err);
                expect(err).to.be.instanceOf(Error);
            }

            stub.restore();
        });

        it(`will error when trying to budle an OpenAPI Document`, async function () {
            nock('https://raw.githubusercontent.com:443', { "encodedQueryParams": true })
                .get('/JaredCE/Arazzo-Runner/refs/heads/main/test/mocks/openapi/microservices/user.json')
                .reply(200, ["1f8b0800000000000013ed59db6e1b37107dd7570c367d680067a5d86e1ffc54c7490aa38113c0098ac235106a35d232d95d6ec95929aae17f2fc8bd88cbbd48beabb0f2e0d84b72387378e670485e0d003c9162c252ee1d8177e08ffc036f4f7f0d449c8a041352de115c0d00003c158418b3d507dd4d2223fca2505a5f013c5aa6a82d8af1370cc8982c5a52295294c451d5460078994299b0189def963545922733cf6abcdeb32d4cb9547476271311bbab058c198f6e3f3c654a2d849cdcc14228923bf8af97e19c1865ee02593678423843e9edd59ba742c68c8a0e07fb6ef3045520794a5c24ba8f660d1433d9de54bf5b7e793f621753afe08ab1b332500eaf067bf7c34edeb3229bc0f1eb613fe43be6ef987fdfccd7019d18859e6c5d02ac715bf5facda4644bdb6d4e18373cee8cb22fcef648d7c6da1fadc3b4ce5ce925ab0d5a3f809a17c706a22740af53ccd605e792a753d26e68a853d86e68e7764be618e914b99bda6995ba1b1ae911bc1b13be217a1bcb9ec3eb1ad19ae2d7297feb35a5c1ca0eb0f2d1c5584f6190494ecb735dfdd608ef1d67140ac9ff6545846db996f23fb0966ca5f7f5c176361ab04264935578854b83c22d8f2753b12acc8953646c7e425224248281a608c05985cf2157c01530502c4e230485728e12aab1f9df3ec05f2283802530e5c904444610eb6636d6bf9e2fd86c861218c14548941e0d872affe47371f973e3d34b10124402175c06fe54222662827e82b4072f8a5e2da3865c06c3973ec07b2181b4e3b9cf7bb02c7ccb140285082ce5f01d97f055a5187016bdfa8ecbaf40020815e53d6cbc61ca2342a9fcbf4be8bd394a5540f4da1ff9a3f23ba18cd5c7e939ca390f0cca4d374d9f6139221009b1806ca6948b5ead73a5269a21842cfe6d65ceabf12fe201260adbac1da72c0811f62b6735d16564f9b8582c7c667af942ce86852d35fc707af2eeecfcddab7d7fe48714479ec3af92f4de115c98a64ece5f5c56432fcdd09451681d1a8759bdfcf652a1a89e2b2a8b6326f55c5ebeeb43a66a7ad34a61bdfa228996304698880461bc34eb1c89d90c27c00d37a46f9bd19b96f1fb54ebaf7d78b52b2026598c9a1c263aab85d84c558058bab2d220bbb7c47f3254f4464c96eed6ea8453943ac65f68db6eb5292e4d314432c35a9b261b26d4544996a6110f4cb8c36fcad1a7127973a26f6901f07e9238d5debd18aeee0286c515c0d082ce19793de8faabbdbc95a852a139e982b43f7add0caa6d47098a4ad1d9dcba80d90c9a7e70d6c16317de8dc1d7fd883961e4fb8041a77b9b3c1cfdb216abd364ce22ae1323cdc805ab6b96e68e5ad326136841863f39856ed1b949b22b88b8221053c37f050b4e21ccf81c93dc556894ab4e601b65b8aadc3b75e2bfb7846f6866fecf59950efd74f1be9d927cb090fc9f28c9eaacf2d442a2e0643b95443d4729d154de5e25d1deed846427243b21d95221b92a0ffcd7b688ccb05b437e47cae93e5ee6ff9b53d6adc46286a479f06679e698a82b44776e9707bcead6c28126bf22d027ad3537cd6e734fdaf6d16b3db58c971b24da63ab6207752e37cbf7d15a06ab2c0850a969164145826d4afbb623da03a5fb7ab0ca742f09032ad3f1378572c3190f373b202682602ab264e3699a0a535daf689dea52902fe9a43ac73ffced456666ebbfbd78048531eb482123481027fac66d8c90fbd6c0fbd9a9cfbdd66436bdf29aacb3249bb2486d4b4df660e5d833519c094648d8293a6f4df323694eeecb936bcee710a1ae3baa109edcc19df06c243ccf32af06e5cff2a1433f76a9e63b47fd1d252d1ec77cebd167bebf7a35c99f3e6a2bdb78ada9a5a81bdec732d154f1c056ef8d3f48031dbd15417dbd5c3bef5bdeea4426c1786f276d3dbe5558aaf9e49807d7eac226d3174f85e5eb58d7c47adeebc1f5e03ff912045a95280000"], {
                    'accept-ranges': 'bytes',
                    'access-control-allow-origin': '*',
                    'cache-control': 'max-age=300',
                    connection: 'keep-alive',
                    'content-encoding': 'gzip',
                    'content-length': '1407',
                    'content-security-policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
                    'content-type': 'text/plain; charset=utf-8',
                    'cross-origin-resource-policy': 'cross-origin',
                    date: 'Sat, 24 Jan 2026 12:37:16 GMT',
                    etag: 'W/"b13187726bd6876ac4a624d7e81f30db75f7e703322c5f9f7bc06d780fb3cf7e"',
                    expires: 'Sat, 24 Jan 2026 12:42:16 GMT',
                    'source-age': '0',
                    'strict-transport-security': 'max-age=31536000',
                    vary: 'Authorization,Accept-Encoding',
                    via: '1.1 varnish',
                    'x-cache': 'HIT',
                    'x-cache-hits': '0',
                    'x-content-type-options': 'nosniff',
                    'x-fastly-request-id': '38c0a5568c729b72cc70f4ab26ce9b7a15981cf2',
                    'x-frame-options': 'deny',
                    'x-github-request-id': 'CB6D:332E6A:41ED07:7E7C68:6974B968',
                    'x-served-by': 'cache-lhr-egll1980052-LHR',
                    'x-timer': 'S1769258236.244061,VS0,VE99',
                    'x-xss-protection': '1; mode=block'
                });

            const openAPIPath = 'https://raw.githubusercontent.com/JaredCE/Arazzo-Runner/refs/heads/main/test/mocks/openapi/microservices/user.json'
            const openAPIFile = new OpenAPIFile(openAPIPath);

            const stub = sinon.stub(openAPIFile, 'bundleDocument').rejects(new Error('sinon threw from bundling'))

            try {
                await openAPIFile.getAndBundle();

                expect(openAPIFile).to.have.property('openAPILocation');
                expect(openAPIFile.openAPILocation).to.be.equal('downloads/user.json')
            } catch (err) {
                console.error(err);
                expect(err).to.be.instanceOf(Error);
            }

            stub.restore();
        });

        it(`will error when trying to download an OpenAPI document results in a 400`, async function () {
            nock('https://raw.githubusercontent.com:443', { "encodedQueryParams": true })
                .get('/JaredCE/Arazzo-Runner/refs/heads/main/test/mocks/openapi/microservices/user.json')
                .reply(400)

            const openAPIPath = 'https://raw.githubusercontent.com/JaredCE/Arazzo-Runner/refs/heads/main/test/mocks/openapi/microservices/user.json'
            const openAPIFile = new OpenAPIFile(openAPIPath);

            try {
                await openAPIFile.getAndBundle();

                expect(openAPIFile).to.have.property('openAPILocation');
                expect(openAPIFile.openAPILocation).to.be.equal('downloads/user.json')
            } catch (err) {
                console.error(err);
                expect(err).to.be.instanceOf(Error);
            }
        });

        it(`will error when trying to download an OpenAPI document results in a 404`, async function () {
            nock('https://raw.githubusercontent.com:443', { "encodedQueryParams": true })
                .get('/JaredCE/Arazzo-Runner/refs/heads/main/test/mocks/openapi/microservices/user.json')
                .reply(404)

            const openAPIPath = 'https://raw.githubusercontent.com/JaredCE/Arazzo-Runner/refs/heads/main/test/mocks/openapi/microservices/user.json'
            const openAPIFile = new OpenAPIFile(openAPIPath);

            try {
                await openAPIFile.getAndBundle();

                expect(openAPIFile).to.have.property('openAPILocation');
                expect(openAPIFile.openAPILocation).to.be.equal('downloads/user.json')
            } catch (err) {
                console.error(err);
                expect(err).to.be.instanceOf(Error);
            }
        });

        it(`will error when trying to download an OpenAPI document results in error`, async function () {
            nock('https://raw.githubusercontent.com:443', { "encodedQueryParams": true })
                .get('/JaredCE/Arazzo-Runner/refs/heads/main/test/mocks/openapi/microservices/user.json')
                .replyWithError('Error trying to download file')

            const openAPIPath = 'https://raw.githubusercontent.com/JaredCE/Arazzo-Runner/refs/heads/main/test/mocks/openapi/microservices/user.json'
            const openAPIFile = new OpenAPIFile(openAPIPath);

            try {
                await openAPIFile.getAndBundle();

                expect(openAPIFile).to.have.property('openAPILocation');
                expect(openAPIFile.openAPILocation).to.be.equal('downloads/user.json')
            } catch (err) {
                console.error(err);
                expect(err).to.be.instanceOf(Error);
            }
        });
    });
});
