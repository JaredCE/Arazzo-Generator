# Arazzo-Generator

<p>
  <a href="https://www.npmjs.com/package/arazzo-generator">
    <img src="https://img.shields.io/npm/v/arazzo-generator.svg?style=flat-square">
  </a>
  <a href="https://github.com/JaredCE/arazzo-generator/actions/workflows/node.yml">
    <img src="https://github.com/JaredCE/arazzo-generator/actions/workflows/node.yml/badge.svg">
  </a>
  <a href="https://www.buymeacoffee.com/jarede">
    <img src="https://raw.githubusercontent.com/pachadotdev/buymeacoffee-badges/main/bmc-donate-yellow.svg">
  </a>
</p>

Generate [Arazzo Workflows](https://www.openapis.org/arazzo-specification) from your OpenAPI Documents.

## Install

**Using npm:**

```bash
npm install -g arazzo-generator
```

## Use

```bash
# Run the CLI
arazzo-generator --openapi ./openapi.json --output ./arazzo.json

# Or with short flags
arazzo-generator -i openapi.json -o arazzo.json

# With URL
arazzo-generator -i https://example.com/openapi.json -o ./arazzo.json

# Show help
arazzo-generator --help

# Show version
arazzo-generator --version
```

### Config file

Arazzo Generator allows for a config file to keep hold of secrets to get OpenAPI Documents held on paths behind apikeys:

```js
"use strict";

module.exports = {
  apiKey: {
    value: process.env.APIKey,
    in: "header|query", // either in the header or the query params
    name: "apiKey",
  },
};
```

When downloading OpenAPI Documents, it will use the `apiKey` to access those files. This file should be stored in `./options/generatorConfig.js`.

## What it does

This will take an OpenAPI Document and create a naive Arazzo Workflow Document from it.

It will first of all attempt to bundle your OpenAPI Document, allowing for access to the schemas. It will then move through each path of the OpenAPI file, creating a workflow for each operation under that path, and that operation being the first step of that workflow.

It will take all required parameters and request bodies and map them to the parameters and requestBody of the Arrazo Workflow, it will also add apiKey as a parameter if that operation requires security (it takes into account globally set security and operation level security).

It will add the schemas for the required parameters and request bodies to the `inputs` schema for the Arazzo workflow.

If the operation does not have an `operationId`, it will correctly set the `operationPath` on the Arrazo Document.

It will also create some naive `successCriteria` based on the statusCode. It will only do this for the 2XX range of statusCodes.

If you have multiple 2XX statusCodes, it will create an `successCriteria` with an OR condition:

```json
{
  "condition": "$statuscode == 200 || $statusCode == 201"
}
```

If you use the `2XX` statusCode, it will create a regEx `successCriteria` object:

```json
{
  "condition": "^2(\\d\\d)$",
  "context": "$statusCode",
  "type": "regex"
}
```
