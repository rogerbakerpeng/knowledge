# 组件使用

## popover 气泡弹出框

### 介绍

-   弹出式的气泡菜单, M8 框架`8.2.10`版本以上支持。

### 代码演示

#### 基础用法

当 `Popover` 弹出时，会基于 `reference` 插槽的内容进行定位。

::: ifdef M83

```html
<em-popover v-model="showPopover" :actions="actions" @select="onSelect">
    <template #reference>
        <em-button type="primary">浅色风格</em-button>
    </template>
</em-popover>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    data() {
        return {
            showPopover: false,
            // 通过 actions 属性来定义菜单选项
            actions: [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }]
        };
    },
    methods: {
        onSelect(action) {
            Toast(action.text);
        }
    }
};
```

::: endif

::: ifdef M84

```html
<em-popover v-model="showPopover" :actions="actions" @select="onSelect">
    <template #reference>
        <em-button type="primary">浅色风格</em-button>
    </template>
</em-popover>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';
const showPopover = ref(false);
const actions = ref([{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }]);
const emToastRef = ref(null);
const onSelect = (action) => {
    Toast(action.text);
};
defineExpose({
    emToastRef
});
```

::: endif

#### 深色风格

`Popover` 支持浅色和深色两种风格，默认为浅色风格，将 `theme` 属性设置为 `dark` 可切换为深色风格。

```html
<em-popover v-model="showPopover" theme="dark" :actions="actions">
    <template #reference>
        <em-button type="primary">深色风格</em-button>
    </template>
</em-popover>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            showPopover: false,
            actions: [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const showPopover = ref(false);
const actions = ref([{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }]);
```

::: endif

#### 弹出位置

通过 `placement` 属性来控制气泡的弹出位置。

```html
<em-popover placement="top" />
```

```
placement 支持以下值：

top           # 顶部中间位置
top-start     # 顶部左侧位置
top-end       # 顶部右侧位置
left          # 左侧中间位置
left-start    # 左侧上方位置
left-end      # 左侧下方位置
right         # 右侧中间位置
right-start   # 右侧上方位置
right-end     # 右侧下方位置
bottom        # 底部中间位置
bottom-start  # 底部左侧位置
bottom-end    # 底部右侧位置
```

#### 展示图标

在 `actions` 数组中，可以通过 `icon` 字段来定义选项的图标，支持传入图标名称或图片链接。

```html
<em-popover v-model="showPopover" :actions="actions">
    <template #reference>
        <em-button type="primary">展示图标</em-button>
    </template>
</em-popover>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            showPopover: false,
            actions: [
                { text: '选项一', icon: 'add-o' },
                { text: '选项二', icon: 'music-o' },
                { text: '选项三', icon: 'more-o' }
            ]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const showPopover = ref(false);
const actions = ref([
    { text: '选项一', icon: 'add-o' },
    { text: '选项二', icon: 'music-o' },
    { text: '选项三', icon: 'more-o' }
]);
```

::: endif

#### 禁用选项

在 `actions` 数组中，可以通过 `disabled` 字段来禁用某个选项。

```html
<em-popover v-model="showPopover" :actions="actions">
    <template #reference>
        <em-button type="primary">禁用选项</em-button>
    </template>
</em-popover>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            showPopover: false,
            actions: [{ text: '选项一', disabled: true }, { text: '选项二', disabled: true }, { text: '选项三' }]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const showPopover = ref(false);
const actions = ref([{ text: '选项一', disabled: true }, { text: '选项二', disabled: true }, { text: '选项三' }]);
```

::: endif

#### 自定义内容

通过默认插槽，可以在 `Popover` 内部放置任意内容。

```html
<em-popover v-model="showPopover">
    <uni-row>
        <uni-col :span="24">
            <em-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </uni-col>
    </uni-row>
    <template #reference>
        <em-button type="primary">自定义内容</em-button>
    </template>
</em-popover>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            showPopover: false
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const showPopover = ref(false);
```

::: endif

### API

#### Props

| 参数                                                                         |                           说明                           | 类型             | 默认值   |
| :--------------------------------------------------------------------------- | :------------------------------------------------------: | :--------------- | :------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |                    是否展示气泡弹出层                    | boolean          | `false`  |
| actions                                                                      |                         选项列表                         | Action[]         | `[]`     |
| placement                                                                    |                         弹出位置                         | string           | `bottom` |
| theme                                                                        |                主题风格，可选值为 `dark`                 | string           | `light`  |
| offset                                                                       |                     出现位置的偏移量                     | [number, number] | `[0, 8]` |
| overlay                                                                      |                      是否显示遮罩层                      | boolean          | `false`  |
| close-on-click-action                                                        |                   是否在点击选项后关闭                   | boolean          | `true`   |
| close-on-click-outside                                                       |               是否在点击外部元素后关闭菜单               | boolean          | `true`   |
| close-on-touchmove-outside `8.3.19-beta.0`                                   |               是否在滑动外部元素后关闭菜单               | boolean          | `false`  |
| trigger `8.3.19-beta.0`                                                      | 触发方式，可选值为`click`、`longpress`、`manual（手动）` | boolean          | `click`  |

#### Action 数据结构

`actions` 属性是一个由对象构成的数组，数组中的每个对象配置一列，对象可以包含以下值：

| 键名      |                    说明                    | 类型    |
| :-------- | :----------------------------------------: | :------ |
| text      |                  选项文字                  | string  |
| icon      | 文字左侧的图标，支持传入图标名称或图片链接 | string  |
| disabled  |               是否为禁用状态               | boolean |
| className |          为对应选项添加额外的类名          | any     |

#### Events

| 事件名 |           说明           | 回调参数                      |
| :----- | :----------------------: | :---------------------------- |
| select |      点击选项时触发      | action: Action, index: number |
| open   |      打开菜单时触发      | -                             |
| close  |      关闭菜单时触发      | -                             |
| opened | 打开菜单且动画结束后触发 | -                             |
| closed | 关闭菜单且动画结束后触发 | -                             |

#### Slots

| 名称      |            说明             |
| :-------- | :-------------------------: |
| default   |       自定义菜单内容        |
| reference | 触发 Popover 显示的元素内容 |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-popover"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-popover"
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
