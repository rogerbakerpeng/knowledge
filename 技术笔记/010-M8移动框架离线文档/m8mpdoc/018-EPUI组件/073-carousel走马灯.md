# Carousel 走马灯

在有限的空间内循环显示一系列图像或文本

## 基本用法

将 `ep-carousel` 与 `ep-carousel-item` 结合使用，您将获得一个走马灯。每个幻灯片的内容是完全可自定义的，只需将其放置在 `ep-carousel-item` 标签内。

```html
<template>
    <e-carousel-m height="150px">
        <e-carousel-item-m v-for="item in 4" :key="item">
            <h3 class="small justify-center" text="2xl">{{ item }}</h3>
        </e-carousel-item-m>
    </e-carousel-m>
</template>
<style lang="scss" scoped>
    h3 {
        color: #475669;
        opacity: 0.75;
        margin: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    ::v-deep .ep-carousel-item:nth-child(2n) {
        background-color: #99a9bf;
    }

    ::v-deep .ep-carousel-item:nth-child(2n + 1) {
        background-color: #9aa2aa;
    }
</style>
```

## 指示器

指示器可以显示在走马灯之外

`indicator-position` 属性确定指示器的位置。默认情况下，它们位于走马灯内部，将 `indicator-position` 设置为 `outside` 可将它们移到外部；将 `indicator-position` 设置为 `none` 可隐藏指示器。

```html
<template>
    <e-carousel-m indicator-position="outside" height="150px">
        <e-carousel-item-m v-for="item in 4" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
        </e-carousel-item-m>
    </e-carousel-m>
</template>
<style lang="scss" scoped>
    h3 {
        color: #475669;
        opacity: 0.75;
        margin: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    ::v-deep .ep-carousel-item:nth-child(2n) {
        background-color: #99a9bf;
    }

    ::v-deep .ep-carousel-item:nth-child(2n + 1) {
        background-color: #9aa2aa;
    }
</style>
```

## 箭头

您可以定义何时显示箭头

`arrow` 属性确定何时显示箭头。将 `arrow` 设置为 `always` 或 `never` 可永久显示/隐藏箭头。

```html
<template>
    <e-carousel-m :interval="5000" arrow="always" height="150px">
        <e-carousel-item-m v-for="item in 4" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
        </e-carousel-item-m>
    </e-carousel-m>
</template>
<style lang="scss" scoped>
    h3 {
        color: #475669;
        opacity: 0.75;
        margin: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    ::v-deep .ep-carousel-item:nth-child(2n) {
        background-color: #99a9bf;
    }

    ::v-deep .ep-carousel-item:nth-child(2n + 1) {
        background-color: #9aa2aa;
    }
</style>
```

## 自动高度

当 `carousel` 的 `height` 设置为 `auto` 时，`carousel` 的高度将根据 `carousel` `item` 的高度自动调整

```html
<template>
    <div style="height: 300px">
        <e-carousel-m height="auto" autoplay>
            <e-carousel-item-m style="height: 100px">
                <h3 class="small justify-center" text="2xl">height 100px</h3>
            </e-carousel-item-m>
            <e-carousel-item-m style="height: 200px">
                <h3 class="small justify-center" text="2xl">height 200px</h3>
            </e-carousel-item-m>
            <e-carousel-item-m style="height: 300px">
                <h3 class="small justify-center" text="2xl">height 300px</h3>
            </e-carousel-item-m>
        </e-carousel-m>
    </div>
</template>
<style lang="scss" scoped>
    h3 {
        color: #475669;
        opacity: 0.75;
        margin: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    ::v-deep .ep-carousel-item:nth-child(2n) {
        background-color: #99a9bf;
    }

    ::v-deep .ep-carousel-item:nth-child(2n + 1) {
        background-color: #9aa2aa;
    }
</style>
```

## 卡片模式

当页面足够宽但高度有限时，您可以激活走马灯的卡片模式

将 `type` 设置为 `card` 激活卡片模式。除了外观，卡片模式和普通模式之间的最大区别是在卡片模式下，单击两侧的幻灯片可以直接切换走马灯。

```html
<template>
    <e-carousel-m :interval="4000" :loop="false" type="card" height="200px">
        <e-carousel-item-m v-for="item in 6" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
        </e-carousel-item-m>
    </e-carousel-m>
</template>
<style lang="scss" scoped>
    h3 {
        color: #475669;
        opacity: 0.75;
        margin: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    ::v-deep .ep-carousel-item:nth-child(2n) {
        background-color: #99a9bf;
    }

    ::v-deep .ep-carousel-item:nth-child(2n + 1) {
        background-color: #9aa2aa;
    }
</style>
```

## 垂直方向

默认情况下，`direction` 为 `horizontal`。通过将 `direction` 设置为 `vertical`，可以使走马灯以垂直方向显示。

```html
<template>
    <p class="text-center demonstration">normal vertical layout</p>
    <e-carousel-m height="200px" direction="vertical" :autoplay="false">
        <e-carousel-item-m v-for="item in 4" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
        </e-carousel-item-m>
    </e-carousel-m>
    <p class="text-center demonstration">card vertical layout</p>
    <e-carousel-m height="400px" direction="vertical" type="card" :autoplay="false">
        <e-carousel-item-m v-for="item in 4" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
        </e-carousel-item-m>
    </e-carousel-m>
</template>
<style lang="scss" scoped>
    .demonstration {
        color: var(--e-text-color-secondary);
    }

    h3 {
        color: #475669;
        opacity: 0.75;
        margin: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    ::v-deep .ep-carousel-item:nth-child(2n) {
        background-color: #99a9bf;
    }

    ::v-deep .ep-carousel-item:nth-child(2n + 1) {
        background-color: #9aa2aa;
    }
</style>
```

## Carousel API

### Carousel Attributes

| 属性               | 描述                                                           | 类型                         | 默认值         |
| :----------------- | :------------------------------------------------------------- | :--------------------------- | :------------- |
| height             | 走马灯的高度                                                   | 字符串                       | —              |
| initial-index      | 初始激活幻灯片的索引（从 0 开始）                              | 数字                         | `0`            |
| autoplay           | 是否自动播放幻灯片                                             | 布尔值                       | `true`         |
| interval           | 自动循环的时间间隔，以毫秒为单位                               | 数字                         | `3000`         |
| indicator-position | 指示器的位置                                                   | `'outside' \| 'none'`        | —              |
| arrow              | 何时显示箭头                                                   | `'always' \| 'never'`        | `'never'`      |
| type               | 走马灯的类型                                                   | `'card' \| 'default'`        | `'card'`       |
| loop               | 是否自动循环显示项目，若为`false`,播放到最后一个时自动停止播放 | 布尔值                       | `true`         |
| direction          | 显示方向                                                       | `'horizontal' \| 'vertical'` | `'horizontal'` |
| touchable          | 是否可以通过手势滑动                                           | 布尔值                       | `true`         |

### Carousel Events

| 名称   | 描述                     | 类型                                           |
| :----- | :----------------------- | :--------------------------------------------- |
| change | 当激活的幻灯片切换时触发 | `Function(newIndex: number, oldIndex: number)` |

### Carousel Slots

| 名称    | 描述           |
| :------ | :------------- |
| default | 自定义默认内容 |

### Carousel Exposes

| Name          | Description        | Type                                                                                                             |
| :------------ | :----------------- | :--------------------------------------------------------------------------------------------------------------- |
| setActiveItem | 手动切换幻灯片     | `Function(newIndex: number \| string)`(要切换到的幻灯片的索引，从 0 开始；或对应的 `ep-carousel-item` 的 `name`) |
| prev          | 切换到上一张幻灯片 | —                                                                                                                |
| next          | 切换到下一张幻灯片 | —                                                                                                                |

### CarouselItem Attributes

| 属性  | 描述                                  | 类型   | 默认值 |
| :---- | :------------------------------------ | :----- | :----- |
| name  | 项目的名称，可在 setActiveItem 中使用 | 字符串 | —      |
| label | 相应指示器的文本内容                  | 字符串 | —      |

### CarouselItem Slots

| 名称    | 描述           |
| :------ | :------------- |
| default | 自定义默认内容 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-carousel-m"
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