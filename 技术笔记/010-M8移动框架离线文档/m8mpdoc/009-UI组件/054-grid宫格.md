# 组件使用

## grid 宫格

### 介绍

-   宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。

::: ifdef M83

-   `v8.3.11`开始支持 weex 端使用

::: endif

### 代码演示

#### 基础用法

通过`icon`属性设置格子内的图标，`text`属性设置文字内容。

```html
<em-grid>
    <em-grid-item icon="photo-o" text="文字" />
    <em-grid-item icon="photo-o" text="文字" />
    <em-grid-item icon="photo-o" text="文字" />
    <em-grid-item icon="photo-o" text="文字" />
</em-grid>
```

#### 自定义列数

默认一行展示四个格子，可以通过`column-num`自定义列数

```html
<em-grid :column-num="3">
    <em-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" />
</em-grid>
```

#### 自定义内容

通过插槽可以自定义格子展示的内容

```html
<em-grid :border="false" :column-num="3">
    <em-grid-item>
        <em-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
    </em-grid-item>
    <em-grid-item>
        <em-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
    </em-grid-item>
    <em-grid-item>
        <em-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
    </em-grid-item>
</em-grid>
```

#### 正方形格子

设置`square`属性后，格子的高度会和宽度保持一致

```html
<em-grid square>
    <em-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
</em-grid>
```

#### 格子间距

通过`gutter`属性设置格子之间的距离

```html
<em-grid :gutter="10">
    <em-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
</em-grid>
```

#### 内容横排

将`direction`属性设置为`horizontal`，可以让宫格的内容呈横向排列

```html
<em-grid direction="horizontal" :column-num="3">
    <em-grid-item icon="photo-o" text="文字" />
    <em-grid-item icon="photo-o" text="文字" />
    <em-grid-item icon="photo-o" text="文字" />
</em-grid>
```

#### 页面导航

通过`to`属性设置`vue-router`跳转链接，通过`url`属性设置 `URL` 跳转链接

```html
<em-grid clickable :column-num="2">
    <em-grid-item icon="home-o" text="路由跳转" to="./em-cell" />
    <em-grid-item icon="search" text="URL 跳转" url="./em-loading" />
</em-grid>
```

#### 徽标提示

设置`dot`属性后，会在图标右上角展示一个小红点。设置`badge`属性后，会在图标右上角展示相应的徽标

```html
<em-grid :column-num="2">
    <em-grid-item icon="home-o" text="文字" dot />
    <em-grid-item icon="search" text="文字" badge="99+" />
</em-grid>
```

### API

#### Grid Props

| 参数       |                   说明                    | 类型            | 默认值     | ::: ifdef M83 weex 端支持 ::: endif |
| :--------- | :---------------------------------------: | :-------------- | :--------- | :---------------------------------- |
| column-num |                   列数                    | number / string | `4`        | 是                                  |
| icon-size  |         图标大小，默认单位为`px`          | number / string | `28px`     | 是                                  |
| gutter     |      格子之间的间距，默认单位为`px`       | number / string | `0`        | 是                                  |
| border     |               是否显示边框                | boolean         | `true`     | 是                                  |
| center     |          是否将格子内容居中显示           | boolean         | `true`     | 是                                  |
| square     |          是否将格子固定为正方形           | boolean         | `false`    | 是                                  |
| clickable  |           是否开启格子点击反馈            | boolean         | `false`    | 是                                  |
| direction  | 格子内容排列的方向，可选值为 `horizontal` | string          | `vertical` | 是                                  |

#### GridItem Props

| 参数        |                                             说明                                              | 类型            | 默认值     | ::: ifdef M83 weex 端支持 ::: endif |
| :---------- | :-------------------------------------------------------------------------------------------: | :-------------- | :--------- | :---------------------------------- |
| text        |                                             文字                                              | string          | -          | 是                                  |
| icon        |                                      图标名称或图片链接                                       | string          | -          | 是                                  |
| icon-prefix |                      图标类名前缀，同 `Icon` 组件的 `class-prefix` 属性                       | string          | `van-icon` | 否                                  |
| dot         |                                   是否显示图标右上角小红点                                    | boolean         | `false`    | 是                                  |
| badge       |                                     图标右上角徽标的内容                                      | number / string | -          | 是                                  |
| url         |                                     点击后跳转的链接地址                                      | string          | -          | 是                                  |
| to          | 点击后跳转的目标路由对象，同 `vue-router` 的 `to` 属性，仅支持`path` `query` `replace` `hash` | string / object | -          | 是                                  |
| replace     |                                 是否在跳转时替换当前页面历史                                  | boolean         | `false`    | 是                                  |

#### GridItem Events

| 事件名 |      说明      | 回调参数     |
| :----- | :------------: | :----------- |
| click  | 点击格子时触发 | event: Event |

#### GridItem Slots

| 名称    |         说明         |
| :------ | :------------------: |
| default | 自定义宫格的所有内容 |
| icon    |      自定义图标      |
| text    |      自定义文字      |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-grid"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-grid"
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
