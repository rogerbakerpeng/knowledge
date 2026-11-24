# ColorPalette 调色板

ColorPalette 是一个支持多种颜色格式的调色板。

## 基本使用

ColorPalette 需要一个字符串类型的变量绑定到 v-model。

```html
<template>
   <div class="demo-color-palette">
        <div class="demo-color-block">
            <span class="demonstration">有默认值</span>
            <e-color-palette-m v-model="color1" />
        </div>
        <div class="demo-color-block">
            <span class="demonstration">无默认值</span>
            <e-color-palette-m v-model="color2" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const color1 = ref('#409EFF');
const color2 = ref();
</script>
<style lang="scss" scoped>
.demo-color {
    &-palette {
        display: flex;
        flex-direction: column;
    }
    &-block {
        width: 100%;
        flex: 1;
        margin: 10px;
        display: flex;
        flex-direction: column;
        .demonstration {
            width: 100%;
            display: block;
            margin-bottom: 10px;
            font-size: 12px;
        }
    }
}
</style>
```

## 透明度

ColorPalette 支持选择透明通道。要激活透明通道选择，只需添加 `show-alpha` 属性。

```html
<template>
    <e-color-palette-m v-model="color3" :show-alpha="true" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const color3 = ref('rgba(236, 29, 15, 0.8)');
</script>
```

## 预设自定义颜色

ColorPalette 支持预定义的颜色选项。

```html
<template>
    <div>
        <e-radio-group-m class="custom-radio-group" v-model="paletteType" @change="paletteTypeChange">
            <e-radio-m value="1" size="small">默认</e-radio-m>
            <e-radio-m value="2" size="small">自定义-一行</e-radio-m>
            <e-radio-m value="3" size="small">自定义-多行</e-radio-m>
        </e-radio-group-m>
        <e-color-palette-m v-model="color4" :predefine="predefineColors" show-alpha enable-predefine />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const color4 = ref('#009688');
const paletteType = ref('1');
const predefineColors = ref<string[] | string[][] | undefined>(undefined);
const paletteTypeChange = (val: string) => {
  switch (val) {
    case '1':
      predefineColors.value = undefined;
      break;
    case '2':
      predefineColors.value = ['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585'];
      break;
    case '3':
      predefineColors.value = [
        ['#B71C1C', '#C62828', '#D32F2F', '#E53935', '#F44336', '#EF5350', '#E57373', '#EF9A9A'],
        ['#F57F17', '#F9A825', '#FBC02D'],
        ['#004D40', '#00695C', '#00796B', '#00897B', '#009688', '#26A69A'],
      ];
      break;
    default:
      break;
  }
};
</script>
<style lang="scss" scoped>
// 自定义按钮组
.custom-radio-group{
    padding-left: 10px;
    .ep-radio,.ep-radio.radio-size-small{
        height: 24px;
        font-size: 12px;
    }
}
</style>
```

## 历史记录

ColorPalette 支持历史记录的颜色选项。

```html
<template>
    <div>
        <e-color-palette-m ref="colorPaletteRef" v-model="color5" show-alpha enable-predefine enable-history />
        <e-button-m type="primary" size="small" plain style="margin-top: 30px" @click="getValue">
            获取当前颜色
        </e-button-m>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const color5 = ref('rgba(255, 69, 0, 0.68)');
const colorPaletteRef = ref();
const getValue = () => {
  let color = colorPaletteRef.value?.color.value;
  // 这里以弹窗和控制台输出为例
  ejs.ui.toast(color);
  console.log('当前颜色=>', color);
};
</script>
```



## API

### Attributes

| **Name**              | **Description**    | **Type**                                                     | **Default** |
| --------------------- | ------------------ | ------------------------------------------------------------ | ----------- |
| model-value / v-model | 绑定值，当前颜色   | `string`                                                     | —           |
| show-alpha            | 是否显示透明滑块   | `boolean`                                                    | false       |
| color-format          | v-model 的颜色格式 | `'hsl'、'hsv'、'hex'、'rgb'、'hex'（当 show-alpha 为 false 时）、'rgb'（当 show-alpha 为 true 时）` | —           |
| predefine             | 预设颜色数组       | `string[]丨string[][]`                                       | —           |
| enable-predefine      | 是否启用预设色     | `boolean`                                                    | false       |
| enable-history        | 是否启用历史记录   | `boolean`                                                    | false       |
| validate-event        | 是否触发表单验证   | `boolean`                                                    | true        |
| id                    | ColorPalette 的 id | `string`                                                     | —           |

### Events

| Name          | **Description**        | **Type**                  |
| ------------- | ---------------------- | ------------------------- |
| active-change | 当前活动颜色改变时触发 | `(value: string) => void` |

### Exposes

| 方法名            | 说明                  | 类型         |
| ----------------- | --------------------- | ------------ |
| color             | 当前颜色对象          | `Color`      |
| show              | 手动显示 ColorPalette | `() => void` |
| hide              | 手动隐藏 ColorPalette | `() => void` |
| updateSliderPanel | 手动更新滑块面板      | `() => void` |
| resetColor        | 重置颜色为初始值      | `() => void` |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-color-palette-m"
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