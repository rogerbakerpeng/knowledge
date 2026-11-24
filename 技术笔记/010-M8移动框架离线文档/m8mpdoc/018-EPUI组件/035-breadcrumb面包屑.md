# Breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面。

## 基础用法

在 `ep-breadcrumb` 中使用 `ep-breadcrumb-item` 标签表示从首页开始的每一级。 该组件接受一个 String 类型的参数 separator来作为分隔符。 默认值为 '/'。

```html
<template>
	<e-breadcrumb-m separator="/">
        <e-breadcrumb-item-m :to="{ path: '/' }">组织架构</e-breadcrumb-item-m>
        <e-breadcrumb-item-m><a href="/">新点软件</a></e-breadcrumb-item-m>
        <e-breadcrumb-item-m :to="{ path: '/' }">产品和解决方案体系</e-breadcrumb-item-m>
        <e-breadcrumb-item-m>中央研究院</e-breadcrumb-item-m>
	</e-breadcrumb-m>
<template>
```

## 图标分隔符

通过设置 `separator-icon` 可使用相应的 iconfont 作为分隔符，注意这将使 `separator` 失效。

```html
<template>
	<e-breadcrumb-m :separator-icon="ArrowRight">
        <e-breadcrumb-item-m :to="{ path: '/' }">组织架构</e-breadcrumb-item-m>
        <e-breadcrumb-item-m :to="{ path: '/' }">新点软件</e-breadcrumb-item-m>
        <e-breadcrumb-item-m :to="{ path: '/' }">产品和解决方案体系</e-breadcrumb-item-m>
        <e-breadcrumb-item-m>中央研究院</e-breadcrumb-item-m>
	</e-breadcrumb-m>
<template>
<script lang="ts" setup>
import { ArrowRight } from '@epoint-mfe/eui-icons';
</script>
```

## API

### Breadcrumb Attributes

| Name           | Description              | Type                   | Default |
| :------------- | :----------------------- | :--------------------- | :------ |
| separator      | 分隔符                   | `string`               | /       |
| separator-icon | 图标分隔符的组件或组件名 | `string` / `Component` | -       |

### Breadcrumb Slots

| Name    | Description    | Subtags         |
| :------ | :------------- | :-------------- |
| default | 自定义默认内容 | Breadcrumb Item |

## BreadcrumbItem API

### BreadcrumbItem Attributes

| Name    | Description                                                  | Type                | Default |
| :------ | :----------------------------------------------------------- | :------------------ | :------ |
| to      | 路由跳转目标，同 `vue-router` 的 `to` 属性                   | `string` / `object` | ''      |
| replace | 如果设置该属性为 `true`, 导航将不会留下历史记录， 作用同 `location.replace` | `boolean`           | false   |

### BreadcrumbItem Slots

| Name    | Description    |
| :------ | :------------- |
| default | 自定义默认内容 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-breadcrumb-m"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
</iframe>
::: endif

<style>
 .ui-showcase-iframe {
    position: fixed;
    right: 3.5vw;
    top: 17%;
    width: 375px;
    height: 75vh;
    box-shadow: 0 0 12px 6px #eee;
    border-radius: 15px;
 }
 .main .markdown-body {
    padding: 45px;
    width: calc(97vw - 661px);
}
 </style>