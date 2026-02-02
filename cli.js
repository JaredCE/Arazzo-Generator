#!/usr/bin/env node
"use strict";

const { parseArgs } = require("node:util");
const path = require("node:path");
const fs = require("node:fs");

const Generator = require("./src/Generator");

// Parse command line arguments
const options = {
  openapi: {
    type: "string",
    short: "i",
  },
  output: {
    type: "string",
    short: "o",
  },
  verbose: {
    type: "boolean",
  },
  help: {
    type: "boolean",
    short: "h",
  },
  version: {
    type: "boolean",
    short: "v",
  },
};

function showHelp() {
  console.log(`
Arazzo Generator - Generate Arazzo workflow specifications from OpenAPI Documents

USAGE:
  arazzo-generator --openapi <file|url> --output <file>
  arazzo-generator -i <file|url> -o <file>

OPTIONS:
  -i, --openapi <file|url>   Path or URL to OpenAPI Document file (required)
  -o, --output <file>        Path to output Arazzo Document JSON file (required)
  -h, --help                 Show this help message
  -v, --version              Show version number
  --verbose                  Verbose Logging

EXAMPLES:
  # Run with local files
  arazzo-generator --openapi ./openapi.json --output ./arazzo.json

  # Run with URL
  arazzo-generator -i https://example.com/openapi.json -o ./arazzo.json

  # Short form
  arazzo-generator -i openapi.json -o arazzo.json
`);
}

function showVersion() {
  const packageJson = require("./package.json");
  console.log(`v${packageJson.version}`);
}

function isUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

function validateOpenAPIPath(openAPIPath) {
  if (isUrl(openAPIPath)) {
    return openAPIPath;
  }

  const resolvedPath = path.resolve(openAPIPath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`Error: OpenAPI file not found: ${openAPIPath}`);
    process.exit(1);
  }

  return resolvedPath;
}

async function main() {
  let values;

  try {
    ({ values } = parseArgs({ options, allowPositionals: false }));
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.log("Use --help for usage information");
    process.exit(1);
  }

  // Handle help
  if (values.help) {
    showHelp();
    process.exit(0);
  }

  // Handle version
  if (values.version) {
    showVersion();
    process.exit(0);
  }

  // Validate required arguments
  if (!values.openapi) {
    console.error("Error: --openapi argument is required");
    console.log("Use --help for usage information");
    process.exit(1);
  }

  // Validate paths
  const openAPIPath = validateOpenAPIPath(values.openapi);

  console.log(`Starting Arazzo Generator...`);
  console.log(`OpenAPI: ${openAPIPath}`);
  console.log("");

  try {
    const generator = new Generator({ verbose: values?.verbose || false });
    await generator.generate(openAPIPath);

    console.log("");
    console.log("✓ Arazzo Generation execution completed successfully");
    process.exit(0);
  } catch (err) {
    console.error("");
    console.error("✗ Arazzo Generation execution failed:");
    console.error(err.message);

    if (process.env.DEBUG) {
      console.error("");
      console.error("Stack trace:");
      console.error(err.stack);
    }

    process.exit(1);
  }
}

main();
