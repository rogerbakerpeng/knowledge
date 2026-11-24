# Popconfirm 气泡确认框

气泡确认框用于对用户的操作行为进行二次确认，常用于危险操作的场景。




## 基本用法

点击按钮弹出气泡确认框。

Popconfirm 中只有 `title` 属性可用，`content` 将被忽略。

```html
<template>
  <e-popconfirm-m title="Are you sure to delete this?">
    <template #reference>
      <e-button-m type="default">Delete</e-button-m>
    </template>
  </e-popconfirm-m>
</template>
```



## 自定义

可以自定义气泡确认框的内容、按钮文案、图标等。

```html
<template>
  <e-popconfirm-m
    title="Are you sure to delete this?"
    width="280"
    confirm-button-text="OK"
    cancel-button-text="No, Thanks"
    icon="InfoFilled"
    icon-color="#626AEF"
  >
    <template #reference>
      <e-button-m type="default">Delete</e-button-m>
    </template>
  </e-popconfirm-m>
</template>
```



## 触发事件

单击按钮以触发事件

- `confirm`：点击确认按钮时触发，回调参数为事件对象。
- `cancel`：点击取消按钮时触发，回调参数为事件对象。

```html
<template>
  <e-popconfirm-m
    title="Are you sure to delete this?"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template #reference>
      <e-button-m type="default">Delete</e-button-m>
    </template>
  </e-popconfirm-m>
</template>

<script setup lang="ts">
const onConfirm = (e) => {
  console.log('confirm!', e);
};
const onCancel = (e) => {
  console.log('cancel!', e);
};
</script>
```




## API

### Attributes

| **Name**               | **Description**                   | **Type**                                                     | **Default**        |
| ---------------------- | --------------------------------- | ------------------------------------------------------------ | ------------------ |
| title                  | 标题内容                          | `string`                                                     | —                  |
| confirm-button-text    | 确认按钮文案                      | `string`                                                     | —                  |
| cancel-button-text     | 取消按钮文案                      | `string`                                                     | —                  |
| confirm-button-type    | 确认按钮类型                      | `enum` `'primary' ｜ 'success' ｜ 'warning' ｜ 'danger'｜'default'` | `'primary'`        |
| cancel-button-type     | 取消按钮类型                      | `enum` `'primary' ｜ 'success' ｜ 'warning' ｜ 'danger'｜'default'` | `'default'`        |
| icon                   | 标题左侧图标                      | `string` / `Component`                                       | `'QuestionFilled'` |
| icon-color             | 图标颜色                          | `string`                                                     | `'#f90'`           |
| hide-icon              | 是否隐藏图标                      | `boolean`                                                    | `false`            |
| hide-after             | 关闭延迟(ms)                      | `number`                                                     | `200`              |
| width                  | 弹窗宽度                          | `string` / `number`                                          | `295`              |
| close-on-click-modal | 是否可以通过点击遮罩层关闭 Dialog | `boolean`                                                    | `true`             |



### Events

| Name    | **Description**    | **Type**                               |
| ------- | ------------------ | -------------------------------------- |
| confirm | 点击确认按钮时触发 | `Function` `(e: PointerEvent) => void` |
| cancel  | 点击取消按钮时触发 | `Function` `(e: PointerEvent) => void` |



### Slots

| Name      | Description                  |
| --------- | ---------------------------- |
| reference | 触发 Popconfirm 的 HTML 元素 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-popconfirm-m"
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