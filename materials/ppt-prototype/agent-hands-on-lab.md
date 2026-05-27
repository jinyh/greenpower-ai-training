# AI Agent Hands on Lab PPT Prototype

Deck: AI Agent Hands on Lab
Audience: 中欧商学院 MBA
Theme: agent-workshop

## 01. Agent 是杠杆，不是替代

Layout: title
Visual: 深色标题页，左侧大标题，右侧三张问题卡：能帮我做什么、不能帮我做什么、怎么做得更好；风格稳重、适合 MBA 课堂开场

Content:
- 今天不讲算法，不讲代码，讲如何让 AI 帮你完成执行性工作
- Agent 的价值是放大执行力，不是替代判断力
- 今日带走三个问题：能力边界、能力盲区、驾驭方法

Notes:
- 来源：materials/workshop-outline.md:139-169
- 讲者提示：强调“人负责最终判断”，不要把 Agent 包装成自动决策者

## 02. 从聊天到执行

Layout: comparison
Visual: 左右对比图，左边是聊天气泡，右边是终端窗口、文件夹和任务清单，突出“读材料、拆步骤、生成结果”

Content:
- 传统 ChatGPT：一问一答，人持续追问
- 终端 Agent：人设定目标，Agent 多步骤推进
- 关键变化：从“只动嘴”到“能动手”
- 风险变化：从“说错话”升级为“做错事”，需要校验机制

Notes:
- 来源：materials/workshop-outline.md:46-80
- 讲者提示：此页为工具定位，不展开模型或安装细节

## 03. 驾驭 Agent 的三要素

Layout: framework
Visual: 三个互锁模块 Prompt、Context、Harness 指向 Output，旁边有“人负责判断”的小标记；线条简洁，适合方法论页

Content:
- Prompt：结构化任务指令书，回答“要做什么、给谁看、输出什么格式”
- Context：Agent 的视野和记忆，决定信息质量
- Harness：防止跑偏和幻觉的规则系统，决定输出边界
- 一句话：Prompt 定方向，Context 定质量，Harness 定边界

Notes:
- 来源：materials/workshop-outline.md:87-130
- 来源：materials/instructor-quickref.md:8-18

## 04. Prompt 不是提问，是任务书

Layout: process
Visual: CO-STAR + Constraint 六宫格卡片，卡片上分别写 C/O/S/T/A/R，并用一条红色约束带标注 Constraint

Content:
- Context：任务背景是什么
- Objective：具体要完成什么
- Style / Tone：用什么专业程度和语气
- Audience：给谁看
- Response：输出什么格式
- Constraint：不能做什么，不确定时怎么办

Notes:
- 来源：materials/workshop-outline.md:171-244
- 来源：materials/prompt-design-guide.md:8-25

## 05. Context 决定 Agent 能看见什么

Layout: layers
Visual: 四层 Context 堆叠图：外部材料、对话历史、项目规则文件、工具/Skills；突出上午先讲外部和对话，环境段再演示规则文件

Content:
- 外部 Context：上传材料、粘贴文本、提供链接
- 对话 Context：历史对话会影响当前回答
- 系统 Context：AGENTS.md / CLAUDE.md 等项目规则文件
- 工具 Context：MCP 与 Skills 扩展 Agent 的可用能力

Notes:
- 来源：materials/context-management.md:16-44
- 来源：materials/workshop-outline.md:245-291
- 讲者提示：上午只重点讲外部 + 对话两类，避免技术负担过重

## 06. Harness：把翻车变成学习材料

Layout: failure-loop
Visual: “翻车 -> 发现 -> 加 Harness -> 复核”的循环流程，翻车节点用红色警示，复核节点用绿色检查

Content:
- 输出格式约束：让结果可读、可复制、可评分
- 边界约束：只基于给定材料，未提及就标注
- 分析过程约束：要求依据、置信度、反方观点
- 校验机制：列出不确定点、异常数据和信息缺口

Notes:
- 来源：materials/harness-templates.md:19-181
- 来源：materials/workshop-outline.md:292-363
- 讲者提示：保留“翻车 -> 发现 -> 纠正”的教学设计，不要把案例做得过于完美

## 07. 课上只验证，不现场重装

Layout: checklist
Visual: 终端检查清单，包含 Claude Code、CC Switch、阿里百炼配置、模型响应、项目规则文件五个勾选项

Content:
- 课前完成安装，课上只验证工具能否启动和模型能否响应
- Claude Code + CC Switch + 阿里百炼作为课堂统一基线
- OpenCode 作为合规备用方案
- 环境故障 2 分钟内解决不了，先保证学习不中断

Notes:
- 来源：materials/workshop-outline.md:370-467
- 来源：materials/instructor-quickref.md:92-112
- 讲者提示：此页避免变成安装教学，重点是课堂节奏控制

## 08. 下午实战：完成、展示、复盘

Layout: workshop-loop
Visual: 90 分钟小组实战时间环：准备、第一轮、迭代、整理；右侧是汇报四件套：成果、Prompt 迭代、翻车记录、心得

Content:
- 每组领取一张场景任务卡，90 分钟内完成可展示成果
- 汇报必须展示：最终成果、Prompt 迭代、翻车记录、心得总结
- 评分关注 Prompt、Context、Harness、输出质量和迭代过程
- 完成比完美重要，翻车是最好的学习材料

Notes:
- 来源：materials/scenario-tasks/README.md:64-99
- 来源：materials/group-evaluation.md:8-21
- 讲者提示：下午目标不是比拼谁的 AI 输出最漂亮，而是展示是否会约束、校验和复盘
