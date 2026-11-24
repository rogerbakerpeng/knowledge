# 010-M8 移动框架离线文档

## 元信息

| 项 | 内容 |
|---|---|
| 归档日期 | 2026-11-24 |
| 来源 | 新点公司内部文档站（M8 移动前端框架 + EJS-JSSDK），经 `epoint-mrc-mcp@0.1.0` 源码定位文档服务地址后整站镜像 |
| 服务地址 | `http://192.168.202.166:8008/m8mpdoc/library/`（M8 框架）、`http://192.168.202.166:8008/ejs4mpdoc/`（EJS-JSSDK）——**仅公司内网可达** |
| 镜像目的 | 供无法访问公司网络的电脑离线查阅；随本仓库 git 分发 |
| 内容规模 | m8mpdoc 264 页 + 42 图（6.2MB）；ejs4mpdoc 15 模块 40 图 + 能力矩阵 |

## 目录结构

- `m8mpdoc/`——M8 移动前端跨端框架文档全站镜像（Vue 一套代码发布 H5/EJS/微信小程序/支付宝小程序）：
  - `$navigation.md` 原始导航（含 M83/M84 条件编译标记与作者注释，可当全站目录用）
  - `000-整体设计`～`017-内置组件`、`018-EPUI组件`：框架架构、页面开发教程、内置/UI/EUI 组件、典型案例、工程化、视觉规范等 16 个章节
  - `005-核心通用Util` / `006-Util工具集`：MCP `get_m8_util_list/get_m8_util_info` 数据源
  - `009-UI组件`：MCP `get_m8_ui_list/get_m8_ui_info` 数据源
  - `004-EJS相关`：EJS 与 H5 交互相关
  - `assets/`：全站截图
- `ejs4mpdoc/`——EJS-JSSDK API 文档：
  - `pages/api_{module}/` 15 个模块：audio / auth / device / event / io / navigator / page / runtime / storage / stream / ui / util / contact / basicCard / miniH5
  - `EJS-API能力矩阵.md`：148 个方法的 Auth/Sys/Android/iOS/Card 支持矩阵（提取自 epoint-mrc-mcp 源码硬编码清单，即 MCP `get_ejs_api_list` 的返回内容）

## 关键背景

- 这两个文档站是 `epoint-mrc-mcp`（M8 跨端 skill 的 MCP 文档服务）运行时拉取的数据源，包内不含文档，离开公司网 MCP 即失效——本镜像即其完整替代。
- 公网 npm 上 `epoint-mrc-mcp@0.1.0`（维护者 epoint_ydyf / ydyf@epoint.com.cn）与内网同款；`m8mpdoc` 文档包公网不存在（npm 404）。
- 已知缺口：`api_io` 页引用的 `images/util.selectfile.png` 源站即 404，全库仅此一张图缺失。
- 脱敏说明：`m8mpdoc/014-常见问题/install.md` 原文含内网 npm 源 `_auth` 凭据与 `NpmToken` 令牌，已按知识库红线脱敏（GitHub 推送保护也会拦截），实际值请向内网管理员索取。
- 文档内部图片引用已改写为相对路径，解压/clone 后用任意 Markdown 阅读器可直接看图。

## 后续可跟进

- 若公司文档站更新（如新增组件/API），可重跑镜像脚本增量同步（脚本思路：解析 `$navigation.md` 全部 `?file=` 链接 + ejs-tool.js 模块清单批量下载）。
- 搭配 skill：`m8-mobile-cross-platform`（D:\git\dfx待分析\），离线环境下查文档直接翻本目录替代 MCP 工具。
