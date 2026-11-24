# DatePicker 日期选择

使用日期选择器进行日期输入。

## 基本用法

基本日期选择器以"天"为单位。

测量方式由 `type` 属性确定。

```html
<template>
  <div class="block">
    <text class="cell-title">一般使用</text>
    <e-date-picker-m
      v-model="datepickerValue"
      :default-value="currentDate"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
      type="date"
      placeholder="Pick a day"
      @change="change"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const datepickerValue = ref("");
  const currentDate = new Date().getTime();
  const change = (date) => {
    console.log(date, "change outside");
  };
</script>
```

## 禁用日期

可将不支持用户选的日期禁止点击，禁用日期由 `disabledDate` 设置，它是一个函数。

```html
<template>
  <div class="block">
    <text class="cell-title">禁用日期</text>
    <e-date-picker-m
      v-model="value14"
      :default-value="currentDate"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
      type="date"
      placeholder="Pick a day"
      :disabled-date="disabledDate"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value14 = ref("");
  const currentDate = new Date().getTime();
  const disabledDate = (time: Date) => {
      return time.getTime() > Date.now();
  };
</script>
```

## 禁用周末的日期选择器

```html
<template>
  <div class="block">
    <text class="cell-title">禁用周末的日期选择器</text>
    <e-date-picker-m
      v-model="value15"
      type="date"
      placeholder="请选择日期"
      :disabled-date="disabledDate2"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value15 = ref("");

  const disabledDate2 = (time: Date) => {
    // 获取星期几（0是周日，6是周六）
    const day = time.getDay();

    // 如果是周六(6)或周日(0)，则禁用
    return day === 0 || day === 6;
  };
</script>
```

## 其他测量方式

#### 扩展标准日期选择器组件选择周选择器

您可以通过扩展标准日期选择器组件选择周、月、年或多个日期。

```html
<template>
  <div class="block">
    <text class="cell-title">week</text>
    <e-date-picker-m v-model="value1" type="week" placeholder="Pick a week" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value1 = ref("");
</script>
```

#### 扩展标准日期选择器组件选择月选择器

```html
<template>
  <div class="block">
    <text class="cell-title">month</text>
    <e-date-picker-m v-model="value2" type="month" placeholder="Pick a month" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value2 = ref("");
</script>
```

#### 扩展标准日期选择器组件选择年选择器

```html
<template>
  <div class="block">
    <text class="cell-title">year</text>
    <e-date-picker-m v-model="value3" type="year" placeholder="Pick a year" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value3 = ref("");
</script>
```

#### 扩展标准日期选择器组多选选择器

```html
<template>
  <div class="block">
    <text class="cell-title">Dates</text>
    <e-date-picker-m v-model="value4" type="dates" placeholder="Pick a year" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value4 = ref("");
</script>
```

## 日期范围

支持选择日期范围。

```html
<template>
  <div class="block">
    <text class="cell-title">日期范围</text>
    <e-date-picker-m v-model="value5" type="daterange" range-separator="～" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value5 = ref("");
</script>
```

## 月份范围

支持选择月份范围。

```html
<template>
  <div class="block">
    <text class="cell-title">月份范围</text>
    <e-date-picker-m v-model="value6" type="monthrange" range-separator="～" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value6 = ref("");
</script>
```

## 默认值

如果用户没有选择日期，默认情况下显示今天的日历。您可以使用 `default-value` 设置另一个日期。其值应该可解析为 `new Date()`。

如果类型是 `daterange`，`default-value` 应为数组。

```html
<template>
  <div class="block">
    <text class="cell-title">默认值</text>
    <h4>date</h4>
    <e-date-picker-m
      v-model="value7"
      type="date"
      placeholder="Pick a date"
      :default-value="new Date(2010, 9, 1)"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value7 = ref("");
</script>
```

```html
<template>
  <div class="block">
    <h4>daterange</h4>
    <e-date-picker-m
      v-model="value8"
      type="daterange"
      :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value8 = ref("");
</script>
```

## 自定义每周起始日

使用 `first-day-of-week` 属性可以配置每周的第一天是哪一天。值为 `1-7`，分别代表周一到周日。

```html
<template>
  <div class="block">
    <text class="cell-title">周一作为一周的第一天</text>
    <e-date-picker-m
      v-model="value16"
      type="date"
      placeholder="请选择日期"
      :first-day-of-week="1"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value16 = ref("");
</script>
```

```html
<template>
  <div class="block">
    <h4 class="demonstration">周日作为一周的第一天（默认）</h4>
    <e-date-picker-m
      v-model="value17"
      type="date"
      placeholder="请选择日期"
      :first-day-of-week="7"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value17 = ref("");
</script>
```

## 日期格式

使用 `format` 来控制输入框中显示文本的格式。使用 `value-format` 来控制绑定值的格式。

默认情况下，组件接受并发出 `Date` 对象。

#### Emits Date object

```html
<template>
  <div class="block">
    <text class="cell-title">Emits Date object</text>
    <div class="demonstration">Value: {{ value9 }}</div>
    <e-date-picker-m
      v-model="value9"
      type="date"
      placeholder="Pick a Date"
      format="YYYY/MM/DD"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value9 = ref("");
</script>
```

#### value-format

```html
<template>
  <div class="block">
    <text class="cell-title">Use value-format</text>
    <div class="demonstration">Value：{{ value10 }}</div>
    <e-date-picker-m
      v-model="value10"
      type="date"
      placeholder="Pick a Date"
      format="YYYY/MM/DD"
      value-format="YYYY-MM-DD"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value10 = ref("");
</script>
```

#### Timestamp

```html
<template>
  <div class="block">
    <text class="cell-title">Timestamp</text>
    <div class="demonstration">Value：{{ value11 }}</div>
    <e-date-picker-m
      v-model="value11"
      type="date"
      placeholder="Pick a Date"
      format="YYYY/MM/DD"
      value-format="x"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value11 = ref("");
</script>
```

## 开始日期和结束日期的默认时间

在选择日期范围时，您可以为开始日期和结束日期分配时间部分。

默认情况下，开始日期和结束日期的时间部分都为 `00:00:00`。设置 `default-time` 可以分别更改它们的时间。它接受最多两个日期对象的数组。第一个字符串设置开始日期的时间，第二个设置结束日期的时间。

```html
<template>
  <div class="block">
    <text class="cell-title">开始日期和结束日期的默认时间</text>
    <p>Component value：{{ value12 }}</p>
    <e-date-picker-m
      v-model="value12"
      type="daterange"
      :default-time="defaultTime"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value12 = ref("");
  const defaultTime = ref<[Date, Date]>([
    new Date(2000, 1, 1, 0, 0, 0),
    new Date(2000, 2, 1, 23, 59, 59),
  ]);
</script>
```

## 设置后缀的自定义内容

后缀的内容可以自定义。

```html
<template>
  <div class="block">
    <text class="cell-title">设置后缀图标的自定义内容</text>
    <e-date-picker-m v-model="value13" type="date" :suffix-icon="suffixIcon" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value13 = ref("");

  const suffixIcon = "Check";
</script>
```

## 自定义内容

单元格的内容可以自定义，在作用域插槽中，您可以获取单元格数据。

```html
<template>
  <div class="block">
    <text class="cell-title">自定义内容</text>
    <e-date-picker-m
      v-model="value18"
      type="date"
      placeholder="请选择日期"
      format="YYYY/MM/DD"
      value-format="YYYY-MM-DD"
    >
      <template #default="{ data }">
        {{ data.text }}
        <span v-if="isHoliday(data)" class="holiday"></span>
      </template>
    </e-date-picker-m>
  </div>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    const holidays = ['2021-10-01', '2021-10-02', '2021-10-03', '2021-10-04', '2021-10-05', '2021-10-06', '2021-10-07'];
    const value18 = ref("2021-10-29");
    const isHoliday = (dayjs) => {
      dayjs = dayjs.day;

      return holidays.includes(dayjs);
  };

  <style scoped lang="scss">
  .holiday {
      position: absolute;
      width: 6px;
      height: 6px;
      background: var(--e-color-danger);
      border-radius: 50%;
      bottom: 0px;
      left: 50%;
      transform: translateX(-50%);
  }
  </style>
</script>
```

## 尺寸控制

可以根据大小进行尺寸的控制功能

```html
<template>
  <div class="block">
    <text class="cell-title">尺寸控制</text>

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
      v-model="value19"
      :default-value="currentDate"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
      type="date"
      placeholder="Pick a day"
      :size="size"
      @change="change"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value19 = ref("");
  const size = ref<"default" | "large" | "small">("default");
  const currentDate = new Date().getTime();
  const change = (date) => {
    console.log(date, "change outside");
  };
</script>
```


## API

### Attributes

| 属性名                    | 描述                                     | 类型    | 默认值  |
| ------------------------- | ---------------------------------------- | ------- | ------- |
| model-value / v-model | 绑定值，如果它是一个数组，其长度应为 2                   | `Date` / `number` / `string` / `Array`                                                                                  | —           |
| readonly              | 日期选择器是否只读                                       | boolean                                                                                                                 | false       |
| disabled              | 日期选择器是否禁用                                       | boolean                                                                                                                 | false       |
| size                  | 输入的大小                                               | `'large' \| 'default' \| 'small'`                                                                                       | default     |
| is-lunar-show         | 是否展示农历                                             | boolean                                                                                                                 | false        |
| clearable             | 是否显示清除按钮                                         | boolean                                                                                                                 | true        |
| placeholder           | 非范围模式下的占位符                                     | string                                                                                                                  | —           |
| type                  | 选择器的类型                                             | 枚举`'year' \| 'month' \| 'date' \| 'dates' \| 'datetime' \| ' week' \| 'datetimerange' \| 'daterange' \| 'monthrange'` | date        |
| format                | 输入框中显示的值的格式  | `'YYYY-MM-DD' \| 'YYYY-MM' \| 'MM-DD' \| 'YYYY-MM-DD HH:mm' \| 'YYYY/MM/DD' \| 'YYYY/MM' \| 'MM/DD' \| 'YYYY/MM/DD HH:mm'` | YYYY-MM-DD  |
| first-day-of-week     | 每周起始星期，取值是 1~7                                 | number                                                                                                                  | 7           |
| validate-event        | 是否触发表单验证                                         | boolean                                                                                                                 | true        |
|popper-class | 日期选择器下拉菜单的自定义类名 | string | —   |
| range-separator       | 范围分隔符                                               | string                                                                                                                  |  ～           |
| default-value         | 可选，日历的默认日期                                     | `Date` / `[Date, Date]`                                                                                                 | —           |
| default-time          | 可选，选择日期范围时要使用的时间值                       | `Date` / `[Date, Date]`                                                                                                 | —           |
| value-format          | 可选，绑定值的格式。如果未指定，绑定值将是一个 Date 对象 | `YYYY` / `MM` /  `DD` / `YYYY/MM/DD HH:mm`/`YYYY/MM/DD` / `YYYY-MM-DD` / `YYYY-MM-DD HH:mm`/ `x`   | —           |
| id                    | 与本机输入中的 `id` 属性相同                             | string / `[string, string]`                                                                                             | —           |
| name                  | 与本机输入中的 `name` 属性相同                           | string                                                                                                                  | —           |
| suffix-icon           | 自定义前缀图标组件                                       | `string \| Component`                                                                                                   | Calendar    |
| clear-icon            | 自定义清除图标组件                                       | `string \| Component`                                                                                                   | CircleClose |
| disabled-date         | 用于确定日期是否禁用的函数，以日期作为参数，应返回对象 | Function`(data: Date) => boolean`                                                                                       | —           |
| cell-class-name       | 设置自定义类名                                           | Function`(date: Date) =>string`                                                                                         | —           |

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

| Method      | Description          | Parameters |
| ----------- | -------------------- | ---------- |
| focus       | 让输入框获得焦点     | —          |
| handleOpen  | 打开日期选择器弹出框 | —          |
| handleClose | 关闭日期选择器弹出框 | —          |

### Slots

| Name      | Description      | Subtags |
| --------- | ---------------- | ------- |
| `default`       | 自定义单元格内容               |          |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-date-picker-m"
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