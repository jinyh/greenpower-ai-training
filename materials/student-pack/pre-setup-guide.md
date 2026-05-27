# AI Agent Hands on Lab — 课前准备指南

> **目标受众**：中欧商学院 MBA 学员
> **终端 Agent 工具**：Claude Code + CC Switch（推荐）/ OpenCode（合规备用）
> **推荐课堂基线**：Claude Code + CC Switch + 阿里百炼
> **预计耗时**：30-45 分钟

### 课前必做（方案 A′）

工作坊采用 **「上午先学 Prompt / Context / Harness，11:05 起再验证环境」** 的节奏：

| 何时完成 | 内容 |
|---------|------|
| **课前（必须）** | 至少完成一种终端 Agent：Claude Code 或 OpenCode |
| **推荐路径** | Claude Code + CC Switch + 阿里百炼，便于课堂统一支持 |
| **备用路径** | OpenCode + 国内模型供应商（合规备用） |
| **课上 11:05-11:25** | 只验证连接、读取文件和执行最小任务；不做首次安装 |

未在课前完成安装的同学，上午仍可跟听三要素并用网页版 AI 工具做跟练；案例阶段请与邻座**共用一台已配置电脑**，或联系助教课前答疑。

---

## 一、Claude Code 和 OpenCode 怎么选

本课不是某一个海外工具的使用培训，而是训练大家掌握 **终端 Agent 工作流**：让 Agent 读取材料、执行任务、输出结果，并通过 Prompt / Context / Harness 控制质量。

对 MBA hands-on 的教学目标而言，Claude Code 和 OpenCode 没有本质差别：都能读文件、执行多步任务、遵守项目规则文件、配合工具扩展。课堂推荐使用 Claude Code + CC Switch + 阿里百炼作为统一基线。

| 维度 | Claude Code | OpenCode | 课堂建议 |
|------|-------------|----------|----------|
| 工具定位 | Anthropic 官方 Agent 工具，体验成熟 | 开源终端 Agent，可连接多种模型供应商 | 推荐 Claude Code + CC Switch |
| 共同能力 | 读写文件、多步任务、项目规则文件、工具扩展 | 读写文件、多步任务、项目规则文件、工具扩展 | 教学重点讲共通工作流 |
| 国内课堂可用性 | 通过 CC Switch 统一管理阿里百炼配置 | 可接国内 OpenAI-compatible API，配置弹性更高 | 统一上机时推荐 Claude Code + CC Switch |
| 模型供应商 | 官方主线是 Anthropic/Claude，通过 CC Switch 可接国内供应商 | 支持多 Provider 与自定义 OpenAI-compatible Provider | 课堂统一使用 CC Switch 管理阿里百炼配置 |
| 安装与账号 | 需要可用的 Claude Code 访问权限 | 工具安装后，主要取决于所选模型供应商 | 学员按课前通知统一配置 |
| 开源性 | 闭源官方产品，适合做官方体验参考 | 开源，便于教学解释和本地化适配 | 不把工具差异讲成课程重点 |
| 规则文件 | 常用 `CLAUDE.md` 记录项目规则 | 常用 `AGENTS.md` 记录项目规则 | 统一讲”项目规则文件” |
| 适合对象 | 课堂统一配置、希望体验官方最佳实践 | 合规备用、混合模型、批量部署 | 课堂推荐 Claude Code + CC Switch，OpenCode 作为合规备用 |

一句话：**课堂统一支持时推荐 Claude Code + CC Switch；OpenCode 作为合规备用方案。**

---

## 二、安装 Claude Code（推荐路径）

Claude Code 是 Anthropic 官方 Agent 工具，课堂推荐使用。它可以完成本课所有练习，适合以下情况：

- 课堂统一配置，便于助教支持
- 通过 CC Switch 统一管理阿里百炼配置
- 想使用 Anthropic 官方 Agent 工具
- 课后希望继续研究 MCP、权限控制、企业部署等能力

官方文档：

- Claude Code Setup：https://code.claude.com/docs/en/setup
- Claude Code Overview：https://code.claude.com/docs/en/overview

### 安装步骤

请按照官方文档完成安装。安装后可验证：

```bash
claude --version
```

如果能看到版本号，说明工具本体安装成功。

---

## 三、安装 CC Switch（课堂统一配置工具）

CC Switch 是一个桌面应用，用于管理 Claude Code 的模型供应商配置。课堂推荐使用它来统一管理阿里百炼配置。

参考地址：

```text
https://github.com/farion1231/cc-switch/releases
```

### 安装步骤

1. 访问 CC Switch GitHub Releases 页面
2. 下载适合你操作系统的版本（macOS / Windows / Linux）
3. 按照 README 说明完成安装
4. 启动 CC Switch

---

## 四、配置 CC Switch + 阿里百炼

### 准备阿里百炼 API Key

1. 访问阿里百炼文档或控制台：
   https://www.alibabacloud.com/help/zh/model-studio/
2. 使用阿里云账号登录
3. 开通模型服务
4. 在控制台中创建 API Key
5. 妥善保存 Key，不要发到微信群、公开文档或截图里

> **安全提醒**：API Key 相当于你的密码。示例材料中统一使用 `API_KEY_PLACEHOLDER`，不要把真实 Key 写进课堂文件。

### 在 CC Switch 中配置阿里百炼

课堂配置建议写成四项：

```text
Provider: 阿里百炼
Base URL: 以课堂前助教发布的配置为准
Model: 以课堂指定模型为准
API Key: 你的阿里百炼 API Key
```

> **课堂口径**：本课不要求学员记住 Provider 配置细节。课前由助教发布已核验的截图版配置；课上只验证是否能正常响应。

### 验证配置

配置完成后，在终端启动：

```bash
claude
```

发送一句验证消息：

```text
请用一句话确认你已正常响应。
```

如果 Agent 能正常回复，说明模型连接成功。

---

## 五、安装 OpenCode（合规备用路径）

OpenCode 是开源终端 Agent，可作为合规备用方案。如果你无法使用 Claude Code，可以选择 OpenCode。

请优先参考 OpenCode 官方文档：

- OpenCode 文档：https://opencode.ai/docs/
- OpenCode Provider 文档：https://opencode.ai/docs/providers

### macOS / Linux

推荐使用官方安装脚本：

```bash
curl -fsSL https://opencode.ai/install | bash
```

如果你习惯使用包管理器，也可以根据官方文档选择 Homebrew 或 npm 等安装方式。

### Windows

Windows 用户有三种路径，按优先级选择：

1. **推荐：WSL2 + Ubuntu**
   适合课堂跟做，命令与 macOS/Linux 最接近。
2. **可选：Chocolatey / Scoop**
   适合熟悉 Windows 包管理器的同学。
3. **可选：npm 安装**
   适合已经有 Node.js 环境的同学。

如果你从未使用过命令行，建议提前联系助教，不要等到课堂现场排查。

### 验证安装

安装后打开终端，执行：

```bash
opencode --version
```

如果能看到版本号，说明工具本体安装成功。

---

## 六、配置 OpenCode Provider（使用 OpenCode 时需要）

OpenCode 需要连接一个模型供应商。课堂建议使用国内网络更稳定的 OpenAI-compatible API，例如：

| 供应商 | 适用情况 | 说明 |
|--------|----------|------|
| 阿里百炼 | 推荐 | 通义千问等模型，国内访问稳定 |
| DeepSeek | 可作为备用 | 成本低，适合文本分析任务 |
| 其他 OpenAI-compatible API | 学员已有账号时使用 | 需确认 Base URL、模型名和 Key 格式 |

### 配置步骤

不同供应商的 Base URL、模型名和 Key 格式会变化，请以课堂前助教发布的配置为准。

课堂配置建议写成四项：

```text
Provider: 阿里百炼
Base URL: 以课堂前官方核验结果为准
Model: 以课堂指定模型为准
API Key: API_KEY_PLACEHOLDER
```

最小配置步骤：

1. 在终端启动 OpenCode：
   ```bash
   opencode
   ```
2. 按课前通知添加模型供应商。不同版本界面可能略有差异，常见方式是在 OpenCode 中执行 `/connect`，或按官方 Provider 文档编辑配置文件。
3. 填入助教课前发布的 `Base URL`、`Model` 和自己的 `API Key`。
4. 保存后重新启动 OpenCode。

> **课堂口径**：本课不要求学员记住 Provider 配置细节。课前由助教发布已核验的截图版配置；课上只验证是否能正常响应。

配置完成后，在终端启动：

```bash
opencode
```

发送一句验证消息：

```text
请用一句话确认你已正常响应。
```

如果 Agent 能正常回复，说明模型连接成功。

---

## 七、MBA 学员与讲师的 Skills / MCP 推荐策略

这门课的重点是学会 **Prompt / Context / Harness**，不是把环境装满。对 MBA 学员来说，Skills 和 MCP 更适合作为“增强项”，而不是课前必装项。

### 学员端：推荐什么，不推荐什么

| 类别 | 推荐程度 | 建议 |
|------|----------|------|
| Skills | 不强制安装 | 先把课堂任务做顺，不要把时间花在工具排障上 |
| MCP | 推荐仅保留 `filesystem` | 最适合演示“Agent 读材料再产出”，且风险低 |
| Web search / fetch 类 MCP | 可选 | 适合政策、公司、市场资料查询，但要标注来源和不确定性 |
| GitHub / 数据库 / 企业系统 MCP | 不建议统一安装 | 权限、账号、隐私和排障成本太高，不适合全班统一支持 |

### 学员端：如果要做 Skill 卡片

建议优先做课堂最常见的三类卡片，而不是追求安装复杂技能包：

| Skill 卡片 | 适用场景 | 关键约束 |
|-----------|----------|----------|
| 财报快速解读 | 财报初筛、行业分析 | 只基于给定材料，不给买卖建议 |
| 会议纪要整理 | 会议总结、待办提取 | 区分事实、决策、行动项和不确定点 |
| 战略对比分析 | 竞品比较、方案选择 | 固定比较维度，列出证据来源 |

### 讲师 / 助教端：推荐什么

| 类别 | 推荐程度 | 建议 |
|------|----------|------|
| `filesystem` MCP | 强烈推荐 | 只授权课程目录，最适合课堂演示 Context |
| Web search / fetch MCP | 推荐 | 便于核验政策、公司、安装文档 |
| `baoyu-url-to-markdown` | 推荐 | 适合把网页资料转成课程 Context |
| `baoyu-format-markdown` | 推荐 | 适合整理讲义、任务卡和评分说明 |
| `baoyu-translate` | 推荐 | 适合中英文材料互译和本地化 |
| `openai-docs` | 可选但实用 | 需要核验 OpenAI 产品或 API 时使用官方文档 |
| `superpowers` 全套 | 讲师可选 | 更适合维护课程材料，不建议作为学员统一安装项 |

### 一句话结论

**学员侧：不强制装 Skills，只保留一个只读 `filesystem` MCP 就够用。**

**讲师侧：可以装文档处理、翻译、归档和官方文档核验类工具，但不要把复杂企业 MCP 当成课堂标配。**

---

## 八、准备清单

工作坊开始前，请确认你已完成以下检查项：

- [ ] 电脑上已安装至少一种终端 Agent：Claude Code 或 OpenCode
- [ ] Claude Code 路径（推荐）：`claude --version` 有输出，且能正常响应
- [ ] CC Switch 已安装并配置阿里百炼
- [ ] OpenCode 路径（备用）：`opencode --version` 有输出
- [ ] OpenCode 路径（备用）：已准备至少一个模型供应商 API Key，并按课前通知配置好 Provider
- [ ] 电脑可连接互联网
- [ ] 如使用 API Key，已妥善保存 Key，但没有把真实 Key 写入公开文件

---

## 九、常见问题

### Q1：我完全不懂命令行，怎么办？

课前先完成 `opencode --version` 或 `claude --version` 这一项即可。课堂中只会使用少量复制粘贴命令，重点是理解 Agent 工作流，不是学习编程。

### Q2：OpenCode 能启动，但模型没有回复？

优先检查三件事：

1. API Key 是否复制完整。
2. Base URL 和模型名是否与课前通知一致。
3. 账号是否有可用额度。

如果仍失败，课堂中直接与邻座共用一台已配置电脑，不占用全班时间排查。

### Q3：OpenCode 和 Claude Code 差别大吗？

对本课目标来说差别不大。两者都能承担“读取材料 -> 执行任务 -> 输出结果 -> 人工校验”的 Agent 工作流。差别主要在账号和网络条件、模型供应商、插件生态和课堂支持成本。

### Q4：一定要安装 Claude Code 吗？

课堂推荐使用 Claude Code + CC Switch + 阿里百炼作为统一基线。如果无法使用 Claude Code，可以使用 OpenCode 作为合规备用方案。

### Q5：我是 Windows 用户，必须装 WSL2 吗？

不强制，但推荐。WSL2 + Ubuntu 的命令体验与课堂演示最一致，助教也更容易支持。

### Q6：API Key 没有额度怎么办？

可以：

- 检查是否完成实名认证或服务开通。
- 充值少量额度用于课堂。
- 使用助教提供的备用方案。
- 课堂中与同组同学共用已配置电脑。

---

## 十、工作坊当天提醒

1. **请携带电脑**：本次工作坊包含上机实操。
2. **提前 15 分钟到场**：助教会快速检查 `opencode --version` 或 `claude --version`，以及模型回复。
3. **课前自检命令**：
   ```bash
   opencode --version
   ```
   可选：
   ```bash
   claude --version
   ```
4. **保存好 API Key**：建议放在密码管理器或个人备忘录，不要发到群里。
5. **接受工具差异**：今天学的是 Prompt / Context / Harness 方法论，具体工具会持续变化。

> **技术支持**：如果课前准备中遇到问题，请在工作坊微信群中 @助教，或参加课前线上答疑。
