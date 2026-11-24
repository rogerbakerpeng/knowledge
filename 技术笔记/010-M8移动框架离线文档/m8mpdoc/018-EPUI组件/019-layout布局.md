# Layout 布局

通过基础的 24 分栏，迅速简便地创建布局。

TIP

组件默认使用 Flex 布局，不需要手动设置 `type="flex"`。

请注意父容器避免使用 `inline` 相关样式，会导致组件宽度不能撑满。

## 基础布局

使用列创建基础网格布局。

通过 `row` 和 `col` 组件，并通过 `col` 组件的 `span` 属性我们就可以自由地组合布局。

```html
<template>
  <e-row-m>
    <e-col-m :span="24"><div class="grid-content ep-bg-purple-dark" /></e-col-m>
  </e-row-m>
  <e-row-m>
    <e-col-m :span="12"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="12"><div class="grid-content ep-bg-purple-light" /></e-col-m>
  </e-row-m>
  <e-row-m>
    <e-col-m :span="8"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="8"><div class="grid-content ep-bg-purple-light" /></e-col-m>
    <e-col-m :span="8"><div class="grid-content ep-bg-purple" /></e-col-m>
  </e-row-m>
  <e-row-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple-light" /></e-col-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple-light" /></e-col-m>
  </e-row-m>
  <e-row-m>
    <e-col-m :span="4"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="4"><div class="grid-content ep-bg-purple-light" /></e-col-m>
    <e-col-m :span="4"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="4"><div class="grid-content ep-bg-purple-light" /></e-col-m>
    <e-col-m :span="4"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="4"><div class="grid-content ep-bg-purple-light" /></e-col-m>
  </e-row-m>
</template>

<style lang="scss" scoped>
.ep-row {
  margin-bottom: 20px;
}
.ep-row:last-child {
  margin-bottom: 0;
}
.ep-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
```

## 分栏间隔

支持列间距。

行提供 `gutter` 属性来指定列之间的间距，其默认值为 0。

```html
<template>
  <e-row-m :gutter="20">
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
  </e-row-m>
</template>

<style scoped>
.ep-row {
  margin-bottom: 20px;
}
.ep-row:last-child {
  margin-bottom: 0;
}
.ep-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
```

## 混合布局

通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。

```html
<template>
  <e-row-m :gutter="20">
    <e-col-m :span="16"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="8"><div class="grid-content ep-bg-purple" /></e-col-m>
  </e-row-m>
  <e-row-m :gutter="20">
    <e-col-m :span="8"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="8"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="4"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="4"><div class="grid-content ep-bg-purple" /></e-col-m>
  </e-row-m>
  <e-row-m :gutter="20">
    <e-col-m :span="4"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="16"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="4"><div class="grid-content ep-bg-purple" /></e-col-m>
  </e-row-m>
</template>

<style scoped>
.ep-row {
  margin-bottom: 20px;
}
.ep-row:last-child {
  margin-bottom: 0;
}
.ep-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
```

## 列偏移

您可以指定列偏移量。

通过制定 `col` 组件的 `offset` 属性可以指定分栏偏移的栏数。

```html
<template>
  <e-row-m :gutter="20">
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="6" :offset="6"><div class="grid-content ep-bg-purple" /></e-col-m>
  </e-row-m>
  <e-row-m :gutter="20">
    <e-col-m :span="6" :offset="6"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="6" :offset="6"><div class="grid-content ep-bg-purple" /></e-col-m>
  </e-row-m>
  <e-row-m :gutter="20">
    <e-col-m :span="12" :offset="6"><div class="grid-content ep-bg-purple" /></e-col-m>
  </e-row-m>
</template>

<style scoped>
.ep-row {
  margin-bottom: 20px;
}
.ep-row:last-child {
  margin-bottom: 0;
}
.ep-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
```

## 对齐方式

默认使用 flex 布局来对分栏进行灵活的对齐。

您可以通过 `justify` 属性来定义子元素的排版方式，其取值为 start、center、end、space-between、space-around 或 space-evenly。

```html
<template>
  <e-row-m class="row-bg">
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple-light" /></e-col-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
  </e-row-m>
  <e-row-m class="row-bg" justify="center">
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple-light" /></e-col-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
  </e-row-m>
  <e-row-m class="row-bg" justify="end">
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple-light" /> </e-col>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col>
  </e-row-m>
  <e-row-m class="row-bg" justify="space-between">
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple-light" /></e-col-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
  </e-row-m>
  <e-row-m class="row-bg" justify="space-around">
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple-light" /></e-col-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
  </e-row-m>
  <e-row-m class="row-bg" justify="space-evenly">
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple-light" /></e-col-m>
    <e-col-m :span="6"><div class="grid-content ep-bg-purple" /></e-col-m>
  </e-row-m>
</template>

<style scoped>
.ep-row {
  margin-bottom: 20px;
}
.ep-row:last-child {
  margin-bottom: 0;
}
.ep-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
```

## 响应式布局

参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：xs、sm、md、lg 和 xl。

```html
<template>
  <e-row-m :gutter="10">
    <e-col-m :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content ep-bg-purple-light" /></e-col-m>
    <e-col-m :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content ep-bg-purple" /></e-col-m>
    <e-col-m :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content ep-bg-purple-light" /></e-col-m>
  </e-row-m>
</template>

<style scoped>
.ep-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

```

## Row API

### Row Attributes

| Name    | Description               | Type                                                         | Default |
| :------ | :------------------------ | :----------------------------------------------------------- | :------ |
| gutter  | 栅格间隔                  | `number`                                                     | 0       |
| justify | flex 布局下的水平排列方式 | `enum`-`'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | start   |
| align   | flex 布局下的垂直排列方式 | `enum`-`'top' \| 'middle' \| 'bottom'`                       | top     |

### Row Slots

| **Name** | Description    | Subtags |
| :------- | :------------- | :------ |
| Default  | 自定义默认内容 | Col     |

## Col API

### Col Attributes

| Name   | Description                            | Type                                                         | Default |
| :----- | :------------------------------------- | :----------------------------------------------------------- | :------ |
| span   | 栅格占据的列数                         | `number`                                                     | 24      |
| offset | 栅格左侧的间隔格数                     | `number`                                                     | 0       |
| push   | 栅格向右移动格数                       | `number`                                                     | 0       |
| pull   | 栅格向左移动格数                       | `number`                                                     | 0       |
| xs     | `<768px` 响应式栅格数或者栅格属性对象  | `number` / `object`-`{span?: number, offset?: number, pull?: number, push?: number}` | —       |
| sm     | `≥768px` 响应式栅格数或者栅格属性对象  | `number` / `object`-`{span?: number, offset?: number, pull?: number, push?: number}` | —       |
| md     | `≥992px` 响应式栅格数或者栅格属性对象  | `number` / `object`-`{span?: number, offset?: number, pull?: number, push?: number}` | —       |
| lg     | `≥1200px` 响应式栅格数或者栅格属性对象 | `number` / `object`-`{span?: number, offset?: number, pull?: number, push?: number}` | —       |
| xl     | `≥1920px` 响应式栅格数或者栅格属性对象 | `number` / `object`-`{span?: number, offset?: number, pull?: number, push?: number}` | —       |

### Col Slots

| Name    | Description    |
| :------ | :------------- |
| Default | 自定义默认内容 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-layout-m"
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