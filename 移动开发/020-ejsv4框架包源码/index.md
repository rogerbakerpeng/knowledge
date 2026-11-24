# ejsv4框架包源码（@epoint-mrc/ejsv4 4.2.23）

| 项 | 内容 |
|---|---|
| 来源 | D:\git\dfx待分析\epoint-mrc-next-packages-ejsv4 |
| 入库日期 | 2026-11-24 |
| 体量 | 381 文件，约 12.3MB |

## 是什么

EJS 的 **JS 桥层源码**（packages/ejsv4）。EJS 的功能都在 App 原生层实现，ejsv4 只负责：`ejs.callApi` → `core/callnativeapi.ts` → `inner/triggerjsbridge.ts`（回调 id 短期/长期 isLongCb）→ `core/nativejsbridge.ts` 拼 `EpointJSBridge://模块:回调id/方法?encodeURIComponent(JSON)`，Android 走 `window.prompt`（超 5000 字符分块 setLongCache）、iOS 走 WKWebViewJavascriptBridge。

## 目录导航

- `src/api/`：各端适配——`h5/`（浏览器）、`uni/`、`dd/`、`f9/`、`f9dd/`、`xm/`（钉钉/F9/小程序等差异化实现）。
- `showcase/`：每个 API 的示例页，`showcase/showcase/ejsv4/ejs_api_v4_callapi.html` 是 callApi/动态注册的标准示例；`js/widgets/selectperson` 等为复杂组件示例。
- `npm/`：构建产物。

## 怎么用

- 查某个 EJS API 的**真实参数/回调行为**：先在 [EJS-API能力矩阵](../../技术笔记/010-M8移动框架离线文档/ejs4mpdoc/EJS-API能力矩阵.md) 定位模块方法，再到本源码 `src/api/{端}/` 看实现。
- 壳里没有的能力 H5 调不到——判断"要改 App 发版"还是"纯 H5 可做"，以本源码 + 壳反编译结论为准（见 [030-交易APP移动端架构分析](../030-交易APP移动端架构分析/index.md) 的 EJS 全链路节）。

返回[移动开发索引](../index.md)。
