# 版本识别

任何实现前先识别 M8 版本。不要只凭目录名、页面语法或用户口头简称判断。

## 决策表

| 证据 | M8.3 | M8.4 |
|---|---|---|
| Vue | 主版本 2 | 主版本 3 |
| 状态管理 | Vuex | Pinia |
| 构建 | webpack、Vue CLI、`@dcloudio/vue-cli-plugin-uni` | Vite、`@dcloudio/vite-plugin-uni`、uniapp-next |
| 配置 | `build/`、`vue.config.js` | `vite.config.ts`/`.js` |
| 业务语言 | JavaScript 基线 | JavaScript 或 TypeScript，新增代码推荐 TS |
| 页面 API | Options API | Options API 或 Composition API |
| 模块路由 | `router.js` | 通常 `router.ts`，既有模块可能保留 JS |
| 模块状态 | `store.js` + Vuex | 通常 `store.ts` + Pinia |
| 销毁钩子 | `beforeDestroy`、`destroyed` | `beforeUnmount`、`unmounted` |
| Node 基线 | 16.16 | 22.x LTS |
| pnpm 基线 | 7.13.2 可选，npm 常见 | 10 推荐 |

## 检查顺序

1. 读取 `package.json`：确认 `vue`、`vuex`/`pinia`、uni-app 插件、Vite/Vue CLI、scripts 和 engines。
2. 读取锁文件：确认实际解析版本，不能只信宽松 semver。
3. 检查构建配置：`vite.config.*` 强烈指向 M8.4；webpack `build/` 或 `vue.config.js` 强烈指向 M8.3。
4. 检查目标模块：`router.js`/`store.js` 与 Options API 指向 M8.3；`router.ts`/`store.ts`、Pinia、`script setup` 指向 M8.4。
5. 检查 `src/main.*` 和全局 boot/config 注册方式，识别工程是否处于迁移中。

## 判定规则

- `vue` 主版本是最高优先级证据。Vue 2 + webpack + Vuex 判为 M8.3；Vue 3 + Vite + Pinia 判为 M8.4。
- 单独出现 `.js` 不能判为 M8.3，因为 M8.4 支持 JavaScript。
- 单独出现 TypeScript 工具依赖不能判为 M8.4，应以 Vue/构建/状态管理组合判断。
- `@epoint-mrc/em-components`、`Util` 和 EJS 两版都使用，不能作为版本证据。
- `router.js` 在 M8.4 旧模块中可能保留；必须结合 Vue 与构建工具。
- 用户指定版本与工程不一致时，先指出证据。除非用户明确要求迁移，否则按工程实际版本开发。
- 同仓库存在两套应用时，对每个应用分别判断，不使用仓库级单一结论覆盖子项目。

## 版本上下文记录

开始改动前形成一行内部结论，例如：

```text
版本=M8.3；证据=vue@2 + vuex + @dcloudio/vue-cli-plugin-uni + build/webpack；目标端=H5/微信。
```

或：

```text
版本=M8.4；证据=vue@3 + pinia + vite.config.ts + router.ts；语言=现有模块 JS；目标端=H5。
```

后续所有 API、模板、Store、生命周期和命令选择都服从这份上下文。
