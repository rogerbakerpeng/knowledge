---
name: m8-mobile-cross-platform
description: 指导 M8.3 和 M8.4 移动前端跨端项目的开发、修改、迁移与审查。支持 M8.3 的 Vue 2、JavaScript、Vuex、webpack、router.js/store.js，以及 M8.4 的 Vue 3、JavaScript/TypeScript、Pinia、Vite、router.ts/store.ts；覆盖 EM Components、Util、EJS、H5、新点小程序、微信小程序和支付宝小程序。用户提到 M8、M8.3、M8.4、EM 组件、EJS、epoint-mrc、移动跨端页面、多端构建或 8.3 升级 8.4 时使用。
compatibility: 适用于 M8.3/M8.4 业务工程；通常需要公司内网 npm 仓库、对应 Node/包管理器版本和目标平台开发工具。
metadata:
  framework-versions: "8.3, 8.4"
  stack: "Vue 2/3, JavaScript/TypeScript, Vuex/Pinia, uni-app"
---

# M8 移动跨端开发

使用本 skill 在真实业务工程中完成开发。第一步必须识别版本；没有识别版本前，不得选择 Vue API、状态管理、文件扩展名、构建配置或运行命令。

## 1. 识别项目版本

读取 [版本识别](references/version-detection.md)，检查 `package.json`、锁文件、构建配置和模块文件。采用以下优先级：

1. 用户明确指定且与工程证据一致。
2. `package.json` 中 Vue、Vuex/Pinia、uni-app 构建插件的主版本。
3. `vite.config.*`/`vue.config.js`/`build/` 与 `router.*`/`store.*` 等源码特征。
4. 相邻业务模块的实际写法。

证据冲突时视为迁移中或混合工程，先向用户说明冲突，按本次修改所在模块的真实技术栈工作，不做隐式全项目迁移。

## 2. 加载正确资料

| 场景 | 必读文件 |
|---|---|
| 任何 M8 开发任务 | [版本识别](references/version-detection.md) |
| M8.3 页面、路由、Vuex、生命周期 | [M8.3 开发](references/m83-development.md) |
| M8.4 页面、路由、Pinia、生命周期 | [M8.4 开发](references/m84-development.md) |
| 组件、请求、上传、导航、原生能力、端差异 | [跨端能力](references/cross-platform-capabilities.md) |
| 环境、配置、调试、构建、发布前检查 | [构建与验证](references/build-and-verification.md) |
| 查询 EM、Util 或 EJS 的精确 API | [MCP 查询](references/mcp-lookup.md) |
| 将 8.3 代码升级到 8.4 | [迁移指南](references/migration-m83-to-m84.md) |

只加载本次任务需要的版本资料。不要同时把 M8.3 与 M8.4 示例混入同一个实现。

## 3. 通用工作流

### 分析

1. 定位目标工程和模块，查看 `package.json`、`src/manifest.json`、页面、路由、Store、同类组件与请求封装。
2. 明确目标端：H5/EJS、新点小程序、微信小程序、支付宝小程序或多个端。
3. 将需求拆成页面结构、交互状态、服务请求、导航/返回、原生能力和端差异。
4. 优先复用目标工程已有模块与 M8 内置能力；确认缺失后才考虑新增依赖或抽象。
5. 对 EM、Util、EJS 的接口不确定时先查 MCP；不可用时查锁定依赖的类型/源码和相邻用例，不凭名称猜 API。

### 实现

1. 严格使用识别到的版本范式：M8.3 使用 Vue 2 Options API + JavaScript + Vuex；M8.4 沿用模块现有的 Vue 3 Options/Composition API 与 JS/TS，新增模块优先 `<script setup lang="ts">` + Pinia。
2. 页面根节点使用 `view` 或项目既有 `div`，不要以自定义组件作为第一层节点。
3. 基础结构优先使用 `view`、`text`、`image` 等跨端标签和 flex 布局。
4. 新页面同时维护对应版本的 `router.js` 或 `router.ts`；路径与页面文件匹配且不带 `.vue`。
5. 页面跳转使用项目封装或 EJS 页面 API，不直接调用 `vue-router`。
6. 页面生命周期与 Vue 组件生命周期分开处理；版本间不得混用销毁钩子。
7. 网络和上传沿用项目服务层或 `Util.ajax`/`Util.upload`，保留鉴权、代理、错误处理和取消能力。
8. 平台特有逻辑使用现有 adapter 或 uni-app 条件编译隔离，共享业务逻辑保持无平台依赖。

### 验证

1. 从目标工程 `package.json` 选择真实的 lint、类型检查、测试与构建脚本，不假设命令存在。
2. 构建本次涉及的每个目标端；H5 通过不代表小程序通过。
3. 检查框架生成的 `pages.json` 路由结果，但不手工修改其 `pages`/`subPackages`。
4. 验证加载、空、错误、取消、权限拒绝、重复提交、返回刷新与原生控件层级。
5. 汇报实际验证的版本、命令和平台；未运行的真机/平台检查明确标注。

## 4. 强制约束

- 不在 M8.3 中引入 Vue 3 Composition API、Pinia、`router.ts`/`store.ts` 或 Vite 配置。
- 不在 M8.4 新代码中照搬 Vue 2 的 `this`、Vuex、`beforeDestroy`/`destroyed`、`value`/`input` 自定义双向绑定约定。
- 不直接编辑自动生成的路由列表；通过模块 `router.js`/`router.ts` 维护。
- 不直接使用 `vue-router` 进行业务页面跳转；`ejs.page.open({ useRouter: true })` 只是框架内部选项。
- 不在未隔离端差异时使用 `window`、`document`、`localStorage`、cookie、浏览器文件对象或平台专属全局 API。
- 不假定 EM 组件导入方式、全局 `Util`/`Config`/`ejs` 类型或脚本名称；以目标工程配置为准。
- 不把 MCP 最新结果直接用于旧版工程；必须与目标工程锁定包版本核对。
- 不用普通 WebView 元素覆盖小程序原生组件；需要时评估同层渲染或 `cover-view`/`cover-image`。

## 5. 事实优先级

目标工程配置与锁文件 > 目标依赖类型/源码 > 同版本 `m8mpdoc` 文档 > MCP 动态结果 > 本 skill 示例。文档或示例冲突时保留证据并采用目标工程可验证的行为。
