# 组件使用

## layout 布局

### 介绍

-   `Layout` 提供了`em-row`和`em-col`两个组件来进行行列布局。

::: ifdef M83

-   `v8.3.11`开始支持 weex 端使用

::: endif

### 代码演示

#### 基础用法

`Layout` 组件提供了 24 列栅格，通过在`Col`上添加`span`属性设置列所占的宽度百分比。此外，添加`offset`属性可以设置列的偏移宽度，计算方式与 `span` 相同。

```html
<em-row>
    <em-col span="8">span: 8</em-col>
    <em-col span="8">span: 8</em-col>
    <em-col span="8">span: 8</em-col>
</em-row>

<em-row>
    <em-col span="4">span: 4</em-col>
    <em-col span="10" offset="4">offset: 4, span: 10</em-col>
</em-row>

<em-row>
    <em-col offset="12" span="12">offset: 12, span: 12</em-col>
</em-row>
```

#### 设置列元素间距

通过`gutter`属性可以设置列元素之间的间距，默认间距为 `0`

```html
<em-row gutter="20">
    <em-col span="8">span: 8</em-col>
    <em-col span="8">span: 8</em-col>
    <em-col span="8">span: 8</em-col>
</em-row>
```

#### Flex 布局

将 `type` 属性设置为 `flex` 可以启用 `flex` 布局，便于进行灵活的对齐

```html
<!-- 左对齐 -->
<em-row type="flex">
    <em-col span="6">span: 6</em-col>
    <em-col span="6">span: 6</em-col>
    <em-col span="6">span: 6</em-col>
</em-row>

<!-- 居中 -->
<em-row type="flex" justify="center">
    <em-col span="6">span: 6</em-col>
    <em-col span="6">span: 6</em-col>
    <em-col span="6">span: 6</em-col>
</em-row>

<!-- 右对齐 -->
<em-row type="flex" justify="end">
    <em-col span="6">span: 6</em-col>
    <em-col span="6">span: 6</em-col>
    <em-col span="6">span: 6</em-col>
</em-row>

<!-- 两端对齐 -->
<em-row type="flex" justify="space-between">
    <em-col span="6">span: 6</em-col>
    <em-col span="6">span: 6</em-col>
    <em-col span="6">span: 6</em-col>
</em-row>

<!-- 每个元素的两侧间隔相等 -->
<em-row type="flex" justify="space-around">
    <em-col span="6">span: 6</em-col>
    <em-col span="6">span: 6</em-col>
    <em-col span="6">span: 6</em-col>
</em-row>
```

### API

#### Row Props

| 参数    | 说明                                                                        | 类型            | 默认值  | ::: ifdef M83 weex 端支持 ::: endif                  |
| :------ | :-------------------------------------------------------------------------- | :-------------- | :------ | :--------------------------------------------------- |
| type    | 布局方式，可选值为`flex`                                                    | string          | -       | 否 ::: ifdef M83（weex 端只支持 flex 布局）::: endif |
| gutter  | 列元素之间的间距（单位为 `px`）                                             | number / string | `0`     | 是                                                   |
| justify | `Flex` 主轴对齐方式，可选值为 `end` `center` `space-around` `space-between` | string          | `start` | 是                                                   |
| align   | `Flex` 交叉轴对齐方式，可选值为 `center` `bottom`                           | string          | `top`   | 是                                                   |

#### Col Props

| 参数   | 说明           | 类型            | 默认值 | ::: ifdef M83 weex 端支持 ::: endif |
| :----- | :------------- | :-------------- | :----- | :---------------------------------- |
| span   | 列元素宽度     | number / string | `24`   | 是                                  |
| offset | 列元素偏移距离 | number / string | `0`    | 是                                  |

#### Row Events

| 事件名 | 说明       | 回调参数     |
| :----- | :--------- | :----------- |
| click  | 点击时触发 | event: Event |

#### Col Events

| 事件名 | 说明       | 回调参数     |
| :----- | :--------- | :----------- |
| click  | 点击时触发 | event: Event |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-layout"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-layout"
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
