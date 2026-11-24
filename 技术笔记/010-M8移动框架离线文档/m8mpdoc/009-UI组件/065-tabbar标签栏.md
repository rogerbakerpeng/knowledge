# 组件使用

## tabbar 标签栏

### 介绍

-   标签栏。

### 代码演示

#### 基础用法

`v-model`默认绑定选中标签的索引值，通过修改`v-model`即可切换选中的标签

```html
<em-tabbar v-model="active">
    <em-tabbar-item icon="home-o">标签1</em-tabbar-item>
    <em-tabbar-item icon="search">标签1</em-tabbar-item>
    <em-tabbar-item icon="friends-o">标签</em-tabbar-item>
    <em-tabbar-item icon="setting-o">标签</em-tabbar-item>
</em-tabbar>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            active: 0
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const active = ref(0);
```

::: endif

#### 通过名称匹配

在标签指定`name`属性的情况下，v-model 的值为当前标签的`name`

```html
<em-tabbar v-model="active2" @change="onChange">
    <em-tabbar-item name="home" icon="home-o">标签</em-tabbar-item>
    <em-tabbar-item name="search" icon="search">标签</em-tabbar-item>
    <em-tabbar-item name="friends" icon="friends-o">标签</em-tabbar-item>
    <em-tabbar-item name="setting" icon="setting-o">标签</em-tabbar-item>
</em-tabbar>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            active2: 'home'
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const active2 = ref('home');
```

::: endif

#### 徽标提示

设置`dot`属性后，会在图标右上角展示一个小红点。设置`badge`属性后，会在图标右上角展示相应的徽标

```html
<em-tabbar v-model="active3" @change="onChange">
    <em-tabbar-item icon="home-o">标签</em-tabbar-item>
    <em-tabbar-item icon="search" dot>标签</em-tabbar-item>
    <em-tabbar-item icon="friends-o" badge="5">标签</em-tabbar-item>
    <em-tabbar-item icon="setting-o" badge="20">标签</em-tabbar-item>
</em-tabbar>
```

#### 自定义图标

通过 `icon` 插槽自定义图标，可以通过 `slot-scope` 判断标签是否选中

::: ifdef M83

```html
<em-tabbar v-model="active4" @change="onChange">
    <em-tabbar-item badge="3">
        <template #icon="{active}">
            <image :src="active ? icon.active : icon.inactive" mode="aspectFit" style="width: 30px; height: 18px" />
        </template>
        自定义
    </em-tabbar-item>
    <em-tabbar-item icon="search">标签</em-tabbar-item>
    <em-tabbar-item icon="setting-o">标签</em-tabbar-item>
</em-tabbar>
```

```js
export default {
    data() {
        return {
            active4: 0,
            icon: {
                active: 'https://img.yzcdn.cn/vant/user-active.png',
                inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
            }
        };
    }
};
```

::: endif
::: ifdef M84

```html
<em-tabbar v-model="active4" @change="onChange">
    <em-tabbar-item badge="3">
        <template #icon="{ active }">
            <image :src="active ? icon.active : icon.inactive" mode="aspectFit" style="width: 30px; height: 18px" />
        </template>
        自定义
    </em-tabbar-item>
    <em-tabbar-item icon="search">标签</em-tabbar-item>
    <em-tabbar-item icon="setting-o">标签</em-tabbar-item>
</em-tabbar>
```

```js
import { ref } from 'vue';
const active4 = ref(0);
const icon = {
    active: 'https://img.yzcdn.cn/vant/user-active.png',
    inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
};
```

::: endif

#### 自定义颜色

```html
<em-tabbar v-model="active5" active-color="#07c160" inactive-color="#000" @change="onChange">
    <em-tabbar-item icon="home-o">标签</em-tabbar-item>
    <em-tabbar-item icon="search">标签</em-tabbar-item>
    <em-tabbar-item icon="friends-o">标签</em-tabbar-item>
    <em-tabbar-item icon="setting-o">标签</em-tabbar-item>
</em-tabbar>
```

#### 监听切换事件

```html
<em-tabbar v-model="active6" @change="onChange" :before-change="beforeChange">
    <em-tabbar-item icon="home-o">标签1</em-tabbar-item>
    <em-tabbar-item icon="search">标签2</em-tabbar-item>
    <em-tabbar-item icon="friends-o">标签3</em-tabbar-item>
    <em-tabbar-item icon="setting-o">标签4</em-tabbar-item>
</em-tabbar>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            active6: 0,
            beforeChange: () => {
                var Console = console;

                Console.log('??');

                return true;
            }
        };
    },
    methods: {
        onChange(index) {
            Notify({ type: 'primary', message: index });
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const active6 = ref(0);
const beforeChange = () => {
    var Console = console;

    Console.log('??');

    return true;
};

function onChange(index) {
    Notify({ type: 'primary', message: index });
}
```

::: endif

#### 路由模式

标签栏支持路由模式，用于搭配`vue-router`使用。路由模式下会匹配页面路径和标签的`to`属性，并自动选中对应的标签

```html
<router-view />

<em-tabbar route>
    <em-tabbar-item replace to="/em-home" icon="home-o">标签</em-tabbar-item>
    <em-tabbar-item replace to="/em-search" icon="search">标签</em-tabbar-item>
</em-tabbar>
```

### API

#### Tabbar Props

| 参数                                                                         |                                                 说明                                                 | 类型                        | 默认值    |
| :--------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------: | :-------------------------- | :-------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |                                      当前选中标签的名称或索引值                                      | number / string             | `0`       |
| fixed                                                                        |                                            是否固定在底部                                            | boolean                     | `true`    |
| border                                                                       |                                            是否显示外边框                                            | boolean                     | `true`    |
| z-index                                                                      |                                            元素 `z-index`                                            | number / string             | `1`       |
| active-color                                                                 |                                            选中标签的颜色                                            | string                      | `#1989fa` |
| inactive-color                                                               |                                           未选中标签的颜色                                           | string                      | `#7d7e80` |
| route                                                                        |                                           是否开启路由模式                                           | boolean                     | `false`   |
| placeholder                                                                  |                          固定在底部时，是否在标签位置生成一个等高的占位元素                          | boolean                     | `false`   |
| safe-area-inset-bottom                                                       |                        设置 `fixed` 时有效，是否开启底部安全区适配，默认开启                         | boolean                     | `true`    |
| before-change                                                                | 切换标签前的回调函数，返回 false 可阻止切换，支持返回 Promise，resolve(true)时继续切换，反之阻止切换 | (name) => boolean / Promise | -         |

#### Tabbar Events

| 事件名 |      说明      | 回调参数                           |
| :----- | :------------: | :--------------------------------- |
| change | 切换标签时触发 | active: 当前选中标签的名称或索引值 |

#### TabbarItem Props

| 参数           |                          说明                          | 类型                     | 默认值           |
| :------------- | :----------------------------------------------------: | :----------------------- | :--------------- |
| name           |               标签名称，作为匹配的标识符               | number / string          | 当前标签的索引值 |
| icon           |                   图标名称或图片链接                   | string                   | -                |
| icon-prefix    |   图标类名前缀，同 `Icon` 组件的 `class-prefix` 属性   | string                   | `van-icon`       |
| dot            |                是否显示图标右上角小红点                | boolean                  | `false`          |
| badge          |                  图标右上角徽标的内容                  | number / string          | -                |
| item `v8.3.14` |            可传数据，该字段会传给作用域插槽            | number / string / object | -                |
| url            |                  点击后跳转的链接地址                  | string                   | -                |
| to             | 点击后跳转的目标路由对象，同 `vue-router` 的 `to` 属性 | string / object          | -                |
| replace        |              是否在跳转时替换当前页面历史              | boolean                  | `false`          |

#### TabbarItem Events

| 事件名                                       |      说明       | 回调参数                       |
| :------------------------------------------- | :-------------: | :----------------------------- |
| ::: ifdef M84 update:active `v8.4` ::: endif | 切换标签时触发  | active: 当前标签是否为选中标签 |
| ::: ifdef M84 update:item `v8.4` ::: endif   | item 变化时触发 | item: 当前标签选项             |

#### TabbarItem Slots

| 名称 |    说明    | SlotProps                                  |
| :--- | :--------: | :----------------------------------------- |
| icon | 自定义图标 | active: 是否为选中标签, item: 当前标签选项 |

::: ifdef M83

<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-tabbar"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-tabbar"
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
