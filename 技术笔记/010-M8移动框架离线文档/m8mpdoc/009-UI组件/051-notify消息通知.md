# 组件使用

## notify 消息通知

### 介绍

-   在页面顶部展示消息提示，支持函数调用和组件调用两种方式。

### 引入

手动引入时的引入路径：

```js
import Notify from '@components/em-notify/index.js';
```

Notify 作为全局函数，跨端框架为其提供了全局注入的功能，使用该函数时，框架会自动引入上述路径，所以在跨端框架中使用时，不必再手动引入。

### 代码演示

#### 基础用法

`Notify` 是一个函数，调用后会直接在页面中弹出相应的消息提示。

需要手动在页面上放一个 notify 节点，且提供一个 ref 方便函数进行查找。

::: ifdef M83
该节点的 ref 名称默认为 `emNotify`。
::: endif

::: ifdef M84
该节点的 ref 名称默认为 `emNotifyRef`。
::: endif

::: ifdef M83

```html
<em-notify ref="emNotify"></em-notify>
```

```js
Notify('通知内容');
```

::: endif

::: ifdef M84

```html
<em-notify ref="emNotifyRef"></em-notify>
```

```js
import { ref } from 'vue';

const emNotifyRef = ref(false);
Notify('通知内容');
defineExpose({
    emNotifyRef
});
```

::: endif

#### 通知类型

支持 `primary`、`success`、`warning`、`danger` 四种通知类型，默认为 `danger`。

```js
// 主要通知
Notify({ type: 'primary', message: '通知\n内容' });

// 成功通知
Notify({ type: 'success', message: '通知\n内容' });

// 危险通知
Notify({ type: 'danger', message: '通知\n内容' });

// 警告通知
Notify({ type: 'warning', message: '通知\n内容' });
```

#### 自定义通知

自定义消息通知的颜色和展示时长。

```js
Notify({
    message: '自定义颜色',
    color: '#ad0000',
    background: '#ffe1e1'
});

Notify({
    message: '自定义时长',
    duration: 1000
});
```

#### 组件调用

如果需要在 `Notify` 内嵌入组件或其他自定义内容，可以使用组件调用的方式。

```html
<em-button type="primary" text="组件调用" @click="showNotify" />
<em-notify v-model="show" type="success">
    <em-icon name="bell" style="margin-right: 4px" />
    <span>通知内容</span>
</em-notify>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            show: false
        };
    },
    methods: {
        showNotify() {
            this.show = true;
            setTimeout(() => {
                this.show = false;
            }, 2000);
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const show = ref(false);
const showNotify = () => {
    show.value = true;
    setTimeout(() => {
        show.value = false;
    }, 2000);
};
```

::: endif

### API

#### 方法

| 方法名                     | 说明                                       | 参数              | 返回值        |
| :------------------------- | :----------------------------------------- | :---------------- | :------------ |
| Notify                     | 展示提示                                   | options / message | `notify` 实例 |
| Notify.clear               | 关闭提示                                   | -                 | -             |
| Notify.setDefaultOptions   | 修改默认配置，对当前页面所有 `Notify` 生效 | options           | `void`        |
| Notify.resetDefaultOptions | 重置默认配置，对当前页面所有 `Notify` 生效 | -                 | `void`        |

#### Options

| 参数       | 说明                                                      | 类型            | 默认值     |
| :--------- | :-------------------------------------------------------- | :-------------- | :--------- |
| context    | notify 节点上下文，传入后只在该$vm 节点下查找 notify 节点 | vue 实例        | 当前页面   |
| selector   | notify 节点的 ref，函数根据该 ref 进行查找                | string          | `emNotify` |
| type       | 类型，可选值为 `primary` `success` `warning`              | string          | `danger`   |
| message    | 展示文案，支持通过`\n`换行                                | string          | -          |
| duration   | 展示时长(`ms`)，值为 `0` 时，`notify` 不会消失            | number / string | `2000`     |
| color      | 字体颜色                                                  | string          | `white`    |
| background | 背景颜色                                                  | string          | -          |
| onClick    | 点击时的回调函数                                          | Function        | -          |
| onOpened   | 完全展示后的回调函数                                      | Function        | -          |
| onClose    | 关闭时的回调函数                                          | Function        | -          |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-notify"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-notify"
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
