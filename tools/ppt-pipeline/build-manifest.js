#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { buildManifestFromMarkdown } = require("./lib/manifest");

function main(argv) {
  const [, , inputPath, outputPath] = argv;

  if (!inputPath || !outputPath) {
    throw new Error("Usage: node tools/ppt-pipeline/build-manifest.js <input.md> <output.json>");
  }

  const markdown = fs.readFileSync(inputPath, "utf8");
  const manifest = buildManifestFromMarkdown(markdown, {
    sourceFile: inputPath,
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

try {
  main(process.argv);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
