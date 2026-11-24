# 组件使用

## indexbar 索引栏

### 介绍

-   索引栏。

### 代码演示

#### 基础用法

点击索引栏时，会自动跳转到对应的`IndexAnchor`锚点位置

```html
<view class="container">
    <em-index-bar>
        <em-index-anchor index="A"></em-index-anchor>
        <em-cell title="文本" />
        <em-cell title="文本" />
        <em-cell title="文本" />
        <em-index-anchor index="B"></em-index-anchor>
        <em-cell title="文本" />
        <em-cell title="文本" />
        <em-cell title="文本" />

        ...
    </em-index-bar>
</view>
```

#### 自定义索引列表

可以通过`index-list`属性自定义展示的索引字符列表，

```html
<view class="container">
    <em-index-bar :index-list="indexList">
        <em-index-anchor index="A">标题1</em-index-anchor>
        <em-cell title="文本" />
        <em-cell title="文本" />
        <em-cell title="文本" />
        <em-index-anchor index="B">标题2</em-index-anchor>
        <em-cell title="文本" />
        <em-cell title="文本" />
        <em-cell title="文本" />

        ...
    </em-index-bar>
</view>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const indexList = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```

::: endif

### API

#### IndexBar Props

| 参数              |            说明            | 类型                | 默认值    |
| :---------------- | :------------------------: | :------------------ | :-------- |
| index-list        |        索引字符列表        | string[] / number[] | `A-Z`     |
| z-index           |       `z-index` 层级       | number / string     | `1`       |
| sticky            |    是否开启锚点自动吸顶    | boolean             | `true`    |
| sticky-offset-top | 锚点自动吸顶时与顶部的距离 | number              | `0`       |
| highlight-color   |      索引字符高亮颜色      | string              | `#07c160` |

#### IndexAnchor Props

| 参数   |             说明              | 类型            | 默认值 |
| :----- | :---------------------------: | :-------------- | :----- |
| index  |       列表锚点文本内容        | number / string | -      |
| height |    列表锚点高度，单位`px`     | number / string | `32`   |
| size   | 列表锚点文字大小，单位默认 px | number / string | `14`   |

#### IndexBar Events

| 事件名 |             说明             | 回调参数               |
| :----- | :--------------------------: | :--------------------- |
| select |        选中字符时触发        | index: number / string |
| change | 当前高亮的索引字符变化时触发 | index: number / string |

#### IndexAnchor Slots

| 名称    |               说明               |
| :------ | :------------------------------: |
| default | 锚点位置显示内容，默认为索引字符 |

#### IndexBar 方法

通过 `ref` 可以获取到 `IndexBar` 实例并调用实例方法，详见组件实例方法。

| 方法名   |                                       说明                                        | 参数                   | 返回值 |
| :------- | :-------------------------------------------------------------------------------: | :--------------------- | :----- |
| scrollTo |                                  滚动到指定锚点                                   | index: number / string | -      |
| resize   | 重新计算索引栏位置，主要用于微信小程序中元素为展示却先调用了组件的`mounted`的问题 | -                      | -      |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-indexbar"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-indexbar"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif

 <style>
 .container {
    height: 100vh;
    overflow: hidden;
    .list {
        display: flex;
        flex-direction: row;
        padding: 8px 0px;
        align-items: center;
        font-size: 16px;
        margin-left: 10px;
        color: #303133;
    }
}
 </style>
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
