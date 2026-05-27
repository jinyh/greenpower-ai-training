const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");

test("build-manifest CLI writes a JSON manifest", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ppt-manifest-"));
  const input = path.join(dir, "deck.md");
  const output = path.join(dir, "deck.manifest.json");

  fs.writeFileSync(
    input,
    [
      "# 测试演示",
      "",
      "Deck: AI Agent Hands on Lab",
      "Audience: 中欧商学院 MBA",
      "Theme: agent-workshop",
      "",
      "## 01. 开场与目标",
      "",
      "Layout: title",
      "Visual: 深色标题页，右侧三张问题卡",
      "",
      "Content:",
      "- Agent 能帮我做什么？",
      "",
      "Notes:",
      "- 来源：materials/workshop-outline.md:139",
    ].join("\n")
  );

  execFileSync("node", ["tools/ppt-pipeline/build-manifest.js", input, output], {
    cwd: path.resolve(__dirname, "../../.."),
    stdio: "pipe",
  });

  const manifest = JSON.parse(fs.readFileSync(output, "utf8"));
  assert.equal(manifest.source_file, input);
  assert.equal(manifest.slides.length, 1);
  assert.equal(manifest.slides[0].title, "开场与目标");
});
