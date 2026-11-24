# Notification 通知

悬浮出现在页面角落，显示全局的通知提醒消息。

## 基本用法

在最简单的情况下，您可以设置`title`字段和`message`字段分别表示通知的标题和正文。默认情况下，通知在 4500 毫秒后自动关闭，但通过设置`duration`您可以控制它的显示时间。具体来说，如果将其设置为`0`，它将不会自动关闭。请注意，`duration`接受以毫秒为单位的数字。

```html
<template>
  <e-button-m plain @click="open1"> Closes automatically </e-button-m>
  <e-button-m plain @click="open2"> Won't close automatically </e-button-m>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { EpNotification } from '@epoint-mfe/eui-components';

const open1 = () => {
  EpNotification({
    title: 'Title',
    message: h('i', { style: 'color: teal' }, 'This is a reminder')
  });
};

const open2 = () => {
  EpNotification({
    title: 'Prompt',
    message: 'This is a message that does not automatically close',
    duration: 0
  });
};
</script>
```

## 带类型

我们提供了四种类型：success（成功）、warning（警告）、info（信息）和 error（错误）。

EUI 提供了四种通知类型：`success`、`warning`、`info`和`error`。它们是通过`type`字段设置的，其他值将被忽略。我们还为这些类型注册了方法，可以直接调用，不传入`type`或为空时则不会有类型图标。

```html
<template>
  <e-button-m plain @click="open1"> Success </e-button-m>
  <e-button-m plain @click="open2"> Warning </e-button-m>
  <e-button-m plain @click="open3"> Info </e-button-m>
  <e-button-m plain @click="open4"> Error </e-button-m>
  <e-button-m plain @click="open5">No Type</e-button-m>
</template>

<script lang="ts" setup>
import { ENotification } from '@epoint-mfe/eui-components';

const open1 = () => {
  EpNotification({
    title: 'Success',
    message: 'This is a success message',
    type: 'success',
  });
};

const open2 = () => {
  EpNotification({
    title: 'Warning',
    message: 'This is a warning message',
    type: 'warning',
  });
};

const open3 = () => {
  EpNotification({
    title: 'Info',
    message: 'This is an info message',
    type: 'info',
  });
};

const open4 = () => {
  EpNotification({
    title: 'Error',
    message: 'This is an error message',
    type: 'error',
  });
};

const open5 = () => {
  EpNotification({
    title: 'No Type',
    message: 'This is a no type message',
  });
};
</script>

```

## 自定义位置

通知可以从任何你喜欢的角落出现。

`position`属性定义了通知滑动进入的角落。它可以是`top-center`、`bottom-center`、`top-left`、`bottom-left`、`top-right`或`bottom-right`。默认值是`top-center`。

```html
<template>
  <e-button-m plain @click="open1"> Top Center </e-button-m>
  <e-button-m plain @click="open2"> Bottom Center </e-button-m>
  <e-button-m plain @click="open3"> Top Left </e-button-m>
  <e-button-m plain @click="open4"> Bottom Left </e-button-m>
  <e-button-m plain @click="open5"> Top Right </e-button-m>
  <e-button-m plain @click="open6"> Bottom Right </e-button-m>
</template>

<script lang="ts" setup>
import { EpNotification } from '@epoint-mfe/eui-components';

const open1 = () => {
  EpNotification({
    title: 'Custom Position',
    message: "I'm at the top center corner",
    position: 'top-center'
  });
};

const open2 = () => {
  EpNotification({
    title: 'Custom Position',
    message: "I'm at the bottom center corner",
    position: 'bottom-center'
  });
};

const open3 = () => {
  EpNotification({
    title: 'Custom Position',
    message: "I'm at the top left corner",
    position: 'top-left'
  });
};

const open4 = () => {
    EpNotification({
        title: 'Custom Position',
        message: "I'm at the bottom left corner",
        position: 'bottom-left'
    });
};

const open5 = () => {
  EpNotification({
    title: 'Custom Position',
    message: "I'm at the top right corner",
    position: 'top-right'
  });
};

const open6 = () => {
  EpNotification({
    title: 'Custom Position',
    message: "I'm at the bottom right corner",
    position: 'bottom-right'
  });
};
</script>

```

## 带有偏移

自定义通知距离屏幕边缘的偏移量。

设置`offset`属性以自定义通知距离屏幕边缘的偏移量。请注意，同一时刻的每个通知实例应具有相同的偏移量。

```html
<template>
  <e-button-m plain @click="open"> N ENotification with offset </e-button-m>
</template>

<script lang="ts" setup>
import { EpNotification } from '@epoint-mfe/eui-components';

const open = () => {
  EpNotification.success({
    title: 'Success',
    message: 'This is a success message',
    offset: 100
  });
};
</script>

```

## 使用 HTML 字符串

`message`支持 HTML 字符串。

将`dangerouslyUseHTMLString`设置为`true`，`message`将被视为 HTML 字符串。

```html
<template>
  <e-button-m plain @click="open"> Use HTML String </e-button-m>
</template>

<script lang="ts" setup>
import { EpNotification } from '@epoint-mfe/eui-components';

const open = () => {
  EpNotification({
    title: 'HTML String',
    dangerouslyUseHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>'
  });
};
</script>
```

**WARNING**

尽管`message`属性支持 HTML 字符串，但在您的网站上动态呈现任意 HTML 可能非常危险，因为它很容易导致[XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。因此，在启用`dangerouslyUseHTMLString`时，请确保`message`的内容是可信的，**绝对不要**将`message`分配给用户提供的内容。

## 隐藏关闭按钮

可以隐藏关闭按钮

将`showClose`属性设置为`false`，以便用户无法关闭通知。

```html
<template>
  <e-button-m plain @click="open"> Hide close button </e-button-m>
</template>

<script lang="ts" setup>
import { EpNotification } from '@epoint-fe/eui-components';

const open = () => {
  EpNotification.success({
    title: 'Info',
    message: 'This is a message without close button',
    showClose: false
  });
};
</script>
```

## 单独引用

```tsx
import { EpNotification } from '@epoint-mfe/eui-components';
```

你可以在对应的处理函数内调用 `EpNotification(options)` 来呼出通知栏。 我们也提前定义了多个 `type` 的单独调用方法，如 `EpNotification.success(options)`。 当你需要关闭页面上所有的通知栏的时候，可以调用 `EpNotification.closeAll()` 来关闭所有的实例。

## 应用程序上下文继承

现在，通知接受一个`context`作为消息构造函数的第二个参数，允许您将当前应用程序的上下文注入通知中，从而允许您继承应用程序的所有属性。

您可以像这样使用它：

**TIP**

如果您全局注册了 `EpNotification` 组件，它将自动继承您的应用程序上下文。

```tsx
import { getCurrentInstance } from 'vue';
import { EpNotification } from '@epoint-fe/eui-components';

// in your setup method
const { appContext } = getCurrentInstance()!;
EpNotification({}, appContext);
```

## API

### Options

| Name                     | Description                                                  | Type                     | Default   |
| :----------------------- | :----------------------------------------------------------- | :----------------------- | :-------- |
| title                    | 标题                                                         | `string`                 | ''        |
| message                  | 描述文本                                                     | `string` / `VNode`       | ''        |
| dangerouslyUseHTMLString | 是否将 `message` 视为 HTML 字符串                            | `boolean`                | false     |
| type                     | 通知类型                                                     | `enum`-`'success' \| 'warning' \| 'info' \| 'error' \| ''`                   | ''        |
| icon                     | 自定义图标组件。如果设置，将覆盖 `type` 字段                 | `string` / `Component`   | —         |
| customClass              | 自定义通知的 class 名称                                      | `string`                 | ''        |
| duration                 | 关闭前的持续时间。如果设置为 0，则不会自动关闭               | `number`                 | 4500      |
| position                 | 自定义位置                                                   | `enum`-`'top-right' \| 'top-left' \| 'top-center' \| 'bottom-center' \| 'bottom-right' \| 'bottom-left'`                   | top-center |
| showClose                | 是否显示关闭按钮                                             | `boolean`                | true      |
| onClose                  | 关闭通知时的回调函数                                         | `Function`-`() => void`               | —         |
| onClick                  | 单击通知时的回调函数                                         | `Function`-`() => void`               | —         |
| offset                   | 距离屏幕顶部边缘的偏移量。同一时刻的每个通知实例应具有相同的偏移量 | `number`                 | 0         |
| appendTo                 | 设置通知的根元素，默认为 `document.body`                     | `string` / `HTMLElement` | —         |
| zIndex                   | 初始的层叠顺序                                               | `number`                 | 0         |

### Method

`Notification` 和 `this.$notify` 返回当前的通知实例。要手动关闭实例，您可以在其上调用 `close`。

| Name  | Description | Type       |
| :---- | :---------- | :--------- |
| close | 关闭通知    | `Function`-`() => void` |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-notification-m"
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