# 电子签章 EpQzFileServer（产品逆向）

> **关键字：电子签章、CA签章、云签章、OFD、SM2/SM3/SM4、CA互认、标证通、一网通办、投标文件解密**
> 来源：`D:\git\待蒸馏`（2026-11-23 入库）。归档：新点 EpQzFileServer 签章引擎逆向分析全套材料。

## 这套材料是什么

| 文件 | 内容 |
|---|---|
| [广州一网通办CA签章方案-逆向分析报告.md](广州一网通办CA签章方案-逆向分析报告.md) | **先读这个**。完整逆向分析：部署拓扑、接入协议、云签流程、接口清单、安全风险与整改清单 |
| [新点CA签章方案图解.html](新点CA签章方案图解.html) | 方案图解（双击浏览器打开） |
| [源码/EpQzFileServer-反编译/](源码/EpQzFileServer-反编译/) | 反编译 Java 源码 373 个文件，Allatori 字符串加密已还原，可直接阅读检索 |

## 核心结论速记（详见报告）

- **两层架构**：`EpQzFileServer`（app.jar，Spring Boot 1.5.17，签章引擎：PDF/OFD 预览、签章、验章、关键字定位、云签、文件解密）+ `casharedemo`（广州一网通办接入 Demo，对接"全国 CA 互认共享平台"）。
- **接入协议**：页面入口 `EpPdfShow.html?t=<token>&p=<加密路径>`；token = `appKey@HmacSHA1(P2, appsecret)@P2`（P2=时间戳+5分钟 Base64，**5 分钟失效**）；p = 相对路径 SM4-ECB 加密，**SM4 密钥 = appsecret**。
- **同域部署是硬要求**：签章服务器会回调用方地址取文件（拼 `serverurl + path`），跨域反代只是 Demo 环境的做法。
- **isCoverSrc 陷阱**：`false` 时另存 `_signed.pdf`；casharedemo 固定回传 `1.pdf`，配 `false` 会把**未签章原文件**当结果回传——集成时必查。
- **云签流程**：token 校验 → SM4 解路径 → SM3 摘要 → 云签平台取印章/证书并签名 → `keyword_index` 关键字定位（**负数从后往前数**）→ 写回。
- **CA 互认平台签名**：7 字段 TreeMap 排序拼 `k=v`，加盐（时间戳前3位+nonce前3位）后 HmacSM3；入口 `POST {base}/CAShare/Components`，`ServiceCode`/`FeatureCode` 区分功能。

## ⏰ 时效提醒

**`EpSignature.lic` 有效期至 2026-12-31**。到期瞬间进程不死（仅后台线程抛异常），但**重启后无法签章**——涉及签章的项目上线前先确认授权状态。

## 源码导航（源码/EpQzFileServer-反编译/）

- `app-src/com/epoint/`：主程序——`epqz/cloudsign`（云签）、`epqz/filedecrypt`（投标文件解密/标证通）、`ca/controller`、`eppdfshow`、`ztb`、`configuration`、`jobs`
- `lib-src/EpSignature-1.3.2/`：签章核心（未混淆，带 summary.txt）——`api/EpSignatureApi`、`actions/impl/`（各 CA/云签厂商对接：国信云、华润、北京、上海、辽宁、广西云、长沙TSA…）、`asn1/`（SES 印章签名结构 v1/v4、GM 国密）、`utils/`（SignUtil、PdfValidator、PDFMergeUtil）
- `lib-src/EpSignature-Ext-1.0-SNAPSHOT/`：扩展——关键字/坐标锚点定位、多页签、骑缝章（`DocumentSealAnchorUtil`、`ToSignReq_*`）
- `lib-src/EpOFDService-1.0.0/`：OFD 版式签章服务

## 安全提醒（仓库公开前必读）

反编译源码中含产品内置的 `appsecret`、多套项目 key/secret 字面量（报告第 5 节已列）。本仓库若转公开需先评估脱敏；日常使用无碍。
