'use strict';

const fs = require('node:fs/promises');

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

        await this.generateWorkflows();

        await this.writeFile();
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

    async generateWorkflows() {
        const [paths, securitySchemes, globalSecurity] = await Promise.all([
            this.openAPIFile.streamToPaths(),
            this.openAPIFile.streamToSecurityScheme(),
            this.openAPIFile.streamToSecurity()
        ]);

        const apiKeySchemes = this.extractApiKeySchemes(securitySchemes);
        const workflows = [];

        for await (const { key: pathName, value: operations } of paths) {
            for (const [method, operation] of Object.entries(operations)) {
                const workflow = this.createWorkflow(
                    operation,
                    apiKeySchemes,
                    globalSecurity,
                    securitySchemes,
                    pathName,  // Pass pathName
                    method     // Pass method
                );
                workflows.push(workflow);
            }
        }

        this.arazzo.workflows = workflows;
    }

    extractApiKeySchemes(securitySchemes) {
        const apiKeySchemes = new Map();

        if (!securitySchemes) return apiKeySchemes;

        for (const [schemeName, scheme] of Object.entries(securitySchemes)) {
            if (scheme.type === 'apiKey') {
                apiKeySchemes.set(schemeName, scheme);
            }
        }

        return apiKeySchemes;
    }

    createWorkflow(operation, apiKeySchemes, globalSecurity, securitySchemes, pathName, method) {
        const workflow = {
            steps: [],
            inputs: {}
        };

        const step = this.createBaseStep(operation, pathName, method);

        // ... rest of the method remains the same
        this.addRequestBody(workflow, step, operation);
        this.addRequiredParameters(workflow, step, operation);

        const securityToApply = operation.security || globalSecurity || [];
        this.addSecurityParameters(workflow, step, securityToApply, apiKeySchemes, securitySchemes);

        if (Object.keys(workflow.inputs).length === 0) {
            delete workflow.inputs;
        }

        workflow.steps.push(step);
        return workflow;
    }

    createBaseStep(operation, pathName, method) {
        const step = {};

        if (operation.operationId) {
            step.operationId = operation.operationId;
        } else {
            // Generate JSON Pointer to the operation
            const operationPointer = generateOperationPointer(pathName, method);
            step.operationPath = `\${sourceDescriptions.${this.openAPIFile.name}.url}#${operationPointer}`;
        }

        return step;
    }

    addRequestBody(workflow, step, operation) {
        const requestBody = operation.requestBody;

        if (!requestBody?.required) return;

        const contentTypes = Object.keys(requestBody.content);
        const primaryContentType = contentTypes[0];
        const content = requestBody.content[primaryContentType];

        workflow.inputs.requestBody = content.schema;
        step.requestBody = {
            contentType: primaryContentType,
            payload: '$inputs.requestBody'
        };
    }

    addRequiredParameters(workflow, step, operation) {
        const parameters = operation.parameters;

        if (!parameters?.length) return;

        const requiredParams = parameters.filter(param => param.required === true);

        if (requiredParams.length === 0) return;

        step.parameters = requiredParams.map(param => {
            workflow.inputs[param.name] = param.schema;

            return {
                name: param.name,
                in: param.in,
                value: `$inputs.${param.name}`
            };
        });
    }

    addSecurityParameters(workflow, step, securityArray, apiKeySchemes, securitySchemes) {
        if (!securityArray?.length) return;

        for (const securityRequirement of securityArray) {
            for (const schemeName of Object.keys(securityRequirement)) {
                if (apiKeySchemes.has(schemeName)) {
                    this.addApiKeyParameter(workflow, step, schemeName, securitySchemes);
                }
            }
        }
    }

    addApiKeyParameter(workflow, step, schemeName, securitySchemes) {
        const scheme = securitySchemes[schemeName];

        const parameter = {
            name: scheme.name,
            in: scheme.in,
            value: `$inputs.${scheme.name}`
        };

        workflow.inputs[scheme.name] = { type: 'string' }; // You might want to add more schema details

        if (!step.parameters) {
            step.parameters = [];
        }

        // Avoid duplicates
        const exists = step.parameters.some(p => p.name === parameter.name && p.in === parameter.in);
        if (!exists) {
            step.parameters.push(parameter);
        }
    }

    generateOperationPointer(pathName, method) {
        // JSON Pointer uses ~ escapes: ~0 for ~ and ~1 for /
        const escapedPath = pathName
            .replace(/~/g, '~0')
            .replace(/\//g, '~1');

        return `/paths${escapedPath}/${method}`;
    }

    async writeFile() {
        await fs.writeFile('arazzo.json', JSON.stringify(this.arazzo))
    }
}

module.exports = ArazzoFile;
