# 交易APP移动端架构分析（cs0822）

| 项 | 内容 |
|---|---|
| 分析对象 | cs0822.apk（约 60.5MB，未入库——二进制不入 git） |
| APK SHA256 | 83FB1458848650B5DF223A04CA4F8484909085588B606385A8C456E3F8FD6D0F |
| 原始位置 | D:\git\dfx待分析\cs0822.apk（反编译源码在虚拟机 ~/workspace/cs0822-src，jadx 1.5.3） |
| 入库日期 | 2026-11-24 |

## 文件清单

| 文件 | 说明 |
|---|---|
| cs0822-移动端架构分析.md | 主文档（440 行）：架构分析 + 新人开发指南 |
| cs0822-移动端架构分析.html | 同内容 HTML 版，含部署全景图、EMP8 配置清单、标准模块表、查漏补缺表 |
| 对接文档-架构图.png | 项目对接架构图 |
| M8跨端架构图.png | M8 跨端框架架构图 |

## 一句话结论

`com.epoint.workplatform.dzjy.ywtb`（电子交易·一网通办，广州公共资源交易测试环境）：**EMP8 是平台（壳+管理后台），EJS 是壳里的 H5 容器和 JSBridge，H5 是交易业务页面**——混合开发，原生壳管登录/推送/MQTT/扫码/CA/签名/音视频，业务页面全是 H5。

## 最有复用价值的结论

- **EJS 全链路已对上**：`ejs.callApi({mudule,name,data})`（参数名就是 mudule）→ ejsv4 JS 桥 → `EpointJSBridge://模块:回调id/方法` → Android window.prompt（>5000 字符分块）→ JSBridgeAuth → IBridgeImpl；静态注册（AppApplication.l() 里 JSBridge.registerApi）与动态注册（`ejs.config({jsApiList:[{模块名:'Android类全名'}]})`）两条路都讲清了。
- **8.0 交付全景**：APP(M8基座)→EMP8 运营平台→8.0 tpframe(中心)/tpbidder(会员)（移动端合并到 PC，接口 jar 放 PC 工程 lib，个性化方式与 PC 一致）；7.x 走 EpointMobileService。
- **两种页面模式**：FMUI+Action（待办审批页专用，PC 页转换复用 Action）vs H5+Rest（M8 框架 + V7 规范接口 `{"params":{}}`→`{"status","custom"}`）。
- **业务前缀速查**：BJM 不见面开标 / BID 开标 / BZT 标证通 CA / BYT·Jy 登录设置 / ZTB·JJ·TB 招投标竞价投标。
- **菜单配置链路**（源码核实）：EMP8 后台建应用→挂 Tab/门户/卡片→角色授权；登录拉 tablist/getportal→ApplicationBean{h5url,android,minih5}；菜单不出现先查角色授权与 tab_list 缓存。
- **个性化核心原则**：App 数据和 PC 一致（对齐 SQL/筛选/按钮），PC 先完善再做移动端。

## 后续可跟进

- H5 页面开发细节看 [M8 移动框架离线文档](../../技术笔记/010-M8移动框架离线文档/index.md)；EJS API 源码级实现看 [020-ejsv4框架包源码](../020-ejsv4框架包源码/index.md)。
- 需要重跑反编译：`jadx -d <输出目录> cs0822.apk`（需 JDK 17）。

返回[移动开发索引](../index.md)。
