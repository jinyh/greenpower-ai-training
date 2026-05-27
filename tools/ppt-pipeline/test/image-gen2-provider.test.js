const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");

const { resolveImageProviderConfig } = require("../lib/image-provider-config");
const { extractImageBufferFromResponse } = require("../lib/image-gen2-provider");
const { recordGeneratedAsset } = require("../lib/generated-assets");

test("resolveImageProviderConfig supports FUCHEERS base URL env variants", () => {
  const config = resolveImageProviderConfig({
    provider: "FUCHEERS",
    env: {
      FUCHEERS_BASW_URL: "https://www.fucheers.top/v1",
      FUCHEERS_API_KEY: "API_KEY_PLACEHOLDER",
    },
  });

  assert.equal(config.provider, "FUCHEERS");
  assert.equal(config.model, "gpt-image-2");
  assert.equal(config.endpoint, "https://www.fucheers.top/v1/images/generations");
  assert.equal(config.apiKey, "API_KEY_PLACEHOLDER");
});

test("extractImageBufferFromResponse reads OpenAI image base64 payloads", () => {
  const buffer = extractImageBufferFromResponse({
    data: [
      {
        b64_json: Buffer.from("generated image").toString("base64"),
      },
    ],
  });

  assert.equal(buffer.toString("utf8"), "generated image");
});

test("recordGeneratedAsset writes raster and wrapped SVG paths back to the slide", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ppt-generated-assets-"));
  const manifestPath = path.join(dir, "deck.manifest.json");
  const manifest = {
    slides: [
      {
        id: "01-agent",
        title: "Agent 是杠杆，不是替代",
        asset_path: "",
        asset_kind: "placeholder",
        svg_status: "skipped-v1",
      },
    ],
  };

  const result = recordGeneratedAsset({
    manifest,
    manifestPath,
    slideIndex: 0,
    imageBuffer: Buffer.from("fake png"),
    provider: "FUCHEERS",
    model: "gpt-image-2",
  });

  assert.equal(manifest.slides[0].asset_kind, "image-gen2-raster");
  assert.equal(manifest.slides[0].asset_provider, "FUCHEERS");
  assert.equal(manifest.slides[0].asset_model, "gpt-image-2");
  assert.equal(manifest.slides[0].svg_status, "wrapped");
  assert.match(manifest.slides[0].asset_path, /assets\/01-agent\.png$/);
  assert.match(manifest.slides[0].asset_svg_path, /assets\/01-agent\.svg$/);
  assert.ok(fs.existsSync(path.join(dir, result.assetPath)));
  assert.ok(fs.existsSync(path.join(dir, result.assetSvgPath)));
});
