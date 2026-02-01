'use strict';

class ArazzoFile {
    constructor(openAPIFile) {
        this.openAPIFile = openAPIFile;

        this.arazzo = {
            arazzo: '1.0.1',
        };
    }

    async generate() {
        await this.generateInfo();

        await this.generateSourceDescription();
    }

    async generateInfo() {
        const info = await this.openAPIFile.streamToInfo()

        const obj = {}
        if (info.title) {
            obj.title = info.title;
        } else {
            obj.title = `Arazzo Workflow for ${this.openAPIFile.openAPIPath}`
        }

        if (info.summary) {
            obj.summary = info.summary;
        }

        if (info.description) {
            obj.description = info.description
        }

        if (info.version) {
            obj.version = info.version
        } else {
            obj.version = '0.0.1';
        }

        Object.assign(this.arazzo, { info: obj })
    }

    async generateSourceDescription() {
        const obj = {
            url: this.openAPIFile.openAPIPath,
            type: 'openapi',
            name: this.openAPIFile.name
        }

        this.arazzo.sourceDescriptions = [obj];
    }
}

module.exports = ArazzoFile;
