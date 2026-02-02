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
arazzo-generator -o openapi.json -o arazzo.json

# With URL
arazzo-generator -o https://example.com/openapi.json -o ./arazzo.json

# With Verbose Logging
arazzo-generator -o https://example.com/openapi.json -o ./arazzo.json --verbose

# Show help
arazzo-generator --help

# Show version
arazzo-generator --version
```
