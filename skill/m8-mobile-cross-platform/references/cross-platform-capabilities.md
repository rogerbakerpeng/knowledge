# 跨端能力

本文件适用于 M8.3/M8.4 的公共能力。使用前先识别版本；同名组件/API 的绑定协议、导入机制和新增参数可能不同。

## 能力选择顺序

| 需求 | 首选 | 说明 |
|---|---|---|
| 基础布局和文本图片 | uni-app 内置组件 | `view`、`text`、`image`，跨端基础最稳定 |
| 表单、弹层、列表、业务 UI | EM Components | 先查组件清单和精确 API |
| 网络、上传、数据处理 | 项目服务层或 `Util` | 保留框架鉴权、代理和错误处理 |
| 页面跳转、容器、设备、媒体、扫码 | 项目 Bridge 层或 EJS | 先确认容器与平台支持 |
| uni-app 已统一的页面能力 | uni-app API | 以目标工程版本文档为准 |
| 单平台特有能力 | 适配层/条件编译 | 隔离到小范围模块，提供降级行为 |

先复用相邻业务模块，再使用框架原语。不要绕过已有服务层、鉴权层或埋点封装。

## EM Components

组件覆盖基础、表单、布局、反馈、导航、数据展示和业务场景，常见组件包括：

- 基础：`em-button`、`em-cell`、`em-icon`、`em-image`、`em-loading`、`em-popup`、`em-empty`。
- 表单：`em-form`、`em-field`、`em-checkbox`、`em-radio`、`em-switch`、`em-picker`、`em-date-picker`、`em-uploader`。
- 反馈：`em-dialog`、`em-toast`、`em-notify`、`em-popover`。
- 导航：`em-header`、`em-tabs`、`em-tabbar`、`em-search`、`em-pagination`。
- 数据与业务：`em-list`、`em-collapse`、`em-steps`、`em-tree-select`、`em-map`、`em-select-person`。

使用规则：

1. 先搜索目标工程是否已有同类用法。
2. 再通过 MCP 查询组件详情，确认属性类型、`v-model` 参数名、事件载荷、插槽和平台支持。
3. 标准 M8 工程通常通过 easycom 直接使用 EM 标签；仍需检查组件是 easycom、boot/ProvidePlugin 全局注册还是需要显式导入。
4. 实现加载、空数据、错误、禁用、提交中和取消状态，不只实现理想路径。
5. 不根据 Vant 或同名第三方组件推断 EM API。

版本差异：

- M8.3 自定义组件默认 `v-model` 协议为 `value` + `input`。
- M8.4 默认协议为 `modelValue` + `update:modelValue`。
- 两版直接写 `v-model` 通常都能工作；手工单向绑定、监听更新事件或开发组件时必须使用对应协议。
- M8.3 的函数式 Toast/Dialog 等能力可能由 webpack `ProvidePlugin` 注入；M8.4 的全局组件 ref/暴露机制不同。以目标工程与组件文档为准。

## Util 网络请求

`Util` 在标准框架中通常全局可用，但类型声明和封装方式以目标工程为准。

```js
Util.ajax({
    url: Config.serverUrl + 'request.php?action=query',
    data: {
        params: JSON.stringify({ id: '123' }),
    },
    isAutoProxy: true,
    isAutoDealError: true,
    success(result) {
        // 按服务端协议校验状态后再消费数据。
    },
    error(error) {
        // 恢复 loading，并提供适当反馈。
    },
    complete() {
        // 收敛请求最终状态。
    },
});
```

静态知识中的常见选项有 `url`、`data`、`type`、`isAutoProxy`、`isAutoErrToast`、`isAutoDealError`、`dataPath`、`enableChunked`、`cancelKey` 和回调。`dataPath`、SSE、token lock、拦截器插件等都有最低版本，精确类型必须查目标版本。

注意：

- 不重复实现框架已有的 token 注入、错误处理和取消机制。
- 对可重复触发的搜索、切页或提交处理竞态、取消和防重复。
- `Util.ajax` 可能同时支持回调和 Promise；同一调用选择一种主要控制流，遵循现有项目风格。
- 多请求汇总可检查 `Util.ajaxAll`，但先确认失败语义是否满足业务需求。
- SSE/分块能力从 M8.3 后期版本加入，且文档只标明部分端支持；使用前动态查询锁定版本的支持矩阵。
- M8.4 新增的 `Util.ajax.create`、拦截器插件管理不能回填到不支持它们的 M8.3 项目。

## 文件上传

选择文件和上传是两个阶段。选择阶段使用已确认的平台/组件能力，上传阶段优先走 `Util.upload`：

```js
Util.upload({
    url: uploadUrl,
    filePath,
    name: 'file',
    formData: { bizType: 'attachment' },
    antiReplay: true,
    uploading(progress) {
        // 按目标版本的回调结构更新进度。
    },
    success(result) {
        // 校验服务端结果并保存附件标识。
    },
    error(error) {
        // 保留重试入口。
    },
});
```

验证文件数量、类型、大小、权限拒绝、用户取消、上传进度、失败重试和删除。H5 `File` 与小程序临时路径不同，业务层不要假定二者结构相同。

## EJS JSBridge

常见依赖为：

```js
import ejs from '@epoint-mrc/ejsv4';
```

两版工程都可能全局挂载 EJS；M8.3 业务更常直接使用全局 `ejs`，M8.4 可能显式导入。以相邻代码和类型检查为准，不要同时混用两套访问方式。

静态知识覆盖的领域包括页面导航、存储、native、device、UI、media、scan 等。API 名称和参数可能随 EJS 版本变化，调用前查询 MCP 或依赖类型。

```js
ejs.page.open({
    pageUrl: './detail',
    data: { id: '123' },
    useRouter: true,
    success() {},
    error(error) {
        // 处理容器调用失败。
    },
});
```

调用 Bridge 时：

- 确认当前是否运行在 EJS 容器，可沿用项目的 `Util.os.ejs` 或环境服务。
- 明确 H5 和各小程序的降级路径，不能让容器外调用静默失败。
- 设备位置、相机、相册和扫码先处理权限、拒绝、取消与隐私要求。
- 不在业务页面散落容器判断；重复逻辑应进入现有 adapter/service 层。
- 存储敏感信息时遵循项目安全策略，不因 EJS 提供 storage 就直接长期保存凭证。

## 平台与渲染限制

平台小程序中的 `map`、`video`、`camera`、部分 `canvas`、聚焦态 `input`/`textarea`、`live-player`、`live-pusher` 可能由原生控件渲染。具体支持范围以目标平台和版本为准。

原生控件常见限制：

- 层级可能高于 WebView 内容，普通 `z-index` 无法覆盖。
- 可能不能放入 `scroll-view`、`swiper`、`picker-view`、`movable-view`。
- CSS 动画、`position: fixed`、父级 `overflow: hidden` 裁剪可能无效。
- 需要覆盖时评估 `cover-view`/`cover-image`；它们不能覆盖原生导航栏、tabbar 或 `web-view` 等所有元素。

设计弹层、下拉菜单、引导遮罩和地图/视频同屏交互时，应在实现前处理上述限制。

## 浏览器 API 与条件编译

以下能力不能直接视为跨端：`window`、`document`、DOM 查询、`localStorage`、Blob/File 下载、浏览器 history、CSS 中部分高级特性以及平台小程序全局对象。

优先使用工程 adapter。确需分端时，沿用项目的 uni-app 条件编译风格：

```js
// #ifdef H5
// 仅 H5 实现。
// #endif

// #ifdef MP-WEIXIN
// 仅微信小程序实现。
// #endif
```

条件编译块保持最小，公共参数校验和业务逻辑放在块外。每个分支都必须有明确返回值或降级行为。
