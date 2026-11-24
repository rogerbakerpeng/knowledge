### cover-image

覆盖在平台小程序原生组件上的图片视图。可覆盖的平台小程序原生组件同`cover-view`，支持嵌套在`cover-view`里。

**平台差异说明**

| H5  | 微信小程序 | 支付宝小程序 |
| :-: | :--------: | :----------: |
|  √  |     √      |      √       |

**属性说明**

| 属性名 | 类型        | 默认值 | 说明                                                   | 平台差异说明          |
| :----- | :---------- | :----- | :----------------------------------------------------- | :-------------------- |
| src    | String      |        | 图标路径。支持本地路径、网络路径。不支持 base64 格式。 |                       |
| @load  | eventhandle |        | 图片加载成功时触发                                     | 微信小程序 2.1.0 支持 |
| @error | eventhandle |        | 图片加载失败时触发                                     | 微信小程序 2.1.0 支持 |

支持的事件：`click`

**不支持的 CSS**

-   position: fixed
-   opacity
-   overflow
-   padding
-   linebreak
-   white-space

**Tips**

-   在 video 组件中使用时，若想在全屏模式下使用`cover-view`，只有在微信小程序可实现。
-   支付宝小程序中 `cover-view` 不支持嵌套。

**微信小程序的 cover-view 使用注意：**

-   cover-view 和 cover-image 的 aria-role 仅可设置为 button，读屏模式下才可以点击，并朗读出“按钮”；为空时可以聚焦，但不可点击
-   基础库 2.2.4 起支持 touch 相关事件，也可使用 hover-class 设置点击态
-   基础库 2.1.0 起支持设置 scale rotate 的 css 样式，包括 transition 动画
-   基础库 1.9.90 起 cover-view 支持 overflow: scroll，但不支持动态更新 overflow
-   基础库 1.9.90 起最外层 cover-view 支持 position: fixed
-   基础库 1.9.0 起支持插在 view 等标签下。在此之前只可嵌套在平台小程序原生组件 map、video、canvas、camera 内，避免嵌套在其他组件内。
-   基础库 1.6.0 起支持 css transition 动画，transition-property 只支持 transform (translateX, translateY)与 opacity。
-   基础库 1.6.0 起支持 css opacity。
-   事件模型遵循冒泡模型，但不会冒泡到平台小程序原生组件。
-   文本建议都套上 cover-view 标签，避免排版错误。
-   只支持基本的定位、布局、文本样式。不支持设置单边的 border、background-image、shadow、overflow: visible 等。
-   建议子节点不要溢出父节点
-   支持使用 z-index 控制层级
-   默认设置的样式有：white-space: nowrap; line-height: 1.2; display: block;
-   自定义组件嵌套 cover-view 时，自定义组件的 slot 及其父节点暂不支持通过 wx:if 控制显隐，否则会导致 cover-view 不显示

**示例** [查看演示](https://hellouniapp.dcloud.net.cn/pages/component/cover-view/cover-view)

以下示例代码，来自于[hello uni-app 项目](https://github.com/dcloudio/hello-uniapp)。

::: preview https://hellouniapp.dcloud.net.cn/pages/component/cover-view/cover-view

> Template

```html
<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
    <view class="page">
        <video
            class="video"
            id="demoVideo"
            :controls="false"
            :enable-progress-gesture="false"
            :show-center-play-btn="true"
            src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v"
        >
            <cover-view class="controls-title">简单的自定义 controls</cover-view>
            <cover-image class="controls-play img" @click="play" src="/static/play.png"></cover-image>
            <cover-image class="controls-pause img" @click="pause" src="/static/pause.png"></cover-image>
        </video>
    </view>
</template>
```

> Script

```html
<script>
export default {
    data() {
        return {};
    },
    mounted() {
        this.videoCtx = uni.createVideoContext('demoVideo');
    },
    methods: {
        play(event) {
            this.videoCtx.play();
            uni.showToast({
                title: '开始播放',
                icon: 'none'
            });
        },
        pause(event) {
            this.videoCtx.pause();
            uni.showToast({
                title: '暂停播放',
                icon: 'none'
            });
        }
    }
};
</script>
```

> Style

```html
<style>
.page {
    display: flex;
    justify-content: center;
}

.video {
    position: relative;
}

cover-view,
cover-image {
    display: inline-block;
}

.img {
    position: absolute;
    width: 100rpx;
    height: 100rpx;
    top: 50%;
    margin-top: -50rpx;
}

.controls-play {
    left: 50rpx;
}

.controls-pause {
    right: 50rpx;
}

.controls-title {
    width: 100%;
    text-align: center;
    color: #ffffff;
}
</style>
```

:::
