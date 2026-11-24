# Badge 徽章

按钮和图标上的数字或状态标记。

## 基本使用

可以用来展示新消息的数量。

数量值可接受 Number 或 String。

```html
<template>
  <e-badge-m :value="12" class="item">
    <e-button-m>comments</e-button-m>
  </e-badge-m>
  <e-badge-m :value="3" class="item">
    <e-button-m>replies</e-button-m>
  </e-badge-m>
  <e-badge-m :value="1" class="item" type="primary">
    <e-button-m>comments</e-button-m>
  </e-badge-m>
  <e-badge-m :value="2" class="item" type="warning">
    <e-button-m>replies</e-button-m>
  </e-badge-m>

  <e-dropdown-m class="item" trigger="click">
    <span class="ep-dropdown-link">
      Click Me
      <e-icon-m class="ep-icon--right"><caret-bottom /></e-icon-m>
    </span>
    <template #dropdown>
      <e-dropdown-menu-m>
        <e-dropdown-item-m class="clearfix">
          comments
          <e-badge-m class="mark" :value="12" />
        </e-dropdown-item-m>
        <e-dropdown-item-m class="clearfix">
          replies
          <e-badge-m class="mark" :value="3" />
        </e-dropdown-item-m>
      </e-dropdown-menu-m>
    </template>
  </e-dropdown-m>
</template>

<script lang="ts" setup>
  import { CaretBottom } from '@epoint-mfe/eui-icons';
</script>

<style scoped>
  .item {
      margin: 10px 15px;
  }
</style>
```

## 最大值

你还可以自定义最大值

由 max 属性定义，接受 Number 值。 请注意，仅在值也是 Number 时起作用。

```html
<template>
  <e-badge-m :value="200" :max="99" class="item">
    <e-button-m>comments</e-button-m>
  </e-badge-m>
  <e-badge-m :value="100" :max="10" class="item">
    <e-button-m>replies</e-button-m>
  </e-badge-m>
</template>

<style scoped>
  .item {
      margin: 10px 15px;
  }
</style>
```

## 自定义显示内容

你也可以展示除数字以外你想要展示的任何值。

当 value 是 String 时，可以显示自定义文字。

```html
<template>
  <e-badge-m value="new" class="item">
    <e-button-m>comments</e-button-m>
  </e-badge-m>
  <e-badge-m value="hot" class="item">
    <e-button-m>replies</e-button-m>
  </e-badge-m>
</template>

<style scoped>
  .item {
      margin: 10px 15px;
  }
</style>
```

## 小红点

通过一个小红点标记来告知用户有新内容。

使用 `is-dot` 属性。 是个布尔值。

```html
<template>
  <e-badge-m is-dot class="item">query</e-badge-m>
  <e-badge-m is-dot class="item">
    <e-button-m class="sharep-button" :icon="Share" type="primary" />
  </e-badge-m>
</template>

<script lang="ts" setup>
  import { Share } from "@epoint-mfe/eui-components/eui-icons";
</script>

<style scoped>
  .item {
      margin: 10px 15px;
  }
</style>
```

## API

### Attributes

| 属性名      | 描述                                                                  | 类型                                                                         | 默认值 |
| ----------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------ |
| value       | 显示值                                                                | `string` / `number`                                                          | ''     |
| max         | 最大值，超过最大值会显示 `{max}+`。 只有当 value 是数字类型时起作用。 | `number`                                                                     | 99     |
| is-dot      | 是否显示小圆点。                                                      | `boolean`                                                                    | false  |
| hidden      | 是否隐藏 Badge。                                                      | `boolean`                                                                    | false  |
| type        | badge type.                                                           | `string(enum)` ---'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | 'danger' |
| showZero    | 值为零时是否显示 Badge                                                | `boolean`                                                                    | true   |
| color       | 背景色                                              | `string`                                                                    | -   |
| offset      | badge 的偏移量                                             | [`number`,`number`]                                                                    | [0,0]   |
| badge-style | 	自定义 badge 样式                                               | `object`                                                                    | -   |
| badge-class  | 自定义 badge 类名                                               | `string`                                                                    | -|
| dot-style | 	自定义 dot 样式                                               | `object`                                                                    | -   |
| dot-class  | 自定义 dot 类名                                               | `string`                                                                    | -|

### Slots

| 属性名  | 描述           |
| ------- | -------------- |
| default | 自定义默认内容 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-badge-m"
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