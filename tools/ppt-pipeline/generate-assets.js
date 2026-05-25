#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const {
  loadImageProviderEnv,
  resolveImageProviderConfig,
} = require("./lib/image-provider-config");
const {
  OpenAICompatibleImageGen2Provider,
} = require("./lib/image-gen2-provider");
const {
  recordGeneratedAsset,
  writeManifest,
} = require("./lib/generated-assets");

function main(argv) {
  const args = parseArgs(argv.slice(2));
  const manifestPath = args._[0];

  if (!manifestPath) {
    throw new Error("Usage: node tools/ppt-pipeline/generate-assets.js <manifest.json> [--provider FUCHEERS] [--slides 1,2] [--limit 2]");
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const env = loadImageProviderEnv(args.env || ".env");
  const config = resolveImageProviderConfig({
    provider: args.provider || "FUCHEERS",
    env,
    model: args.model,
  });
  const provider = new OpenAICompatibleImageGen2Provider(config);
  const slideIndexes = selectSlideIndexes(manifest, args);

  return (async () => {
    for (const slideIndex of slideIndexes) {
      const slide = manifest.slides[slideIndex];
      const prompt = buildImagePrompt(manifest, slide, slideIndex);
      const imageBuffer = await provider.generateImage({
        prompt,
        size: args.size || "1536x1024",
        quality: args.quality || "low",
        outputFormat: "png",
      });
      const result = recordGeneratedAsset({
        manifest,
        manifestPath,
        slideIndex,
        imageBuffer,
        provider: config.provider,
        model: config.model,
      });
      console.log(JSON.stringify({
        slide: slide.id,
        assetPath: result.assetPath,
        assetSvgPath: result.assetSvgPath,
      }));
    }

    writeManifest(manifestPath, manifest);
  })();
}

function parseArgs(args) {
  const parsed = { _: [] };
  for (let i = 0; i < args.length; i += 1) {
    const value = args[i];
    if (!value.startsWith("--")) {
      parsed._.push(value);
      continue;
    }

    const key = value.slice(2);
    const next = args[i + 1];
    if (next && !next.startsWith("--")) {
      parsed[key] = next;
      i += 1;
    } else {
      parsed[key] = true;
    }
  }
  return parsed;
}

function selectSlideIndexes(manifest, args) {
  const selected = args.slides
    ? args.slides.split(",").map((value) => Number.parseInt(value.trim(), 10) - 1).filter((value) => Number.isInteger(value) && value >= 0)
    : manifest.slides.map((_, index) => index);

  const limited = typeof args.limit === "string" ? selected.slice(0, Number.parseInt(args.limit, 10)) : selected;
  return limited.filter((index) => manifest.slides[index] && (!manifest.slides[index].asset_path || args.force));
}

function buildImagePrompt(manifest, slide, index) {
  const title = slide.title || `Slide ${index + 1}`;
  const audience = manifest.deck?.audience || "MBA课堂";
  const baseRules = [
    "Create a high-quality 16:9 slide illustration or background asset for a Chinese MBA teaching deck.",
    "No readable text, no letters, no numbers, no logo, no watermark.",
    "Leave generous clean whitespace for editable PowerPoint text overlays.",
    "Use a polished academic blue-gray palette with restrained accents.",
    `Slide title: ${title}.`,
    `Audience: ${audience}.`,
    `Visual brief: ${slide.visual_prompt}.`,
  ];

  if (index === 0) {
    baseRules.push("Make the scene feel like a deep blue title slide with a subtle brain or circuit motif, elegant and serious.");
  } else {
    baseRules.push("Make the scene feel like a light, structured lecture slide background or illustration, with clear diagram-like composition.");
  }

  return baseRules.join(" ");
}

if (require.main === module) {
  main(process.argv).catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

module.exports = {
  buildImagePrompt,
  main,
  parseArgs,
  selectSlideIndexes,
};
