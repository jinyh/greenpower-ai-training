const assert = require("node:assert/strict");
const { test } = require("node:test");

const { parseDeckMarkdown } = require("../lib/parser");

test("parseDeckMarkdown turns slide sections into a manifest-ready object", () => {
  const markdown = [
    "# 测试演示",
    "",
    "Deck: AI Agent Hands on Lab",
    "Audience: 中欧商学院 MBA",
    "Theme: agent-workshop",
    "",
    "## 01. Agent 不是聊天机器人",
    "",
    "Layout: title",
    "Visual: 半屏终端窗口与对话气泡对比，突出“能动手”的差异",
    "",
    "Content:",
    "- 传统 ChatGPT：一问一答，人持续追问",
    "- 终端 Agent：读文件、拆步骤、生成结果",
    "",
    "Notes:",
    "- 来源：materials/workshop-outline.md:62",
    "- 讲者强调：Agent 是杠杆，不是替代",
    "",
    "## 02. Prompt Context Harness",
    "",
    "Layout: framework",
    "Visual: 三个互锁模块，中间连接到 Output",
    "",
    "Content:",
    "- Prompt 决定任务方向",
    "- Context 决定信息质量",
    "- Harness 决定输出边界",
    "",
    "Notes:",
    "- 来源：materials/workshop-outline.md:87",
  ].join("\n");

  const manifest = parseDeckMarkdown(markdown);

  assert.equal(manifest.deck.title, "AI Agent Hands on Lab");
  assert.equal(manifest.deck.audience, "中欧商学院 MBA");
  assert.equal(manifest.deck.theme, "agent-workshop");
  assert.equal(manifest.slides.length, 2);
  assert.deepEqual(manifest.slides[0], {
    id: "01-agent",
    title: "Agent 不是聊天机器人",
    layout: "title",
    body: [
      "传统 ChatGPT：一问一答，人持续追问",
      "终端 Agent：读文件、拆步骤、生成结果",
    ],
    visual_prompt: "半屏终端窗口与对话气泡对比，突出“能动手”的差异",
    asset_path: "",
    asset_kind: "placeholder",
    svg_status: "skipped-v1",
    notes: [
      "来源：materials/workshop-outline.md:62",
      "讲者强调：Agent 是杠杆，不是替代",
    ],
    source_refs: ["materials/workshop-outline.md:62"],
  });
});

test("parseDeckMarkdown rejects slides missing required fields", () => {
  const markdown = [
    "# Broken",
    "",
    "## 01. 缺少视觉字段",
    "",
    "Layout: content",
    "",
    "Content:",
    "- 只有正文",
  ].join("\n");

  assert.throws(
    () => parseDeckMarkdown(markdown),
    /Slide 01 缺少必填字段: visual_prompt/
  );
});
