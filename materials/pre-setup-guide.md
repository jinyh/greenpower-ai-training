# AI Agent Hands on Lab — 课前准备指南

> **目标受众**：中欧商学院 MBA 学员
> **课堂主线工具**：OpenCode + 国内模型供应商（阿里百炼 / DeepSeek / OpenAI-compatible API）
> **可选对照工具**：Claude Code（讲师演示 / 进阶选项）
> **预计耗时**：30-45 分钟

### 课前必做（方案 A′）

工作坊采用 **「上午先学 Prompt / Context / Harness，11:05 起再验证环境」** 的节奏：

| 何时完成 | 内容 |
|---------|------|
| **课前（必须）** | 安装 OpenCode，准备国内模型供应商 API Key，完成一次启动验证 |
| **课前（可选）** | 安装 Claude Code，用于体验 Anthropic 官方 Agent 工具 |
| **课上 11:05-11:25** | 只验证连接、读取文件和执行最小任务；不做首次安装 |

未在课前完成安装的同学，上午仍可跟听三要素并用网页版 AI 工具做跟练；案例阶段请与邻座**共用一台已配置电脑**，或联系助教课前答疑。

---

## 一、为什么课堂默认使用 OpenCode

本课不是某一个海外工具的使用培训，而是训练大家掌握 **终端 Agent 工作流**：让 Agent 读取材料、执行任务、输出结果，并通过 Prompt / Context / Harness 控制质量。

| 维度 | OpenCode | Claude Code | 课堂建议 |
|------|----------|-------------|----------|
| 工具定位 | 开源终端 Agent，可连接多种模型供应商 | Anthropic 官方 Agent 工具，体验成熟 | 主讲工作流，不绑定单一厂商 |
| 国内课堂可用性 | 可接国内 OpenAI-compatible API，配置弹性更高 | 依赖 Claude 账号、网络和地区可用性 | 学生默认 OpenCode |
| 模型供应商 | 支持多 Provider 与自定义 OpenAI-compatible Provider | 官方主线是 Anthropic/Claude，也支持部分企业部署路径 | 中国课堂优先国内 Provider |
| 安装与账号 | 工具安装后，主要取决于所选模型供应商 | 需要可用的 Claude Code 访问权限 | 避免让全班统一依赖 Claude 账号 |
| 开源性 | 开源，便于教学解释和本地化适配 | 闭源官方产品，适合做标杆对照 | OpenCode 主线，Claude Code 保留 |
| 规则文件 | 常用 `AGENTS.md` 记录项目规则 | 常用 `CLAUDE.md` 记录项目规则 | 统一讲“项目规则文件” |
| 适合对象 | 国内课堂、混合模型、批量部署 | 已有 Claude 账号、网络稳定、希望体验官方最佳实践 | 学生 OpenCode，讲师可演示 Claude Code |

一句话：**OpenCode 更适合作为中国课堂的统一上机工具；Claude Code 仍适合作为高质量对照和进阶工具。**

---

## 二、安装 OpenCode（必做）

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

## 三、准备模型供应商 API Key（必做）

OpenCode 需要连接一个模型供应商。课堂建议使用国内网络更稳定的 OpenAI-compatible API，例如：

| 供应商 | 适用情况 | 说明 |
|--------|----------|------|
| 阿里百炼 | 推荐课堂统一使用 | 通义千问等模型，国内访问稳定 |
| DeepSeek | 可作为备用 | 成本低，适合文本分析任务 |
| 其他 OpenAI-compatible API | 学员已有账号时使用 | 需确认 Base URL、模型名和 Key 格式 |

### 申请阿里百炼 API Key

1. 访问阿里百炼文档或控制台：
   https://www.alibabacloud.com/help/zh/model-studio/
2. 使用阿里云账号登录。
3. 开通模型服务。
4. 在控制台中创建 API Key。
5. 妥善保存 Key，不要发到微信群、公开文档或截图里。

> **安全提醒**：API Key 相当于你的密码。示例材料中统一使用 `API_KEY_PLACEHOLDER`，不要把真实 Key 写进课堂文件。

---

## 四、配置 OpenCode Provider（必做）

不同供应商的 Base URL、模型名和 Key 格式会变化，请以课堂前助教发布的配置为准。

课堂配置建议写成三项：

```text
Provider: 阿里百炼
Base URL: 以课堂前官方核验结果为准
Model: 以课堂指定模型为准
API Key: API_KEY_PLACEHOLDER
```

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

## 五、可选：安装 Claude Code

Claude Code 是 Anthropic 官方 Agent 工具。它不是本课学生必装项，但适合以下情况：

- 老师或学员已有 Claude Pro / Max / Team / Enterprise / Console 等访问条件。
- 网络和账号条件稳定。
- 想体验 Anthropic 官方 Agent 工具的最佳实践。
- 课后希望继续研究 MCP、权限控制、企业部署等能力。

官方文档：

- Claude Code Setup：https://code.claude.com/docs/en/setup
- Claude Code Overview：https://code.claude.com/docs/en/overview

安装后可验证：

```bash
claude --version
```

课堂中讲师可能会用 Claude Code 做对照演示，但不会要求所有学员必须安装。

---

## 六、可选：安装 CC Switch

CC Switch 是一个桌面应用，用于管理部分 CLI 工具的模型供应商配置。它适合讲师或进阶学员统一管理多套 Provider，但不是本课学生完成上机任务的必需条件。

参考地址：

```text
https://github.com/farion1231/cc-switch/releases
```

课堂中如果使用 CC Switch，助教会提前说明它管理的是哪一个工具、哪一个 Provider，以及如何验证切换是否生效。

---

## 七、准备清单

工作坊开始前，请确认你已完成以下检查项：

- [ ] 电脑上已安装 OpenCode（`opencode --version` 有输出）
- [ ] 已准备至少一个模型供应商 API Key
- [ ] 已按课前通知配置好 Provider
- [ ] `opencode` 启动后能收到模型回复
- [ ] 电脑可连接互联网
- [ ] 已保存 API Key，但没有把真实 Key 写入公开文件
- [ ] 可选：已安装 Claude Code（`claude --version` 有输出）
- [ ] 可选：已安装 CC Switch

---

## 八、常见问题

### Q1：我完全不懂命令行，怎么办？

课前先完成 `opencode --version` 这一项即可。课堂中只会使用少量复制粘贴命令，重点是理解 Agent 工作流，不是学习编程。

### Q2：OpenCode 能启动，但模型没有回复？

优先检查三件事：

1. API Key 是否复制完整。
2. Base URL 和模型名是否与课前通知一致。
3. 账号是否有可用额度。

如果仍失败，课堂中直接与邻座共用一台已配置电脑，不占用全班时间排查。

### Q3：一定要安装 Claude Code 吗？

不需要。Claude Code 是对照工具和进阶选项。本课学生主线使用 OpenCode。

### Q4：我是 Windows 用户，必须装 WSL2 吗？

不强制，但推荐。WSL2 + Ubuntu 的命令体验与课堂演示最一致，助教也更容易支持。

### Q5：API Key 没有额度怎么办？

可以：

- 检查是否完成实名认证或服务开通。
- 充值少量额度用于课堂。
- 使用助教提供的备用方案。
- 课堂中与同组同学共用已配置电脑。

---

## 九、工作坊当天提醒

1. **请携带电脑**：本次工作坊包含上机实操。
2. **提前 15 分钟到场**：助教会快速检查 `opencode --version` 和模型回复。
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
