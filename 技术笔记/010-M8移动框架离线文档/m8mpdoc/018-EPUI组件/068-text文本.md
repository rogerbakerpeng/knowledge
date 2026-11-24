# Text 文本

用于文本显示。

## 基础用法

使用 type 属性定义文本的类型。

```html
<template>
	<div class="flex-box">
		<e-text-m>Default</e-text-m>
		<e-text-m type="primary">Primary</e-text-m>
		<e-text-m type="success">Success</e-text-m>
		<e-text-m type="info">Info</e-text-m>
		<e-text-m type="warning">Warning</e-text-m>
		<e-text-m type="danger">Danger</e-text-m>
	</div>
</template>
<style scoped>
	.flex-box {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
	}
</style>
```

## 尺寸

使用属性 size 设置附加尺寸，可选 large、default 或 small。

```html
<template>
	<div class="flex-box">
		<e-text-m>Default</e-text-m>
		<e-text-m size="large">Large</e-text-m>
		<e-text-m size="small">Small</e-text-m>
	</div>
</template>
<style scoped>
	.flex-box {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
	}
</style>
```

## 省略号

当文本超出视口宽度或设置的最大宽度时，传递 truncated 属性来渲染省略号。

```html
<template>
	<div class="container">
		<div style="width: 100px;">
			<e-text-m truncated>Self element set width 100px</e-text-m>
		</div>
		<div class="flex-box">
			<div style="max-width: 20%;">
				<e-text-m truncated>Squeezed by parent element</e-text-m>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.container {
		padding: 12px;
	}
	.flex-box {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
	}
</style>
```

## 覆盖

使用属性 tag 来覆盖元素

```html
<template>
	<div class="flex-vertical">
		<e-text-m>span</e-text-m>
		<e-text-m tag="p">This is a paragraph.</e-text-m>
		<e-text-m tag="b">Bold</e-text-m>
		<e-text-m tag="i">Italic</e-text-m>
		<e-text-m>
			This is
			<e-text-m tag="sub" size="small" type="primary">subscript</e-text-m>
		</e-text-m>
		<e-text-m>
			This is
			<e-text-m tag="sup" size="small">superscript</e-text-m>
		</e-text-m>
		<e-text-m tag="ins">Inserted</e-text-m>
		<e-text-m tag="del">Deleted</e-text-m>
		<e-text-m tag="mark">Marked</e-text-m>
	</div>
</template>
<style scoped>
	.flex-vertical {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
```

## 混合

文本混合组件

```html
<template>
	<div class="flex-vertical">
		<e-text-m>
			<e-icon-m>
				<Flag />
			</e-icon-m>
			旗帜
		</e-text-m>
		<div class="flex-box">
			<e-text-m>Rate</e-text-m>
			<e-rate-m />
		</div>
		<e-text-m>
			This is text mixed icon
			<e-icon-m>
				<Bell />
			</e-icon-m>
			and component
			<e-button-m type="info" plain>Button</e-button-m>
		</e-text-m>
	</div>
</template>

<script lang="ts" setup>
	import { Bell, Flag } from "@epoint-mfe/eui-icons";
</script>

<style scoped lang="scss">
	.flex-box {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
	}

	.flex-vertical {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
```

## API

### Attributes

| Name      | Description    | Type                                                         | Default |
| :-------- | :------------- | :----------------------------------------------------------- | :------ |
| type      | 文本类型       | `default`、`primary`、`success`、`warning`、`danger`、`info` | default |
| size      | 文本尺寸       | `default`、`large`、 `small`                                 | default |
| truncated | 渲染省略号     | `boolean`                                                    | false   |
| tag       | 自定义元素标签 | `string`                                                     | span    |

### Slots

| Name    | Description    |
| :------ | :------------- |
| default | 自定义默认内容 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-text-m"
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