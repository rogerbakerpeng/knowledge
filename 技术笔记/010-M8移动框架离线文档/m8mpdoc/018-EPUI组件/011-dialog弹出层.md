# Dialog 对话框

在保留当前页面状态的情况下，告知用户并承载相关操作。

## 基本使用

对话框弹出一个对话框，它是可自定义的。

设置 `model-value / v-model` 属性为一个 `Boolean` 值，当它为 `true` 时，对话框显示。此示例为组件调用方式。

##### 有标题

```html
<template>
	<div class="van-content">
		<text class="cell-title">基本使用</text>
		<div class="flex justify-spacep-between mb-4 flex-wrap gap-4">
			<e-button-m text @click="dialogVisible1 = true">点击打开dialog</e-button-m>
			<e-dialog-m v-model="dialogVisible1" title="提示" :show-cancel-button="true" @confirm="handleConfirm" @cancel="handleCancel">
				<p>这里是备注提示内容</p>
			</e-dialog-m>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { ref } from "vue";
	const dialogVisible1 = ref(false);
	const handleConfirm = () => {
		console.log("点击确认按钮时触发");
	};
	const handleCancel = () => {
		console.log("点击取消按钮时触发");
	};
</script>
```

##### 无标题

```html
<e-dialog-m v-model="dialogVisible10" :show-cancel-button="true">
	<p>这里是提示内容这里是提示内容</p>
</e-dialog-m>
```

##### 重要提示确认

```html
<e-dialog-m v-model="dialogVisible11" title="提示" confirm-button-text="我知道了">
	<p>这里是备注提示内容</p>
</e-dialog-m>
```

##### 轻提示关闭

```html
<e-dialog-m v-model="dialogVisible12" title="提示" :show-confirm-button="false" cancel-button-text="关闭" :show-cancel-button="true">
	<p>这里是备注提示内容</p>
</e-dialog-m>
```

## 自定义内容

```html
<template>
	<div class="van-content">
		<text class="cell-title">自定义内容</text>
		<div class="flex justify-spacep-between mb-4 flex-wrap gap-4">
			<e-button-m text @click="dialogVisible2 = true">点击打开dialog</e-button-m>
			<e-dialog-m v-model="dialogVisible2" title="自定义内容自定义内容自定义内容自定义内容">
				<em-field :border="false" type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit v-model="textareaValue"></em-field>
			</e-dialog-m>
		</div>
	</div>
</template>
```

## slot 插槽

`header` 插槽可以用来自定义标题显示区域。
`footer` 插槽可以用来自定义底部按钮显示区域。

```html
<template>
	<div class="van-content">
		<text class="cell-title">slot插槽</text>
		<div class="flex justify-spacep-between mb-4 flex-wrap gap-4">
			<e-button-m text @click="dialogVisible3 = true">点击打开dialog</e-button-m>
			<e-dialog-m v-model="dialogVisible3" title="slot插槽">
				<template #header>
					<span>header插槽</span>
				</template>
				<p>内容区域</p>
				<span>文字文字文字文字</span>
				<template #footer>
					<div style="display: flex;padding: 5px 20px;">
						<e-button-m round block size="small" @click="dialogVisible3 = false">取消</e-button-m>
						<e-button-m type="primary" block round size="small" @click="dialogVisible3 = false">确认</e-button-m>
					</div>
				</template>
			</e-dialog-m>
		</div>
	</div>
</template>
```

## 关闭 dialog 前回调

`before-close` 仅在用户点击按钮或背景时有效。函数`done()`用于关闭 Dialog，仅在点击按钮时有效

```html
<template>
	<div class="van-content">
		<text class="cell-title">关闭 dialog 前回调</text>
		<div class="flex justify-spacep-between mb-4 flex-wrap gap-4">
			<e-button-m text @click="dialogVisible4 = true">点击打开dialog</e-button-m>
			<e-dialog-m v-model="dialogVisible4" title="关闭dialog前回调" :show-cancel-button="true" :before-close="handleBeforClose">
				<p>内容区域</p>
				<span>文字文字文字文字</span>
			</e-dialog-m>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { ref } from "vue";
	import type { CSSProperties } from "vue";
	// 组件调用
	const dialogVisible4 = ref(false);

	const handleBeforClose = (done: (flag: boolean) => void) => {
		ejs.ui.toast("延迟2秒关闭");
		setTimeout(() => {
			done(true);
		}, 2000);
	};
</script>
```

## 延迟关闭、打开

设置`before-close` 属性后，`close-delay`延迟关闭属性将被拦截。

```html
<template>
	<div class="van-content">
		<text class="cell-title">延迟关闭、打开</text>
		<div class="flex justify-spacep-between mb-4 flex-wrap gap-4">
			<e-button-m text @click="dialogVisible5 = true">点击打开dialog</e-button-m>
			<e-dialog-m v-model="dialogVisible5" title="延迟关闭/打开" :show-cancel-button="true" :open-delay="500" :close-delay="500">
				<p>内容区域</p>
				<span>文字文字文字文字</span>
			</e-dialog-m>
		</div>
	</div>
</template>
```

## 内容区域样式自定义

内容区域默认具备边距，如果是用于展示某些已经有边距的内容，则可能出现预期之外的情况，此时可以自定义边距。

或者当你需要在内容区域上做自己的样式控制，则可以使用下面的几个属性进行定义。

通过`contentCls`属性可以为内容区域添加额外的样式类名。

```html
<template>
	<e-dialog-m v-model="dialogVisible6" title="contentCls" :show-cancel-button="true" content-cls="my-dialog-content">
		<span>文字文字文字文字</span>
	</e-dialog-m>
</template>
<style lang="scss" scoped>
	::v-deep .my-dialog-content {
		background-color: red;
	}
</style>
```

通过`contentPadding`属性可以为内容区域添加额外的边距，可以传入 false 关闭边距，也可以传入数字或数组，数字自动加 px，数组按 css 样式规则转换为字符串。

```html
<template>
	<e-dialog-m v-model="dialogVisible7" title="contentPadding" :show-cancel-button="true" :content-padding="[10, 20]">
		<span>文字文字文字文字</span>
	</e-dialog-m>
</template>
```

通过`contentStyle`属性可以为内容区域添加额外的样式，优先级最高。

```html
<template>
	<e-dialog-m v-model="dialogVisible8" title="contentStyle" :show-cancel-button="true" :content-style="myStyle">
		<span>文字文字文字文字</span>
	</e-dialog-m>
</template>
<script lang="ts" setup>
	import type { CSSProperties } from "vue";
	// css样式
	const myStyle = ref<CSSProperties>({
		color: "blue",
		fontWeight: "bold",
		textDecoration: "underline",
	});
</script>
```

使用`show-bg`属性可以为内容区域添加背景色。

```html
<e-dialog-m v-model="dialogVisible9" title="show-bg" :show-cancel-button="true" :show-bg="true">
	<span>文字文字文字文字</span>
</e-dialog-m>
```

## 全屏展示

```html
<e-dialog-m v-model="dialogVisible20" :fullscreen="true" title="全屏展示" :show-cancel-button="true">
	<span>文字文字文字文字</span>
</e-dialog-m>
```

## 显示全屏按钮

```html
<e-dialog-m v-model="dialogVisible21" :showFullscreen="true" title="显示全屏按钮" :show-cancel-button="true">
	<span>文字文字文字文字</span>
</e-dialog-m>
```

## API 方法调用

如果在页面上要进行弹框的操作，直接通过 <e-dialog /> 标签虽然更为灵活，但需要定义较多的控制变量。此时你也可以通过 API 来进行弹窗操作。

通过此方法你可以指定一个 url 用 iframe 打开。

#### 打开 iframe

```html
<template>
	<text class="cell-title">API使用:打开链接</text>
	<e-button-m text @click="clickOpenLink">点击打开dialog</e-button-m>
</template>
<script lang="ts" setup>
	import { openDialog } from "@epoint-mfe/eui-components";

	// 方法调用
	const clickOpenLink = () => {
		openDialog({
			title: "弹窗",
			width: 300,
			height: 500,
			url: "http://192.168.219.170/docs/vue/latest/frame/",
			closeCallback: (params) => {
				console.log("close dialog params:", params);
			},
		});
	};
</script>
```

#### 打开 iframe，并添加 iframe 回调

组件调用支持的属性，也可以在 API 调用中使用。比如：`width`、`height`、`fullscreen`、`showCancelButton`。

```html
<template>
	<text class="cell-title">API使用:打开链接,并获取iframe回调</text>
	<e-button-m text @click="clickOpenLink2">点击打开dialog</e-button-m>
</template>
<script lang="ts" setup>
	import { openIframeDialog } from "@epoint-mfe/eui-components";

	const clickOpenLink2 = () => {
		openIframeDialog({
			title: "弹窗",
			fullscreen: true,
			showCancelButton: true,
			url: "http://192.168.219.170/docs/vue/latest/frame/",
			closeCallback: (params) => {
				console.log("close dialog params:", params);
			},
			iframeEvents: {
				onload: () => {
					console.log("iframe 加载完成");
				},
				ondestroy: (action) => {
					console.log("iframe 销毁", action);
				},
			},
		});
	};
</script>
```

#### 打开组件

也可以打开一个内容为指定组件的弹框页面。

```html
<template>
	<text class="cell-title">API使用:打开组件</text>
	<e-button-m text @click="clickOpenComponent">点击打开dialog</e-button-m>
</template>
<script lang="ts" setup>
	import { openComponentDialog } from "@epoint-mfe/eui-components";
	import { defineAsyncComponent, h } from "vue";

	const clickOpenComponent = () => {
		openComponentDialog(
			{
				title: "快速显示组件的dialog",
				width: 300,
				height: 500,
				closeCallback: (action) => {
					console.log("关闭对话框, 回传值为", action);
				},
			},
			() => {
				return h(defineAsyncComponent(() => import("./ep-button.vue")));
			}
		);
	};
</script>
```

## API调用

dialog 组件提供了一些方法：`openDialog` 、`openIframeDialog`、`openComponentDialog`，可以通过调用这些方法来控制 dialog 的显示和关闭。

函数调用支持以下方式：

`openDialog(title: string, url: string, options: IframeDialogOptions)`

`openIframeDialog(title: string, url: string, options: IframeDialogOptions)`

其中 `IframeDialogOptions` 配置项类型定义如下：

```typescript
type IframeDialogOptions = Partial<DialogProps> & {
	title: string;
	url: string;
	closeCallback?: (params: any) => void;
	iframeEvents?: {
		onload?: () => void;
		ondestroy?: (action: unknown) => void;
	};
};
```

`openComponentDialog(dialogOptions: ComponentDialogOptions, render: () => VNode)`

其中 `ComponentDialogOptions` 类型支持大部分 dialog 属性，并且支持 closeCallback 回调：

```typescript
// 组件弹框要求配置
type ComponentDialogOptions = Partial<DialogProps> & {
	closeCallback?: (action: any) => void;
};
```

## 组件调用

| Name                  | Description                                                                               | Type                                   | Default   |
| --------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------- | --------- |
| model-value / v-model | Dialog 的可见性                                                                           | boolean                                | —         |
| title                 | Dialog 的标题                                                                             | string                                 | —         |
| width                 | Dialog 的宽度                                                                             | string / number                        | `327px`   |
| height                | Dialog 的高度                                                                             | string / number                        | —         |
| fullscreen            | Dialog 是否全屏显示                                                                       | boolean                                | `false`   |
| modal                 | 是否显示遮罩层                                                                            | boolean                                | `true`    |
| content-cls           | 内容区域的额外样式类名                                                                    | string                                 | —         |
| content-padding       | 内容区域的边距，false = 0，字符串直接应用，数字自动加 px，数组按 css 样式规则转换为字符串 | `boolean/string/number/ Array<number>` | —         |
| content-style         | 内容区域的额外样式，优先级最高                                                            | CSSProperties                          | —         |
| lock-scroll           | 当 Dialog 显示时，是否禁用 body 的滚动                                                    | boolean                                | `true`    |
| show-bg               | 是否为内容区域添加背景色                                                                  | boolean                                | `false`   |
| close-delay           | 关闭之前的时间（毫秒）                                                                    | number                                 | `0`       |
| open-delay            | 打开之前的时间（毫秒）                                                                    | number                                 | `0`       |
| close-on-click-modal  | 是否可以通过点击遮罩层关闭 Dialog                                                         | boolean                                | `false`   |
| show-fullscreen       | 是否显示全屏按钮                                                                          | boolean                                | `false`   |
| before-close          | Dialog 关闭前的回调，它将阻止 Dialog 关闭                                                 | 函数(done) (done 用于关闭 Dialog)      | —         |
| show-confirm-button   | 是否显示确认按钮                                                                          | boolean                                | `true`   |
| show-cancel-button    | 是否显示取消按钮                                                                          | boolean                                | `false`    |
| confirm-button-text   | 确认按钮文字                                                                              | string                                 | `确定`    |
| cancel-button-text    | 取消按钮文字                                                                              | string                                 | `取消`    |
| confirm-button-color  | 确认按钮颜色                                                                              | string                                 | `#2e6be5` |
| cancel-button-color   | 取消按钮颜色                                                                              | string                                 | `#2e3033` |

### Slots

| Name    | Description                               |
| ------- | ----------------------------------------- |
| default | 默认插槽，dialog 主体部分                 |
| header  | Dialog 头部的内容；替换此内容将删除标题。 |
| footer  | 底部按钮区域插槽，替换按钮区域内容。      |

### Events

| Name    | Description               | Parameters |
| ------- | ------------------------- | ---------- |
| open    | Dialog 打开时触发         | —          |
| opened  | Dialog 打开动画结束时触发 | —          |
| close   | Dialog 关闭时触发         | —          |
| closed  | Dialog 关闭动画结束时触发 | —          |
| confirm | Dialog 点击确定按钮时触发 | —          |
| cancel  | Dialog 点击取消按钮时触发 | —          |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-dialog-m"
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