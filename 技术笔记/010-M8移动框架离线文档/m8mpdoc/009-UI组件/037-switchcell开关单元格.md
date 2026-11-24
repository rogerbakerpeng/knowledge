# 组件使用

## switchcell 开关单元格

### 介绍

-   开关单元格组件。

### 代码演示

#### 基础用法

```html
<em-cell-group>
    <em-switch-cell title="标题" v-model="checked"></em-switch-cell>
</em-cell-group>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            checked: true
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const checked = ref(true);
```

::: endif

#### 禁用状态

通过`disabled`属性可以将组件设置为禁用状态

```html
<em-cell-group>
    <em-switch-cell title="标题" :disabled="true" v-model="checked"></em-switch-cell>
</em-cell-group>
```

#### 加载状态

通过`loading`属性可以将组件设置为加载状态

```html
<em-cell-group>
    <em-switch-cell title="标题" :loading="true" v-model="checked"></em-switch-cell>
</em-cell-group>
```

### API

#### Props

| 参数                                                                         |             说明             | 类型            | 默认值    |
| :--------------------------------------------------------------------------- | :--------------------------: | :-------------- | :-------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |           开关状态           | boolean         | `false`   |
| title                                                                        |           左侧标题           | string          | `''`      |
| border                                                                       |     是否展示单元格内边框     | boolean         | `true`    |
| cell-size                                                                    | 单元格大小，可选值为 `large` | string          | -         |
| loading                                                                      |        是否为加载状态        | boolean         | `false`   |
| disabled                                                                     |        是否为禁用状态        | boolean         | `false`   |
| size                                                                         |           开关尺寸           | number / string | `24px`    |
| active-color                                                                 |        开关时的背景色        | string          | `#1989fa` |
| inactive-color                                                               |        开关时的背景色        | string          | `white`   |
| active-value                                                                 |          打开时的值          | any             | `true`    |
| inactive-value                                                               |          关闭时的值          | any             | `false`   |

#### Events

| 事件名 |       说明       | 回调参数              |
| :----- | :--------------: | :-------------------- |
| change | 开关状态切换回调 | checked: 是否选中开关 |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-switch-cell"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-switch-cell"
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
