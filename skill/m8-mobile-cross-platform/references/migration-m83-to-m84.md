# M8.3 迁移到 M8.4

迁移是显式任务。普通功能修改不应顺带把整个模块升级到 M8.4。

## 基线变化

| M8.3 | M8.4 |
|---|---|
| webpack / Vue CLI | Vite |
| Vue 2 | Vue 3 |
| JavaScript | JavaScript/TypeScript，推荐 TS |
| Vuex `store.js` | Pinia `store.ts`（常见） |
| `router.js` | `router.ts`（常见） |
| Options API | Composition API 推荐，Options API 仍支持 |
| `beforeDestroy`/`destroyed` | `beforeUnmount`/`unmounted` |
| CommonJS 可存在 | 业务代码使用 ESM |
| 组件 `value`/`input` | `modelValue`/`update:modelValue` |
| 实例 `$mp` | `$scope` |
| Node 16 | Node 22 推荐 |

## 迁移顺序

1. 在独立分支确认 M8.4 模板、Node、包管理器和私有依赖可安装。
2. 迁移构建配置和入口，确保空业务壳可运行；不要直接把 webpack 配置复制到 Vite。
3. 迁移模块 `router.js`、`mock.js` 与 Store，先保证生成路由和基础导航正确。
4. 将 Vuex module 转为 Pinia，逐个替换 `this.$store.state`、`commit`、`dispatch` 和 map helpers。
5. 迁移页面。可先保留 Vue 3 Options API 降低变更量，再按需要转为 Composition API/TypeScript。
6. 调整自定义组件 `v-model`、移除 `.native`、替换销毁钩子和 `$mp`。
7. 清理 CommonJS：业务代码改为 `import`/`export`；第三方 UMD/CommonJS 依赖按 Vite `optimizeDeps`/`commonjsOptions` 处理。
8. 调整 CSS：避免 HTML 标签选择器；导出 SCSS 变量时按项目约定使用 `.module.scss`。
9. 对 H5 history 同步 `manifest.json`、Vite `base` 和服务端回退。
10. 分别构建并回归所有目标端，不以 H5 通过结束迁移。

## 代码转换要点

Vuex：

```js
this.$store.commit('order/setCurrent', id);
```

Pinia：

```ts
const orderStore = useOrderStore();
orderStore.setCurrent(id);
```

页面生命周期：

```js
export default {
    onLoad(options) {
        this.load(options.id);
    }
};
```

可以先迁移为 Vue 3 Options API，或在 Composition API 中改为：

```ts
import { onLoad } from '@dcloudio/uni-app';

onLoad((options) => {
    load(typeof options?.id === 'string' ? options.id : '');
});
```

## 风险检查

- 不要机械把所有 `.js` 改为 `.ts`；先补类型边界，再逐步收紧。
- `require` 静态资源改法要考虑多端；`new URL(..., import.meta.url)` 在框架迁移文档中仅标明 H5 可用。
- Vue 3 移除了 `.native`，平台小程序事件可能需要 `tap` 或 `data-eventsync="true"`。
- 支付宝小程序的作用域插槽、微信真机 minify、国际化消息函数等有版本化限制，按目标工程文档验证。
- 迁移后重新核对 EM、Util、EJS 版本，不假设旧参数和最新 MCP 文档一致。
- 每个模块记录“已迁移/兼容层/仍为旧版”的状态，避免混合工程被误判。
