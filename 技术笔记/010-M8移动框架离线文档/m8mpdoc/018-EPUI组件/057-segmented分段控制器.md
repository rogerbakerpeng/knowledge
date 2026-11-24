# Segmented 分段控制器

用于展示多个选项并允许用户选择其中单个选项。

## 基础用法

设置 `v-model` 为选项值。

```html
<template>
  <e-segmented-m v-model="value" :options="options" size="large" />
  <e-segmented-m v-model="value" :options="options" size="default" style="margin-top: 10px" />
  <e-segmented-m v-model="value" :options="options" size="small" style="margin-top: 10px" />
</template>

<script setup>
import { ref } from 'vue';
const value = ref('Mon');
const options = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
</script>
```

## 配置方向

```html
<template>
	<div>
      <e-segmented-m v-model="size" :options="sizeOptions" style="margin-bottom: 1rem" />
      <e-segmented-m v-model="direction" :options="directionOptions" style="margin-bottom: 1rem" />
      <e-segmented-m v-model="value2" :options="options2" :direction="direction" :size="size">
        <template #default="scope">
          <div :class="['flex', 'items-center', 'gap-2', 'flex-col', direction === 'horizontal' && 'p-2']">
            <e-icon-m size="20" :name="scope.item.icon"></e-icon-m>
            <div>{{ scope.item.label }}</div>
          </div>
        </template>
      </e-segmented-m>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const value2 = ref('Apple');
const direction = ref('horizontal');
const size = ref('default');
const directionOptions = [
  { label: 'Horizontal', value: 'horizontal' },
  { label: 'Vertical', value: 'vertical' }
];
const sizeOptions = ['large', 'default', 'small'];
const options2 = [
  { label: 'Apple', value: 'Apple', icon: 'Apple' },
  { label: 'Cherry', value: 'Cherry', icon: 'Cherry' },
  { label: 'Grape', value: 'Grape', icon: 'Grape' },
  { label: 'Orange', value: 'Orange', icon: 'Orange' },
  { label: 'Pear', value: 'Pear', icon: 'Pear', disabled: true }
];
</script>
```

## 禁用状态

```html
<template>
  <e-segmented-m v-model="value3" :options="options3" disabled />
  <e-segmented-m v-model="value3" :options="options3" style="margin-top: 10px" />
</template>

<script setup>
import { ref } from 'vue';
const value3 = ref('Mon');
const options3 = [
  { label: 'Mon', value: 'Mon', disabled: true },
  { label: 'Tue', value: 'Tue' },
  { label: 'Wed', value: 'Wed', disabled: true },
  { label: 'Thu', value: 'Thu' },
  { label: 'Fri', value: 'Fri', disabled: true },
  { label: 'Sat', value: 'Sat' },
  { label: 'Sun', value: 'Sun' }
];
</script>
```

## Block 分段选择器

```html
<template>
  <e-segmented-m v-model="value4" :options="options4" block />
</template>

<script setup>
import { ref } from 'vue';
const value4 = ref('Mon');
const options4 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday long long long long long long long'];
</script>
```

## 自定义内容

```html
<template>
  <e-segmented-m v-model="value2" :options="options2">
    <template #default="scope">
      <div class="flex flex-col items-center gap-2 p-2">
        <e-icon-m size="20" :name="scope.item.icon"></e-icon-m>
        <div>{{ scope.item.label }}</div>
      </div>
    </template>
  </e-segmented-m>
</template>

<script setup>
import { ref } from 'vue';
const value2 = ref('Apple');
const options2 = [
  { label: 'Apple', value: 'Apple', icon: 'Apple' },
  { label: 'Cherry', value: 'Cherry', icon: 'Cherry' },
  { label: 'Grape', value: 'Grape', icon: 'Grape' },
  { label: 'Orange', value: 'Orange', icon: 'Orange' },
  { label: 'Pear', value: 'Pear', icon: 'Pear', disabled: true }
];
</script>
```

## 自定义样式

```html
<template>
  <div class="custom-style">
    <e-segmented-m v-model="value5" :options="options5" block />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const value5 = ref('Delicacy');
const options5 = ['Delicacy', 'Desserts&Drinks', 'Fresh foods', 'Supermarket'];
</script>

<style lang="scss" scoped>
.custom-style {
  height: 50px;
  .ep-segmented {
    --e-segmented-item-selected-color: var(--e-text-color-primary);
    --e-segmented-item-selected-bg-color: #ffd100;
    --e-border-radius-base: 16px;
  }
}
</style>
```

---

## API

### Attributes

| **Name**       | **Description**        | **Type**                                 | **Default**    |
| -------------- | ---------------------- | ---------------------------------------- | -------------- |
| v-model        | 绑定值                 | `string` / `number` / `boolean`          | —              |
| options        | 选项列表               | `array` `Option[]`                       | `[]`           |
| size           | 尺寸                   | `enum` `''｜'large'｜'default'｜'small'` | —              |
| block          | 撑满父元素宽度         | `boolean`                                | —              |
| disabled       | 是否禁用               | `boolean`                                | `false`        |
| validate-event | 是否触发表单验证       | `boolean`                                | `true`         |
| name           | 原生 `name` 属性       | `string`                                 | —              |
| id             | 原生 `id` 属性         | `string`                                 | —              |
| aria-label     | 原生 `aria-label` 属性 | `string`                                 | —              |
| direction      | 展示的方向             | `enum` `'horizontal'｜'vertical'`        | `'horizontal'` |

### Events

| **Name** | **Description**                        | **Type**                        |
| -------- | -------------------------------------- | ------------------------------- |
| change   | 当所选值更改时触发，参数是当前选中的值 | `Function` `(val: any) => void` |

### Slots

| **Name** | **Description**    | **Type**                    |
| -------- | ------------------ | --------------------------- |
| default  | 自定义 Option 模板 | `object` `{ item: Option }` |



## Type Declarations

```typescript
type Option =
  | {
      label: string;
      value: string | number | boolean;
      disabled?: boolean;
      [key: string]: any;
    }
  | string
  | number
  | boolean;
```

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-segmented-m"
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