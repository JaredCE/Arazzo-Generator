'use strict';

const {
    bundleDocument,
    bundleFromString,
    createConfig,
} = require("@redocly/openapi-core");
const { chain } = require("stream-chain");
const { parser } = require('stream-json');
const { pick } = require('stream-json/filters/Pick');
const { streamObject } = require('stream-json/streamers/StreamObject');
const { streamValues } = require("stream-json/streamers/StreamValues");

const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');

class OpenAPIFile {
    constructor(openAPIPath, config) {
        this.openAPIPath = openAPIPath;
        this.config = config;
    }

    async getAndBundle() {
        if (this.isUrl()) {
            this.downloaded = true;
            await this.fetchOpenAPIDocument();
        } else {
            this.filePath = this.openAPIPath;
        }

        await this.bundleDocument();
    }

    async fetchOpenAPIDocument() {
        let headers = new Headers();

        if (this.config?.apiKey) {
            if (this.config.apiKey.in === 'header') {
                headers.append(this.config.apiKey.name, this.config.apiKey.value);
            } else {
                this.openAPIPath += `?${this.config.apiKey.name}=${this.config.apiKey.value}`
            }
        }

        let fetchURL = new URL(this.openAPIPath);
        const fileName = fetchURL.pathname.split('/').at(-1)
        this.name = fileName.split('.').at(0);
        this.filePath = path.resolve('.', fileName);

        const response = await fetch(fetchURL, { headers });

        if (!response.ok) {
            throw new Error(`Error fetching document from ${fetchURL}`);
        }

        let data = await response.json();

        return await this.writeOpenAPIDocument(data);
    }

    async writeOpenAPIDocument(data) {
        if (this.downloaded) {
            await fsp.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
        } else {
            const fileName = 'bundled-openAPI.json'
            this.filePath = path.resolve('.', fileName)
            await fsp.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
        }
        this.openAPILocation = this.filePath;
    }

    async bundleDocument() {
        const data = await fsp.readFile(this.filePath)
        const config = await createConfig({});
        const bundledData = await bundleFromString({
            source: data.toString(),
            dereference: true,
            config: config,
        });
        const document = bundledData.bundle.parsed;

        await this.writeOpenAPIDocument(document)
    }

    async streamToValue(filter) {
        let pipeline;

        pipeline = chain([
            fs.createReadStream(path.resolve(this.openAPILocation)),
            parser(),
            pick({ filter: filter }),
            streamValues(),
        ]);

        return pipeline
    }

    async streamToObject(filter) {
        let pipeline;

        pipeline = chain([
            fs.createReadStream(path.resolve(this.openAPILocation)),
            parser(),
            pick({ filter: filter }),
            streamObject(),
        ]);

        return pipeline
    }

    async streamToSecurityScheme() {
        const pipeline = await this.streamToValue('components.securitySchemes');

        let security;

        for await (const { value } of pipeline) {
            security = value;
        }

        return security
    }

    async streamToSecurity() {
        const pipeline = await this.streamToValue('security');

        let security;

        for await (const { value } of pipeline) {
            security = value;
        }

        return security
    }

    async streamToInfo() {
        const pipeline = await this.streamToValue('info');

        let info;

        for await (const { value } of pipeline) {
            info = value;
        }

        return info
    }

    async streamToPaths() {
        return await this.streamToObject('paths');
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
