# 组件使用

## sidebar 侧边导航

### 介绍

-   侧边导航。

### 代码演示

#### 基础用法

通过`v-model`绑定当前选中项的索引

```html
<em-sidebar v-model="current1">
    <em-sidebar-item title="标签名称"></em-sidebar-item>
    <em-sidebar-item title="标签名称"></em-sidebar-item>
    <em-sidebar-item title="标签名称"></em-sidebar-item>
</em-sidebar>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            current1: 0
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const current1 = ref(0);
```

::: endif

#### 徽标提示

设置`dot`属性后，会在右上角展示一个小红点。设置`badge`属性后，会在右上角展示相应的徽标

```html
<em-sidebar v-model="current2">
    <em-sidebar-item title="标签名称" dot></em-sidebar-item>
    <em-sidebar-item title="标签名称" :badge="5"></em-sidebar-item>
    <em-sidebar-item title="标签名称" badge="99+"></em-sidebar-item>
</em-sidebar>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            current2: 0
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const current2 = ref(0);
```

::: endif

#### 禁用选项

通过`disabled`属性禁用选项

```html
<em-sidebar v-model="current3">
    <em-sidebar-item title="标签名称"></em-sidebar-item>
    <em-sidebar-item title="标签名称" :disabled="true"></em-sidebar-item>
    <em-sidebar-item title="标签名称"></em-sidebar-item>
</em-sidebar>
```

#### 监听切换事件

设置`change`方法来监听切换导航项时的事件

::: ifdef M83
```html
<em-sidebar v-model="current4" @change="onChange">
    <em-sidebar-item title="标签名称"></em-sidebar-item>
    <em-sidebar-item title="标签名称"></em-sidebar-item>
    <em-sidebar-item title="标签名称"></em-sidebar-item>
</em-sidebar>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    data() {
        return {
            current4: 0
        };
    },
    methods: {
        onChange(index) {
            Toast({
                message: `触发change事件 index:${index}`
            });
        }
    }
};
```
::: endif
::: ifdef M84
```html
<em-sidebar v-model="current4" @change="onChange">
    <em-sidebar-item title="标签名称"></em-sidebar-item>
    <em-sidebar-item title="标签名称"></em-sidebar-item>
    <em-sidebar-item title="标签名称"></em-sidebar-item>
</em-sidebar>
<em-toast ref="emToastRef"></em-toast>
```
```js
import { ref } from 'vue';

const current4 = ref(0);
const emToastRef = ref(null);

function onChange(index) {
    Toast({
        message: `触发change事件 index:${index}`
    });
}

defineExpose({
    emToastRef
});
```
::: endif

#### 路由跳转

```html
<em-sidebar v-model="current5">
    <em-sidebar-item title="url跳转" url="./em-loading"></em-sidebar-item>
    <em-sidebar-item title="外部链接跳转" url="http://www.baidu.com"></em-sidebar-item>
    <em-sidebar-item title="路由跳转" to="./em-cell"></em-sidebar-item>
    <em-sidebar-item title="路由对象跳转" :to="{path: './em-cell', query: {a: 'b'}}"></em-sidebar-item>
    <em-sidebar-item title="路由替换跳转" :to="{path: '../index', query: {a: 'b'}, replace: true}"></em-sidebar-item>
</em-sidebar>
```
::: ifdef M83
```js
export default {
    data() {
        return {
            current5: 0
        };
    }
};
```
::: endif
::: ifdef M84
```js
import { ref } from 'vue';

const current5 = ref(0);
```
::: endif

### API

#### Sidebar Props

| 参数                                                                         |       说明       | 类型            | 默认值 |
| :--------------------------------------------------------------------------- | :--------------: | :-------------- | :----- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif | 当前导航项的索引 | number / string | `0`    |

#### Sidebar Events

| 事件名 |       说明       | 回调参数                |
| :----- | :--------------: | :---------------------- |
| change | 切换导航项时触发 | index: 当前导航项的索引 |

#### SidebarItem Props

| 参数     |                                             说明                                              | 类型            | 默认值  |
| :------- | :-------------------------------------------------------------------------------------------: | :-------------- | :------ |
| title    |                                             内容                                              | string          | `''`    |
| dot      |                                     是否显示右上角小红点                                      | boolean         | `false` |
| badge    |                                     图标右上角徽标的内容                                      | number / string | -       |
| disabled |                                         是否禁用该项                                          | boolean         | `false` |
| url      |                                     点击后跳转的链接地址                                      | string          | -       |
| to       | 点击后跳转的目标路由对象，同 `vue-router` 的 `to` 属性，仅支持`path` `query` `replace` `hash` | string / object | -       |
| replace  |                                 是否在跳转时替换当前页面历史                                  | boolean         | `false` |

#### SidebarItem Events

| 事件名 |    说明    | 回调参数                |
| :----- | :--------: | :---------------------- |
| click  | 点击时触发 | index: 当前导航项的索引 |

#### SidebarItem Slots

| 名称  |    描述    |
| :---- | :--------: |
| title | 自定义标题 |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-sidebar"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-sidebar"
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
