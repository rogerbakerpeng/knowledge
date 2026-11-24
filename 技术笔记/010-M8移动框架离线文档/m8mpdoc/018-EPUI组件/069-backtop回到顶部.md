# Backtop 回到顶部

用于滚动页面回到顶部。

## 基础用法

向下滑动，可显示右下角回到顶部按钮。

```html
<template>
	<div class="container" style="background-color: #f5f5f5;">
		<e-backtop-m :right="100" :bottom="100" :visibilityHeight="10" @click="handleClick" />
	</div>
</template>

<script lang="ts" setup>
	const handleClick = (MouseEvent) => {
		console.log("click backtop", MouseEvent);
	};
</script>
<style scoped lang="scss">
	.container {
		padding: 12px;
		height: 200vh;
	}

	.cell-title {
		display: block;
		margin: 20px 0 8px;
		color: rgba(69, 90, 100, 0.6);
		font-size: 14px;
		font-weight: 400;
	}
</style>
```

## 自定义按钮内容

默认插槽 default，可自定义按钮内容

```html
<template>
	<div class="container" style="background-color: #f5f5f5;">
		<e-backtop-m :right="100" :bottom="200" :visibilityHeight="10" @click="handleClick">
			<div style="line-height: 20px; width: 20px; background-color: #fff; text-align: center; color: #1989fa;">UP</div>
		</e-backtop-m>
	</div>
</template>

<script lang="ts" setup>
	const handleClick = (MouseEvent) => {
		console.log("click backtop", MouseEvent);
	};
</script>
<style scoped lang="scss">
	.container {
		padding: 12px;
		height: 200vh;
	}

	.cell-title {
		display: block;
		margin: 20px 0 8px;
		color: rgba(69, 90, 100, 0.6);
		font-size: 14px;
		font-weight: 400;
	}
</style>
```

## 指定滚动容器

使用属性 target 属性，可指定滚动容器。

```html
<template>
	<div class="container" style="background-color: #f5f5f5;">
		<div class="scroll-container">
			<div class="cellitems" v-for="item in 80">{{ `文字第 ${item} 行` }}</div>
		</div>
		<e-backtop-m target=".scroll-container" :right="100" :bottom="300" :visibilityHeight="10" @click="handleClick" />
	</div>
</template>

<script lang="ts" setup>
	const handleClick = (MouseEvent) => {
		console.log("click backtop", MouseEvent);
	};
</script>
<style scoped lang="scss">
	.container {
		padding: 12px;
		height: 200vh;
	}

	.cell-title {
		display: block;
		margin: 20px 0 8px;
		color: rgba(69, 90, 100, 0.6);
		font-size: 14px;
		font-weight: 400;
	}

	.scroll-container {
		margin-top: 10px;
		width: 100%;
		height: 400px;
		background-color: #d1d1d2;
		overflow-y: scroll;
	}

	.cellitems {
		text-align: center;
		line-height: 30px;
		background-color: #bdd4fa;
	}
</style>
```

## API

### Attributes

| Name              | Description                                     | Type     | Default |
| :---------------- | :---------------------------------------------- | :------- | :------ |
| target            | 滚动容器                                        | `string` | —       |
| visibility-height | 直到滚动高度达到此值，按钮才会显示。默认单位 px | `number` | `200`   |
| right             | 右侧距离，默认单位 px                           | `number` | `40`    |
| bottom            | 底部距离，默认单位 px                           | `number` | `40`    |

### Events

| Name  | Description | Parameters                          |
| :---- | :---------- | :---------------------------------- |
| click | 点击时触发  | Function: (evt: MouseEvent) => void |

### Slots

| Name    | Description    |
| :------ | :------------- |
| default | 自定义默认内容 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-backtop-m"
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