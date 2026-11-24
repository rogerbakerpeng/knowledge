# ColorPicker 颜色选择器

ColorPicker 是一个支持多种颜色格式的颜色选择器。

## 基本使用

ColorPicker 需要一个字符串类型的变量绑定到 v-model。

```html
<template>
  <div class="demo-color-block">
    <span class="demonstration">With default value</span>
    <e-color-picker-m v-model="color1" />
  </div>
  <div class="demo-color-block">
    <span class="demonstration">With no default value</span>
    <e-color-picker-m v-model="color2" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const color1 = ref('#409EFF');
const color2 = ref();
</script>

<style scoped>
.demo-color-block {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.demo-color-block .demonstration {
  margin-right: 16px;
}
</style>
```

## 透明度

ColorPicker 支持选择透明通道。要激活透明通道选择，只需添加 `show-alpha` 属性。

```html
<template>
  <e-color-picker-m v-model="color" show-alpha />
</template>

<script setup>
import { ref } from 'vue';

const color = ref('rgba(19, 206, 102, 0.8)');
</script>
```

## 预设自定义颜色

ColorPicker 支持预定义的颜色选项

```html
<template>
  <div class="demo-color-block">
    <span class="demonstration">默认</span>
    <e-color-picker-m v-model="color1" show-alpha enable-predefine />
  </div>
  <div class="demo-color-block">
    <span class="demonstration">自定义-一行</span>
    <e-color-picker-m v-model="color2" show-alpha enable-predefine :predefine="predefineColors1" />
  </div>
  <div class="demo-color-block">
    <span class="demonstration">自定义-多行</span>
    <e-color-picker-m v-model="color2" show-alpha enable-predefine :predefine="predefineColors2" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const color1 = ref('rgba(255, 69, 0, 0.68)');
const color2 = ref('rgba(19, 206, 102, 0.8)');
const predefineColors1 = ref(['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585']);
const predefineColors2 = ref([
  ['#B71C1C', '#C62828', '#D32F2F', '#E53935', '#F44336', '#EF5350', '#E57373', '#EF9A9A'],
  ['#F57F17', '#F9A825', '#FBC02D'],
  ['#004D40', '#00695C', '#00796B', '#00897B', '#009688', '#26A69A'],
]);
</script>
```

## 历史记录

ColorPicker 支持历史记录的颜色选项

```html
<template>
  <e-color-picker-m v-model="color" show-alpha enable-predefine enable-history />
</template>

<script setup>
import { ref } from 'vue';

const color = ref('rgba(255, 69, 0, 0.68)');
</script>
```

## 尺寸

```html
<template>
  <div class="demo-color-sizes">
    <e-color-picker-m v-model="color" size="large" />
    <e-color-picker-m v-model="color" />
    <e-color-picker-m v-model="color" size="small" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const color = ref('#409EFF');
</script>

<style scoped>
</style>
```

## API

### Attributes

| **Name**              | **Description**                  | **Type**                                                     | **Default** |
| --------------------- | -------------------------------- | ------------------------------------------------------------ | ----------- |
| model-value / v-model | 绑定值                           | `string`                                                     | —           |
| disabled              | 是否禁用 ColorPicker             | `boolean`                                                    | false       |
| size                  | ColorPicker 的尺寸               | `large`/`default`/`small`                                    | default     |
| show-alpha            | 是否显示透明滑块                 | ``boolean``                                                  | false       |
| color-format          | v-model 的颜色格式               | `是否启用预设色'hsl'、'hsv'、'hex'、'rgb'、'hex'（当 show-alpha 为 false 时）、'rgb'（当 show-alpha 为 true 时）` | —           |
| popper-class          | ColorPicker 下拉菜单的自定义类名 | `string`                                                     | —           |
| predefine             | 预定义的颜色选项                 | `string[]丨string[][]`                                       | —           |
| enable-predefine      | 是否启用预定义默认色卡           | `Boolean`                                                    | false       |
| enable-history        | 是否启用历史记录                 | `Boolean`                                                    | false       |
| validate-event        | 是否触发表单验证                 | `Boolean`                                                    | true        |
| tabindex              | ColorPicker 的 tabindex          | `string`/`number`                                            | 0           |
| label                 | ColorPicker 的 aria-label        | `string`                                                     | —           |
| id                    | ColorPicker 的 id                | `string`                                                     | —           |
| readonly              | 输入框只读                       | `Boolean`                                                    | true        |

### Events

| Name          | **Description**        | **Type**                  |
| ------------- | ---------------------- | ------------------------- |
| active-change | 当前活动颜色改变时触发 | `(value: string) => void` |
| change        | 当输入值改变时触发     | `(value: string) => void` |

### Exposes

| 方法名 | 说明                 | 类型         |
| ------ | -------------------- | ------------ |
| color  | 当前颜色对象         | `Color`      |
| show   | 手动显示 ColorPicker | `() => void` |
| hide   | 手动隐藏 ColorPicker | `() => void` |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-color-picker-m"
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