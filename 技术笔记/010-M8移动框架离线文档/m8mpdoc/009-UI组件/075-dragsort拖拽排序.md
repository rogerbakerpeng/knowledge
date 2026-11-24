# 组件使用

## Dragsort 拖拽排序

### 介绍

-   拖拽排序组件。该组件自`v8.3.6`版本开始支持。

### 代码演示

#### 基础用法

默认长按进行拖拽，默认为纵向排序

```html
<em-dragsort v-model="list">
    <em-dragsort-item v-for="(item, index) in list" :key="index">
        <em-cell :title="'item ' + item"></em-cell>
    </em-dragsort-item>
</em-dragsort>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            list: [1, 2, 3, 4]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const list = ref([1, 2, 3, 4]);
```

::: endif

#### 横向排序

也可通过`direction`属性设置横向排序。

```html
<em-dragsort v-model="list" direction="horizontal">
    <em-dragsort-item v-for="(item, index) in list" :key="index">
        <em-tag basic-type="person">item {{ item }}</em-tag>
    </em-dragsort-item>
</em-dragsort>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            list: [1, 2, 3, 4]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const list = ref([1, 2, 3, 4]);
```

::: endif

#### grid 排序

```html
<em-grid :gutter="10">
    <em-dragsort v-model="gridlist" direction="auto">
        <em-dragsort-item v-for="(item, index) in gridlist" :key="index">
            <em-grid-item icon="photo-o" :text="'item ' + item" />
        </em-dragsort-item>
    </em-dragsort>
</em-grid>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            gridlist: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const gridlist = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
```

::: endif

### API

#### Props

| 参数                                                                         |                 说明                 | 类型   | 默认值     |
| :--------------------------------------------------------------------------- | :----------------------------------: | :----- | :--------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |        需要拖拽排序的列表数据        | array  | `-`        |
| direction                                                                    | 拖拽方向，可选值 `horizontal` `auto` | string | `vertical` |
| activeItemClass                                                              |       激活的元素添加自定义类名       | string | `-`        |

#### Events

| 事件名 |      说明      | 回调参数           |
| :----- | :------------: | :----------------- |
| end    | 排序结束时触发 | list: 排序后的数组 |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-dragsort"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-dragsort"
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
