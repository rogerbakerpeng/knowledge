# M8.4 开发

仅在已识别为 M8.4 后使用本文件。M8.4 基线是 Vue 3 + Vite + Pinia，支持 JavaScript 和 TypeScript；新增模块推荐 TypeScript，但修改既有模块时应沿用其 JS/TS 与 Options/Composition API 风格。

## 技术基线

| 类别 | M8.4 基线 |
|---|---|
| 核心框架 | Vue 3 |
| 状态管理 | Pinia |
| 跨端引擎 | uniapp-next / uni-app，版本以工程为准 |
| TypeScript | 支持，具体版本以工程为准 |
| UI | `@epoint-mrc/em-components`，版本以工程为准 |
| 工具 | `@epoint-mrc/em-utils`，通常暴露 `Util` |
| JSBridge | `@epoint-mrc/ejsv4`，通常暴露 `ejs` |
| 包管理 | pnpm 10 推荐 |
| Node.js | 22.x LTS 推荐 |

`m8mpdoc` 明确了 Vue 3、TypeScript、Vite、Pinia 与 Node 22 基线，但未保证所有存量工程依赖完全一致。实际开发必须以目标工程 `package.json`、锁文件、`.nvmrc`/engines 和已有代码为准。

## 常见工程结构

```text
src/
├── pages/
│   └── <module>/
│       ├── <page>.vue
│       ├── router.ts
│       └── store.ts
├── modules/
├── boot/
├── config/
├── manifest.json
└── pages.json              # 框架生成，不手工编辑
vite.config.ts
tsconfig.json
package.json
```

先读取真实工程结构。部分工程会把业务模块放在 `src/modules/`，或者在请求、导航、存储之上再封装一层。

## 页面模板（新增模块推荐）

```vue
<template>
    <view class="page">
        <view v-if="loading" class="page__state">加载中</view>
        <view v-else-if="errorMessage" class="page__state">
            <text>{{ errorMessage }}</text>
            <em-button type="primary" @click="loadData">重试</em-button>
        </view>
        <view v-else class="page__content">
            <text>{{ title }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

const title = ref('');
const loading = ref(false);
const errorMessage = ref('');

async function loadData() {
    // 按目标工程的请求封装实现，并处理成功、失败和最终状态。
}

onLoad((options) => {
    title.value = typeof options?.title === 'string' ? options.title : '';
    void loadData();
});

onShow(() => {
    // 仅在页面每次显示都需要同步时处理。
});
</script>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
    min-height: 100%;
}

.page__state {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
```

模板是 TypeScript 推荐结构，不代表 M8.4 只能使用 TypeScript，也不代表 `em-button` 的导入策略。检查相邻页面、easycom 和 boot 注册后再决定写法。

## 路由

模块的 `router.ts` 只定义页面路径和页面样式，不导入 Vue 组件。框架构建时扫描并合并到 `src/pages.json`。若既有 M8.4 模块仍为 `router.js`，先检查构建扫描规则，不要仅为统一扩展名改名。

普通模块：

```ts
const routes = [
    {
        path: 'pages/order/detail',
        style: {
            navigationBarTitleText: '订单详情',
            navigationBarTextStyle: 'black',
        },
    },
];

export default routes;
```

需要分包或首页选项时：

```ts
const routes = [
    {
        path: 'pages/order/list',
        style: {
            navigationBarTitleText: '订单',
        },
    },
];

const options = {
    autoSubPackages: true,
    isFirstModule: false,
};

export default { routes, options };
```

约束：

- `path` 与 `src/<path>.vue` 对应，不写扩展名。
- 一个应用最多只有一个首页模块。
- `autoSubPackages: true` 时 `isFirstModule` 无效。
- `maxWidth` 等样式字段可能只对 H5 生效，设置前确认目标端。
- history 模式同时涉及 `manifest.json`、Vite `base` 和服务端回退配置，不能只改其中一处。

## 页面导航与返回

不要直接调用 `vue-router`：

```ts
ejs.page.open({
    pageUrl: './detail',
    data: { id: '123' },
    useRouter: true,
    success(result) {
        // 按需处理。
    },
    error(error) {
        // 给出可恢复反馈或记录错误。
    },
});
```

页面通常带 keep-alive。从下级页面返回时，前页会再次触发 `onShow`。需要返回后刷新时，可通过模块 Store 保存变更标记或结果，并在 `onShow` 消费；避免每次显示都无条件重复请求。

## 生命周期选择

| 场景 | API | 来源 |
|---|---|---|
| 首次读取路由参数 | `onLoad` | `@dcloudio/uni-app` |
| 页面每次显示/返回刷新 | `onShow` | `@dcloudio/uni-app` |
| 首次渲染完成 | `onReady` | `@dcloudio/uni-app` |
| 页面进入后台 | `onHide` | `@dcloudio/uni-app` |
| 页面卸载 | `onUnload` | `@dcloudio/uni-app` |
| 组件挂载与清理 | `onMounted`、`onUnmounted` | `vue` |

页面生命周期和组件生命周期不可混用来源。定时器、订阅、监听器和未完成请求应在合适的隐藏/卸载钩子中清理。

## Pinia 状态边界

```ts
import { defineStore } from 'pinia';

interface OrderState {
    currentId: string;
    shouldRefresh: boolean;
}

export const useOrderStore = defineStore('order', {
    state: (): OrderState => ({
        currentId: '',
        shouldRefresh: false,
    }),
    actions: {
        markChanged(id: string) {
            this.currentId = id;
            this.shouldRefresh = true;
        },
        consumeRefresh() {
            this.shouldRefresh = false;
        },
    },
});
```

- Store 工厂名使用 `useXxxStore`，ID 全应用唯一。
- 单页临时状态不进入 Store。
- 不直接解构 Store 的响应式 state；如确需解构，使用目标工程已有的 `storeToRefs` 模式。
- 跨模块共享时从单一源导出同一个 Store，不复制相同 ID 的定义。
- 持久化前检查目标工程已安装的插件版本和存储适配器。`localStorage` 不是通用跨端方案；优先沿用项目对 uni storage/EJS storage 的封装。

## M8.4 特有注意

- 自定义组件默认 `v-model` prop/event 是 `modelValue`/`update:modelValue`；直接使用 `v-model` 通常无需修改。
- Vue 3 移除了 `.native` 修饰符；平台小程序需要原生点击语义时，先核对组件事件，必要时使用 `tap` 或文档建议的 `data-eventsync="true"`。
- Vite 以 ESM 为基础。新代码使用 `import`/`export`，不要新增 `require`/`module.exports`。
- `new URL(..., import.meta.url)` 的静态资源方式在框架文档中标注仅 H5 可用，不可作为默认跨端方案。
- 页面实例 `$mp` 在迁移后对应 `$scope`。
- M8.4 的 history 模式除了 `manifest.json`，还必须同步 Vite `base` 和服务端回退。
