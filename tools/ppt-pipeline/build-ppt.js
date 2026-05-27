#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { buildPptFromManifest } = require("./lib/ppt-builder");

async function main(argv) {
  const [, , manifestPath, outputPath] = argv;

  if (!manifestPath || !outputPath) {
    throw new Error("Usage: node tools/ppt-pipeline/build-ppt.js <manifest.json> <output.pptx>");
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await buildPptFromManifest(manifest, outputPath, {
    manifestPath,
  });
}

main(process.argv).catch((error) => {
  console.error(error.message);
  process.exit(1);
});
