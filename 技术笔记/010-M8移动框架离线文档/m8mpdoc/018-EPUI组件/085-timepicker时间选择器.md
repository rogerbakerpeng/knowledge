# TimePicker 时间选择器

在一个选择器中选择时间。

## 任意时间选择器

可以选择任意时间。

默认情况下，您可以通过手势上下滑动来选择时间。

```html
<template>
  <div class="block">
    <e-time-picker-m v-model="value1" placeholder="Arbitrary time" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value1 = ref("");
</script>
```

## 限制时间范围

您还可以限制时间范围。

通过指定 `disabledHours`、`disabledMinutes` 和 `disabledSeconds` 来限制时间范围。

```html
<template>
  <div class="block">
    <e-time-picker-m
      v-model="value2"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
      placeholder="Arbitrary time"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value2 = ref(new Date(2016, 9, 10, 18, 30));

  const makeRange = (start: number, end: number) => {
    const result: number[] = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  };
  const disabledHours = () => {
    return makeRange(0, 16).concat(makeRange(19, 23));
  };
  const disabledMinutes = (hour: number) => {
    if (hour === 17) {
      return makeRange(0, 29);
    }
    if (hour === 18) {
      return makeRange(31, 59);
    }
  };
  const disabledSeconds = (hour: number, minute: number) => {
    if (hour === 18 &&
     minute === 30) {
      return makeRange(1, 59);
    }
  };
</script>
```

## 任意时间范围

可以选择任意时间范围。

通过添加 `is-range` 属性来选择时间范围。

```html
<template>
  <div class="block">
    <e-time-picker-m v-model="value3" is-range range-separator="～" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value3 = ref<any>([
    new Date(2016, 9, 10, 8, 40),
    new Date(2016, 9, 10, 9, 40),
  ]);
</script>
```

## API

### Attributes

| 属性名                | 描述                                   | 类型                                                                                      | 默认值      |
| --------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------- | ----------- |
| model-value / v-model | 绑定值，如果它是一个数组，其长度应为 2 | `number` / `string` / `Date` / `[Date, Date]` / `[number, number]`/ `[string, string]   ` | —           |
| readonly              | 时间选择器是否只读                     | boolean                                                                                   | false       |
| disabled              | 时间选择器是否禁用                     | boolean                                                                                   | false       |
| clearable             | 是否显示清除按钮                       | boolean                                                                                   | true        |
| size                  | 输入的大小                             | `'large' \| 'default' \| 'small'`                                                         | default     |
| placeholder           | 占位符                   | string                                                                                    | —           |
| is-range	           | 是否选择时间范围	| boolean                        | false           |
| format                | 输入框中显示的值的格式                 | `'HH:mm:ss' \|'HH:mm' \| 'hh:mm:ss a' \|  'hh:mm:ss A' \| 'hh:mm a' \| 'hh:mm A'`         | -           |
| popper-class          | 时间选择器下拉菜单的自定义类名         | string                                                                                    | —           |
| range-separator       | 范围分隔符                             | string                                                                                    | -           |
| default-value         | 可选，日历的默认日期                   | `Date` / `[Date, Date]`                                                                   | —           |
| id                    | 与本机输入中的 `id` 属性相同           | string / `[string, string]`                                                               | —           |
| name                  | 与本机输入中的 `name` 属性相同         | string                                                                                    | —           |
| suffix-icon           | 自定义后缀图标组件                     | `string \| Component`                                                                     | Calendar    |
| clear-icon            | 自定义清除图标组件                     | `string \| Component`                                                                     | CircleClose |
| disabled-hours        | 指定不能选择的小时数组                 | Function`(role: string, comparingDate?: Dayjs) => number[]`                               | —           |
| disabled-minutes      | 指定不能选择的分钟数组                 | Function`(hour: number, role: string, comparingDate?: Dayjs) => number[]`                 | —           |
| disabled-seconds      | 指定不能选择的秒数组                   | Function`(hour: number, minute: number, role: string, comparingDate?: Dayjs) => number[]` | —           |
| tabindex              | 输入的 tabindex                        | `string \| number`                                                                        | 0           |

### Events

| Name           | Description               | Parameters                    |
| -------------- | ------------------------- | ----------------------------- |
| change         | 当选定的值发生变化时触发  | `(val: number \| string \| Date \| [number, number] \| [string, string] \| [Date, Date]) => void`            |
| blur           | 当输入框失去焦点时触发    | (event: FocusEvent)           |
| focus          | 当输入框获得焦点时触发    | (event: FocusEvent)           |
| visible-change | 当下拉菜单出现/消失时触发 | (visibility: boolean) => void |

### Methods

| Method      | Description        | Parameters |
| ----------- | ------------------ | ---------- |
| focus       | 让输入框获得焦点   | (e: FocusEvent \| undefined) => void|
| blur        | 使输入组件失去焦点 | (e: FocusEvent \| undefined) => void         |
| handleOpen  | 打开时间选择器弹窗 |() => void          |
| handleClose | 关闭时间选择器弹窗 | () => void|

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-time-picker-m"
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