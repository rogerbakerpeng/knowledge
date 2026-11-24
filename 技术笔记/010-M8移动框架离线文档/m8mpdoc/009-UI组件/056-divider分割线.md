# 组件使用

## divider 分割线

### 介绍

-   分割线。

### 代码演示

#### 基础用法

默认渲染一条水平分割线

```html
<em-divider />
```

#### 展示文字

通过插槽在可以分割线中间插入内容

```html
<em-divider>文字</em-divider>
```

#### 内容位置

通过`content-position`指定内容所在位置

```html
<em-divider content-position="left">文字</em-divider>
<em-divider content-position="right">文字</em-divider>
```

#### 虚线

添加`dashed`属性使分割线渲染为虚线

```html
<em-divider dashed>文字</em-divider>
```

#### 自定义样式

可以直接通过`style`属性设置分割线的样式

```html
<em-divider custom-style="color: #1989fa; border-color: #1989fa;padding: 0 16px;">文字</em-divider>
```

### API

#### Props

| 参数             |               说明               | 类型    | 默认值   |
| :--------------- | :------------------------------: | :------ | :------- |
| dashed           |           是否使用虚线           | boolean | `false`  |
| hairline         |       是否使用 `0.5px` 线        | boolean | `true`   |
| content-position | 内容位置，可选值为`left` `right` | string  | `center` |

#### Slots

| 名称    | 说明 |
| :------ | :--: |
| default | 内容 |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-divider"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-divider"
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
