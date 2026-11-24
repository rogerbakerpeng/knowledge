# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

## 线性进度条

使用 `percentage` 属性设置百分比。这是**必需的**，必须在 `0-100` 之间。您可以通过设置 `format` 来自定义文本格式。

```html
<template>
  <div class="demo-progress">
    <e-progress-m :percentage="50" />
    <e-progress-m :percentage="100" :format="format" />
    <e-progress-m :percentage="100" status="success" />
    <e-progress-m :percentage="100" status="warning" />
    <e-progress-m :percentage="50" status="exception" />
  </div>
</template>

<script lang="ts" setup>
const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`);
</script>

<style scoped>
.demo-progress .ep-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
```

## 内部百分比

在这种情况下，百分比不占用额外的空间。

`stroke-width` 属性决定了进度条的宽度，使用 `text-inside` 属性将描述放在进度条内部。

```html
<template>
  <div class="demo-progress">
    <e-progress-m :text-inside="true" :stroke-width="26" :percentage="70" />
    <e-progress-m :text-inside="true" :stroke-width="24" :percentage="100" status="success" />
    <e-progress-m :text-inside="true" :stroke-width="22" :percentage="80" status="warning" />
    <e-progress-m :text-inside="true" :stroke-width="20" :percentage="50" status="exception" />
  </div>
</template>

<style scoped>
.demo-progress .ep-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
```

## 自定义颜色

您可以使用 `color` 属性来设置进度条的颜色。它接受颜色字符串、函数或数组。

```html
<template>
  <div class="demo-progress">
    <e-progress-m :percentage="percentage" :color="customColor" />
    <e-progress-m :percentage="percentage" :color="customColorMethod" />
    <e-progress-m :percentage="percentage" :color="customColors" />
    <e-progress-m :percentage="percentage" :color="customColors" />
    <div>
       <e-button-group-m class="btn-group">
          <e-button-m @click="decrease">—</e-button-m>
          <e-button-m @click="increase">+</e-button-m>
       </e-button-group-m>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const percentage = ref(20);
const customColor = ref('#409eff');
const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
];
const customColorMethod = (percentage: number) => {
  if (percentage < 30) {
    return '#909399';
  }
  if (percentage < 70) {
    return '#e6a23c';
  }
  return '#67c23a';
};
const increase = () => {
  percentage.value += 10;
  if (percentage.value > 100) {
    percentage.value = 100;
  }
};
const decrease = () => {
  percentage.value -= 10;
  if (percentage.value < 0) {
    percentage.value = 0;
  }
};
</script>
<style scoped>
.demo-progress .ep-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
```

## 圆形进度条

您可以指定 `type` 属性为 `circle` 以使用圆形进度条，使用 `width` 属性来改变圆的大小。

```html
<template>
  <div class="demo-progress">
    <e-progress-m type="circle" :percentage="0" />
    <e-progress-m type="circle" :percentage="25" />
    <e-progress-m type="circle" :percentage="100" status="success" />
    <e-progress-m type="circle" :percentage="70" status="warning" />
    <e-progress-m type="circle" :percentage="50" status="exception" />
  </div>
</template>
<style scoped>
.demo-progress .ep-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .ep-progress--circle {
  margin-right: 15px;
}
</style>
```

## 仪表板进度条

您也可以指定 `type` 属性为 `dashboard` 以使用仪表板进度条。

```html
<template>
  <div class="demo-progress">
    <e-progress-m type="dashboard" :percentage="percentage" :color="colors" />
    <e-progress-m type="dashboard" :percentage="percentage2" :color="colors" />
    <div>
      <e-button-group-m>
        <e-button-m @click="decrease">—</e-button-m>
        <e-button-m @click="increase">+</e-button-m>
      </e-button-group-m>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const percentage = ref(10);
const percentage2 = ref(0);

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
];

const increase = () => {
  percentage.value += 10;
  if (percentage.value > 100) {
    percentage.value = 100;
  }
};
const decrease = () => {
  percentage.value -= 10;
  if (percentage.value < 0) {
    percentage.value = 0;
  }
};
onMounted(() => {
  setInterval(() => {
    percentage2.value = (percentage2.value % 100) + 10;
  }, 500);
});
</script>
<style scoped>
.demo-progress .e-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .e-progress--circle {
  margin-right: 15px;
}
</style>
```

## 自定义内容

使用默认插槽添加自定义内容。

```html
<template>
  <div class="demo-progress">
    <e-progress-m :percentage="50">
      <e-button-m text>Content</e-button-m>
    </e-progress-m>
    <e-progress-m :text-inside="true" :stroke-width="20" :percentage="50" status="exception">
      <span>Content</span>
    </e-progress-m>
    <e-progress-m type="circle" :percentage="100" status="success">
      <e-button-m type="success" :icon="Check" circle />
    </e-progress-m>
    <e-progress-m type="dashboard" :percentage="80">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">Progressing</span>
      </template>
    </e-progress-m>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.demo-progress .ep-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .ep-progress--circle {
  margin-right: 15px;
}
</style>

```

## 不确定进度

使用 `indeterminate` 属性来设置不确定的进度，使用 `duration` 来控制动画持续时间。

```html
<template>
  <div class="demo-progress">
    <e-progress-m :percentage="50" :indeterminate="true" />
    <e-progress-m :percentage="100" :format="format" :indeterminate="true" />
    <e-progress-m :percentage="100" status="success" :indeterminate="true" :duration="5" />
    <e-progress-m :percentage="100" status="warning" :indeterminate="true" :duration="1" />
    <e-progress-m :percentage="50" status="exception" :indeterminate="true" />
  </div>
</template>

<script lang="ts" setup>
const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`);
</script>
<style scoped>
.demo-progress .ep-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
```

## 条纹进度

使用 `striped` 属性来设置条纹进度。您可以使用 `striped-flow` 来使条纹流动，使用 `duration` 来控制动画持续时间。

```html
<template>
  <div class="demo-progress">
    <e-progress-m :percentage="50" :stroke-width="15" striped />
    <e-progress-m :percentage="30" :stroke-width="15" status="warning" striped striped-flow />
    <e-progress-m :percentage="100" :stroke-width="15" status="success" striped striped-flow :duration="10" />
    <e-progress-m
      :percentage="percentage"
      :stroke-width="15"
      status="exception"
      striped
      striped-flow
      :duration="duration"
    />
    <e-button-group-m>
        <e-button-m @click="decrease">—</e-button-m>
        <e-button-m @click="increase">+</e-button-m>
    </e-button-group-m>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
const percentage = ref<number>(70);
const duration = computed(() => Math.floor(percentage.value / 10));

const increase = () => {
  percentage.value += 10;
  if (percentage.value > 100) {
    percentage.value = 100;
  }
};
const decrease = () => {
  percentage.value -= 10;
  if (percentage.value < 0) {
    percentage.value = 0;
  }
};
</script>

<style scoped>
.demo-progress .ep-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
```

## 方格进度

使用 `type` 属性为 `square` 来显示方格进度条。您可以通过 `square-size` 属性来控制方格的大小。

```html
<template>
  <div class="container">
    <e-progress-m :percentage="30" type="square" />
    <e-progress-m :percentage="percentage" status="warning" type="square" />
    <e-progress-m :percentage="percentage" status="success" type="square" />
    <e-progress-m :percentage="percentage" status="exception" type="square" :square-size="30" />
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';

const percentage = ref(0);

const timer = setInterval(() => {
  percentage.value += 10;
  if (percentage.value >= 100) {
    percentage.value = 0;
  }
}, 1000);

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>

```

## API

### Attributes

| Name           | Description                                                | Type                                                         | Default |
| :------------- | :--------------------------------------------------------- | :----------------------------------------------------------- | :------ |
| percentage     | 百分比，**必需**                                           | `number`-`(0-100)`                                           | 0       |
| type           | 进度条类型                                                 | `enum`-`'line' \| 'circle' \| 'dashboard '\| 'square'`       | line    |
| stroke-width   | 进度条宽度                                                 | `number`                                                     | 6       |
| text-inside    | 是否将百分比显示在进度条内部，仅当 `type` 为 'line' 时有效 | `boolean`                                                    | false   |
| status         | 进度条当前状态                                             | `enum`-`'success' \| 'exception' \| 'warning'`               | —       |
| indeterminate  | 设置不确定进度                                             | `boolean`                                                    | false   |
| duration       | 控制不确定进度或条纹流动进度的动画持续时间                 | `number`                                                     | 3       |
| color          | 进度条的背景颜色，覆盖 `status` 属性                       | `string` / `function` -`(percentage: number) => string`/ `Array`-`{ color: string; percentage: number }[]` | ''      |
| width          | 圆形进度条的画布宽度                                       | `number`                                                     | 126     |
| show-text      | 是否显示百分比                                             | `boolean`                                                    | true    |
| stroke-linecap | 圆形/仪表板类型进度条路径末端的形状                        | `enum`-`'butt' \| 'round' \| 'square'`                       | round   |
| format         | 自定义文本格式                                             | `Function`-`(percentage: number) => string`                  | —       |
| striped        | 进度条是否带条纹                                           | `boolean`                                                    | false   |
| striped-flow   | 条纹是否流动                                               | `boolean`                                                    | false   |

### Slots

| Name    | Description                         |
| :------ | :---------------------------------- |
| default | 自定义内容，参数为 `{ percentage }` |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-progress-m"
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