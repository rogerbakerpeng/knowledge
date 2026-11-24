# TimeSelect 时间选择

使用时间选择进行时间输入。

可用的时间范围是 `00:00` 至 `23:59`。

## 固定时间选择器

为用户提供一组固定时间供选择。

使用 `ep-time-select` 标签，然后使用 `start`、`end` 和 `step` 分别指定开始时间、结束时间和时间步长。

```html
<template>
  <div class="block">
    <text class="cell-title">基本用法</text>
    <e-time-select-m v-model="value" start="08:30" step="00:15" end="18:30" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value = ref("");
</script>
```

## 时间格式

使用 `format` 控制时间的格式（小时和分钟）。

```html
<template>
  <div class="block">
    <text class="cell-title">基本用法</text>
    <e-time-select-m
      v-model="value1"
      start="00:00"
      step="00:30"
      end="23:59"
      placeholder="Select time"
      format="hh:mm A"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value1 = ref("");
</script>
```

## 固定时间范围 1

```html
<template>
  <div class="block">
    <text class="cell-title">固定时间范围</text>
    <e-time-select-m
      v-model="value2"
      range
      start="08:45"
      step="00:15"
      end="18:30"
      placeholder="Select time"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value2 = ref("");
</script>
```

## 固定时间范围 2

```html
<template>
  <div class="block">
    <text class="cell-title">固定时间范围2</text>
    <e-time-select-m
      v-model="startTime"
      :max-time="endTime"
      placeholder="Start time"
      start="08:30"
      step="00:15"
      end="18:30"
    />
    <e-time-select-m
      v-model="endTime"
      :min-time="startTime"
      placeholder="End time"
      start="08:30"
      step="00:15"
      end="18:30"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const startTime = ref("");
  const endTime = ref("");
</script>
```

## API

### Attributes

| Name            | Description                                               | Parameters                      |
| --------------- | --------------------------------------------------------- | ------------------------------- |
| model-value / v-model | 绑定值，如果它是一个数组，其长度应为 2   |  string / Array                                                    | —                 |
| disabled              | 时间选择器是否禁用                       | boolean                                                                  | false             |
| size                  | 输入的大小                               | `'large' \| 'default' \| 'small'`                                        | default           |
| clearable             | 是否显示清除按钮                         | boolean                                                                  | true              |
| placeholder           | 非范围模式下的占位符                     | string                                                                   | —                 |
| format                | 输入框中显示的值的格式                   | `'HH:mm' \| 'HH:mm A' \| 'HH:mm a' \|'hh:mm' \| 'hh:mm A' \| 'hh:mm a' ` | HH:mm             |     |
| range-separator       | 范围分隔符                               | string                                                                   | '-'               |
| name                  | 与本机输入中的 `name` 属性相同           | string                                                                   | —                 |
| start                 | 开始时间                                 | string                                                                   | 09:00             |
| end                   | 结束时间                                 | string                                                                   | 18:00             |
| step                  | 时间步长                                 | string                                                                   | 00:30             |
| min-time              | 最小时间，该时间之前的任何时间都将不展示 | string                                                                   | —                 |
| max-time              | 最大时间，该时间之后的任何时间都将不展示 | string                                                                   | —                 |
| suffix-icon           | 自定义后缀图标组件                       | `string \| Component`                                                    | Calendar          |
| clear-icon            | 自定义清除图标组件                       | `string \| Component`                                                    | CircleCloseFilled |

### Events

| Name   | Description              | Parameters          |
| ------ | ------------------------ | ------------------- |
| change | 当选定的值发生变化时触发 | 当前选定的值        |
| blur   | 当输入框失去焦点时触发   | (event: FocusEvent) |
| focus  | 当输入框获得焦点时触发   | (event: FocusEvent) |

### Methods

| Method | Description        | Parameters |
| ------ | ------------------ | ---------- |
| focus  | 让输入框获得焦点   | () => void |
| blur   | 使输入组件失去焦点 | () => void |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-time-select-m"
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