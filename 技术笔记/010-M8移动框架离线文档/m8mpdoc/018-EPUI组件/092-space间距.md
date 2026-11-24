# Space 间距

虽然我们有 `Divider`，但有时我们需要多个 `Divider` 来分隔元素，因此我们将每个元素堆叠在 `Divider` 上，但这样做不仅使我们的代码变得混乱，而且使其难以维护。`Space（间隔）` 是这种组件，为我们提供了生产力和优雅。

## 基本用法

基本用例是使用此组件在每个组件之间提供统一的间隔

使用 `Space` 提供空间

```html
<template>
	<e-space-m wrap>
		<e-card-m v-for="i in 4" :key="i" class="box-card" style="width: 70px">
			<div v-for="o in 3" :key="o" class="text item">{{ 'item ' + o }}</div>
		</e-card-m>
	</e-space-m>
</template>
```

## 竖直布局

使用 `direction` 属性来控制布局，我们使用 `flex-direction` 来实现这一点。

我们还提供了竖直布局。

```html
<template>
	<e-space-m direction="vertical">
		<e-card-m v-for="i in 2" :key="i" class="box-card" style="width: 70px">
			<div v-for="o in 3" :key="o" class="text item">{{ 'item ' + o }}</div>
		</e-card-m>
	</e-space-m>
</template>
```

## 控制间隔大小

通过 `size` API 控制间隔大小。

您可以使用内置大小 `small、default、large` 来设置大小，这些大小对应于 `8px、12px、16px`。默认大小是 `small`，即 `8px`

您还可以使用自定义大小来覆盖它。请参考下一部分。

```html
<template>
	<e-space-m direction="vertical" alignment="start" :size="20">
		<e-radio-group-m v-model="size">
			<e-radio-m value="large">large</e-radio-m>
			<e-radio-m value="default">default</e-radio-m>
			<e-radio-m value="small">small</e-radio-m>
		</e-radio-group-m>

		<e-space-m wrap :size="size">
			<e-card-m v-for="i in 3" :key="i" class="box-card" style="width: 70px">
				<div v-for="o in 3" :key="o" class="text item">{{ 'item ' + o }}</div>
			</e-card-m>
		</e-space-m>
	</e-space-m>
</template>

<script lang="ts" setup>
	import { ref } from "vue";
	const size = ref("default");
</script>
```

间隔大小`size`设置为数组时，分别代表右侧和底部的间隔，如 `[10, 20]`

```html
<template>
	<e-space-m wrap :size="[10, 20]">
		<e-card-m v-for="i in 4" :key="i" class="box-card" style="width: 70px">Text item</e-card-m>
	</e-space-m>
</template>
```

## 自定义大小

有时内置大小无法满足业务需求，我们可以使用自定义大小（数值类型）来控制项目之间的间隔。

```html
<template>
	<e-slider-m v-model="size2" style="margin: 10px 0 20px;" />
	<e-space-m wrap :size="size2">
		<e-card-m v-for="i in 2" :key="i" class="box-card" style="width: 70px">
			<div v-for="o in 3" :key="o" class="text item">{{ 'item ' + o }}</div>
		</e-card-m>
	</e-space-m>
</template>

<script lang="ts" setup>
	import { ref } from "vue";
	const size2 = ref(20);
</script>
```

## 自动换行

在水平模式下，使用 `wrap`（布尔类型）来控制自动换行行为。

使用 `wrap` 控制换行

```html
<template>
	<e-space-m wrap>
		<div v-for="i in 20" :key="i" class="box-card" style="width: 70px">Text item</div>
	</e-space-m>
</template>
```

## Spacer

有时我们希望不仅仅是空白空间，所以我们有 (spacer) 来帮助我们。

## 字面类型 spacer

```html
<template>
	<e-space-m wrap :size="10" spacer="|">
		<e-card-m v-for="i in 2" :key="i" class="box-card" style="width: 70px">Text item</e-card-m>
	</e-space-m>
</template>
```

## Spacer 也可以是 VNode

```html
<template>
	<e-space-m wrap :size="10" :spacer="spacer">
		<e-card-m v-for="i in 2" :key="i" class="box-card" style="width: 70px">Text item</e-card-m>
	</e-space-m>
</template>

<script lang="ts" setup>
	import { h } from "vue";
	const spacer = h(
		"span",
		{
			style: {
				color: "#d9d9d9",
				padding: "0 12px",
			},
		},
		"|"
	);
</script>
```

## 对齐

设置此属性可以调整子节点的对齐方式，可在 `align-items` 找到理想的值。

使用 `alignment`

```html
<template>
	<div class="alignment-container">
		<e-space-m>
			Sting
			<e-card-m>
				<template #header> header </template>
				body
			</e-card-m>
			<e-button-m type="success">Success</e-button-m>
		</e-space-m>
	</div>

	<div class="alignment-container">
		<e-space-m alignment="flex-start">
			Sting
			<e-card-m>
				<template #header> header </template>
				body
			</e-card-m>
			<e-button-m type="success">Success</e-button-m>
		</e-space-m>
	</div>

	<div class="alignment-container">
		<e-space-m alignment="flex-end">
			Sting
			<e-card-m>
				<template #header> header </template>
				body
			</e-card-m>
			<e-button-m type="success">Success</e-button-m>
		</e-space-m>
	</div>
</template>

<style lang="scss" scoped>
	.alignment-container {
		width: 260px;
		margin-bottom: 20px;
		padding: 8px;
		border: 1px solid var(--ep-border-color);
	}
</style>
```

## 填充容器

通过 `fill` (布尔类型) 参数，您可以控制子节点是否自动填充容器。

在下面的示例中，当设置为 `fill` 时，子节点的宽度将自动适应容器的宽度。

使用 `fill` 自动填充子节点的容器

```html
<template>
	<div style="margin-bottom: 15px">fill: <e-switch-m v-model="fill" /></div>
	<e-space-m :fill="fill" wrap style="width: 100%;">
		<e-card-m v-for="i in 2" :key="i" class="box-card">
			<template #header> header </template>
			body
		</e-card-m>
	</e-space-m>
</template>

<script lang="ts" setup>
	import { ref } from "vue";

	const fill = ref(true);
</script>
```

您还可以使用 `fillRatio` 参数来自定义填充比例。默认值为 100，表示根据父容器宽度以 100% 填充。

需要注意的是，水平布局和竖直布局的表达略有不同，具体效果可以在以下示例中查看。

使用 `fillRatio` 自定义填充比例

```html
<template>
	<div style="margin: 15px 0">fillRatio:<e-slider-m v-model="fillRatio" /></div>
	<div style="margin-bottom: 15px">
		direction:
		<e-radio-group-m v-model="direction">
			<e-radio-m value="horizontal">horizontal</e-radio-m>
			<e-radio-m value="vertical">vertical</e-radio-m>
		</e-radio-group-m>
	</div>
	<e-space-m fill :fill-ratio="fillRatio" :direction="direction" wrap style="width: 100%;">
		<e-card-m v-for="i in 5" :key="i" class="box-card">
			<template #header> header </template>
			body
		</e-card-m>
	</e-space-m>
</template>

<script lang="ts" setup>
	import { ref } from "vue";

	const fillRatio = ref(30);
	const direction = ref("horizontal");
</script>
```

## API

### Space Attributes

| 属性名     | 描述                      | 类型                                       | 默认值   |
| ---------- | ------------------------- | ------------------------------------------ | -------- |
| alignment  | 对齐的方式                | `center` `normal` `stretch` ...            | `center` |
| class      | 类名                      | `string` `object` `array`                  | ——       |
| direction  | 排列的方向                | `vertical` `horizontal`                    | ——       |
| prefixCls  | 给 space-items 的类名前缀 | `string`                                   | ——       |
| style      | 额外样式                  | `string` `object`                          | ——       |
| spacer     | 间隔符                    | `string` `number` `VNode`                  | ——       |
| size       | 间隔大小                  | `default` `small` `large` `number` `array` | `small`  |
| wrap       | 设置是否自动折行          | `boolean`                                  | `false`  |
| fill       | 子元素是否填充父容器      | `boolean`                                  | `false`  |
| fill-ratio | 填充父容器的比例          | `number`                                   | `100`    |

### Space Slots

| 属性名  | 描述               |
| ------- | ------------------ |
| default | 需要添加间隔的元素 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-space-m"
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