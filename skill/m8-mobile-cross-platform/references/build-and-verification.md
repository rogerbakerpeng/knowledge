# 构建与验证

## 环境

环境必须按版本选择：

| 版本 | Node 基线 | 包管理器基线 | 构建工具 |
|---|---|---|---|
| M8.3 | Node 16.16；文档要求 v16 | npm；pnpm 7.13.2 可选 | webpack / Vue CLI |
| M8.4 | Node 22.x LTS 推荐 | pnpm 10 推荐，工程也可能使用 npm | Vite |

框架私有依赖通常来自工程 `.npmrc` 指定的公司 npm 仓库，安装依赖可能需要公司内网。不得用 M8.4 的 Node/pnpm 全局替换 M8.3 锁定环境。

检查顺序：

1. 读取 `package.json` 的 `engines`、`packageManager` 和 `scripts`。
2. 检查 `pnpm-lock.yaml`、`.npmrc`、`.nvmrc` 或版本管理文件。
3. 运行 `node --version` 和目标工程所选包管理器的版本命令，只在不匹配时调整环境。
4. 使用锁定包管理器安装，不混用 npm/yarn/pnpm 生成额外锁文件。

## 常见脚本

`m8mpdoc` 和不同发布模板中的脚本并不完全一致，执行前必须读取目标 `package.json`。常见命令如下：

| 目标 | M8.3 常见命令 | M8.4 常见命令 |
|---|---|---|
| H5 开发 | `npm run dev:h5` | `pnpm run dev:h5` 或工程定义 |
| H5 构建 | `npm run build` | `pnpm run build:h5`、`pnpm run build` 或工程定义 |
| 微信开发/构建 | `npm run dev:mp-weixin` / `npm run build:mp-weixin` | 对应 `pnpm run ...` 或工程定义 |
| 支付宝开发/构建 | `npm run dev:mp-alipay` / `npm run build:mp-alipay` | 对应 `pnpm run ...` 或工程定义 |
| 新点小程序 | 8.3.2+ 使用带 `moduleType=mp-epoint` 等参数的构建命令 | 脚本与 moduleType 以工程和发布插件为准 |

M8.3 文档中的新点小程序构建示例：

```bash
npm run build -- --moduleType=mp-epoint --moduleName=<module> --buildType=build
```

常见输出位于 `dist/dev/<platform>/` 或 `dist/build/<platform>/`，实际路径以构建日志和目标版本构建配置为准。

## 配置职责

### `src/manifest.json`

负责应用和各平台配置，例如 H5 路由、微信 `appid`、支付宝 `appId`、权限和图标。不得提交真实密钥；App ID 是否应入库遵循目标工程规则。

### 模块 `router.js` / `router.ts`

负责页面路径和页面样式，构建时汇总生成 `src/pages.json`。M8.3 通常使用 `router.js`，M8.4 通常使用 `router.ts`；新增、删除或移动页面必须同步修改对应版本的路由文件。

### `src/pages.json`

框架生成文件。可用于检查生成结果，不手工维护业务路由。

### M8.3 webpack 配置

常见配置位于 `build/base.config.js`、`build/dev.server.js`、`build/index.js` 或 `vue.config.js`。沿用项目的 webpack chain、devServer 和 `transpileDependencies`，不要引入 Vite 配置。

### M8.4 `vite.config.ts`

负责 Vite 插件、alias、dev server 和 H5 base 等。不要用知识库的最小示例覆盖框架已有插件或自定义构建逻辑。

### H5 history 模式

M8.3 通常需要 `manifest.json` 中 H5 router 的 `base`/`mode` 与 `publicPath`，并配置服务端回退。

M8.4 至少需要三处一致：

1. `src/manifest.json` 中 H5 router 的 `base` 和 `mode: "history"`。
2. `vite.config.ts` 中部署资源 `base`。
3. 服务端将未匹配的前端路由回退到构建后的 `index.html`。

只修改前端路由模式会导致刷新 404 或静态资源路径错误。

### 环境变量

Vite 客户端变量通常以 `VITE_` 开头，通过 `import.meta.env` 使用。不要把 secret 放入客户端环境变量；它们会进入构建产物。

## 实现前检查

- 目标平台是否明确，是否涉及 EJS 容器。
- 新页面路径、模块归属、是否分包、是否首页已确定。
- 组件和 API 在锁定版本中存在，端支持已确认。
- 请求鉴权、错误处理、取消和防重复沿用项目封装。
- 平台权限、隐私声明和降级流程已考虑。
- 原生控件层级和滚动限制不会破坏交互。

## 静态验证

优先运行目标工程已有脚本，例如：

```bash
<package-manager> run format
<package-manager> run lint
<package-manager> run typecheck
<package-manager> run test
```

这些只是常见名称。缺少脚本时，从 `package.json` 选择真实命令；不要为了凑验证结果临时添加工具链。检查重点：

- Vue 模板与组件解析无错误；M8.4 TypeScript 项目还需类型检查。
- 无未隔离的 DOM/浏览器/单平台 API。
- 路由路径与文件路径一致，Store ID 无冲突。
- 异步流程会在成功、失败、取消后恢复 loading/disabled 状态。
- 生命周期内注册的资源在适当时机清理。

## 多端构建

本次改动涉及哪些端，就从 `package.json` 选择对应构建脚本。以下仅为 M8.4 常见示意：

```bash
pnpm run build:h5
pnpm run build:mp-weixin
pnpm run build:mp-alipay
```

构建后检查：

- 生成路由包含新增页面，分包归属正确。
- 无组件无法解析、平台 API 不存在、条件编译不闭合等警告。
- 包体积、分包大小和静态资源路径未异常增长。
- H5 base/history 配置与部署地址匹配。
- 小程序产物能被对应平台开发工具打开。

## 运行验证矩阵

| 领域 | 必查行为 |
|---|---|
| 页面 | 首次进入、返回恢复、重复进入、空参数 |
| 数据 | 加载、空、错误、重试、并发与取消 |
| 表单 | 校验、键盘、禁用、重复提交、取消 |
| 导航 | 参数传递、返回、keep-alive 下的刷新 |
| 上传/媒体 | 权限拒绝、用户取消、大小类型、失败重试 |
| 原生控件 | 层级、滚动、遮罩、横竖屏、键盘顶起 |
| 样式 | 小屏、安全区、长文本、不同字体缩放 |
| 平台 | H5 与每个目标小程序/容器的实际表现 |

无法运行真机或某平台工具时，明确写出“仅构建验证”或“未验证”，不要用 H5 结果替代。
