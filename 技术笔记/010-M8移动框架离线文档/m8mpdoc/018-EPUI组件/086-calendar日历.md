# Calendar 日历

显示日期。

## 基本

设置 `value` 来指定当前显示的月份。如果未指定 `value`，将显示当前月份。`value` 支持双向绑定。

```html
<template>
  <div class="block">
    <e-calendar-m v-model="value" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value = ref(new Date());
</script>
```

## 自定义内容

通过设置 `scoped-slot` 命名为 `date-cell` 来自定义在日历单元格中显示的内容。在 `scoped-slot` 中，您可以获取日期（当前单元格的日期）、数据（包括类型、是否被选中、日期属性）。更多详情，请参阅下面的 API 文档。

```html
<template>
  <div class="block">
    <e-calendar-m>
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(2)[0] }} {{ data.isSelected ? '✔️' : ''
          }}
        </p>
      </template>
    </e-calendar-m>
  </div>
</template>

<style lang="scss" scoped>
  .is-selected {
    color: #1989fa;
  }
</style>
```

## 范围

设置 `range` 属性来指定日历的显示范围。起始时间必须为星期一，结束时间必须为星期日，时间跨度不得超过两个月。

```html
<template>
  <div class="block">
    <e-calendar-m
      :range="[new Date(2019, 2, 4), new Date(2019, 2, 24)]"
    ></e-calendar-m>
  </div>
</template>
```

## 自定义标题

```html
<template>
  <div class="block">
    <e-calendar-m ref="calendar">
      <template #header="{ date }">
        <span>Custom header content</span>
        <span>{{ date }}</span>
        <e-button-group-m>
          <e-button-m size="small" @click="selectDate('prev-year')"
            >Previous Year</e-button-m
          >
          <e-button-m size="small" @click="selectDate('prev-month')"
            >Previous Month</e-button-m
          >
          <e-button-m size="small" @click="selectDate('today')"
            >Today</e-button-m
          >
          <e-button-m size="small" @click="selectDate('next-month')"
            >Next Month</e-button-m
          >
          <e-button-m size="small" @click="selectDate('next-year')"
            >Next Year</e-button-m
          >
        </e-button-group-m>
      </template>
    </e-calendar-m>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const calendar = ref();
  const selectDate = (val: string) => {
    calendar.value.selectDate(val);
  };
</script>
```

## API

### Attributes

| 属性名                | 描述                                                                                                                   | 类型                 | 默认值 |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------- | ------ |
| model-value / v-model | 绑定值                                                                                                                 | Date                 | —      |
| isLunarShow           | 是否展示农历                                                                                                           | Boolean              | false  |
| range                 | 时间范围，包括起始时间和结束时间。起始时间必须为每周的开始日期，结束时间必须为每周的结束日期，时间跨度不得超过两个月。 | array `[Date, Date]` |        |

### Slots

| Name      | Description                                                                                                                                                                      | Subtags                                                                                                                     |
| --------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| date-cell | `type` 表示日期属于哪个月份，可选值为 `prev-month`、`current-month`、`next-month`；`isSelected`表示日期是否被选中；day 是以`YYYY-MM-DD` 格式表示的日期；`date` 是单元格代表的日期 | object: `{ data: { type: 'prev-month' \| 'current-month' \| 'next-month', isSelected: boolean, day: string, date: Date } }` |
| header    | 日历标题的内容                                                                                                                                                                   | object: { date: string }                                                                                                    |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-calendar-m"
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