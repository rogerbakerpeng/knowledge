# Link 链接

文字超链接

## 基础用法

基础的文字链接用法。

```html
<template>
  <div>
    <e-link-m href="https://element-plus.org" target="_blank">default</e-link-m>
    <e-link-m type="primary">primary</e-link-m>
    <e-link-m type="success">success</e-link-m>
    <e-link-m type="warning">warning</e-link-m>
    <e-link-m type="danger">danger</e-link-m>
    <e-link-m type="info">info</e-link-m>
  </div>
</template>
<style scoped>
.ep-link {
  margin-right: 8px;
}
.ep-link .ep-icon--right.ep-icon {
  vertical-align: text-bottom;
}
</style>
```

## 禁用状态

文字链接不可用状态。

```html
<template>
  <div>
    <e-link-m disabled>default</e-link-m>
    <e-link-m type="primary" disabled>primary</e-link-m>
    <e-link-m type="success" disabled>success</e-link-m>
    <e-link-m type="warning" disabled>warning</e-link-m>
    <e-link-m type="danger" disabled>danger</e-link-m>
    <e-link-m type="info" disabled>info</e-link-m>
  </div>
</template>
<style scoped>
.ep-link {
  margin-right: 8px;
}
.ep-link .ep-icon--right.ep-icon {
  vertical-align: text-bottom;
}
</style>
```

## 下划线

文字链接下划线。

```html
<template>
  <div>
    <e-link-m :underline="false">Without Underline</e-link-m>
    <e-link-m>With Underline</e-link-m>
  </div>
</template>
<style scoped>
.ep-link {
  margin-right: 8px;
}
.ep-link .ep-icon--right.ep-icon {
  vertical-align: text-bottom;
}
</style>
```

## 图标

带图标的链接

TIP

使用 `icon` 属性来为按钮添加图标。 您可以传递组件名称的字符串（提前注册）或组件本身是一个  Vue 组件。   eui4提供了一组图标，您可以在 ep-icon文档里选择

```html
<template>
  <div>
    <e-link-m :icon="Edit">Edit</e-link-m>
    <e-link-m>
      Check<e-icon-m class="e-icon--right"><icon-view /></e-icon-m>
    </e-link-m>
  </div>
</template>

<script setup lang="ts">
import { Edit, View as IconView } from '@epoint-mfe/eui-icons';
</script>

<style scoped>
.ep-link {
  margin-right: 8px;
}
</style>
```

## 按钮链接

当需要按钮样式的链接时，可以使用按钮组件的 `link` 状态。

```html
<template>
  <p>Basic link button</p>
  <div class="flex justify-space-between mb-4 flex-wrap gap-4">
    <e-button-m v-for="button in buttons" :key="button.text" :type="button.type" link>{{ button.text }}</e-button>
  </div>

  <p>Disabled link button</p>
  <div class="flex justify-space-between flex-wrap gap-4">
    <e-button-m v-for="button in buttons" :key="button.text" :type="button.type" link disabled>{{
      button.text
    }}</e-button-m>
  </div>
</template>

<script setup lang="ts">
const buttons = [
  { type: '', text: 'plain' },
  { type: 'primary', text: 'primary' },
  { type: 'success', text: 'success' },
  { type: 'info', text: 'info' },
  { type: 'warning', text: 'warning' },
  { type: 'danger', text: 'danger' },
] as const;
</script>
```

## API

### Attributes

| Name      | Description      | Type                   | Default |
| :-------- | :--------------- | :--------------------- | :------ |
| type      | 类型             | `enum`-`'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'`                 | default |
| underline | 是否下划线       | `boolean`              | true    |
| disabled  | 是否禁用状态     | `boolean`              | false   |
| href      | 原生 `href` 属性 | `string`               | —       |
| icon      | 图标组件         | `string` / `Component` | —       |

### Slots

| Name    | Description    |
| :------ | :------------- |
| default | 自定义默认内容 |
| icon    | 自定义图标组件 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-link-m"
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