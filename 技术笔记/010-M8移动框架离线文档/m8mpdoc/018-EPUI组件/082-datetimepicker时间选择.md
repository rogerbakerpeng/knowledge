# DateTime Picker 时间选择

在一个选择器中选择时间。

## 日期和时间

您可以通过将 `type` 设置为 `datetime` 来选择时间。也可使用快捷选项。

#### Default

```html
<template>
  <div class="block">
    <text class="cell-title">Default</text>
    <e-date-picker-m
      v-model="value1"
      type="datetime"
      placeholder="Select date and time"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value1 = ref("");
</script>
```

#### With shortcuts

```html
<template>
  <div class="block">
    <text class="cell-title">With shortcuts</text>
    <e-date-picker-m
      v-model="value2"
      type="datetime"
      placeholder="Select date and time"
      :shortcuts="shortcuts"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value2 = ref("");
  const shortcuts = [
    {
      text: "今天",
      value: new Date(),
    },
    {
      text: "昨天",
      value: () => {
        const date = new Date();

        date.setTime(date.getTime() - 3600 * 1000 * 24);

        return date;
      },
    },
    {
      text: "一周前",
      value: () => {
        const date = new Date();

        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);

        return date;
      },
    },
  ];
</script>
```

#### With default time

```html
<template>
  <div class="block">
    <text class="cell-title">With default time</text>
    <e-date-picker-m
      v-model="value3"
      type="datetime"
      placeholder="Select date and time"
      :default-time="defaultTime1"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value3 = ref("");

  const defaultTime1 = new Date(2000, 1, 1, 12, 0, 0); // '12:00:00'
</script>
```

## 日期时间格式

使用 `format` 控制输入框中显示的文本格式。使用 `value-format` 控制绑定值的格式。

默认情况下，该组件接受并发出 Date 对象。

#### Emits Date object

```html
<template>
  <div class="block">
    <text class="cell-title">Emits Date object</text>
    <div class="demonstration">Value: {{ value4 }}</div>
    <e-date-picker-m
      v-model="value4"
      type="datetime"
      placeholder="Pick a Date"
      format="YYYY/MM/DD HH:mm:ss"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value4 = ref("");
</script>
```

#### Use value-format

```html
<template>
  <div class="block">
    <text class="cell-title">Use value-format</text>
    <div class="demonstration">Value：{{ value5 }}</div>
    <e-date-picker-m
      v-model="value5"
      type="datetime"
      placeholder="Pick a Date"
      format="YYYY/MM/DD hh:mm:ss"
      value-format="YYYY-MM-DD h:m:s a"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value5 = ref("");
</script>
```

#### Timestamp

```html
<template>
  <div class="block">
    <text class="cell-title">Timestamp</text>
    <div class="demonstration">Value：{{ value6 }}</div>
    <e-date-picker-m
      v-model="value6"
      type="datetime"
      placeholder="Pick a Date"
      format="YYYY/MM/DD hh:mm:ss"
      value-format="x"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value6 = ref("");
</script>
```

## 日期和时间范围

通过将 `type` 设置为 `datetimerange`，您可以选择日期和时间范围。

#### Default

```html
<template>
  <div class="block">
    <text class="cell-title">Default</text>
    <e-radio-group-m v-model="size" label="尺寸控制">
      <e-radio-button-m value="large" @click="size = 'large'"
        >大尺寸</e-radio-button-m
      >
      <e-radio-button-m value="default" @click="size = 'default'"
        >默认尺寸</e-radio-button-m
      >
      <e-radio-button-m value="small" @click="size = 'small'"
        >小尺寸</e-radio-button-m
      >
    </e-radio-group-m>
    <e-date-picker-m
      v-model="value7"
      :size="size"
      type="datetimerange"
      range-separator="～"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value7 = ref("");
  const size = ref<"default" | "large" | "small">("default");
</script>
```

#### With shortcuts

支持选择日期范围。

```html
<template>
  <div class="block">
    <text class="cell-title">With shortcuts</text>
    <e-date-picker-m
      v-model="value8"
      type="datetimerange"
      :shortcuts="shortcuts2"
      range-separator="～"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value8 = ref("");
  const shortcuts2 = [
    {
      text: "Last week",
      value: () => {
        const end = new Date();
        const start = new Date();

        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

        return [start, end];
      },
    },
    {
      text: "Last month",
      value: () => {
        const end = new Date();
        const start = new Date();

        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);

        return [start, end];
      },
    },
    {
      text: "Last 3 months",
      value: () => {
        const end = new Date();
        const start = new Date();

        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);

        return [start, end];
      },
    },
  ];
</script>
```

## 开始日期和结束日期的默认时间值

在日期面板上选择日期范围（类型为 datetimerange）时，将使用 `00:00:00` 作为开始日期和结束日期的默认时间值。您可以使用 `default-time` 属性进行控制。`default-time` 接受最多两个 `Date` 对象的数组。第一个项目控制开始日期的时间值，第二个项目控制结束日期的时间值。

#### Start and end date time 12:00:00

```html
<template>
  <div class="block">
    <text class="cell-title">Start and end date time 12:00:00</text>
    <e-date-picker-m
      v-model="value9"
      type="datetimerange"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value9 = ref("");
  const defaultTime1 = new Date(2000, 1, 1, 12, 0, 0); // '12:00:00'
</script>
```

####

```html
<template>
  <div class="block">
    <text class="cell-title"
      >Start date time 12:00:00, end date time 08:00:00</text
    >
    <e-date-picker-m
      v-model="value10"
      type="datetimerange"
      :default-time="defaultTime2"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value10 = ref("");
  const defaultTime2: [Date, Date] = [
    new Date(2000, 1, 1, 12, 0, 0),
    new Date(2000, 2, 1, 8, 0, 0),
  ]; // '12:00:00', '08:00:00'
</script>
```

## API

### Attributes

| 属性名                | 描述                                                     | 类型                                                                                                                                                          | 默认值              |
| ------------------------- | ---------------------------------------- | ------- | ------- |
| model-value / v-model | 绑定值，如果它是一个数组，其长度应为 2                   | `Date` / `number` / `string` / `Array`                                                                                                                        | —                   |
| readonly              | 日期选择器是否只读                                       | boolean                                                                                                                                                       | false               |
| disabled              | 日期选择器是否禁用                                       | boolean                                                                                                                                                       | false               |
| size                  | 输入的大小                                               | `'large' \| 'default' \| 'small'`                                                                                                                             | default             |
| clearable             | 是否显示清除按钮                                         | boolean                                                                                                                                                       | true                |
| placeholder           | 非范围模式下的占位符                                     | string                                                                                                                                                        | —                   |
| type                  | 选择器的类型                                             | 枚举`'year' \| 'month' \|'week' \| 'date' \| 'datetime' \|  'datetimerange' \| 'daterange'`                                                                            | date                |
| format                | 输入框中显示的值的格式                                   | `'YYYY-MM-DD HH:mm:ss' \|'YYYY/MM/DD HH:mm:ss' \|'YYYY-MM-DD' \| 'YYYY-MM' \|  'YYYY-MM-DD HH:mm' \| 'YYYY/MM/DD' \| 'YYYY/MM' \|'YYYY' \|'YYYY/MM/DD HH:mm'` | YYYY-MM-DD HH:mm:ss |
| validate-event        | 是否触发表单验证                                         | boolean                                                                                                                                                       | true                |
 |popper-class | 日期选择器下拉菜单的自定义类名 | string | —   |
| range-separator       | 范围分隔符                                               | string                                                                                                                                                        | ～                   |
| default-value         | 可选，日历的默认日期                                     | `Date` / `[Date, Date]`                                                                                                                                       | —                   |
| default-time          | 可选，选择日期范围时要使用的时间值                       | `Date` / `[Date, Date]`                                                                                                                                       | —                   |
| value-format          | 可选，绑定值的格式。如果未指定，绑定值将是一个 Date 对象 | `YYYY` / `MM` / `DD` / `YYYY/MM/DD HH:mm`/`YYYY/MM/DD` / `YYYY-MM-DD` / `YYYY-MM-DD HH:mm`/ `YYYY-MM-DD HH:mm:ss`/ `YYYY-MM-DD HH:mm:ss a`/ `x`                                        | —                   |
| id                    | 与本机输入中的 `id` 属性相同                             | string / `[string, string]`                                                                                                                                   | —                   |
| name                  | 与本机输入中的 `name` 属性相同                           | string                                                                                                                                                        | —                   |
| suffix-icon           | 自定义后缀图标组件                                       | `string \| Component`                                                                                                                                         | Calendar            |
| clear-icon            | 自定义清除图标组件                                       | `string \| Component`                                                                                                                                         | CircleClose         |
| shortcuts            | 设置快捷选项的对象数组	| object`Array<{ text: string, value: date / function () =>  date/array }` | —  |
| disabled-date         | 用于确定日期是否禁用的函数，以日期作为参数，应返回布尔值   | Function`(data: Date) => boolean`                              | —                   |
| cell-class-name       | 设置自定义类名                                           | Function`(date: Date) =>string`| —                   |

### Events

| Name            | Description                                               | Parameters                      |
| --------------- | --------------------------------------------------------- | ------------------------------- |
| change          | 当选定的值发生变化时触发                                  | 当前选定的值                    |
| blur            | 当输入框失去焦点时触发                                    | (event: FocusEvent)             |
| focus           | 当输入框获得焦点时触发                                    | (event: FocusEvent)             |
| calendar-change | 当日历选择的日期发生更改时触发。仅适用于 `daterange` 类型 | 移除的标签值                    |
| panel-change    | 当导航按钮被点击时触发                                    | —                               |
| visible-change  | 当下拉菜单出现/消失时触发                                 | 当它出现时为 true，否则为 false |

### Methods

| Method | Description      | Parameters |
| ------ | ---------------- | ---------- |
| focus  | 让输入框获得焦点 | —          |

### Slots

| Name      | Description      | Subtags |
| --------- | ---------------- | ------- |
| `default`       | 自定义单元格内容               |          |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-datetime-picker-m"
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