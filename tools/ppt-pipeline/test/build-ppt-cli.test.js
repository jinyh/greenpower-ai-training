const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");
const sharp = require("sharp");

test("build-ppt CLI writes a PPTX file from a manifest", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ppt-build-"));
  const manifestPath = path.join(dir, "deck.manifest.json");
  const outputPath = path.join(dir, "deck.pptx");

  fs.writeFileSync(
    manifestPath,
    JSON.stringify(
      {
        source_file: "test.md",
        generated_at: "2026-05-21T00:00:00.000Z",
        deck: {
          title: "AI Agent Hands on Lab",
          audience: "中欧商学院 MBA",
          theme: "agent-workshop",
        },
        slides: [
          {
            id: "01-agent",
            title: "Agent 是杠杆，不是替代",
            layout: "title",
            body: ["Agent 放大执行力", "人负责最终判断"],
            visual_prompt: "深色标题页，右侧三张问题卡",
            asset_path: "",
            asset_kind: "placeholder",
            svg_status: "skipped-v1",
            notes: ["来源：materials/workshop-outline.md:139"],
            source_refs: ["materials/workshop-outline.md:139"],
          },
        ],
      },
      null,
      2
    )
  );

  execFileSync("node", ["tools/ppt-pipeline/build-ppt.js", manifestPath, outputPath], {
    cwd: path.resolve(__dirname, "../../.."),
    stdio: "pipe",
  });

  const file = fs.readFileSync(outputPath);
  assert.ok(file.length > 1000);
  assert.equal(file.subarray(0, 2).toString(), "PK");

  const listing = execFileSync("unzip", ["-l", outputPath], { encoding: "utf8" });
  assert.match(listing, /ppt\/media\/.*\.png/);
});

test("build-ppt CLI embeds generated slide assets from the manifest", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ppt-build-asset-"));
  const assetDir = path.join(dir, "assets");
  const manifestPath = path.join(dir, "deck.manifest.json");
  const outputPath = path.join(dir, "deck.pptx");
  const assetPath = path.join(assetDir, "generated-cover.png");

  fs.mkdirSync(assetDir, { recursive: true });
  await sharp({
    create: {
      width: 64,
      height: 36,
      channels: 3,
      background: "#ff0000",
    },
  }).png().toFile(assetPath);

  fs.writeFileSync(
    manifestPath,
    JSON.stringify(
      {
        source_file: "test.md",
        generated_at: "2026-05-21T00:00:00.000Z",
        deck: {
          title: "AI Agent Hands on Lab",
          audience: "中欧商学院 MBA",
          theme: "agent-workshop",
        },
        slides: [
          {
            id: "01-agent",
            title: "Agent 是杠杆，不是替代",
            layout: "title",
            body: ["Agent 放大执行力", "人负责最终判断"],
            visual_prompt: "深色标题页，右侧三张问题卡",
            asset_path: "assets/generated-cover.png",
            asset_kind: "image-gen2-raster",
            svg_status: "wrapped",
            notes: ["来源：materials/workshop-outline.md:139"],
            source_refs: ["materials/workshop-outline.md:139"],
          },
        ],
      },
      null,
      2
    )
  );

  execFileSync("node", ["tools/ppt-pipeline/build-ppt.js", manifestPath, outputPath], {
    cwd: path.resolve(__dirname, "../../.."),
    stdio: "pipe",
  });

  const listing = execFileSync("unzip", ["-l", outputPath], { encoding: "utf8" });
  assert.match(listing, /ppt\/media\/image[-\d]+\.png/);

  const extracted = path.join(dir, "unzipped");
  execFileSync("unzip", ["-q", outputPath, "ppt/media/*", "-d", extracted]);
  const mediaFiles = fs.readdirSync(path.join(extracted, "ppt", "media"));
  const metadata = await Promise.all(mediaFiles.map((file) => sharp(path.join(extracted, "ppt", "media", file)).metadata()));
  const hasGeneratedAsset = metadata.some((item) => item.width === 64 && item.height === 36);

  assert.equal(hasGeneratedAsset, true);
});
