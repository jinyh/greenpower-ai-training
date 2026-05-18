# AGENTS.md

## 项目定位

本仓库是 AI Agent Hands on Lab 的中文教学材料库，主体服务于中欧商学院 MBA 全天工作坊，核心框架是：

```text
Prompt -> Context -> Harness
```

主要受众是产业、金融、管理背景的非技术学员。写作目标不是展示技术细节，而是帮助学员在一天内理解 Agent 的能力边界、常见错误、约束方法和可复用工作流。

## 目录结构

- `materials/`：主工作坊材料，面向中欧商学院 MBA，覆盖课前准备、全天讲稿、讲师速查、Prompt/Context/Harness 参考、小组评价和下午场景任务。
- `materials/scenario-tasks/`：下午小组实战任务卡。每张任务卡应能独立使用，并与总目录、评分标准、汇报要求保持一致。
- `greenpower/`：绿色能源/新型电力系统方向的零基础培训材料。它共享 Prompt -> Context -> Harness 框架，但目标受众更偏完全新手。

## 通用写作规则

- 默认使用中文，除非用户明确要求英文或双语。
- 保持教学语言清晰、可执行、面向非技术背景；少用工程黑话，必要术语要解释。
- 优先使用 Markdown 表格、编号步骤、检查清单和可复制模板，避免大段散文式说明。
- 保持“Agent 是杠杆，不是替代”的主线：强调人工判断、边界约束、校验机制和责任归属。
- 涉及投资、财务、政策、公司事实或软件安装版本时，不要凭记忆更新；如果要改成最新事实，先核验来源。
- 不要写入真实 API Key、账号、手机号、邮箱、内部链接或未公开数据。示例 Key 统一使用占位符，如 `API_KEY_PLACEHOLDER`。
- 示例输出要主动包含防幻觉约束，例如“只基于给定材料”“未提及则标注”“列出不确定点”。

## `materials/` 编辑重点

- 维持工作坊当前节奏：上午采用方案 A′，即先讲 Agent 与 Prompt / Context / Harness，再做环境验证，最后进入串联案例；课前完成安装，课上只验证和切换。
- 核心工具表述保持一致：OpenCode 与 Claude Code 都属于终端 Agent 工具；中国课堂建议以 OpenCode + 国内模型供应商（阿里百炼 / DeepSeek / OpenAI-compatible API）作为统一基线，同时保留 Claude Code 作为等价可选路径和讲师演示工具。
- 三要素定义保持统一：
  - Prompt：结构化任务指令书，回答“要做什么、给谁看、输出什么格式”。
  - Context：Agent 的视野和记忆，重点区分外部、对话、系统、工具四类。
  - Harness：防止跑偏和幻觉的规则系统，包含格式约束、边界约束、校验机制等。
- Prompt 示例优先使用 CO-STAR + Constraint：Context、Objective、Style、Tone、Audience、Response、Constraint。
- 修改时间线时，必须同步检查 `materials/workshop-outline.md`、`materials/instructor-quickref.md`、`materials/pre-setup-guide.md`、`materials/group-evaluation.md` 和 `materials/scenario-tasks/README.md` 是否需要联动。
- 修改评分维度或权重时，同步更新评分细则、评分表模板、讲师点评话术和场景任务成果要求。
- 修改环境安装或工具配置时，同步检查课前准备、讲师速查、工作坊讲稿中的对应操作，避免同一命令或 URL 多处不一致；涉及软件安装命令和 Provider 配置时先核验官方文档。
- 保留“翻车 -> 发现 -> 加 Harness 纠正”的教学设计；不要把案例改得过于完美。

## 场景任务卡规则

- 每张任务卡应包含：适用场景、任务目标、推荐 Context、Prompt 起点、Harness 建议、成果要求和汇报提示。
- 任务要适合 90 分钟小组实战，优先“可完成、可展示、可复盘”，不要设计成需要长期研究或复杂系统开发的任务。
- 金融/投资类场景不得要求 Agent 给出买入、卖出、持有、目标价等投资建议；应限定为分析、对比、风险提示和信息缺口。
- 涉及公司、政策、市场数据时，要求学员标注来源和不确定性，不鼓励编造精确数字。
- 如果新增或删除任务卡，必须同步更新 `materials/scenario-tasks/README.md` 的目录、选择指南和成果要求。

## `greenpower/` 编辑重点

- 面向完全零基础学员，语气应更友好、更少术语，步骤应更细。
- 保持绿色能源、新型电力系统、碳中和语境，但不要假设学员懂 AI、命令行或软件配置。
- 仍沿用 Prompt -> Context -> Harness 框架；不要引入与 `materials/` 冲突的新框架。

## 验证清单

本仓库主要是 Markdown 文档，没有固定构建或测试流程。完成修改后至少执行：

```bash
git status --short
git diff -- AGENTS.md CLAUDE.md materials greenpower
rg -n "TODO|FIXME" materials greenpower
rg -n "API Key[:：]\\s*sk-" materials greenpower AGENTS.md
```

如修改了链接、安装命令、版本号、工具名或外部平台说明，应额外人工核验链接和命令是否仍然有效。

## Git 与安全

- 不覆盖用户已有修改；发现无关脏改动时只说明，不回滚。
- 不执行 `git reset --hard`、`git checkout --`、强制删除等破坏性命令，除非用户明确要求。
- 提交信息默认使用中文；如项目后来引入提交规范，优先遵循项目规范。
