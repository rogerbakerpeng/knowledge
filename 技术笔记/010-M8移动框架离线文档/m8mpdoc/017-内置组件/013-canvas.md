#### canvas

画布。

**属性说明**

| 属性名         | 类型        | 默认值 | 说明                                                                | 平台差异说明           |
| :------------- | :---------- | :----- | :------------------------------------------------------------------ | :--------------------- |
| type           | String      |        | 指定 canvas 类型，支持 2d (2.9.0) 和 webgl                          | 微信小程序 2.7.0+ 支持 |
| canvas-id      | String      |        | canvas 组件的唯一标识符                                             |                        |
| disable-scroll | Boolean     | false  | 当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新    |                        |
| hidpi          | Boolean     | true   | 是否启用高清处理                                                    | H5 支持                |
| @longtap       | EventHandle |        | 手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动 |                        |
| @error         | EventHandle |        | 当发生错误时触发 error 事件，detail = {errMsg: 'something wrong'}   |                        |

**注意事项：**

-   canvas 标签默认宽度 300px、高度 225px，动态修改 canvas 大小后需要重新绘制。
-   h5中单个尺寸过大的 canvas 在 iOS/Safari 无法绘制（具体限制尺寸未公布）。
-   同一页面中的 canvas-id 不可重复，如果使用一个已经出现过的 canvas-id，该 canvas 标签对应的画布将被隐藏并不再正常工作。
-   canvas 在微信小程序中为原生组件，层级高于前端组件，请勿内嵌在 scroll-view、movable-view 中使用。
-   平台小程序，因为通信阻塞，难以绘制非常流畅的 canvas 动画。h5 不存在此问题。

**示例：** [查看演示](https://hellouniapp.dcloud.net.cn/pages/component/canvas/canvas)

::: preview https://hellouniapp.dcloud.net.cn/pages/component/canvas/canvas

> Template

```html
<template>
    <view>
        <canvas style="width: 300px; height: 200px;" canvas-id="firstCanvas" id="firstCanvas"></canvas>
        <canvas style="width: 400px; height: 500px;" canvas-id="secondCanvas" id="secondCanvas"></canvas>
        <canvas
            style="width: 400px; height: 500px;"
            canvas-id="secondCanvas"
            id="secondCanvas"
            @error="canvasIdErrorCallback"
        ></canvas>
    </view>
</template>
```

> Script

```html
<script>
export default {
    onReady: function (e) {
        var context = uni.createCanvasContext('firstCanvas');
        context.setStrokeStyle('#00ff00');
        context.setLineWidth(5);
        context.rect(0, 0, 200, 200);
        context.stroke();
        context.setStrokeStyle('#ff0000');
        context.setLineWidth(2);
        context.moveTo(160, 100);
        context.arc(100, 100, 60, 0, 2 * Math.PI, true);
        context.moveTo(140, 100);
        context.arc(100, 100, 40, 0, Math.PI, false);
        context.moveTo(85, 80);
        context.arc(80, 80, 5, 0, 2 * Math.PI, true);
        context.moveTo(125, 80);
        context.arc(120, 80, 5, 0, 2 * Math.PI, true);
        context.stroke();
        context.draw();
    },
    methods: {
        canvasIdErrorCallback: function (e) {
            console.error(e.detail.errMsg);
        }
    }
};
</script>
```

:::

相关 api：`Util.createCanvasContext`

**扩展阅读**

canvas 的常用用途有图表和图片处理，在插件市场有大量基于 canvas 的插件，可搜索 [图表](https://ext.dcloud.net.cn/search?q=图表) 、 [头像裁剪](https://ext.dcloud.net.cn/search?q=头像裁剪) 、 [海报](https://ext.dcloud.net.cn/search?q=海报) 、 [二维码](https://ext.dcloud.net.cn/search?q=%E4%BA%8C%E7%BB%B4%E7%A0%81) 。

关于图表

-   H5 端流行的 echart 报表因为涉及大量 dom 操作，无法跨端使用，而 wx-chart 在跨端和更新方面都不足。如考虑平台小程序，推荐使用全端可用的[uChart](https://ext.dcloud.net.cn/plugin?id=271)。
-   如只考虑 H5 端，也可以继续使用 echart、f2 等常规 web 图表。
-   如不考虑平台小程序，那么 H5，也可以通过 renderjs 技术来使用 echart、f2 等 web 图表，功能性能比 uchart 更好。[什么是 renderjs](https://uniapp.dcloud.io/frame?id=renderjs)、[基于 renderjs 使用 echart 的示例](https://ext.dcloud.net.cn/plugin?id=1207)
