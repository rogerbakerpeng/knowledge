# M8.3 开发

仅在已识别为 M8.3 后使用本文件。M8.3 基线是 webpack + Vue 2 + JavaScript + Vuex，业务模块通常位于 `src/pages/<module>/`。

## 常见结构

```text
src/
├── common/
├── components/custom_components/
├── pages/<module>/
│   ├── <page>.vue
│   ├── router.js
│   ├── store.js
│   └── mock.js
├── shared/
│   ├── boot.js
│   └── config.js
├── static/
├── main.js
├── App.vue
├── manifest.json
└── pages.json
build/                       # webpack/devServer 配置
```

`static` 不经 webpack 编译：不要放需要转译的 ES6 JS、CSS 或 SCSS；公共源码放 `common`，业务组件放 `components/custom_components`。

## 页面范式

```vue
<template>
    <view class="page">
        <view v-if="loading">加载中</view>
        <view v-else-if="errorMessage">
            <text>{{ errorMessage }}</text>
            <em-button type="primary" @click="loadData">重试</em-button>
        </view>
        <view v-else>
            <text>{{ title }}</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            loading: false,
            errorMessage: ''
        };
    },
    onLoad(options) {
        this.title = typeof options.title === 'string' ? options.title : '';
        this.loadData();
    },
    onShow() {
        // 仅在每次显示都需要同步时处理。
    },
    beforeDestroy() {
        // 清理组件资源。
    },
    methods: {
        loadData() {
            // 沿用项目的 Util/服务封装。
        }
    }
};
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
}
</style>
```

规则：

- 使用 Vue 2 Options API 和普通 `<script>`，不要加入 `<script setup>`、`ref()` 或 Composition API。
- `data` 必须是返回新对象的函数，防止页面再次打开时复用旧状态。
- 模板保持单一根节点；优先 `view`/`text`，不要依赖 `v-html`，平台小程序不支持。
- 页面生命周期直接写在组件选项中；组件销毁使用 `beforeDestroy`/`destroyed`。
- 页面组件可使用 `onLoad`/`onShow`，普通子组件不能使用页面生命周期。

## router.js

```js
const routes = [
    {
        path: 'pages/order/detail',
        style: {
            navigationBarTitleText: '订单详情'
        }
    }
];

const options = {
    autoSubPackages: true,
    isFirstModule: false
};

export default { routes, options };
```

- 不导入页面组件，`path` 与 `src/<path>.vue` 对应且不写扩展名。
- 8.3.1 以后可使用 `autoSubPackages`/`isFirstModule`；使用前核对锁定框架版本。
- `autoSubPackages: true` 时 `isFirstModule` 无效；全应用只允许一个首页模块。
- 页面跳转使用 EJS：`ejs.page.open`、`replace`、`close` 等，按目标 EJS 版本查精确 API。
- 前页通常被缓存，返回后通过 `onShow` 读取 Vuex 中的变更标记，不要依赖重新创建页面。

## Vuex store.js

```js
export default {
    moduleName: 'order',
    namespaced: true,
    state: {
        currentId: '',
        shouldRefresh: false
    },
    mutations: {
        markChanged(state, id) {
            state.currentId = id;
            state.shouldRefresh = true;
        },
        consumeRefresh(state) {
            state.shouldRefresh = false;
        }
    }
};
```

```js
this.$store.commit('order/markChanged', id);
const shouldRefresh = this.$store.state.order.shouldRefresh;
```

- `moduleName` 与命名空间保持稳定并在应用内避免冲突。
- 通过 mutation 修改 state，不把 Pinia action 写法带入 M8.3。
- 单页临时状态放 `data`，跨页面返回结果或真正共享状态才进入 Vuex。

## M8.3 特有注意

- 自定义组件默认 `v-model` 使用 `value` prop 和 `input` 事件。
- webpack ProvidePlugin 可能注入 Toast、Dialog、Notify 等函数，不要把该机制改写成 M8.4 ref/`defineExpose` 方案。
- M8.3 history 模式通常在 `manifest.json` 配置 H5 router `base`/`mode` 和 `publicPath`，同时要求服务端回退。
- H5 是 SPA，平台小程序是多页模型；不要把 Vue Router SPA 习惯带到小程序页面栈。
- M8.3 Node 基线是 16；不要用 M8.4 的 Node 22/pnpm 10 作为默认环境。
