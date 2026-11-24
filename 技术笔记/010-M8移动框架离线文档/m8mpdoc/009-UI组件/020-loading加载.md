# 组件使用

## loading 加载

### 介绍

-   加载提示组件。

::: ifdef M83

-   支持 weex 端使用

::: endif

### 代码演示

#### 加载类型

通过`type`属性可以设置加载图标的类型，默认为`circular`，可选值为`spinner` `ball` `operation` `square`

```html
<em-loading />
<em-loading type="spinner" />
<em-loading type="ball" />
<em-loading type="square" />
<em-loading type="operation" />
```

#### 自定义颜色

通过`color`属性设置加载图标的颜色

```html
<em-loading color="#1989fa" />
<em-loading type="spinner" color="#1989fa" />
<em-loading type="ball" color="#1989fa" />
<em-loading type="square" color="#2E3033" />
<em-loading type="operation" color="#1989fa" />
```

#### 自定义大小

通过`size`属性设置加载图标的大小，默认单位为`px`

```html
<em-loading size="24" />
<em-loading type="spinner" size="24px" />
<em-loading type="ball" size="24px" />
<em-loading type="square" size="24px" />
<em-loading type="operation" size="24px" />
```

#### 加载文案

可以使用默认插槽在图标的右侧插入加载文案

```html
<em-loading size="24px">加载中...</em-loading>
```

#### 垂直排列

设置`vertical`属性后，图标和文案会垂直排列

```html
<em-loading size="24px" vertical>加载中...</em-loading>
```

### API

#### Props

| 参数       |                         说明                         | 类型            | 默认值     | ::: ifdef M83 weex 端支持 ::: endif |
| :--------- | :--------------------------------------------------: | :-------------- | :--------- | :---------------------------------- |
| color      |                         颜色                         | string          | `#999`     | 是                                  |
| type       | 类型，可选值为 `spinner` `ball` `operation` `square` | string          | `circular` | 是                                  |
| size       |             加载图标大小，默认单位为`px`             | number / string | `30px`     | 是                                  |
| text-size  |               文字大小，默认单位为`px`               | number / string | `14px`     | 是                                  |
| text-color |                       文字颜色                       | string          | `#999`     | 是                                  |
| vertical   |              是否垂直排列图标和文字内容              | boolean         | `false`    | 是                                  |

#### Slots

| 名称    |   说明   |
| :------ | :------: |
| default | 加载文案 |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-loading"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-loading"
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
