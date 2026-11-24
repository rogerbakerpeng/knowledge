# Alert

用于显示重要的提示信息。

## 基础用法

Alert 组件不会自动消失，是页面中的非浮动元素。

Alert 组件提供五种主题，由 type 属性指定，默认值为 `info`。

```html
<template>
	<div class="container">
		<e-alert-m title="primary alert" type="primary" />
		<e-alert-m title="success alert" type="success" />
		<e-alert-m title="info alert" type="info" />
		<e-alert-m title="warning alert" type="warning" />
		<e-alert-m title="error alert" type="error" />
	</div>
</template>

<style scoped lang="scss">
	.ep-alert {
		& + & {
			margin-top: 20px;
		}
	}
</style>
```

## 主题

Alert 组件提供了两个不同的主题：`light` 和 `dark`。

通过设置 `effect` 属性来改变主题，默认为 `light`。

```html
<template>
	<div class="container">
		<e-alert-m title="success alert" type="success" effect="dark" />
		<e-alert-m title="info alert" type="info" effect="dark" />
		<e-alert-m title="warning alert" type="warning" effect="dark" />
		<e-alert-m title="error alert" type="error" effect="dark" />
		<e-alert-m title="error alert" type="primary" effect="dark" />
	</div>
</template>
```

## 自定义关闭按钮

可自定义关闭按钮为文字或其他符号。

Alert 组件允许你配置是否可关闭。关闭按钮的文本和关闭回调也支持自定义。`closable` 属性决定组件是否可以关闭，接受 `boolean` 值，默认为 `true`。

你可以设置 `close-text` 属性来代替默认的关闭符号。请注意 `close-text` 必须是字符串。当组件被关闭时会触发 `close` 事件。

```html
<template>
	<div class="container">
		<e-alert-m title="unclosable alert" type="success" :closable="false" />
		<e-alert-m title="customized close-text" type="info" close-text="Gotcha" />
		<e-alert-m title="alert with callback" type="warning" @close="hello" />
	</div>
</template>

<script setup lang="ts">
	const hello = () => {
		alert("Hello World!");
	};
</script>
```

## 图标

显示图标可以让信息更易读。

设置 `show-icon` 属性即可显示与 Alert 类型相对应的图标。

```html
<template>
	<div class="container">
		<e-alert-m title="success alert" type="primary" show-icon />
		<e-alert-m title="success alert" type="success" show-icon />
		<e-alert-m title="info alert" type="info" show-icon />
		<e-alert-m title="warning alert" type="warning" show-icon />
		<e-alert-m title="error alert" type="error" show-icon />
	</div>
</template>
```

## 文字居中

使用 `center` 属性让文字水平居中。

```html
<template>
	<div class="container">
		<e-alert-m title="success alert" type="success" center show-icon />
		<e-alert-m title="info alert" type="info" center show-icon />
		<e-alert-m title="warning alert" type="warning" center show-icon />
		<e-alert-m title="error alert" type="error" center show-icon />
	</div>
</template>
```

## 辅助性文字

包含标题和内容，解释更详细的警告。

除了必填的 `title` 属性外，你可以设置 `description` 属性来帮助你更好地介绍信息。描述只能是字符串，会自动换行显示。

```html
<template>
	<div class="container">
		<e-alert-m title="with description" type="success" description="This is a description." />
	</div>
</template>
```

## 图标和描述

这是一个同时具有图标和描述的示例。

```html
<template>
	<div class="container">
		<e-alert-m title="success alert" type="success" description="more text description" show-icon />
		<e-alert-m title="info alert" type="info" description="more text description" show-icon />
		<e-alert-m title="warning alert" type="warning" description="more text description" show-icon />
		<e-alert-m title="error alert" type="error" description="more text description" show-icon />
	</div>
</template>
```

## 折叠面板

通过设置 `collapsible` 属性来启用折叠面板功能。你可以使用 `expand-text` 和 `collapse-text` 属性来自定义展开和收起状态下的按钮文本。

```html
<template>
	<div class="container">
		<e-alert-m title="success alert" type="success" description="more text description" collapsible />

		<e-alert-m title="info alert" type="info" description="more text description" collapsible collapse-text="collapse" expand-text="expand" show-icon />

		<e-alert-m title="warning alert" type="warning" description="more text description" center collapsible collapse-text="collapse" expand-text="expand" />

		<e-alert-m title="error alert" type="error" description="more text description" center show-icon collapsible collapse-text="collapse" expand-text="expand" />
	</div>
</template>
```

## Alert API

### Alert Attributes

| 属性名        | 说明                 | 类型                                         | 默认值  |
| ------------- | -------------------- | -------------------------------------------- | ------- |
| title         | 标题                 | `string`                                     | `-`     |
| type          | 类型                 | `success / primary / warning / info / error` | `info`  |
| description   | 描述性文本           | `string`                                     | `-`     |
| closable      | 是否可关闭           | `boolean`                                    | `true`  |
| center        | 文字是否居中         | `boolean`                                    | `false` |
| close-text    | 自定义关闭按钮文本   | `string`                                     | `-`     |
| show-icon     | 是否显示类型图标     | `boolean`                                    | `flase` |
| effect        | 主题样式             | `light / dark`                               | `light` |
| collapsible   | 是否显示折叠按钮     | `boolean`                                    | `false` |
| expand-text   | 展开状态下的按钮文本 | `string`                                     | `收起`  |
| collapse-text | 收起状态下的按钮文本 | `string`                                     | `展开`  |

### Alert Events

| 事件名 | 说明              | 参数                          |
| ------ | ----------------- | ----------------------------- |
| close  | 关闭 Alert 时触发 | `(event: MouseEvent) => void` |

### Alert Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | Alert 描述内容 |
| title   | Alert 标题内容 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-alert-m"
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