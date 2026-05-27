const assert = require("node:assert/strict");
const { test } = require("node:test");

const { buildManifestFromMarkdown } = require("../lib/manifest");

test("buildManifestFromMarkdown annotates the parsed deck with source metadata", () => {
  const markdown = [
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
    "- Agent 不能帮我做什么？",
    "",
    "Notes:",
    "- 来源：materials/workshop-outline.md:139",
  ].join("\n");

  const manifest = buildManifestFromMarkdown(markdown, {
    sourceFile: "materials/ppt-prototype/agent-hands-on-lab.md",
    generatedAt: "2026-05-21T00:00:00.000Z",
  });

  assert.equal(manifest.source_file, "materials/ppt-prototype/agent-hands-on-lab.md");
  assert.equal(manifest.generated_at, "2026-05-21T00:00:00.000Z");
  assert.equal(manifest.slides[0].source_refs[0], "materials/workshop-outline.md:139");
});
