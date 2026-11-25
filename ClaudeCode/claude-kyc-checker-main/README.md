# Claude KYC 检查器

这是一个本地运行的 Chrome 扩展（Manifest V3），用来在已登录的 [claude.ai](https://claude.ai) 标签页中查询当前账号各组织的 KYC 状态。

查询思路来自公开教程和官方页面接口：

1. `GET https://claude.ai/api/organizations` 获取组织列表（含 `uuid`、`name`，以及可能出现的 `capabilities` 等字段）。
2. `GET https://claude.ai/api/organizations/{uuid}/kyc_status` 读取该组织的 KYC 状态。

本扩展**不会**读取 `sessionKey` 或 Cookie，也**不会**把凭证粘贴到任何第三方网站。请求是在 claude.ai 页面内通过 `chrome.scripting.executeScript` 发起的 `fetch(..., { credentials: "include" })`，由浏览器自动带上当前页面的登录态。

## 安装

1. 下载并解压 `claude-kyc-checker.zip`，或直接使用本目录。
2. 打开 Chrome，访问 `chrome://extensions`。
3. 打开右上角的「开发者模式」。
4. 点击「加载已解压的扩展程序」，选择本文件夹（其中需包含 `manifest.json`）。

也可以在 `chrome://extensions` 页面把 zip 拖进去安装（视 Chrome 版本而定）。加载后，工具栏会出现「Claude KYC 检查器」图标。

## 使用方法

1. 先在 Chrome 中打开并登录 [https://claude.ai](https://claude.ai)。
2. 点击扩展图标。如果当前标签页不是 claude.ai，弹窗里会给出「打开 claude.ai」按钮。
3. 扩展会列出每个组织的名称、缩短后的 UUID、方案/能力（如 `claude_pro`、`claude_max`、`raven`，以接口返回为准）、KYC 状态、验证链接分类、`check_kind` 和时间戳。
4. 需要保存结果时，点击「复制结果」，会复制本次查询的 JSON。
5. 点击「刷新」可重新查询。请不要对真实账号做自动化反复探测以外的操作；本扩展本身只发起上述只读接口请求。

## 状态说明

接口返回的 `status` 字段常见含义如下：

| 状态 | 含义 |
| --- | --- |
| `not_required` | 升级无需 KYC，可直接升级 |
| `pending` | 需要做 KYC，或正在审核中 |
| `verified`（旧版接口曾用 `approved`） | KYC 已通过 |
| `denied` | KYC 被拒绝，无法升级 |

如果返回了 `vendor_inquiry_url`，扩展会按链接类型标注：

- **订阅 KYC（Persona）**：链接以 `https://inquiry.withpersona.com` 或 `*.withpersona.com` 开头。公开教程将其视为常规的订阅验证。
- **门户 KYC**：链接指向 `portal.anthropic.com`。公开教程称这类验证有封号风险，扩展会给出警告，并建议不要进行。
- 其他未知链接会标记为需谨慎。

时间戳会显示为 Asia/Shanghai（UTC+8）。

## 常见问题

- **提示「请先登录 claude.ai」**：当前标签页没有有效登录态，接口返回了 401 或 403。请先在 claude.ai 登录后再点刷新。
- **提示地区不可用**：接口返回内容像是地区限制，而不是普通的未登录。
- **提示非 JSON**：页面可能跳到了登录页、错误页或被拦截，没有返回接口 JSON。
- **没有组织**：登录成功但组织列表为空。

## 隐私说明

- 100% 本地运行，没有自己的服务器。
- 权限尽量少：`activeTab`、`scripting`，以及 `host_permissions` 仅限 `https://claude.ai/*`。
- 不会使用 `cookies` API，不会在扩展存储或源码中保存 sessionKey、Cookie 或其他凭证。
- 除 claude.ai 外，不会向其他网站发网请求。
- 「复制结果」只把本次接口返回的 JSON 写入你的剪贴板，不会上传。

## 开发与测试

在本目录执行：

```bash
node --check classify.js
node --check popup.js
node --check test-classify.js
node test-classify.js
```

分类逻辑的单元测试覆盖了示例 JSON（`not_required`）、`pending`、`denied`、`verified`/`approved`，以及 Persona / 门户验证链接。测试不会访问真实账号。
