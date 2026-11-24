# Vuex 的使用

## 前言

`Vuex` 是一个专为 Vue.js 应用程序开发的状态管理模式，Vuex 的基本使用方法可以阅读 [Vuex 官方文档](https://vuex.vuejs.org/zh/ 'Vuex官方文档')

## 文件位置

M8 移动前端框架内的 vuex 文件为每一个模块文件夹下的`store.js`，框架内部已处理好自动引用。

```
ejs.m8.project
    ├── src
    │   ├── pages
    │   │   ├── [module_name]                 // 以模块名命名的文件夹
    │   │   │       ├── [module_name_A].vue
    │   │   │       ├── [module_name_B].vue
    │   │   │       ├── store.js              // 对应此模块的vuex定义
```

## store.js

```js
export default {
    // 独立命名名称，此处为模块文件夹名称，例如 m8demo
    moduleName: 'm8demo',
    // 使用独立命名空间
    namespaced: true,
    state: {
        // 定义的状态变量
        count: 0,
    },
    mutations: {
        // 修改状态变量的方法
        increment(state, n) {
            state.count += n;
        },
    },
    // ...
};
```

## vue 文件内使用

获取 Vuex 中定义的状态：

```js
console.log(this.$store.state.m8demo.count);
// 0
```

更改 Vuex 中定义的状态：

```js
// 触发commit时需要带上独立空间名称
this.$store.commit('m8demo/increment', 10);

console.log(this.$store.state.m8demo.count);
// 10
```
