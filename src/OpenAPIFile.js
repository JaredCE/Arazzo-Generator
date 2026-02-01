'use strict';

const {
    bundleDocument,
    bundleFromString,
    createConfig,
} = require("@redocly/openapi-core");

const fs = require('node:fs/promises');
const path = require('node:path');

class OpenAPIFile {
    constructor(openAPIPath) {
        this.openAPIPath = openAPIPath;
    }

    async getAndBundle() {
        if (this.isUrl()) {
            await this.fetchOpenAPIDocument();
        } else { }

        await this.bundleDocument();
    }

    async fetchOpenAPIDocument() {
        let headers = new Headers();
        let fetchURL = new URL(this.openAPIPath);
        const fileName = fetchURL.pathname.split('/').at(-1)
        this.filePath = path.resolve('.', fileName);

        const response = await fetch(fetchURL, { headers });

        if (!response.ok) {
            throw new Error(`Error fetching document from ${fetchURL}`);
        }

        let data = await response.json();

        return await this.writeOpenAPIDocument(data);
    }

    async writeOpenAPIDocument(data) {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
        this.openAPILocation = this.filePath;
    }

    async bundleDocument() {
        const data = await fs.readFile(this.filePath)
        const config = await createConfig({});
        const bundledData = await bundleFromString({
            source: data.toString(),
            dereference: true,
            config: config,
        });
        const document = bundledData.bundle.parsed;

        await this.writeOpenAPIDocument(document)
    }

    isUrl() {
        try {
            new URL(this.openAPIPath);
            return true;
        } catch {
            return false;
        }
    }
}

module.exports = OpenAPIFile;
