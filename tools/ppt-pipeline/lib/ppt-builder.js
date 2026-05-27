const fs = require("node:fs");
const path = require("node:path");
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");

const THEME = {
  bg: "F1F4F8",
  bg2: "EAF0F7",
  ink: "344B66",
  text: "5E6873",
  muted: "8A96A3",
  blue: "0058C7",
  blue2: "1677E8",
  paleBlue: "EAF3FF",
  orange: "F27A1A",
  white: "FFFFFF",
  line: "C9D6E6",
  dark: "0D2742",
};

const SLIDE_W = 10;
const SLIDE_H = 5.625;
const FONT = "PingFang SC";

async function buildPptFromManifest(manifest, outputPath, options = {}) {
  const pres = new pptxgen();
  const assets = createAssetManager(outputPath, options);
  await assets.prepare();

  pres.layout = "LAYOUT_16x9";
  pres.author = "AI Agent Hands on Lab";
  pres.company = "handsonlab";
  pres.subject = manifest.deck.title;
  pres.title = manifest.deck.title;
  pres.lang = "zh-CN";
  pres.theme = {
    headFontFace: FONT,
    bodyFontFace: FONT,
    lang: "zh-CN",
  };

  manifest.slides.forEach((slideData, index) => {
    addSlide(pres, assets, manifest, slideData, index);
  });

  await pres.writeFile({ fileName: outputPath });
}

function addSlide(pres, assets, manifest, slideData, index) {
  const slide = pres.addSlide();
  slide.background = { color: index === 0 ? THEME.dark : THEME.bg };
  const hasGeneratedBackdrop = addGeneratedSlideAsset(pres, assets, slide, slideData, index);

  if (index === 0) {
    renderCover(pres, assets, slide, manifest, slideData, hasGeneratedBackdrop);
  } else if (slideData.layout === "comparison") {
    renderComparison(pres, assets, slide, slideData);
  } else if (slideData.layout === "framework") {
    renderFramework(pres, assets, slide, slideData);
  } else if (slideData.layout === "process") {
    renderCostar(pres, assets, slide, slideData);
  } else if (slideData.layout === "layers") {
    renderContextLayers(pres, assets, slide, slideData);
  } else if (slideData.layout === "failure-loop") {
    renderHarnessLoop(pres, assets, slide, slideData);
  } else if (slideData.layout === "checklist") {
    renderSetupChecklist(pres, assets, slide, slideData);
  } else if (slideData.layout === "workshop-loop") {
    renderWorkshopLoop(pres, assets, slide, slideData);
  } else {
    renderGeneral(pres, assets, slide, slideData);
  }

  addPageNumber(slide, index);
  addSpeakerNotes(slide, slideData);
}

function renderCover(pres, assets, slide, manifest, slideData, hasGeneratedBackdrop) {
  if (!hasGeneratedBackdrop) {
    slide.addImage({ path: assets.coverBackground(), x: 0, y: 0, w: SLIDE_W, h: SLIDE_H });
    slide.addImage({ path: assets.icon("brain-circuit", "B8D7FF", 1.2, 0.25), x: 3.22, y: 0.62, w: 3.55, h: 3.25 });
    renderDefaultCoverText(pres, assets, slide, slideData);
    return;
  }

  renderGeneratedCoverText(slide, slideData);
}

function renderDefaultCoverText(pres, assets, slide, slideData) {
  slide.addText("AI Agent Hands on Lab", {
    x: 2.0,
    y: 1.72,
    w: 6.0,
    h: 0.48,
    margin: 0,
    fontFace: FONT,
    fontSize: 29,
    bold: true,
    align: "center",
    color: THEME.white,
  });
  slide.addText("Prompt -> Context -> Harness", {
    x: 2.32,
    y: 2.35,
    w: 5.36,
    h: 0.34,
    margin: 0,
    fontFace: "Consolas",
    fontSize: 16,
    align: "center",
    color: "DCEBFF",
  });
  slide.addText(slideData.title, {
    x: 1.68,
    y: 3.12,
    w: 6.64,
    h: 0.36,
    margin: 0,
    fontFace: FONT,
    fontSize: 17,
    bold: true,
    align: "center",
    color: "EAF3FF",
  });
  addCoverQuestionStrip(pres, assets, slide);
  slide.addText("中欧商学院 MBA 全天工作坊", {
    x: 3.45,
    y: 4.75,
    w: 3.1,
    h: 0.2,
    margin: 0,
    fontFace: FONT,
    fontSize: 9.8,
    align: "center",
    color: "CAD8E8",
  });
}

function renderGeneratedCoverText(slide, slideData) {
  slide.addText("AI Agent Hands on Lab", {
    x: 0.78,
    y: 1.5,
    w: 5.25,
    h: 0.54,
    margin: 0,
    fontFace: FONT,
    fontSize: 29,
    bold: true,
    align: "left",
    color: THEME.white,
    fit: "shrink",
  });
  slide.addText("Prompt -> Context -> Harness", {
    x: 0.82,
    y: 2.18,
    w: 4.85,
    h: 0.3,
    margin: 0,
    fontFace: "Consolas",
    fontSize: 15,
    align: "left",
    color: "DCEBFF",
    fit: "shrink",
  });
  slide.addText(slideData.title, {
    x: 0.82,
    y: 2.83,
    w: 4.65,
    h: 0.34,
    margin: 0,
    fontFace: FONT,
    fontSize: 16,
    bold: true,
    align: "left",
    color: "EAF3FF",
    fit: "shrink",
  });
  [
    ["能力边界", "能帮我做什么", 1.66],
    ["能力盲区", "不能帮我做什么", 2.83],
    ["驾驭方法", "怎么做得更好", 4.0],
  ].forEach(([title, body, y]) => {
    slide.addText(title, textBox(6.9, y, 1.2, 0.16, 8.5, "EAF3FF", { bold: true }));
    slide.addText(body, textBox(6.9, y + 0.22, 1.35, 0.14, 7.2, "C9D6E6"));
  });
  slide.addText("中欧商学院 MBA 全天工作坊", {
    x: 0.82,
    y: 4.82,
    w: 2.65,
    h: 0.18,
    margin: 0,
    fontFace: FONT,
    fontSize: 9.2,
    align: "left",
    color: "CAD8E8",
    fit: "shrink",
  });
}

function renderComparison(pres, assets, slide, slideData) {
  addTitle(slide, slideData.title);
  const cards = [
    { title: "传统 ChatGPT", icon: "message-square", lines: [slideData.body[0], "人持续输入、AI即时回答", "典型风险：说错话"] },
    { title: "终端 Agent", icon: "terminal", lines: [slideData.body[1], "读文件、拆步骤、生成结果", "典型风险：做错事"] },
  ];
  cards.forEach((card, i) => {
    const x = i === 0 ? 0.7 : 5.22;
    addLargeModeCard(pres, assets, slide, x, 1.08, 3.75, 2.0, card);
    if (i === 0) addArrow(slide, 4.55, 1.95, 0.48, 0);
  });
  addMiniTable(slide, 0.72, 3.36, 8.8, [
    ["维度", "ChatGPT", "Agent"],
    ["交互方式", "一问一答，人驱动", "设定目标，多步骤推进"],
    ["能力边界", "生成文字", "读写文件、运行命令、调用工具"],
    ["错误模式", "幻觉", "文件覆盖、数据误读、越权执行"],
  ]);
  addTeachingInsight(pres, assets, slide, insight(slideData), "永远假设 Agent 会犯错，设计校验机制比追求一次成功更重要。");
}

function renderFramework(pres, assets, slide, slideData) {
  addTitle(slide, slideData.title);
  slide.addText("这不是技巧堆叠，而是一套可迁移的控制框架。", {
    x: 0.9,
    y: 1.22,
    w: 8.2,
    h: 0.35,
    margin: 0,
    fontFace: FONT,
    fontSize: 22,
    bold: true,
    align: "center",
    color: THEME.ink,
  });

  const factors = [
    { label: "Prompt", cn: "任务方向", icon: "target", line: "要做什么、给谁看、输出什么格式" },
    { label: "Context", cn: "信息质量", icon: "database", line: "Agent 能看到什么材料、记得什么背景" },
    { label: "Harness", cn: "输出边界", icon: "shield-check", line: "不能做什么、不确定时怎么办、如何校验" },
  ];
  factors.forEach((factor, i) => {
    const x = 1.02 + i * 3.06;
    addIconBadge(pres, assets, slide, factor.icon, x + 0.75, 2.05, 0.62, THEME.blue);
    addRibbon(pres, slide, factor.label, x + 0.28, 2.82, 1.58, 0.34);
    slide.addText(factor.cn, textBox(x + 0.05, 3.28, 2.1, 0.28, 14, THEME.ink, { bold: true, align: "center" }));
    slide.addText(factor.line, textBox(x - 0.12, 3.68, 2.44, 0.56, 10.5, THEME.text, { align: "center", fit: "shrink" }));
    if (i < 2) addArrow(slide, x + 2.35, 2.37, 0.45, 0);
  });
  slide.addShape(shape(pres, "line"), { x: 1.15, y: 4.45, w: 7.7, h: 0, line: { color: THEME.ink, width: 1.1 } });
  addTeachingInsight(pres, assets, slide, "", slideData.body[3]);
}

function renderCostar(pres, assets, slide, slideData) {
  addTitle(slide, slideData.title);
  const labels = [
    ["C", "Context", "背景"],
    ["O", "Objective", "目标"],
    ["S/T", "Style / Tone", "风格语气"],
    ["A", "Audience", "受众"],
    ["R", "Response", "格式"],
    ["C+", "Constraint", "约束"],
  ];
  labels.forEach((item, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.75 + col * 3.05;
    const y = 1.18 + row * 1.38;
    addLabeledCard(pres, assets, slide, x, y, 2.55, 1.04, item[0], item[1], item[2], i === 5 ? THEME.orange : THEME.blue);
  });
  addMiniTable(slide, 0.74, 3.74, 8.78, [
    ["课堂判断", "入门 Prompt", "专家 Prompt"],
    ["任务", "帮我分析一下", "明确 Objective + Audience + Response"],
    ["边界", "未说明", "只基于给定材料，未提及则标注"],
  ]);
  addTeachingInsight(pres, assets, slide, insight(slideData), "Prompt 越像任务书，Agent 越像能协作的工作单元。");
}

function renderContextLayers(pres, assets, slide, slideData) {
  addTitle(slide, slideData.title);
  const layers = [
    { name: "外部材料", icon: "file-text", text: "上传材料、粘贴文本、提供链接" },
    { name: "对话历史", icon: "message-square", text: "长期对话会累积偏差，也会提供连续性" },
    { name: "项目规则", icon: "clipboard-list", text: "AGENTS.md / CLAUDE.md 统一角色、风格和禁忌" },
    { name: "工具 / Skills", icon: "workflow", text: "MCP 与技能扩展可调用能力" },
  ];
  layers.forEach((layer, i) => {
    const x = 0.8 + i * 2.28;
    addSystemCard(pres, assets, slide, x, 1.2, 1.82, 1.45, layer);
    if (i < 3) addArrow(slide, x + 1.93, 1.86, 0.28, 0);
  });
  slide.addText("上午先讲外部 + 对话；环境段再演示规则文件和工具上下文。", {
    x: 1.25,
    y: 3.08,
    w: 7.5,
    h: 0.32,
    margin: 0,
    fontFace: FONT,
    fontSize: 14,
    bold: true,
    align: "center",
    color: THEME.blue,
  });
  addMiniTable(slide, 0.82, 3.63, 8.36, [
    ["问题", "Context 不足", "Context 过载"],
    ["表现", "遗漏关键信息", "输出散、跑偏、成本高"],
    ["处理", "补材料、补背景", "拆任务、分会话、明确边界"],
  ]);
  addTeachingInsight(pres, assets, slide, insight(slideData), "管理 Context 的本质，是管理 Agent 的视野和记忆。");
}

function renderHarnessLoop(pres, assets, slide, slideData) {
  addTitle(slide, slideData.title);
  const steps = [
    { name: "翻车", icon: "circle-alert", color: THEME.orange },
    { name: "发现", icon: "target", color: THEME.blue },
    { name: "加 Harness", icon: "shield-check", color: THEME.blue },
    { name: "复核", icon: "copy-check", color: THEME.blue },
  ];
  steps.forEach((step, i) => {
    const x = 0.9 + i * 2.25;
    addIconBadge(pres, assets, slide, step.icon, x, 1.35, 0.72, step.color);
    slide.addText(step.name, textBox(x - 0.2, 2.16, 1.12, 0.24, 12, step.color, { bold: true, align: "center" }));
    if (i < 3) addArrow(slide, x + 0.88, 1.7, 0.8, 0);
  });
  const items = [
    ["输出格式", slideData.body[0], "list-checks"],
    ["边界约束", slideData.body[1], "shield-check"],
    ["分析过程", slideData.body[2], "route"],
    ["校验机制", slideData.body[3], "check"],
  ];
  items.forEach((item, i) => {
    const x = i % 2 === 0 ? 0.78 : 5.05;
    const y = i < 2 ? 2.85 : 3.75;
    addCompactEvidenceCard(pres, assets, slide, x, y, 3.95, 0.64, item[0], item[1], item[2]);
  });
  addTeachingInsight(pres, assets, slide, insight(slideData), "翻车不是失败，而是把 Harness 设计出来的机会。");
}

function renderSetupChecklist(pres, assets, slide, slideData) {
  addTitle(slide, slideData.title);
  const checks = [
    ["工具启动", "OpenCode / Claude Code 能打开", "terminal"],
    ["模型响应", "Provider、Base URL、模型名可用", "settings"],
    ["规则文件", "AGENTS.md / CLAUDE.md 被读到", "file-text"],
    ["应急策略", "2 分钟内解决不了，先两人一机", "users"],
  ];
  checks.forEach((check, i) => {
    const x = i % 2 === 0 ? 0.78 : 5.05;
    const y = i < 2 ? 1.22 : 2.72;
    addChecklistCard(pres, assets, slide, x, y, 3.95, 1.05, check);
  });
  addRuleStrip(pres, assets, slide, 0.78, 4.12, [
    ["课前", "完成安装"],
    ["课上", "只做验证"],
    ["故障", "不中断学习"],
  ]);
  addTeachingInsight(pres, assets, slide, insight(slideData), "环境环节不是安装课，目标是保证每个人能进入任务。");
}

function renderWorkshopLoop(pres, assets, slide, slideData) {
  addTitle(slide, slideData.title);
  const phases = ["准备", "第一轮", "迭代", "整理"];
  phases.forEach((phase, i) => {
    const x = 0.78 + i * 2.2;
    addStepBlock(pres, assets, slide, x, 1.15, i + 1, phase);
    if (i < 3) addArrow(slide, x + 1.54, 1.73, 0.52, 0);
  });
  addMiniTable(slide, 0.78, 2.72, 4.45, [
    ["汇报四件套", "必须展示"],
    ["最终成果", "Agent 生成的最终输出"],
    ["Prompt 迭代", "至少两个版本"],
    ["翻车记录", "错误、发现、纠正"],
  ]);
  addMiniTable(slide, 5.48, 2.72, 3.75, [
    ["评分关注", "权重"],
    ["Prompt / Context", "50"],
    ["Harness / 输出", "40"],
    ["迭代过程", "10"],
  ]);
  addTeachingInsight(pres, assets, slide, insight(slideData), "下午不是比谁的输出最漂亮，而是看是否会约束、校验和复盘。");
}

function renderGeneral(pres, assets, slide, slideData) {
  addTitle(slide, slideData.title);
  slideData.body.forEach((line, i) => {
    addCompactEvidenceCard(pres, assets, slide, 0.82, 1.2 + i * 0.78, 8.35, 0.54, String(i + 1).padStart(2, "0"), line, "check");
  });
  addTeachingInsight(pres, assets, slide, insight(slideData), slideData.visual_prompt);
}

function addGeneratedSlideAsset(pres, assets, slide, slideData, index) {
  const assetPath = assets.generatedAsset(slideData);
  if (!assetPath) return false;

  slide.addImage({ path: assetPath, x: 0, y: 0, w: SLIDE_W, h: SLIDE_H });
  if (index !== 0) {
    slide.addShape(shape(pres, "rect"), {
      x: 0,
      y: 0,
      w: SLIDE_W,
      h: SLIDE_H,
      fill: { color: THEME.bg, transparency: 16 },
      line: { color: THEME.bg, transparency: 100 },
    });
  }
  return true;
}

function addTitle(slide, title) {
  slide.addText(title, {
    x: 0.78,
    y: 0.38,
    w: 8.75,
    h: 0.36,
    margin: 0,
    fontFace: FONT,
    fontSize: 22,
    bold: false,
    color: THEME.ink,
  });
}

function addCoverQuestionStrip(pres, assets, slide) {
  const items = [
    ["能力边界", "能帮我做什么", "target"],
    ["能力盲区", "不能帮我做什么", "circle-alert"],
    ["驾驭方法", "怎么做得更好", "route"],
  ];
  items.forEach((item, i) => {
    const x = 1.58 + i * 2.42;
    slide.addShape(shape(pres, "roundRect"), {
      x,
      y: 3.78,
      w: 1.74,
      h: 0.62,
      rectRadius: 0.08,
      fill: { color: "DCEBFF", transparency: 84 },
      line: { color: "B8D7FF", transparency: 35 },
    });
    addIconBadge(pres, assets, slide, item[2], x + 0.12, 3.92, 0.32, THEME.blue);
    slide.addText(item[0], textBox(x + 0.54, 3.89, 1.08, 0.16, 8.5, "EAF3FF", { bold: true }));
    slide.addText(item[1], textBox(x + 0.54, 4.11, 1.08, 0.14, 7.2, "C9D6E6"));
  });
}

function addLargeModeCard(pres, assets, slide, x, y, w, h, card) {
  addPanel(pres, slide, x, y, w, h);
  addIconBadge(pres, assets, slide, card.icon, x + 0.22, y + 0.28, 0.58, THEME.blue);
  addRibbon(pres, slide, card.title, x + 0.94, y + 0.34, 1.52, 0.34);
  card.lines.forEach((line, i) => {
    slide.addText(line.replace(/^.*?：/, ""), textBox(x + 0.34, y + 0.95 + i * 0.34, w - 0.64, 0.22, 9.7, THEME.text, { fit: "shrink" }));
  });
}

function addLabeledCard(pres, assets, slide, x, y, w, h, code, en, cn, color) {
  addPanel(pres, slide, x, y, w, h);
  slide.addShape(shape(pres, "ellipse"), {
    x: x + 0.18,
    y: y + 0.22,
    w: 0.56,
    h: 0.56,
    fill: { color },
    line: { color },
  });
  slide.addText(code, textBox(x + 0.18, y + 0.39, 0.56, 0.16, 10, THEME.white, { bold: true, align: "center" }));
  slide.addText(en, textBox(x + 0.88, y + 0.24, w - 1.02, 0.24, 12, color, { bold: true }));
  slide.addText(cn, textBox(x + 0.88, y + 0.58, w - 1.02, 0.22, 10.5, THEME.text));
}

function addSystemCard(pres, assets, slide, x, y, w, h, card) {
  addPanel(pres, slide, x, y, w, h, { fill: THEME.white });
  addIconBadge(pres, assets, slide, card.icon, x + 0.55, y - 0.26, 0.62, THEME.blue);
  slide.addText(card.name, textBox(x + 0.15, y + 0.52, w - 0.3, 0.24, 13, THEME.blue, { bold: true, align: "center" }));
  slide.addText(card.text, textBox(x + 0.18, y + 0.9, w - 0.36, 0.34, 8.6, THEME.text, { fit: "shrink" }));
}

function addCompactEvidenceCard(pres, assets, slide, x, y, w, h, title, body, icon) {
  addPanel(pres, slide, x, y, w, h, { fill: THEME.white, border: THEME.blue });
  addIconBadge(pres, assets, slide, icon, x + 0.14, y + 0.12, 0.32, THEME.blue);
  addRibbon(pres, slide, title, x + 0.54, y + 0.1, 1.18, 0.26);
  slide.addText(body.replace(/^.*?：/, ""), textBox(x + 1.88, y + 0.19, w - 2.08, 0.26, 8.8, THEME.text, { fit: "shrink" }));
}

function addChecklistCard(pres, assets, slide, x, y, w, h, data) {
  addPanel(pres, slide, x, y, w, h);
  addIconBadge(pres, assets, slide, data[2], x + 0.18, y + 0.22, 0.48, THEME.blue);
  slide.addText(data[0], textBox(x + 0.82, y + 0.22, w - 1.0, 0.25, 13, THEME.blue, { bold: true }));
  slide.addText(data[1], textBox(x + 0.82, y + 0.63, w - 1.0, 0.23, 9.8, THEME.text, { fit: "shrink" }));
}

function addRuleStrip(pres, assets, slide, x, y, items) {
  slide.addShape(shape(pres, "line"), { x, y: y - 0.08, w: 8.7, h: 0, line: { color: THEME.line, width: 1 } });
  items.forEach((item, i) => {
    const ix = x + i * 2.85;
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: ix,
      y,
      w: 0.42,
      h: 0.32,
      margin: 0,
      fontFace: FONT,
      fontSize: 12,
      bold: true,
      align: "center",
      valign: "mid",
      color: THEME.white,
      fill: { color: THEME.blue },
    });
    slide.addText(item[0], textBox(ix + 0.58, y + 0.02, 0.55, 0.18, 9.3, THEME.blue, { bold: true }));
    slide.addText(item[1], textBox(ix + 1.12, y + 0.02, 1.3, 0.18, 9.3, THEME.text));
  });
}

function addStepBlock(pres, assets, slide, x, y, number, title) {
  slide.addShape(shape(pres, "roundRect"), {
    x,
    y,
    w: 1.38,
    h: 1.05,
    rectRadius: 0.08,
    fill: { color: THEME.white },
    line: { color: THEME.line },
  });
  slide.addText(String(number).padStart(2, "0"), {
    x: x + 0.13,
    y: y + 0.15,
    w: 0.44,
    h: 0.34,
    margin: 0,
    fontFace: FONT,
    fontSize: 13,
    bold: true,
    align: "center",
    valign: "mid",
    color: THEME.white,
    fill: { color: THEME.blue },
  });
  slide.addText(title, textBox(x + 0.13, y + 0.63, 1.12, 0.22, 12, THEME.ink, { bold: true, align: "center" }));
}

function addMiniTable(slide, x, y, w, rows) {
  const header = rows[0].map((text) => ({ text, options: { fill: { color: THEME.blue }, color: THEME.white, bold: true } }));
  const body = rows.slice(1).map((row) => row.map((text) => ({ text, options: { fill: { color: THEME.white }, color: THEME.text } })));
  slide.addTable([header, ...body], {
    x,
    y,
    w,
    h: rows.length * 0.28,
    colW: rows[0].map((_, i) => i === 0 ? w * 0.24 : (w * 0.76) / (rows[0].length - 1)),
    margin: 0.04,
    border: { type: "solid", color: THEME.line, pt: 0.6 },
    fontFace: FONT,
    fontSize: 8.8,
    valign: "mid",
    fit: "shrink",
  });
}

function addTeachingInsight(pres, assets, slide, note, fallback) {
  const text = cleanupInsight(note || fallback || "");
  slide.addShape(shape(pres, "rect"), {
    x: 0.32,
    y: 4.72,
    w: 9.34,
    h: 0.62,
    fill: { color: THEME.white, transparency: 8 },
    line: { color: THEME.white, transparency: 100 },
  });
  addIconBadge(pres, assets, slide, "graduation-cap", 0.58, 4.79, 0.42, THEME.blue);
  slide.addText("教学启示：", textBox(1.18, 4.82, 0.96, 0.18, 8.8, THEME.blue, { bold: true }));
  slide.addText(text, textBox(1.18, 5.05, 7.9, 0.18, 8.2, THEME.text, { fit: "shrink" }));
}

function addIconBadge(pres, assets, slide, icon, x, y, size, color) {
  slide.addShape(shape(pres, "ellipse"), {
    x,
    y,
    w: size,
    h: size,
    fill: { color },
    line: { color },
  });
  const pad = size * 0.22;
  slide.addImage({ path: assets.icon(icon, THEME.white), x: x + pad, y: y + pad, w: size - pad * 2, h: size - pad * 2 });
}

function addRibbon(pres, slide, label, x, y, w, h) {
  slide.addShape(shape(pres, "parallelogram"), {
    x,
    y,
    w,
    h,
    adjustPoint: 0.12,
    fill: { color: THEME.blue },
    line: { color: THEME.blue },
  });
  slide.addText(label, textBox(x + 0.08, y + h * 0.26, w - 0.16, h * 0.25, 9.5, THEME.white, { bold: true, align: "center" }));
}

function addPanel(pres, slide, x, y, w, h, opts = {}) {
  slide.addShape(shape(pres, "roundRect"), {
    x,
    y,
    w,
    h,
    rectRadius: 0.04,
    fill: { color: opts.fill || THEME.white, transparency: opts.transparency || 0 },
    line: { color: opts.border || THEME.line, width: 0.8 },
    shadow: shadow(0.08),
  });
}

function addArrow(slide, x, y, w, h) {
  slide.addShape("line", {
    x,
    y,
    w,
    h,
    line: { color: THEME.blue2, width: 2.2, beginArrowType: "none", endArrowType: "triangle" },
  });
}

function addPageNumber(slide, index) {
  slide.addText(String(index), textBox(9.48, 5.28, 0.18, 0.12, 8, index === 0 ? "CAD8E8" : THEME.muted, { align: "right" }));
}

function addSpeakerNotes(slide, slideData) {
  if (typeof slide.addNotes === "function" && slideData.notes.length) {
    slide.addNotes(slideData.notes.join("\n"));
  }
}

function insight(slideData) {
  const note = slideData.notes.find((item) => item.startsWith("讲者提示"));
  return note || "";
}

function cleanupInsight(value) {
  return value.replace(/^讲者提示[：:]\s*/, "").trim();
}

function textBox(x, y, w, h, fontSize, color, options = {}) {
  return {
    x,
    y,
    w,
    h,
    margin: options.margin || 0,
    fontFace: options.fontFace || FONT,
    fontSize,
    color,
    bold: Boolean(options.bold),
    italic: Boolean(options.italic),
    align: options.align || "left",
    valign: options.valign || "mid",
    fit: options.fit,
  };
}

function shadow(opacity = 0.1) {
  return { type: "outer", color: "000000", opacity, blur: 1.2, offset: 0.7, angle: 45 };
}

function shape(pres, name) {
  const shapes = pres.ShapeType || pres.shapes || {};
  return shapes[name] || name;
}

function createAssetManager(outputPath, options = {}) {
  const dir = path.join(path.dirname(outputPath), "assets");
  const lucideDir = path.join(path.dirname(require.resolve("lucide-static/package.json")), "icons");
  const manifestDir = options.manifestPath ? path.dirname(path.resolve(options.manifestPath)) : process.cwd();
  fs.mkdirSync(dir, { recursive: true });

  return {
    async prepare() {
      await ensurePngFromSvg(path.join(dir, "reference-style-cover-bg.svg"), path.join(dir, "reference-style-cover-bg.png"), coverBackgroundSvg());
      const commonIcons = [
        "brain-circuit",
        "target",
        "circle-alert",
        "route",
        "message-square",
        "terminal",
        "database",
        "shield-check",
        "clipboard-list",
        "file-text",
        "workflow",
        "list-checks",
        "copy-check",
        "check",
        "settings",
        "users",
        "graduation-cap",
      ];
      await Promise.all(commonIcons.map((name) => ensureIconPng(name, THEME.white, 2, 1)));
      await ensureIconPng("brain-circuit", "B8D7FF", 1.2, 0.25);
    },
    coverBackground() {
      return path.join(dir, "reference-style-cover-bg.png");
    },
    icon(name, color, strokeWidth = 2, opacity = 1) {
      const safe = `${name}-${color}-${String(strokeWidth).replace(".", "_")}-${String(opacity).replace(".", "_")}`;
      const pngFile = path.join(dir, `${safe}.png`);
      if (!fs.existsSync(pngFile)) {
        throw new Error(`Visual asset was not prepared: ${pngFile}`);
      }
      return pngFile;
    },
    generatedAsset(slideData) {
      if (!slideData.asset_path || slideData.asset_kind === "placeholder") return "";
      const assetPath = path.resolve(manifestDir, slideData.asset_path);
      if (!fs.existsSync(assetPath)) {
        throw new Error(`Generated slide asset is missing: ${assetPath}`);
      }
      return assetPath;
    },
  };

  async function ensureIconPng(name, color, strokeWidth, opacity) {
    const safe = `${name}-${color}-${String(strokeWidth).replace(".", "_")}-${String(opacity).replace(".", "_")}`;
    const svgFile = path.join(dir, `${safe}.svg`);
    const pngFile = path.join(dir, `${safe}.png`);
    if (fs.existsSync(pngFile)) return;

    const sourcePath = path.join(lucideDir, `${name}.svg`);
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Missing lucide icon: ${name}`);
    }
    const svg = fs.readFileSync(sourcePath, "utf8")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/width="24"/, 'width="256"')
      .replace(/height="24"/, 'height="256"')
      .replace(/stroke="currentColor"/g, `stroke="#${color}"`)
      .replace(/stroke-width="2"/g, `stroke-width="${strokeWidth}"`)
      .replace(/<svg\b/, `<svg opacity="${opacity}"`);
    await ensurePngFromSvg(svgFile, pngFile, svg);
  }
}

async function ensurePngFromSvg(svgPath, pngPath, svg) {
  if (fs.existsSync(pngPath)) return;
  fs.writeFileSync(svgPath, svg);
  await sharp(Buffer.from(svg)).png().toFile(pngPath);
}

function coverBackgroundSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <radialGradient id="glow" cx="50%" cy="42%" r="58%">
      <stop offset="0" stop-color="#1c4f7d"/>
      <stop offset="0.5" stop-color="#102f4e"/>
      <stop offset="1" stop-color="#071a2c"/>
    </radialGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#244d74" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#071a2c" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#glow)"/>
  <rect x="0" y="0" width="290" height="900" fill="#071a2c" opacity="0.25"/>
  <rect x="1310" y="0" width="290" height="900" fill="#071a2c" opacity="0.25"/>
  <circle cx="800" cy="350" r="260" fill="none" stroke="#9dbde3" stroke-width="2" opacity="0.16"/>
  <circle cx="800" cy="350" r="188" fill="none" stroke="#d4e8ff" stroke-width="1.4" opacity="0.11"/>
  <g opacity="0.2" stroke="#b8d7ff" stroke-width="1.5" fill="#b8d7ff">
    <line x1="520" y1="300" x2="680" y2="220"/><line x1="680" y1="220" x2="830" y2="265"/><line x1="830" y1="265" x2="1010" y2="205"/>
    <line x1="595" y1="450" x2="760" y2="390"/><line x1="760" y1="390" x2="945" y2="460"/><line x1="945" y1="460" x2="1080" y2="360"/>
    <circle cx="520" cy="300" r="5"/><circle cx="680" cy="220" r="5"/><circle cx="830" cy="265" r="5"/><circle cx="1010" cy="205" r="5"/>
    <circle cx="595" cy="450" r="5"/><circle cx="760" cy="390" r="5"/><circle cx="945" cy="460" r="5"/><circle cx="1080" cy="360" r="5"/>
  </g>
  <rect width="1600" height="900" fill="url(#edge)"/>
</svg>
`;
}

module.exports = {
  buildPptFromManifest,
};
