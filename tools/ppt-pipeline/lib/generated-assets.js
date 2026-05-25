const fs = require("node:fs");
const path = require("node:path");

const { wrapRasterFileAsSvg } = require("./image-to-svg");
const { projectRelative } = require("./image-provider-config");

function recordGeneratedAsset(options) {
  const { manifest, manifestPath, slideIndex, imageBuffer, provider, model } = options;
  const slide = manifest.slides[slideIndex];
  if (!slide) {
    throw new Error(`Slide index out of range: ${slideIndex}`);
  }

  const manifestDir = path.dirname(manifestPath);
  const assetsDir = path.join(manifestDir, "assets");
  const basename = safeAssetName(slide.id || `slide-${slideIndex + 1}`);
  const imagePath = path.join(assetsDir, `${basename}.png`);
  const svgPath = path.join(assetsDir, `${basename}.svg`);

  fs.mkdirSync(assetsDir, { recursive: true });
  fs.writeFileSync(imagePath, imageBuffer);
  wrapRasterFileAsSvg(imagePath, svgPath, {
    width: 1920,
    height: 1080,
    mimeType: "image/png",
  });

  const assetPath = projectRelative(manifestPath, imagePath);
  const assetSvgPath = projectRelative(manifestPath, svgPath);

  slide.asset_path = assetPath;
  slide.asset_svg_path = assetSvgPath;
  slide.asset_kind = "image-gen2-raster";
  slide.asset_provider = provider;
  slide.asset_model = model;
  slide.svg_status = "wrapped";

  return {
    assetPath,
    assetSvgPath,
  };
}

function safeAssetName(value) {
  return value
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-") || "slide";
}

function writeManifest(manifestPath, manifest) {
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

module.exports = {
  recordGeneratedAsset,
  safeAssetName,
  writeManifest,
};
