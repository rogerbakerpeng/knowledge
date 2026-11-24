# Switch

开关用于在两种相反状态之间切换。

## 基本用法

将 `v-model` 绑定到一个 `Boolean` 类型的变量上。

```html
<template>
  <e-switch-m v-model="value1" />
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref(true);
</script>
```

## 尺寸

```html
<template>
  <e-switch-m v-model="value" size="large" active-text="Open" inactive-text="Close" />
  <br />
  <e-switch-m v-model="value" active-text="Open" inactive-text="Close" />
  <br />
  <e-switch-m v-model="value" size="small" active-text="Open" inactive-text="Close" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(true);
</script>
```

## 文字描述

您可以添加 `active-text` 和 `inactive-text` 属性以显示文本。使用 `inline-prompt` 属性来控制文本是否显示在圆点内。

您可以添加 `active-text` 和 `inactive-text` 属性以显示文本。

```html
<template>
  <e-switch-m v-model="value1" class="mb-2" active-text="Pay by month" inactive-text="Pay by year" />
  <br />
  <e-switch-m
    v-model="value2"
    class="mb-2"
    style="--e-switch-on-color: #13ce66; --e-switch-off-color: #ff4949"
    active-text="Pay by month"
    inactive-text="Pay by year"
  />
  <br />
  <e-switch-m v-model="value3" inline-prompt active-text="是" inactive-text="否" />
  <e-switch-m
    v-model="value4"
    class="ml-2"
    inline-prompt
    style="--e-switch-on-color: #13ce66; --e-switch-off-color: #ff4949"
    active-text="Y"
    inactive-text="N"
  />
  <e-switch-m v-model="value6" class="ml-2" width="60" inline-prompt active-text="超出省略" inactive-text="超出省略" />
  <e-switch-m
    v-model="value5"
    class="ml-2"
    inline-prompt
    style="--e-switch-on-color: #13ce66; --e-switch-off-color: #ff4949"
    active-text="完整展示多个内容"
    inactive-text="多个内容"
  />
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref(true);
const value2 = ref(true);
const value3 = ref(true);
const value4 = ref(true);
const value5 = ref(true);
const value6 = ref(true);
</script>
```

## 显示自定义图标和自定义颜色


您可以添加 `active-icon` 和 `inactive-icon` 属性以显示图标。使用 `inline-prompt` 属性来控制图标是否显示在开关内。--e-switch-on-color 和 --e-switch-off-color CSS 变量决定了两种状态下的背景颜色。

```html
<template>
  <e-switch-m v-model="value1" :active-icon="Check" :inactive-icon="Close" />
  <br />
  <e-switch-m
    v-model="value2"
    class="mt-2"
    style="margin-left: 24px"
    inline-prompt
    :active-icon="Check"
    :inactive-icon="Close"
  />
  <br />
  <e-switch-m v-model="value3" class="ml-2" style="--e-switch-on-color: #13ce66; --e-switch-off-color: #ff4949" />
</template>

<script setup>
import { ref } from 'vue';
import { Check, Close } from '@epoint-mfe/eui-icons';
const value1 = ref(true);
const value2 = ref(true);
const value3 = ref(true);
</script>
```

## 拓展用法（移动端新增功能）

您可以使用 `show-inner-icon` 属性来控制是否显示在开关圆点处图标。开关开启默认显示图标`Select`、关闭默认显示图标`CloseBold`,您可以添加 `active-inner-icon` 和 `inactive-inner-icon` 属性调整图标。

```html
<template>
  <e-switch-m v-model="value1" show-inner-icon active-text="Open" inactive-text="Close" />
  <br />
  <e-switch-m v-model="value2" show-inner-icon :active-inner-icon="Edit" :inactive-inner-icon="Menu"/>
</template>

<script setup>
import {Edit, Menu } from '@epoint-mfe/eui-icons';

const value1 = ref(true);
const value2 = ref(true);
</script>
```

## 扩展值类型

您可以设置 `active-value` 和 `inactive-value` 属性。它们都接收一个 `Boolean、String` 或 `Number` 类型的值。

```html
<template>
  <e-switch-m
  v-model="value"
  style="--e-switch-on-color: #13ce66; --e-switch-off-color: #ff4949"
  active-value="100"
  inactive-value="0"
  />
  <div>Switch value:{{ value7 }}</div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('100');
</script>
```

## 禁用

添加 `disabled` 属性会禁用开关。

```html
<template>
  <e-switch-m v-model="value1" disabled />
  <e-switch-m v-model="value2" class="ml-2" />
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref(true);
const value2 = ref(true);
</script>
```

## 加载中

将 `loading` 属性设置为 `true` 表示开关处于加载状态。

```html
<template>
  <e-switch-m v-model="value1" loading />
  <e-switch-m v-model="value2" loading class="ml-2" />
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref(true);
const value2 = ref(false);
</script>
```

## 防止切换

设置 `before-change` 属性，如果返回 `false` 或返回的 `Promise` 被拒绝，将会阻止切换。

```html
<template>
  <e-switch-m v-model="value1" :loading="loading1" :before-change="beforeChange1" />
  <e-switch-m v-model="value2" class="ml-2" :loading="loading2" :before-change="beforeChange2" />
</template>
<script setup>
import { ref } from 'vue';

const value1 = ref(false);
const value2 = ref(false);
const loading1 = ref(false);
const loading2 = ref(false);

const beforeChange1 = () => {
  loading1.value = true;

  return new Promise((resolve) => {
    setTimeout(() => {
      loading1.value = false;
      ejs.ui.toast('Switch success');

      return resolve(true);
    }, 1000);
  });
};

const beforeChange2 = () => {
  loading2.value = true;

  return new Promise((_, reject) => {
    setTimeout(() => {
      loading2.value = false;
      ejs.ui.toast('Switch failed');

      return reject(new Error('Error'));
    }, 1000);
  });
};
</script>
```

## Switch API

### Switch Attributes

| 属性名                | 描述                                                 | 类型                            | 默认值 |
| :-------------------- | :----------------------------------------------------------- | :------------------------------ | :------ |
| model-value / v-model | 绑定的值，它应与 `active-value` 或 `inactive-value` 中的一个等效，默认为 `boolean` 类型 | `boolean` / `string` / `number` | —       |
| disabled              | 是否禁用开关                                                 | `boolean`                       | false   |
| loading               | 开关是否处于加载状态                                         | `boolean`                       | false   |
| size                  | 开关的大小                                                   | `枚举` `'large'\| 'default'\| 'small'`                          | default |
| width                 | 开关的宽度                                                   | `number` / `string`             | —       |
| inline-prompt         | 图标或文本是否显示在点内，仅文本的第一个字符将被呈现         | `boolean`                       | false   |
| active-icon           | 处于 `on` 状态时显示的图标的组件，会覆盖 `active-text`       | `string` / `Component`          | —       |
| inactive-icon         | 处于 `off` 状态时显示的图标的组件，会覆盖 `inactive-text`    | `string` / `Component`          | —       |
| active-text           | 处于 `on` 状态时显示的文本                                   | `string`                        | —       |
| inactive-text         | 处于 `off` 状态时显示的文本                                  | `string`                        | —       |
| active-value          | 处于 `on` 状态时的开关值                                     | `boolean` / `string` / `number` | true    |
| inactive-value        | 处于 `off` 状态时的开关值                                    | `boolean` / `string` / `number` | false   |
| active-color          | 处于 `on` 状态时的背景颜色（已弃用，请改用 CSS 变量 `--e-switch-on-color`） | `string`                        | —       |
| inactive-color        | 处于 `off` 状态时的背景颜色（已弃用，请改用 CSS 变量 `--e-switch-off-color`） | `string`                        | —       |
| border-color          | 开关的边框颜色（已弃用，请改用 CSS 变量 `--e-switch-border-color`） | `string`                        | —       |
| name                  | 开关的输入名称                                               | `string`                        | —       |
| validate-event        | 是否触发表单验证                                             | `boolean`                       | true    |
| before-change         | 在开关状态更改之前的钩子函数。如果返回 `false` 或返回的 `Promise` 被拒绝，将会停止切换 | `Function` `() => Promise<boolean> \| boolean`                      | —       |
| id                    | input 的 id                                                  | `string`                        | —       |
| tabindex              | input 的 tabindex                                            | `string` / `number`             | —       |
| show-inner-icon       | 控制是否显示在开关圆点处图标（移动端新增属性）                             | `boolean`                       | false      |
| active-inner-icon     | 处于 `on` 状态时显示的圆点处图标（移动端新增属性）                              | `string` / `Component`             | Select       |
| inactive-inner-icon     | 处于 `off` 状态时显示的圆点处图标（移动端新增属性）                           | `string` / `Component`             | CloseBold       |

### Switch Events

| 事件名   | 描述                     | 参数 |
| :----- | :------------------------------ | :--------- |
| change | switch 状态发生变化时的回调函数 | `Function` `(val: boolean \| string \| number) => void` |

### Switch Methods

| 方法名   | 描述                     | 参数 |
| :----- | :------------------------------ | :--------- |
| focus | 手动 focus 到 switch 组件 | `Function` `() => void` |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-switch-m"
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