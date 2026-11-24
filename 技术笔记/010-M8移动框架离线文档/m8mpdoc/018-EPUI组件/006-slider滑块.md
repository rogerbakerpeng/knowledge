# Slider 滑块

将滑块在固定范围内拖动。

## 基本用法

拖动滑块时会显示当前值。

通过设置绑定值来自定义滑块的初始值。

```html
<template>
  <div class="slider-demo-block">
    <span class="demonstration">Default value</span>
    <e-slider-m v-model="value1" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Customized initial value</span>
    <e-slider-m v-model="value2" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Hide Tooltip</span>
    <e-slider-m v-model="value3" :show-tooltip="false" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Format Tooltip</span>
    <e-slider-m v-model="value4" :format-tooltip="formatTooltip" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Disabled</span>
    <e-slider-m v-model="value5" disabled />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value1 = ref(0);
  const value2 = ref(0);
  const value3 = ref(0);
  const value4 = ref(0);
  const value5 = ref(0);

  const formatTooltip = (val: number) => {
    return val / 100;
  };
</script>
<style scoped>
  .slider-demo-block {
    display: flex;
    align-items: center;
  }
  .slider-demo-block .ep-slider {
    margin-top: 0;
    margin-left: 12px;
  }
  .slider-demo-block .demonstration {
    font-size: 14px;
    color: var(--ep-text-color-secondary);
    line-height: 44px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0;
  }
  .slider-demo-block .demonstration + .ep-slider {
    flex: 0 0 70%;
  }
</style>
```

## 离散值

选项可以是离散的。

使用 `step` 属性设置步进大小。通过设置 `show-stops` 属性，您可以显示断点。

```html
<template>
  <div class="slider-demo-block">
    <span class="demonstration">Breakpoints not displayed</span>
    <e-slider-m v-model="value1" :step="10" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Breakpoints displayed</span>
    <e-slider-m v-model="value2" :step="10" show-stops />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value1 = ref(0);
  const value2 = ref(0);
</script>
<style scoped>
  .slider-demo-block {
    display: flex;
    align-items: center;
  }
  .slider-demo-block .ep-slider {
    margin-top: 0;
    margin-left: 12px;
  }
  .slider-demo-block .demonstration {
    font-size: 14px;
    color: var(--ep-text-color-secondary);
    line-height: 44px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0;
  }
  .slider-demo-block .demonstration + .ep-slider {
    flex: 0 0 70%;
  }
</style>
```

## 带输入框的滑块

通过输入框设置值。

设置 `show-input` 属性以在右侧显示输入框。

```html
<template>
  <div class="slider-demo-block">
    <e-slider-m v-model="value" show-input />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value = ref(0);
</script>
<style scoped>
  .slider-demo-block {
    display: flex;
    align-items: center;
  }
  .slider-demo-block .ep-slider {
    margin-top: 0;
    margin-left: 12px;
  }
</style>
```

## 尺寸

```html
<template>
  <e-slider-m v-model="value" size="large" show-input />
  <e-slider-m v-model="value" show-input />
  <e-slider-m v-model="value" size="small" show-input />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value = ref(0);
</script>

<style scoped>
  .ep-slider {
    margin-top: 20px;
  }

  .ep-slider:first-child {
    margin-top: 0;
  }
</style>
<style scoped>
  .slider-demo-block {
    display: flex;
    align-items: center;
  }
  .slider-demo-block .ep-slider {
    margin-top: 0;
    margin-left: 12px;
  }
</style>
```

## 放置位置

您可以自定义工具提示的放置位置。

```html
<template>
  <div class="slider-demo-block">
    <e-slider-m v-model="value1" />
  </div>
  <div class="slider-demo-block">
    <e-slider-m v-model="value4" placement="left" />
  </div>
  <div class="slider-demo-block">
    <e-slider-m v-model="value3" placement="right" />
  </div>
  <div class="slider-demo-block">
    <e-slider-m v-model="value2" placement="bottom" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value1 = ref(0);
  const value2 = ref(0);
  const value3 = ref(0);
  const value4 = ref(0);
</script>
<style scoped>
  .slider-demo-block {
    display: flex;
    align-items: center;
  }
  .slider-demo-block .ep-slider {
    margin-top: 0;
    margin-left: 12px;
  }
</style>
```

## 范围选择

支持选择一定范围的值。

设置 `range` 属性激活范围模式，其中绑定值是由两个边界值组成的数组。

```html
<template>
  <div class="slider-demo-block">
    <e-slider-m v-model="value" range show-stops :max="10" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value = ref([4, 8]);
</script>
<style scoped>
  .slider-demo-block {
    display: flex;
    align-items: center;
  }
  .slider-demo-block .ep-slider {
    margin-top: 0;
    margin-left: 12px;
  }
</style>
```

## 垂直模式

将 `vertical` 属性设置为 `true` 启用垂直模式。在垂直模式下，需要设置 `height` 属性。
```html
<template>
  <div class="slider-demo-block">
    <e-slider-m v-model="value" vertical height="200px" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(0);
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .ep-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>


```

## 显示刻度

设置 `marks` 属性可以在滑块上显示刻度。

```html
<template>
  <div class="slider-demo-block">
    <e-slider-m v-model="value" range :marks="marks" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { CSSProperties } from 'vue';

interface Mark {
  style: CSSProperties;
  label: string;
}

type Marks = Record<number, Mark | string>;

const value = ref([30, 60]);
const marks = reactive<Marks>({
  0: '0°C',
  8: '8°C',
  37: '37°C',
  50: {
    style: {
      color: '#1989FA',
    },
    label: '50%',
  },
});
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .ep-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>


```

## API

### Attributes

| **Name**          | **Description**                                                              | **Type**                                                                                                                                                                | **Default** |
| --------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| model-value / v-model | 绑定的值                                                                                | `number`                                                                                                                                                                   | `0`    |
| min                   | 最小值                                                                                  | `number`                                                                                                                                                                   | `0`     |
| max                   | 最大值                                                                                  | `number`                                                                                                                                                                   | `100`   |
| disabled              | 是否禁用滑块                                                                            | `boolean`                                                                                                                                                                 | `false` |
| step                  | 步进大小                                                                                | `number`                                                                                                                                                                   | `1`     |
| show-input            | 是否显示输入框，仅在 `range` 为 `false` 时有效                                          | `boolean`                                                                                                                                                                 | `false` |
| show-input-controls   | 是否显示控制按钮，仅当 `show-input` 为 `true` 时有效                                    | `boolean`                                                                                                                                                                 | `true`  |
| size                  | 滑块包装器的尺寸，不适用于垂直模式                                                      | `string(enum)`---`'large' \| 'default' \| 'small'`                                                                                                                                 | `'default'` |
| input-size            | 输入框的尺寸，当设置 `size` 时，默认值是 `size`                                         | `string(enum)` --- `'large' \| 'default' \| 'small'`                                                                                                                                    | `'default'` |
| show-stops            | 是否显示断点                                                                            | `boolean`                                                                                                                                                                 | `false` |
| show-tooltip          | 是否显示工具提示值                                                                      | `boolean`                                                                                                                                                                  | `true`  |
| format-tooltip        | 工具提示值的格式化方法                                                                  | `function(value)`                                                                                                                                                           | —       |
| range                 | 是否选择一个范围                                                                        | `boolean`                                                                                                                                                                  | `false` |
| vertical              | 垂直模式                                                                                | `boolean`                                                                                                                                                                  | `false` |
| height                | 滑块的高度，在垂直模式下需要设置                                                        | `string`                                                                                                                                                                   | —       |
| label                 | 屏幕阅读器的标签                                                                        | `string`                                                                                                                                                                   | —       |
| range-start-label     | 当 `range` 为 `true` 时，起始范围的屏幕阅读器标签                                       | `string`                                                                                                                                                                   | —       |
| range-end-label       | 当 `range` 为 `true` 时，结束范围的屏幕阅读器标签                                       | `string`                                                                                                                                                                   | —       |
| format-value-text     | 用于显示屏幕阅读器 `aria-valuenow` 属性的格式化方法                                     | `function(value)`                                                                                                                                                           | —       |
| debounce              | 输入时的防抖延迟，以毫秒为单位，仅当 `show-input` 为 `true` 时有效                      | `number`                                                                                                                                                                   | `300`   |
| tooltip-class         | 工具提示的自定义类名                                                                    | `string`                                                                                                                                                                   | —       |
| placement             | 工具提示的位置                                                                          | `string(enum)`---`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `'top'` |
| marks                 | 标记，键的类型必须为 `number`，并必须在封闭区间 `[min, max]` 中，每个标记可以自定义样式 | `number` --- `Record<number, Mark \| string>`                                                                                                                                   | —       |
| validate-event        | 是否触发表单验证                                                                        | `boolean`                                                                                                                                                                 | `true`  |

### Marks Example

```ts
interface Mark {
    style: CSSProperties;
    label: string;
}

type Marks = Record<number, Mark | string>;
const marks = reactive<Marks>({
    0: '0°C',
    8: '8°C',
    37: '37°C',
    50: {
        style: {
            color: '#1989FA'
        },
        label: '50%'
    }
});
```



### Events

| **Name** | **Description**                                       | **Parameters** |
| ------ | ---------------------------------------------------------------- | ---------- |
| change | 当值发生改变时触发（如果正在拖动滑块，此事件仅在释放时触发） | 改变后的值 |
| input  | 当数据发生更改时触发（在滑动过程中会实时发出）                   | 改变后的值 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-slider-m"
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