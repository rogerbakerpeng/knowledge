# 组件使用

## cell 单元格

### 介绍

-   单元格组件。

::: ifdef M83

-   `v8.3.11`开始支持 weex 端使用

::: endif

### 代码演示

#### 基础用法

`Cell` 可以单独使用，也可以与 `CellGroup` 搭配使用，`CellGroup` 可以为 `Cell` 提供上下外边框。由于最后一个 `Cell` 和 `CellGroup` 的下边都有边框，会有边框重叠问题，需要手动将最后一个 `Cell` 设置成不显示边框。

```html
<em-cell-group>
    <em-cell title="单元格" value="内容" />
    <em-cell title="单元格" value="内容" label="描述信息" :border="false" />
</em-cell-group>
```

#### 单元格大小

通过 `size` 属性可以控制单元格的大小。

```html
<em-cell title="单元格" value="内容" size="large" />
<em-cell title="单元格" value="内容" size="large" label="描述信息" />
```

#### 展示图标

通过 `icon` 属性在标题左侧展示图标。

```html
<em-cell title="单元格" icon="location-o" />
```

#### 只设置 value

只设置 `value` 时，内容会靠左对齐。

```html
<em-cell value="内容" />
```

#### 展示箭头

设置 `is-link` 属性后会在单元格右侧显示箭头，并且可以通过 `arrow-direction` 属性控制箭头方向。

```html
<em-cell title="单元格" is-link />
<em-cell title="单元格" is-link value="内容" />
<em-cell title="单元格" is-link arrow-direction="down" value="内容" />
```

#### 页面导航

可以通过 `url` 属性进行 `URL` 跳转，或通过 `to` 属性进行路由跳转。

```html
<em-cell title="URL 跳转" is-link url="/van/mobile.html" />
<em-cell title="路由跳转" is-link to="index" />
```

#### 分组标题

通过 `CellGroup` 的 `title` 属性可以指定分组标题。

```html
<em-cell-group title="分组1">
    <em-cell title="单元格" value="内容" />
</em-cell-group>
<em-cell-group title="分组2">
    <em-cell title="单元格" value="内容" />
</em-cell-group>
```

#### 使用插槽

如以上用法不能满足你的需求，可以使用插槽来自定义内容。

```html
<em-cell value="内容" is-link>
    <!-- 使用 title 插槽来自定义标题 -->
    <template #title>
        <span class="custom-title">单元格</span>
        <em-tag type="danger">标签</em-tag>
    </template>
</em-cell>

<em-cell title="单元格" icon="shop-o">
    <!-- 使用 rightIcon 插槽来自定义右侧图标 -->
    <template #rightIcon>
        <em-icon name="search" class="search-icon" />
    </template>
</em-cell>

<style>
    .custom-title {
        margin-right: 4px;
        vertical-align: middle;
    }

    .search-icon {
        font-size: 16px;
        line-height: inherit;
    }
</style>
```

#### 垂直居中

通过 `center` 属性可以让 `Cell` 的左右内容都垂直居中。

```html
<em-cell center title="单元格" value="内容" label="描述信息" />
```

### API

#### CellGroup Props

| 参数   |      说明      | 类型    | 默认值 | ::: ifdef M83 weex 端支持 ::: endif |
| :----- | :------------: | :------ | :----- | :---------------------------------- |
| title  |    分组标题    | string  | -      | 是                                  |
| border | 是否显示外边框 | boolean | `true` | 是                                  |

#### Cell Props

| 参数            |                        说明                        | 类型            | 默认值     | ::: ifdef M83 weex 端支持 ::: endif |
| :-------------- | :------------------------------------------------: | :-------------- | :--------- | :---------------------------------- |
| title           |                      左侧标题                      | number / string | -          | 是                                  |
| value           |                      右侧内容                      | number / string | -          | 是                                  |
| label           |                 标题下方的描述信息                 | string          | -          | 是                                  |
| size            |             单元格大小，可选值为 large             | string          | -          | 是                                  |
| icon            |               左侧图标名称或图片链接               | string          | -          | 是                                  |
| icon-prefix     |   图标类名前缀，同 Icon 组件的 class-prefix 属性   | string          | `van-icon` | 否                                  |
| url             |                点击后跳转的链接地址                | string          | -          | 是                                  |
| to              | 点击后跳转的目标路由对象，同 vue-router 的 to 属性 | string / object | -          | 是                                  |
| border          |                   是否显示内边框                   | boolean         | `true`     | 是                                  |
| replace         |            是否在跳转时替换当前页面历史            | boolean         | `false`    | 是                                  |
| clickable       |                  是否开启点击反馈                  | boolean         | `false`    | 是                                  |
| is-link         |           是否展示右侧箭头并开启点击反馈           | boolean         | `false`    | 是                                  |
| required        |                是否显示表单必填星号                | boolean         | `false`    | 是                                  |
| center          |                 是否使内容垂直居中                 | boolean         | `false`    | 否（weex 端默认居中）               |
| arrow-direction |          箭头方向，可选值为 left up down           | string          | `right`    | 是                                  |
| extraPosition   |       extra 插槽的位置，可选值为 left right        | string          | `right`    | 是                                  |
| title-style     |                  左侧标题额外样式                  | string          | -          | 否                                  |
| title-class     |                  左侧标题额外类名                  | string          | -          | 否                                  |
| value-class     |                  右侧内容额外类名                  | string          | -          | 否                                  |
| label-class     |                  描述信息额外类名                  | string          | -          | 否                                  |

#### Cell Events

| 事件名 |       说明       | 回调参数     |
| :----- | :--------------: | :----------- |
| click  | 点击单元格时触发 | event: Event |

#### CellGroup Slots

| 名称    |      说明      |
| :------ | :------------: |
| default |    默认插槽    |
| title   | 自定义分组标题 |

#### Cell Slots

| 名称      |             说明             |
| :-------- | :--------------------------: |
| default   |   自定义右侧 value 的内容    |
| title     |   自定义左侧 title 的内容    |
| label     | 自定义标题下方 label 的内容  |
| icon      |        自定义左侧图标        |
| rightIcon | 自定义右侧按钮，默认为 arrow |
| extra     |    自定义单元格的额外内容    |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-cell"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-cell"
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
