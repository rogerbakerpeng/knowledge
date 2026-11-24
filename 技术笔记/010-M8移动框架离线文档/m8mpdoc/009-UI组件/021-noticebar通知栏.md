# 组件使用

## noticebar 通知栏

### 介绍

-   通知栏组件。

### 代码演示

#### 基础用法

通过 `text` 属性设置通知栏的内容，通过 `left-icon` 属性设置通知栏左侧的图标。

```html
<em-notice-bar
    left-icon="volume-o"
    text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
/>
```

#### 滚动播放

通知栏的内容长度溢出时会自动开启滚动播放，通过 `scrollable` 属性可以控制该行为。

```html
<!-- 文字较短时，通过设置 scrollable 属性开启滚动播放 -->
<em-notice-bar scrollable text="技术是开发它的人的共同灵魂。" />

<!-- 文字较长时，通过禁用 scrollable 属性关闭滚动播放 -->
<em-notice-bar
    :scrollable="false"
    text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
/>
```

#### 多行展示

文字较长时，可以通过设置 `wrapable` 属性来开启多行展示。

```html
<em-notice-bar
    wrapable
    :scrollable="false"
    text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
/>
```

#### 通知栏模式

通知栏支持 `closeable` 和 `link` 两种模式。

```html
<!-- closeable 模式，在右侧显示关闭按钮 -->
<em-notice-bar mode="closeable">技术是开发它的人的共同灵魂。</em-notice-bar>

<!-- link 模式，在右侧显示链接箭头 -->
<em-notice-bar mode="link">技术是开发它的人的共同灵魂。</em-notice-bar>
```

#### 自定义样式

通过 `color` 属性设置文本颜色，通过 `background` 属性设置背景色。

```html
<em-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">技术是开发它的人的共同灵魂。</em-notice-bar>
```

#### 垂直滚动

搭配 `NoticeBar` 和 `Gallery` 组件可以实现垂直滚动的效果。

```html
<em-notice-bar :scrollable="false" left-icon="volume-o">
    <template #default>
        <em-swipe class="notice-swipe" :height="40" :autoplay="3000" :show-indicators="false" vertical>
            <em-swipe-item>技术是开发它的人的共同灵魂。技术是开发它的人的共同灵魂。</em-swipe-item>
            <em-swipe-item>内容2</em-swipe-item>
            <em-swipe-item>内容3</em-swipe-item>
        </em-swipe>
    </template>
</em-notice-bar>

<style>
    ::v-deep .em-swipe-item {
        text-align: center;
    }
</style>
```

### API

#### Props

| 参数       |                   说明                   | 类型            | 默认值    |
| :--------- | :--------------------------------------: | :-------------- | :-------- |
| mode       | 通知栏模式，可选值为 `closeable` `link`  | string          | `''`      |
| text       |               通知文本内容               | string          | `''`      |
| color      |               通知文本颜色               | string          | `#f60`    |
| background |                滚动条背景                | string          | `#fff7cc` |
| left-icon  |          左侧图标名称或图片链接          | string          | -         |
| delay      |            动画延迟时间 `(s)`            | number / string | `1`       |
| speed      |            滚动速率 `(px/s)`             | number / string | `50`      |
| scrollable | 是否开启滚动播放，内容长度溢出时默认开启 | boolean         | -         |
| wrapable   |   是否开启文本换行，只在禁用滚动时生效   | boolean         | `false`   |

#### Events

| 事件名 |             说明             | 回调参数     |
| :----- | :--------------------------: | :----------- |
| click  |       点击通知栏时触发       | event: Event |
| close  |       关闭通知栏时触发       | event: Event |
| replay | 每当滚动栏重新开始滚动时触发 | -            |

#### Slots

| 名称      |      内容      |
| :-------- | :------------: |
| default   |  通知文本内容  |
| leftIcon  | 自定义左侧图标 |
| rightIcon | 自定义右侧图标 |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-notice-bar"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-notice-bar"
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
