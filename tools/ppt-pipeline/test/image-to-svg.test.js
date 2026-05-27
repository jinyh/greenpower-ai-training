const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");

const { wrapRasterFileAsSvg, wrapRasterBufferAsSvg } = require("../lib/image-to-svg");

test("wrapRasterBufferAsSvg embeds a raster image inside an SVG wrapper", () => {
  const svg = wrapRasterBufferAsSvg(Buffer.from("hello"), "image/png", {
    width: 320,
    height: 180,
  });

  assert.ok(svg.startsWith("<svg"));
  assert.match(svg, /data:image\/png;base64,/);
  assert.match(svg, /width="320"/);
  assert.match(svg, /height="180"/);
});

test("wrapRasterFileAsSvg writes an SVG wrapper file", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ppt-svg-"));
  const pngPath = path.join(dir, "sample.png");
  const svgPath = path.join(dir, "sample.svg");

  fs.writeFileSync(pngPath, Buffer.from("hello"));

  wrapRasterFileAsSvg(pngPath, svgPath, { width: 100, height: 50 });

  const svg = fs.readFileSync(svgPath, "utf8");
  assert.ok(svg.includes("data:image/png;base64,"));
  assert.ok(svg.includes("width=\"100\""));
  assert.ok(svg.includes("height=\"50\""));
});
