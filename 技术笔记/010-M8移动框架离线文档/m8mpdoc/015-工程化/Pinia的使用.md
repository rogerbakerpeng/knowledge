# Pinia 的使用

## 前言

`Pinia` 是 Vue 的专属状态管理库，Pinia 的基本使用方法可以阅读 [Pinia 官方文档](https://pinia.vuejs.org/zh/ 'Pinia官方文档')

## 文件位置

M8.4 移动前端框架内的 `Pinia` 文件为每一个模块文件夹下的`store.ts`，框架内部已处理好自动引用。

```
ejs.m8.project
    ├── src
    │   ├── pages
    │   │   ├── [module_name]                 // 以模块名命名的文件夹
    │   │   │       ├── [module_name_A].vue
    │   │   │       ├── [module_name_B].vue
    │   │   │       ├── store.ts              // 对应此模块的pinia定义
```

## store.ts

```js
import { defineStore } from 'pinia';

// 使用说明：
// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
export const useIndexStore = defineStore(
    // 第一个参数是你的应用中 Store 的唯一 ID。
    'index',
    {
        // 你可以认为 state 是 store 的数据 (data)
        state: () => ({
            moduleInfo: '状态信息'
        }),
        // getters 是 store 的计算属性 (computed)
        getters: {
            moduleInfoData: (state) => state.moduleInfo + '数据'
        },
        // 而 actions 则是方法 (methods)
        actions: {
            setModuleInfo(data) {
                this.moduleInfo = data;
            }
        }
    }
);
```

## vue 文件内使用

获取 Pinia 中定义的状态：

```js
import { useIndexStore } from './store';

const indexStore = useIndexStore();

console.log(indexStore.moduleInfo);
// 状态信息
```

更改 Pinia 中定义的状态：

```js
indexStore.setModuleInfo('M8移动前端跨端框架');
```

## 类似 Vuex 的辅助函数

```js
import { useIndexStore } from './store';
import { mapState, mapActions } from 'pinia';

export default {
  computed: {
    // 其他计算属性
    // ...
    // 允许读取 this.moduleInfo
    ...mapState(useIndexStore, ['moduleInfo']),
  },
  methods: {
    // 允许读取 this.setModuleInfo()
    ...mapActions(useIndexStore, ['setModuleInfo']),
  },
}
```