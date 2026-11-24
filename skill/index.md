# 技能索引

| 技能 | 用途 | 入口 |
|---|---|---|
| yuan | 研究驱动的脑爆、需求梳理、竞品和开源调研 | [技能定义](yuan/SKILL.md) · [使用说明](yuan/README.md) |
| yuanskill-pro | 研究驱动的提示词与技能设计、优化和验证 | [技能定义](yuanskill-pro/SKILL.md) · [使用说明](yuanskill-pro/安装与使用说明.md) |
| tender-template-structuring | 招标文件范本结构化切分：代理端招标菜单与标记埋点、投标菜单节点与html、扫描件清单；支持已批注/原始/换版三种场景 | [技能定义](tender-template-structuring/SKILL.md) · [使用说明](tender-template-structuring/使用说明.md) |
| m8-mobile-cross-platform | M8.3(Vue2+Vuex)/M8.4(Vue3+Pinia+TS) 移动跨端页面开发、迁移与审查；第一步必须识别版本 | [技能定义](m8-mobile-cross-platform/SKILL.md) |
| epoint-mobile-dev | 新点 EMP8 移动端/电子交易 App 需求开发助手：判断需求类型（H5/EJS/原生/菜单配置/MQTT/CA）并分步实现 | [技能定义](epoint-mobile-dev/SKILL.md) |

2026-11-23 新增 tender-template-structuring（来源：微信文件，原始包在该技能目录 原始材料/ 下备查；尚未安装到本机 Codex，需要时按下方步骤复制）。

2026-11-24 新增 m8-mobile-cross-platform、epoint-mobile-dev（来源：D:\git\dfx待分析）。注意 epoint-mobile-dev 内的 `<DFX>`/`<M8DOC>` 资源占位符：资料已入库本仓库，`<DFX>` 对应 [移动开发/](../移动开发/index.md)，`<M8DOC>` 对应 [技术笔记/010-M8移动框架离线文档](../技术笔记/010-M8移动框架离线文档/index.md)，`<APKSRC>`（cs0822 反编译源码）仍在虚拟机 ~/workspace/cs0822-src。两个技能均未安装到本机 Codex。

## 安装到本机Codex

将各技能的完整文件夹复制到 `$CODEX_HOME/skills/`；未设置CODEX_HOME时，Windows默认目录为 `C:\Users\<用户名>\.codex\skills\`。保留SKILL.md、references和assets目录结构，文件夹名与技能name字段一致。目标目录已有同名技能时先比较版本，避免直接覆盖。

本次已于2026-10-30将yuan和yuanskill-pro安装到本机Codex技能目录，并逐文件校验与仓库内容一致。技能可在下一轮对话使用；可点名 `$yuan` 或 `$yuanskill-pro`。各技能自带文档中的Claude Code安装方法适用于Claude Code，本页说明适用于Codex。

返回[知识库总索引](../index.md)。
