# Message 消息提示

常用于主动操作后的反馈提示。 与 Notification 的区别是后者更多用于系统级通知的被动提醒。

## 基础用法

从顶部出现，3 秒后自动消失。

`Message` 在配置上与 `Notification` 非常类似，所以部分 `options` 在此不做详尽解释。 文末有 `options` 列表，可以结合 `Notification` 的文档理解它们。 。 `Message` 可以接收一个字符串或一个 `VNode` 作为参数，它会被显示为正文内容。

```html
<template>
  <e-button-m :plain="true" @click="open">Show message</e-button-m>
  <e-button-m :plain="true" @click="openVn">VNode</e-button-m>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { EpMessage } from '@epoint-mfe/eui-components';

const open = () => {
  EpMessage('this is a message.');
};

const openVn = () => {
  EpMessage({
    message: h('p', null, [h('span', null, 'Message can be '), h('i', { style: 'color: teal' }, 'VNode')]),
  });
};
</script>
```

## 纯文字提示

提示内容不在有左侧图标，只有内容

 如果你需要该功能，你可以把 `text` 设置为 `true`

```html
<template>
    <e-button-m :plain="true" @click="openText">text message</e-button-m>
</template>

<script lang="ts" setup>
import { EpMessage } from '@epoint-mfe/eui-components';
const openText = () => {
    EpMessage({
        message: 'this is a message.',
        text: true
    });
};
</script>
```

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。

当需要自定义更多属性时， `Message` 也可以接收一个对象为参数。 比如，设置 `type` 字段可以定义不同的状态，默认为 `info`。 此时正文内容以 `message` 的值传入。 同时，我们也为 `Message` 的各种 `type` 注册了方法，可以在不传入 `type` 字段的情况下像 `open4` 那样直接调用。

```html
<template>
  <e-button-m :plain="true" @click="open2">success</e-button-m>
  <e-button-m :plain="true" @click="open3">warning</e-button-m>
  <e-button-m :plain="true" @click="open1">message</e-button-m>
  <e-button-m :plain="true" @click="open4">error</e-button-m>
</template>

<script lang="ts" setup>
import { EpMessage } from '@epoint-mfe/eui-components';

const open1 = () => {
  EpMessage('this is a message.');
};
const open2 = () => {
  EpMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  });
};
const open3 = () => {
  EpMessage({
    message: 'Warning, this is a warning message.',
    type: 'warning',
  });
};
const open4 = () => {
  EpMessage.error('Oops, this is a error message.');
};
</script>
```

## 可关闭的消息提示

可以添加关闭按钮。

默认的 `Message` 是不可以被人工关闭的。 如果你需要手动关闭功能，你可以把 `showClose` 设置为 `true` 此外，和 `Notification` 一样，`Message` 拥有可控的 `duration`， 默认的关闭时间为 `3000` 毫秒，当把这个属性的值设置为 0 便表示该消息不会被自动关闭。

```html
<template>
  <e-button-m :plain="true" @click="open1">message</e-button-m>
  <e-button-m :plain="true" @click="open2">success</e-button-m>
  <e-button-m :plain="true" @click="open3">warning</e-button-m>
  <e-button-m :plain="true" @click="open4">error</e-button-m>
</template>

<script lang="ts" setup>
import { EpMessage } from '@epoint-mfe/eui-components';

const open1 = () => {
  EpMessage({
    showClose: true,
    message: 'This is a message.',
  });
};
const open2 = () => {
  EpMessage({
    showClose: true,
    message: 'Congrats, this is a success message.',
    type: 'success',
  });
};
const open3 = () => {
  EpMessage({
    showClose: true,
    message: 'Warning, this is a warning message.',
    type: 'warning',
  });
};
const open4 = () => {
  EpMessage({
    showClose: true,
    message: 'Oops, this is a error message.',
    type: 'error',
  });
};
</script>
```

## 文字居中

使用 `center` 属性让文字水平居中。

```html
<template>
  <e-button-m plain @click="openCenter">Centered text</e-button-m>
</template>

<script lang="ts" setup>
import { EpMessage } from '@epoint-mfe/eui-components';

const openCenter = () => {
  EpMessage({
    showClose: true,
    message: 'Centered text',
    center: true,
  });
};
</script>
```

## 使用 HTML 片段作为正文内容

`message` 支持使用 HTML 字符串作为正文内容。

将 `dangerouslyUseHTMLString` 属性设置为 `true` , `message` 就会被当作 HTML 片段处理。

```html
<template>
  <e-button-m :plain="true" @click="openHTML">Use HTML String</e-button-m>
</template>

<script lang="ts" setup>
import { EpMessage } from '@epoint-mfe/eui-components';

const openHTML = () => {
  EpMessage({
    dangerouslyUseHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>',
  });
};
</script>
```

## 分组消息合并

合并相同内容的消息。

设置 `grouping` 为 `true` ，内容相同的 `message` 将被合并。

```html
<template>
  <e-button-m :plain="true" @click="open">Show message</e-button-m>
</template>

<script lang="ts" setup>
import { EpMessage } from '@epoint-mfe/eui-components';

const open = () => {
  EpMessage({
    message: 'this is a message.',
    grouping: true,
    type: 'success',
  });
};
</script>
```

## 单独引用

```js
import { EpMessage } from '@epoint-mfe/eui-components';
```

此时调用方法为 `EpMessage(options)`。 我们也为每个 `type` 定义了各自的方法，如 `EpMessage.success(options)`。 并且可以调用 `EpMessage.closeAll()` 手动关闭所有实例。

## 应用程序上下文继承

`Message` 可接受一条 `context` 作为消息构造器的第二个参数，允许你将当前应用的上下文注入到 `Message` 中，这将允许你继承应用程序的所有属性。

你可以像这样使用它：

**TIP**

如果您全局注册了 `EpMessage` 组件，它将自动继承应用的上下文环境。

```js
import { getCurrentInstance } from 'vue';
import { EpMessage } from '@epoint-mfe/eui-components';

// 在你的 setup 方法中
const { appContext } = getCurrentInstance()!;
EMessage({}, appContext);
```

## API

### Options

| Name                     | Description                                                | Type                                          | Default   |
| :----------------------- | :--------------------------------------------------------- | :-------------------------------------------- | :-------- |
| message                  | 消息文本                                                   | `string` / `VNode` / `Function`-`() => VNode` | ''        |
| type                     | 消息类型                                                   | `enum`-`'success' \| 'warning' \| 'info' \| 'error'`                              | `info` |
| text                     | 是否是纯文字类型                                           | `boolean`                                     | false     |
| icon                     | 自定义图标组件，覆盖 `type`                                | `string` / `Component`                        | —         |
| dangerouslyUseHTMLString | 是否将 `message` 视为 HTML 字符串                          | `boolean`                                     | false     |
| customClass              | 消息的自定义类名                                           | `string`                                      | ''        |
| duration                 | 显示持续时间，毫秒。如果设置为 0，不会自动关闭             | `number`                                      | 3000      |
| showClose                | 是否显示关闭按钮                                           | `boolean`                                     | false     |
| center                   | 是否居中显示文本                                           | `boolean`                                     | false     |
| onClose                  | 消息关闭时的回调函数，以消息实例为参数                     | `Function`-`() => void`                       | —         |
| offset                   | 设置距离视口顶部的距离                                     | `number`                                      | 16        |
| appendTo                 | 设置消息的根元素，默认为 `document.body`                   | `string` / `HTMLElement`                      | —         |
| grouping                 | 合并具有相同内容的消息，不支持 VNode 消息                  | `boolean`                                     | false     |
| repeatNum                | 重复次数，类似于徽标，与 `grouping` 结合使用时用作初始数字 | `number`                                      | 1         |

### Methods

`Message`  会返回当前 Message 的实例。 如果需要手动关闭实例，可以调用它的 `close` 方法来关闭。

| Name  | Description        | Type                    |
| :---- | :----------------- | :---------------------- |
| close | 关闭当前的 Message | `Function`-`() => void` |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-message-m"
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