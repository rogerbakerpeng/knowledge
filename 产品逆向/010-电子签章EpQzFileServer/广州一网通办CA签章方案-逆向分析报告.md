# 广州一网通办 CA 及签章方案 — 逆向分析报告

> 分析对象：`待蒸馏/` 目录下的 `casharedemo-签章页面.zip`（接入 Demo 源码）与 `EpQzFileServer/app.jar`（签章引擎，已反编译）。
> 用途：给研发、交付同事做方案理解、部署与安全整改参考。
> 分析方式：源码直读 + jar 反编译（临时安装 JDK 17 + CFR；Allatori 字符串加密已用程序自带解密函数全部还原）。本报告中「问题与风险」为代码审阅结论，未经实际攻击验证。

---

## 1. 这套东西是什么

新点（Epoint）的一套电子签章方案，分两层：

| 组件 | 角色 | 技术栈 |
|---|---|---|
| **EpQzFileServer**（app.jar） | 签章引擎：PDF/OFD 预览、签章、验章、关键字定位、云签、文件解密 | Spring Boot 1.5.17、JDK 8；内置 EpSignature / iText / OFD SDK；靠 `EpSignature.lic` 授权（有过期时间） |
| **casharedemo**（zip） | 广州一网通办接入 Demo 与中间层，对接 EpQzFileServer 和「全国 CA 互认共享平台」 | Spring Boot 2.3.12、JDK 8；前端 Vue + Element UI |

三个签章引擎依赖库（`EpSignature-1.3.2`、`EpSignature-Ext`、`EpOFDService`）**没有混淆**，源码可直接阅读。

反编译产物已保存在：`待蒸馏/EpQzFileServer-反编译/`（`app-src` 主程序、`lib-src` 引擎、`allatori-解密字符串.tsv`）。

---

## 2. 部署拓扑与接入约定（最关键）

### 2.1 EpQzFileServer 的前端接入

- 预览/签章页面入口：`EpPdfShow.html?t=<token>&p=<加密路径>&high=&width=`
- **`t`（token）**：格式为 `appKey@HmacSHA1(P2, appSecret)@P2`，其中 `P2` 是「当前时间戳 + 5 分钟」的 Base64。**token 5 分钟后失效**（`TokenUtil`）。
- **`p`（路径）**：文件相对路径（如 `upload/{workspace}/1.pdf`）经 **SM4-ECB** 加密的结果。
- **关键**：token 的 HMAC 密钥与路径的 SM4 密钥，**都是同一个 `appsecret`**。

### 2.2 同域部署要求

签章服务器拿到 `p` 后，会**回到调用方的地址去取文件**（`doAction` 分支里拼 `serverurl + path`）。因此：

- **EpQzFileServer 与业务系统必须部署在同一域名下**。
- Demo 里的 `/epcaqzdemo/epsignature/**` 反向代理只是演示环境用来绕开跨域的，生产不应依赖。
- `epqz.appsecret` / `sm4-key` 必须与签章服务端的 `epoint.appsecret` 一致，否则 token 校验与路径解密都会失败。

### 2.3 覆盖策略 `isCoverSrc`

- `true`：直接在原文件上追加签章（覆盖原文件）。
- `false`：另存为 `_signed.pdf`。

> ⚠️ casharedemo 的保存步骤固定回传工作区里的 `1.pdf`。只有在 EpQzFileServer 配置 `isCoverSrc=true` 时，这个文件才是签过章的；配成 `false` 会把**未签章的原文件**当成结果回传。

---

## 3. 关键机制

### 3.1 服务端云签章 `/common/cloudsealsign`

由 `PdfSignatureService.cloudSealSign` 调用 `CloudSignService.cloudSignInfo`：

1. 校验 token → 用 SM4（密钥 = `appsecret`）解出 `pdfpath`。
2. 读取 PDF，计算 **SM3 摘要**。
3. 调云签平台 `/yqc/seal/getseseal`，取印章图片与证书。
4. 调云签平台 `/yqc/seal/sign`，让平台对摘要签名。
5. `EpSignatureApi.pdfSignInfo` 按**关键字**定位盖章位置（或按坐标 `pdfSignInfoByPos`），`WXMerge` 把签章写进 PDF。
6. 写回文件（`isCoverSrc` 决定覆盖或 `_signed.pdf`）。

- `keyword_index`：挑第几处关键字匹配，**负数表示从后往前数**。

### 3.2 casharedemo 的云签入口 `/epcaqzdemo/cloudseal`

请求体：`f`(文件URL)、`s`(保存URL)、`r`(重定向URL)、`cloud`(Base64 JSON)、`modetype=cloudqz`、`keyword`(逗号分隔)。

`cloud` 解码后：`organization / user_id / userName / cardNumber / serversignext{sealName, sealType}`。

流程：下载外部文件 → `upload/{SM3哈希}/1.pdf` → 本地生成 token 与加密路径 → 按关键字逐个调 `cloudsealsign` → 把 `1.pdf` 以 multipart 回传到 `s`。

> 缓存模式开启时，工作区目录名 = SM3(文件URL + 当天日期)，同一文件当天不重复下载。

### 3.3 CA 互认共享平台（移动 CA 扫码）

- 单一入口：`POST {base}/CAShare/Components`，用请求头 `ServiceCode` / `FeatureCode` 区分功能。
- **签名**：7 个字段（ServiceCode、FeatureCode、Version、Timestamp、Nonce、Authorization、businessData）按 TreeMap 排序拼成 `k=v,k=v`，加盐（时间戳前 3 位 + nonce 前 3 位），再用 **HmacSM3** 计算。
- 功能分 4 组，每组都是「生成二维码 → 轮询扫码状态 → 取结果」：
  - `sharedLoginRegistration`（扫码登录）
  - `messageSignature`（签名）
  - `messageEncrypt`（加密）
  - `messageDecrypt`（解密）
- `getEncryptCertInfo` 不调用远端，在本地做数字信封：算法码 `00` 走 SM2，其他走 RSA。

### 3.4 另一条云签路线 `/cloudsign/v1`

走 `huaweiurl` 下 `/rest/epqzservice/v2|v3/...`：查询云证书 → 申请证书 → 获取印章 → 对数据签名。

---

## 4. EpQzFileServer 接口清单（从反编译结果整理）

| 分组 | 路径 | 说明 |
|---|---|---|
| `/common/*` | cloudsealsign、digitalsign、delsign、pdfverify、pdfcontentverify、getkeywordsignatureinfo、getsigninfobypos、getpdfdigest、getsealandcert、convert、pdfmerge | 签章 / 验章 / 合并 核心接口 |
| `/mcertpdfservice/*` | init、decryptpath、getPdfInfo、getSealMetadata、getCurrentSignInfo | 介质 CA 相关 |
| `/eppdfshowmobileservice/*` | init、getseseal、createqr、mergepdf、queryqrresult | 标证通移动扫码签 |
| `/cloudsign/v1/*` | uploadfile、downloadfile、signfile | 另一条云签路线 |
| `/filedecrypt/*` | decrypt、queryresult | 投标文件解密（标证通） |
| `/testpdfservice/doAction`、`/demoservice/*` | — | 测试 / Demo 控制器 |

---

## 5. 问题与风险（按严重程度）

### 🔴 高危

1. **密钥可在浏览器直接获取**：`GET /ca-share-config` 明文返回 `clientSecret`、`signatureSecret`。拿到即可伪造对 CA 共享平台的签名请求。
2. **密钥硬编码且已泄露**：CA 平台 clientSecret/signatureSecret、epqz appsecret、多套项目 appkey/secret、pfx 密码 `000000`，均明文写在 yml/properties 并打进 jar/zip。jar 内还带有第三方公司的 `.pfx` 证书文件。SM4 密钥直接复用 appsecret。
3. **token 与文件路径可伪造**：token 的 HMAC 密钥与路径 SM4 密钥同为 `appsecret`，而该值明文在 jar 中。拿到 jar 即可自造有效 token 与路径。
4. **SSRF**：`download-external-file`、`cloudseal` 的 `f`/`s`、`upload-signed-file` 的 `targetUrl` 会请求任意 URL，且关闭了 SSL 证书校验；接口无鉴权。
5. **路径穿越**：走 SM4 加密路径的接口（`init`、`cloudsealsign`、`doAction` 及整个 `/demoservice`）把解密路径直接拼到 `filepath` 后，未校验 `../`。仅 `pdfmerge`、`delsign` 等补了 `FileValidator`。

### 🟠 中危

6. **鉴权缺失/形同虚设**：
   - `/testpdfservice/doAction`、`MCertPdfService` 内部回调：token 校验失败**只记日志、继续执行**。
   - `/demoservice/*` 与 `/common` 下多数接口**完全无 token 校验**。
   - `/getCurrentSignInfo` 把请求原样转发到 `wxdturl`。
7. **签章身份由调用方声明**：`organization`/`user_id` 直接取自请求参数；能访问 casharedemo `/cloudseal`（无鉴权）者，可指定任意单位印章盖章。实际能否盖上取决于云签平台是否做用户级授权——**需平台方确认**。
8. **任意删文件 / 信息泄露**：`DELETE /delete-all-pdf-files`、`/fs-diagnostic`（暴露工作目录与文件列表）、`/get-workspace-logs` 对外开放；CORS 设为 `*` 且允许携带凭证。
9. **并发串数据**：`CloudSealController.httpUrl` 是单例 Bean 成员变量，每请求改写；`EpSignatureApi` 配置、`CommonServerSealActions` 的 `CLOUD_URL`/`appsecret` 为静态字段。并发时 A 请求可能用到 B 请求的上下文，签错文件/发错地址。
10. **全局关闭证书校验**：`SSLUtils.ignoreSsl()` 改的是整个 JVM 默认 HostnameVerifier，影响进程内所有 HTTPS 连接。

### 🟡 低危 / 质量

11. **死代码**：`CloudSignService` 中 `StringUtil.isNotBlank("organization")` 判断字面量，恒为 true，「按姓名/身份证号签章」分支永远走不到。
12. **文档与代码不符**：接口文档称「部分签章失败」返回 `success:true`，代码实际返回 `success:false` + HTTP 500；且无论签章成败都会执行保存。
13. **组件过旧**：Spring Boot 1.5、Tomcat 8.5.34、fastjson 1.2.83 均已停止维护；jar 内同时存在 logback 与 log4j2 两套日志实现，并打入 `rebel.xml` 开发残留。

---

## 6. 需要立即处理

### ⏰ 授权即将到期

**`EpSignature.lic` 有效期：2025-06-17 ~ 2026-12-31。**

- 从代码看，到期瞬间仅由后台守护线程抛异常（`DefaultLicenseExpireStrategy.expire()` → `license已过期`），**正在运行的进程不会立即停止**；
- 但到期后**一旦重启，将因授权失败而无法签章**。
- **行动**：立即联系厂商续期。

### 上线前整改清单

- [ ] 删除 / 关闭 `/ca-share-config`、`/fs-diagnostic`、`/delete-all-pdf-files`。
- [ ] URL 参数（`f`/`s`/`targetUrl`/`fileUrl`）加域名白名单。
- [ ] 所有对外接口加统一鉴权；token 校验失败必须拦截而非仅记日志。
- [ ] 解密路径统一做 `../` 穿越校验（推广 `FileValidator`）。
- [ ] `CloudSealController.httpUrl` 改为方法内局部变量；审查静态字段并发安全。
- [ ] 不要全局 `ignoreSsl()`；仅对特定连接放行。
- [ ] 密钥移出代码库（配置中心/环境变量），并**更换已泄露的所有密钥**。
- [ ] 确认 `isCoverSrc=true`，保证回传文件为已签章版本。
- [ ] 升级 Spring Boot / Tomcat / fastjson；清理重复日志框架与 `rebel.xml`。

---

## 7. 可复用的知识资产

- **EpQzFileServer 接入协议**：token（appKey@HmacSHA1@时间戳Base64，5 分钟）+ SM4-ECB 路径加密（密钥 = appsecret），同域部署。
- **CA 互认平台签名规则**：TreeMap 排序 + 加盐 + HmacSM3，`ServiceCode`/`FeatureCode` 对照表。
- **服务端云签流程**：下载 → SM3 摘要 → 取印章/证书 → 平台签名 → 关键字定位盖章 → 回传。

> 建议归档到知识库（与 `数字见证knowledge`、`数据交换knowledge` 并列），作为后续项目接入签章的标准做法。
