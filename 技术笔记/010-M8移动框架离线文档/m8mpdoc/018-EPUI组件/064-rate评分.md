# Rate 评分

用于评分。

## 基本用法

Rate 将评分分数划分为几个级别，并通过不同的背景颜色来区分这些级别。默认情况下，背景颜色相同，但您可以使用 `colors` 属性分配一个具有三个元素的数组来反映三个级别，其两个阈值可以通过 `low-threshold` 和 `high-threshold` 来定义，或者您可以使用一个对象来分配它们，其中键是两个级别之间的阈值，值是相应的颜色。

```html
<template>
    <div class="em-row">
        <div class="demo-rate-block">
            <span class="demonstration">Default</span>
            <e-rate-m v-model="value1"></e-rate-m>
        </div>

        <div class="demo-rate-block">
            <span class="demonstration">Color for different levels</span>
            <e-rate-m v-model="value2" :colors="colors"></e-rate-m>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value1 = ref(null);
const value2 = ref(null);
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']);
</script>
<style lang="scss" scoped>
.em-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.demo-rate-block {
    padding: 30px 0;
    text-align: center;
    width: 49%;
    box-sizing: border-box;

    &:first-child {
        border-right: solid 1px var(--ep-border-color);
    }
}
.demo-rate-block .demonstration {
    display: block;
    color: var(--ep-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>
```

## 尺寸

```html
<template>
    <e-rate-m v-model="value3" size="large" />
    <br />
    <e-rate-m v-model="value3" />
    <br />
    <e-rate-m v-model="value3" size="small" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value3 = ref(null);
</script>
```

## 启用半星

添加属性 `allow-half` 允许半星。

```html
<template>
    <e-rate-m v-model="value4" allow-half />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value4 = ref(null);
</script>
```

## 显示文本

使用文本来指示评分分数。

添加属性 `show-text` 以在 Rate 的右侧显示文本。您可以使用 `texts` 为不同的分数分配文本。`texts` 是一个数组，其长度应该等于最大分数 `max`。

```html
<template>
	<e-rate-m v-model="value5" :texts="['oops', 'disappointed', 'normal', 'good', 'great']" show-text />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value5 = ref(null);
</script>
```

## 可清除

当您再次单击相同的值时，您可以将该值重置为 `0`。

```html
<template>
	<e-rate-m v-model="value6" clearable />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value6 = ref(null);
</script>
```

## 更多图标

您可以使用不同的图标来区分不同的评分组件。

您可以通过传递 `icons` 一个具有三个元素的数组或一个对象来自定义图标，其中键是两个级别之间的阈值，值是相应的图标。在此示例中，我们还使用 `void-icon` 来设置未选中的图标。

```html
<template>
	<e-rate-m v-model="value7" :icons="icons" void-icon="chat-o" :colors="['#409eff', '#67c23a', '#FF9900']" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value7 = ref(null);
const icons = ref(['star', 'bag', 'clock']);
</script>
```

## 只读

只读的 Rate 用于显示评分分数。支持半星。

使用属性 `disabled` 使组件变为只读。添加 `show-score` 以在右侧显示评分分数。此外，您可以使用属性 `score-template` 来提供评分模板。它必须包含 `{value}`，并且 `{value}` 将被替换为评分分数。

```html
<template>
	<e-rate-m v-model="value8" allow-half disabled show-score text-color="#ff9900" score-template="{value} points" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value8 = ref(3.7);
</script>
```

## 自定义样式

现在您可以为 Rate 组件设置自定义样式。使用 `css/scss` 语言来更改全局或本地颜色。我们设置了一些全局颜色变量：`--e-rate-void-color`、`--e-rate-fill-color`、`--e-rate-disabled-void-color`、`--e-rate-text-color`。您可以像这样使用：`:root { --e-rate-void-color: red; --e-rate-fill-color: blue; }`。

### Default Variables

| **Variable**                  | **Default Color**             |
| ----------------------------- | ----------------------------- |
| `--e-rate-void-color`         | `var(--e-icon-color-3)`       |
| `--e-rate-fill-color`         | `var(--e-color-warning)`      |
| `--e-icon-disabled-voidcolor` | `'#EFF2F7'`                   |
| `--e-rate-text-color`         | `var(--e-text-color-primary)` |

## API

### Attributes

| **Name** | Description | **Type** | **Default** |
|---|---|---|---|
| v-model | 绑定值 | `number` | `0` |
| max | 星星总数 | `number` | `5` |
| size | Rate 的尺寸 | `enum` `'large' \| 'default' \| 'small'` | — |
| disabled | 是否只读 | `boolean` | `false` |
| allow-half | 是否允许选择半星 | `boolean` | `false` |
| low-threshold | 低分和中分之间的阈值值。该值本身将包含在低分中 | `number` | `2` |
| high-threshold | 中分和高分之间的阈值值。该值本身将包含在高分中 | `number` | `4` |
| colors | 图标的颜色。如果是数组，应该有 3 个元素，每个对应一个分数等级，否则如果是对象，键应该是两个等级之间的阈值值，值应该是对应的颜色 | `string[] \| Record<number, string>` | `['#F7BA2A', '#F7BA2A', '#F7BA2A']` |
| void-color | 未选中图标的颜色 | `string` | `'#C6D1DE'` |
| disabled-void-color | 只读状态下未选中图标的颜色 | `string` | `'#EFF2F7'` |
| icons | 图标组件。如果是数组，应该有 3 个元素，每个对应一个分数等级，否则如果是对象，键应该是两个等级之间的阈值值，值应该是对应的图标组件 | `string[] \| Component[] \| Record<number, string \| Component>` | `['star', 'star', 'star']` |
| void-icon | 未选中图标 | `string/Component` | `'star'` |
| disabled-void-icon | 只读状态下未选中图标 | `string/Component` | `'star'` |
| show-text | 是否显示文本 | `boolean` | `false` |
| show-score | 是否显示当前分数。show-score 和 show-text 不能同时为真。同时为真时仅show-score生效 | `boolean` | `false` |
| text-color | 文本的颜色 | `string` | `'#1F2D3D’` |
| texts | 文本数组 | `string[]` | `['相当差', '不满意', '失望', '满意', '惊喜']` |
| score-template | 分数模板 | `string` | `'{value}'` |
| clearable | 是否可以将值重置为 `0` | `boolean` | `false` |
| id | 原生 `id` 属性 | `string` | — |
| label | 与 `aria-label` 相同 | `string` | — |

### Events

| **Name** | Description | **Type** |
|---|---|---|
| change | 当评分值更改时触发 | `(value: number) => void` |

### Exposes

| Name              | Description | Type                      |
| :---------------- | :---------- | :------------------------ |
| setCurrentValue   | 设置当前值  | `(value: number) => void` |
| resetCurrentValue | 重置当前值  | `() => void`              |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-rate-m"
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