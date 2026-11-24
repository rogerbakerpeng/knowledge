# 组件使用



## badge 徽标

### 介绍

-   在右上角展示徽标数字或小红点。

### 代码演示

#### 基础用法
设置 `content` 属性后，`Badge` 会在子元素的右上角显示对应的徽标，也可以通过 `dot` 来显示小红点。

```html
<em-badge :content="5">
  <div class="child" />
</em-badge>
<em-badge :content="10">
  <div class="child" />
</em-badge>
<em-badge content="Hot">
  <div class="child" />
</em-badge>
<em-badge dot>
  <div class="child" />
</em-badge>

<style>
  .child {
    width: 40px;
    height: 40px;
    background: #f2f3f5;
    border-radius: 4px;
  }
</style>
```

#### 最大值

设置 `max` 属性后，当 `content` 的数值超过最大值时，会自动显示为 `{max}+`。

```html
<em-badge :content="20" max="9">
  <div class="child" />
</em-badge>
<em-badge :content="50" max="20">
  <div class="child" />
</em-badge>
<em-badge :content="200" max="99">
  <div class="child" />
</em-badge>
```

#### 自定义颜色

通过 `color` 属性来设置徽标的颜色。

```html
<em-badge :content="5" color="#1989fa">
  <div class="child" />
</em-badge>
<em-badge :content="10" color="#1989fa">
  <div class="child" />
</em-badge>
<em-badge dot color="#1989fa">
  <div class="child" />
</em-badge>
```

#### 自定义徽标内容

通过 `content` 插槽可以自定义徽标的内容，比如插入一个图标。

```html
<em-badge>
  <div class="child" />
  <template #content>
    <em-icon name="success" class="badge-icon" />
  </template>
</em-badge>
<em-badge>
  <div class="child" />
  <template #content>
    <em-icon name="cross" class="badge-icon" />
  </template>
</em-badge>
<em-badge>
  <div class="child" />
  <template #content>
    <em-icon name="down" class="badge-icon" />
  </template>
</em-badge>
```

```css
.badge-icon {
  display: block;
  font-size: 10px;
  line-height: 16px;
}
```

#### 独立展示

当 `Badge` 没有子元素时，会作为一个独立的元素进行展示。

```html
<em-badge :content="20" />

<em-badge :content="200" max="99" />
```

### API

#### Props

|参数	|说明	|类型|	默认值|
| :------------- |:-------------:|:-------------|:-------------|
|content|	徽标内容|	number / string	|-|
|color	|徽标背景颜色|	string|	`#e03f3f`|
|dot|	是否展示为小红点	|boolean|	`false`|
|max	|最大值，超过最大值会显示 `{max}+`，仅当 `content` 为数字时有效|	number / string	|-|

#### Slots

|名称	|说明|
| :------------- |:-------------:|
|default|	徽标包裹的子元素|
|content|	自定义徽标内容|

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-badge"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-badge"
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