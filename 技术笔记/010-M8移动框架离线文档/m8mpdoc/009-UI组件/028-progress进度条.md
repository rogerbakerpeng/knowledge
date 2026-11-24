# 组件使用

## progress 进度条

### 介绍

-   进度条组件。

### 代码演示

#### 基础用法

进度条默认为蓝色，使用`percentage`属性来设置当前进度。

```html
<em-progress :percentage="50" />
```

#### 线条粗细

通过`stroke-width`可以设置进度条的粗细

```html
<em-progress :percentage="50" stroke-width="8" />
```

#### 置灰

设置`inactive`属性后进度条将置灰

```html
<em-progress inactive :percentage="50" />
```

#### 样式定制

可以使用`pivot-text`属性自定义文字，`color`属性自定义进度条颜色

```html
<em-progress pivot-text="橙色" color="#f2826a" :percentage="25" />
<em-progress pivot-text="红色" color="#ee0a24" :percentage="50" />
<em-progress
    :percentage="75"
    pivot-text="紫色"
    pivot-color="#7232dd"
    color="linear-gradient(to right, #be99ff, #7232dd)"
/>
```

### API

#### Props

| 参数         |            说明            | 类型            | 默认值       |
| :----------- | :------------------------: | :-------------- | :----------- |
| percentage   |         进度百分比         | number / string | `0`          |
| stroke-width | 进度条粗细，默认单位为`px` | number / string | `4px`        |
| color        |         进度条颜色         | string          | `#2e6be5`    |
| track-color  |          轨道颜色          | string          | `#e5e5e5`    |
| pivot-text   |        进度文字内容        | string          | 百分比       |
| pivot-color  |       进度文字背景色       | string          | 同进度条颜色 |
| text-color   |        进度文字颜色        | string          | `white`      |
| inactive     |          是否置灰          | boolean         | `false`      |
| show-pivot   |      是否显示进度文字      | boolean         | `true`       |

#### 方法

通过 `ref` 可以获取到 `Progress` 实例并调用实例方法，详见组件实例方法。

| 方法名 |                     说明                     | 参数 | 返回值 |
| :----- | :------------------------------------------: | :--- | :----- |
| resize | 外层元素大小变化后，可以调用此方法来触发重绘 | -    | -      |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-progress"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-progress"
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
