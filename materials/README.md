# AI Agent Hands on Lab 材料关系图

> **用途**：帮助讲师、助教和学员理解 `materials/` 目录下各份材料如何配合使用。

---

## 一、材料总览

```text
materials/
|
|-- pre-workshop-survey.md        # 课前调研：了解学员背景和场景偏好
|-- pre-setup-guide.md            # 课前准备：安装 OpenCode / Claude Code，准备模型访问
|-- tool-comparison-opencode-pi.md # 讲师参考：OpenCode 与 Pi Agent 工具选型比较
|
|-- student-pack/                 # 学员分发包：只放适合学员直接看到的入口和裁剪版材料
|-- instructor-pack/              # 讲师/助教包：只放内部使用入口
|
|-- workshop-outline.md           # 主讲稿：全天课程节奏、讲解话术、演示流程
|-- instructor-quickref.md        # 讲师速查：现场控场、翻车话术、应急方案
|
|-- prompt-design-guide.md        # Prompt 参考：烂 Prompt vs 好 Prompt 对比 + 加 Harness 前后对比
|-- context-management.md         # Context 参考：材料、对话、规则文件、工具上下文
|-- harness-templates.md          # Harness 参考：防幻觉、格式、边界、校验模板
|
|-- cases/                        # 教学案例：可直接投屏的真实翻车故事
|   |-- agent-collapse-10-step.md # ltbase 10-Step Collapse 中文降维版
|   `-- woshipm-logistics-harness.md # woshipm 干线物流 6 个 Agent 的实战复盘
|
|-- group-evaluation.md           # 小组评价：下午汇报评分维度和评分表
|
`-- scenario-tasks/
    |-- README.md                 # 下午任务卡目录、选择规则、成果要求
    `-- S1-...S17-*.md            # 17 张小组实战任务卡
```

---

## 二、课堂使用关系

```text
课前
|
|-- student-pack/pre-workshop-survey.md
|   `-- 帮讲师判断：学员行业背景、工具熟悉度、案例偏好
|
`-- pre-setup-guide.md
    `-- 帮学员完成：终端 Agent 安装、模型访问、课前自检

课堂上午
|
|-- workshop-outline.md
|   `-- 主讲师按时间线推进：Agent -> Prompt -> Context -> Harness -> 案例
|
|-- instructor-quickref.md
|   `-- 讲师/助教现场速查：概念、话术、应急方案
|
|-- prompt-design-guide.md
|-- context-management.md
`-- harness-templates.md
    `-- 作为上午讲解和下午实战的模板库

课堂下午
|
|-- scenario-tasks/README.md
|   `-- 小组选题、确认成果要求
|
|-- scenario-tasks/S1...S13
|   `-- 每组领取一张，完成 90 分钟实战
|
`-- group-evaluation.md
    `-- 汇报评分、讲师点评、自评互评
```

---

## 三、分发建议

```text
student-pack/
|
|-- README.md                     # 学员材料入口：说明哪些课前看、哪些课中用
|-- pre-workshop-survey.md        # 学员版问卷：只保留 Q1-Q5，不含讲师解读附录
`-- group-evaluation-student.md   # 学员版评分说明：只保留评分维度和成果要求

instructor-pack/
`-- README.md                     # 讲师/助教内部入口：链接到讲稿、速查、完整版评分表
```

建议分发节奏：

| 时间 | 发给学员 | 不建议发给学员 |
|------|----------|----------------|
| 课前 3-7 天 | `student-pack/README.md`、`student-pack/pre-workshop-survey.md`、`pre-setup-guide.md` | `workshop-outline.md`、`instructor-quickref.md` |
| 上午课后 | `prompt-design-guide.md`、`context-management.md`、`harness-templates.md` | 主讲稿中的翻车设计和应急话术 |
| 下午实战 | `scenario-tasks/README.md`、对应任务卡、`student-pack/group-evaluation-student.md` | 完整版 `group-evaluation.md` 的教授点评和汇总模板 |
| 课后 | 学员包 + 方法论手册 + 本组任务卡 | 讲师内部控场材料 |

---

## 四、核心方法关系

本工作坊不是单纯教某个工具，而是教一套可迁移的 Agent 协作方法：

```text
                 +----------------------+
                 |        Agent          |
                 |  会读材料、调工具、    |
                 |  分步骤执行任务        |
                 +----------+-----------+
                            |
                            v
        +-------------------+-------------------+
        |                                       |
        v                                       v
+---------------+                     +----------------+
| Prompt        |                     | Context        |
| 任务指令书     |                     | Agent 的视野    |
| 要做什么       |                     | 能看到什么材料   |
| 给谁看         |                     | 记得什么背景     |
| 输出什么格式   |                     | 可用什么工具     |
+-------+-------+                     +--------+-------+
        |                                      |
        +------------------+-------------------+
                           v
                  +----------------+
                  | Harness        |
                  | 规则和护栏      |
                  | 不能做什么      |
                  | 如何标注不确定  |
                  | 如何自检        |
                  +--------+-------+
                           |
                           v
                  +----------------+
                  | Output         |
                  | 可用但需人工复核 |
                  +----------------+
```

一句话：

```text
Prompt 决定任务方向；
Context 决定信息质量；
Harness 决定输出边界；
人负责最终判断。
```

---

## 五、推荐阅读顺序

### 讲师 / 助教

1. `instructor-pack/README.md`
2. `workshop-outline.md`
3. `instructor-quickref.md`
4. `pre-setup-guide.md`
5. `prompt-design-guide.md`
6. `context-management.md`
7. `harness-templates.md`
8. `group-evaluation.md`
9. `scenario-tasks/README.md`

### 学员

1. `student-pack/README.md`
2. `pre-setup-guide.md`
3. `prompt-design-guide.md`
4. `context-management.md`
5. `harness-templates.md`
6. 下午领取对应的 `scenario-tasks/S*.md`
