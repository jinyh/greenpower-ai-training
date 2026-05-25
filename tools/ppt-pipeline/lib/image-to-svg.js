const fs = require("node:fs");
const path = require("node:path");

const MIME_BY_EXT = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

function wrapRasterBufferAsSvg(buffer, mimeType, options = {}) {
  const width = options.width || 1920;
  const height = options.height || 1080;
  const encoded = buffer.toString("base64");

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${escapeXml(String(width))}" height="${escapeXml(String(height))}" viewBox="0 0 ${escapeXml(String(width))} ${escapeXml(String(height))}">`,
    `<image href="data:${escapeXml(mimeType)};base64,${encoded}" width="${escapeXml(String(width))}" height="${escapeXml(String(height))}" preserveAspectRatio="xMidYMid slice"/>`,
    "</svg>",
    "",
  ].join("\n");
}

function wrapRasterFileAsSvg(inputPath, outputPath, options = {}) {
  const ext = path.extname(inputPath).toLowerCase();
  const mimeType = options.mimeType || MIME_BY_EXT[ext];

  if (!mimeType) {
    throw new Error(`Unsupported raster image extension: ${ext}`);
  }

  const svg = wrapRasterBufferAsSvg(fs.readFileSync(inputPath), mimeType, options);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, svg);
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

module.exports = {
  wrapRasterBufferAsSvg,
  wrapRasterFileAsSvg,
};
