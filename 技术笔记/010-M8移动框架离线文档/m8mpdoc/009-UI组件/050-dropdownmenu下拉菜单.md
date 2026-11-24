# 组件使用

## dropdownmenu 下拉菜单

### 介绍

-   下拉菜单。

::: ifdef M83

-   `v8.3.11`开始支持 weex 端使用

::: endif

### 代码演示

#### 基础用法

```html
<em-dropdown-menu>
    <em-dropdown-item v-model="value1" :options="option1" />
    <em-dropdown-item v-model="value2" :options="option2" />
</em-dropdown-menu>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            value1: 0,
            value2: 'a',
            option1: [
                { text: '全部商品', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 }
            ],
            option2: [
                { text: '默认排序', value: 'a' },
                { text: '好评排序', value: 'b' },
                { text: '销量排序', value: 'c' }
            ]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const value1 = ref(0);
const value2 = ref('a');
const option1 = [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 }
];
const option2 = [
    { text: '默认排序', value: 'a' },
    { text: '好评排序', value: 'b' },
    { text: '销量排序', value: 'c' }
];
```

::: endif

#### 自定义菜单内容

通过插槽可以自定义`DropdownItem`的内容，此时需要使用实例上的`toggle`方法手动控制菜单的显示

```html
<em-dropdown-menu>
    <em-dropdown-item v-model="value" :options="option" />
    <em-dropdown-item title="筛选" ref="item">
        <em-cell center title="包邮">
            <template #rightIcon>
                <em-switch v-model="switch1" size="24" active-color="#2e6be5" />
            </template>
        </em-cell>
        <em-cell center title="团购">
            <template #rightIcon>
                <em-switch v-model="switch2" size="24" active-color="#2e6be5" />
            </template>
        </em-cell>
        <div style="padding: 5px 16px">
            <em-button type="danger" block round @click="onConfirm" color="#2e6be5">确认</em-button>
        </div>
    </em-dropdown-item>
</em-dropdown-menu>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            value: 0,
            switch1: false,
            switch2: false,
            option: [
                { text: '全部商品', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 }
            ]
        };
    },
    methods: {
        onConfirm() {
            this.$refs.item.toggle();
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const value = ref(0);
const switch1 = ref(false);
const switch2 = ref(false);
const item = ref(null);
const option = [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 }
];
const onConfirm = () => {
    item.value.toggle();
};
```

::: endif

#### 自定义选中态颜色

通过`active-color`属性可以自定义菜单标题和选项的选中态颜色

```html
<em-dropdown-menu active-color="red">
    <em-dropdown-item v-model="value1" :options="option1" />
    <em-dropdown-item v-model="value2" :options="option2" />
</em-dropdown-menu>
```

#### 向上展开

将`direction`属性值设置为 up，菜单即可向上展开

```html
<em-dropdown-menu direction="up">
    <em-dropdown-item v-model="value1" :options="option1" />
    <em-dropdown-item v-model="value2" :options="option2" />
</em-dropdown-menu>
```

#### 禁用菜单

```html
<em-dropdown-menu>
    <em-dropdown-item v-model="value1" disabled :options="option1" />
    <em-dropdown-item v-model="value2" disabled :options="option2" />
</em-dropdown-menu>
```

### API

#### DropdownMenu Props

| 参数                   | 说明                       | 类型            | 默认值    | ::: ifdef M83 weex 端支持 ::: endif |
| :--------------------- | :------------------------- | :-------------- | :-------- | :---------------------------------- |
| active-color           | 菜单标题和选项的选中态颜色 | string          | `#2e6be5` | 是                                  |
| direction              | 菜单展开方向，可选值为`up` | string          | `down`    | 是                                  |
| z-index                | 菜单栏 `z-index` 层级      | number / string | `99`      | 否                                  |
| duration               | 动画时长，单位毫秒         | number / string | `200`     | 是                                  |
| overlay                | 是否显示遮罩层             | boolean         | `true`    | 是                                  |
| close-on-click-overlay | 是否在点击遮罩层后关闭菜单 | boolean         | `true`    | 是                                  |

#### DropdownItem Props

| 参数                                                                         | 说明                              | 类型            | 默认值         | ::: ifdef M83 weex 端支持 ::: endif |
| :--------------------------------------------------------------------------- | :-------------------------------- | :-------------- | :------------- | :---------------------------------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif | 当前选中项对应的 `value`          | number / string | -              | 是                                  |
| title                                                                        | 菜单项标题                        | string          | 当前选中项文字 | 是                                  |
| options                                                                      | 选项数组                          | Option[]        | `[]`           | 是                                  |
| disabled                                                                     | 是否禁用菜单                      | boolean         | `false`        | 是                                  |
| title-class                                                                  | 标题额外类名                      | string          | -              | 否                                  |
| popup-style                                                                  | 自定义弹出层样式                  | string          | -              | 是                                  |
| hidden                                                                       | `8.3.16` 隐藏此项菜单项与菜单标题 | boolean         | `false`        | 是                                  |

#### DropdownItem Events

| 事件名 | 说明                            | 回调参数 |
| :----- | :------------------------------ | :------- |
| change | 点击选项导致 `value` 变化时触发 | `value`  |
| open   | 打开菜单栏时触发                | -        |
| close  | 关闭菜单栏时触发                | -        |
| opened | 打开菜单栏且动画结束后触发      | -        |
| closed | 关闭菜单栏且动画结束后触发      | -        |

#### DropdownItem Slots

| 名称    | 说明     |
| :------ | :------- |
| default | 菜单内容 |

#### DropdownMenu 方法

通过 `ref` 可以获取到 `DropdownMenu` 实例并调用实例方法，详见组件实例方法

| 方法名 | 说明         | 参数 | 返回值 |
| :----- | :----------- | :--- | :----- |
| close  | 关闭下拉菜单 | -    | -      |

#### DropdownItem 方法

通过 `ref` 可以获取到 `DropdownItem` 实例并调用实例方法，详见组件实例方法

| 方法名 | 说明                                                          | 参数           | 返回值 |
| :----- | :------------------------------------------------------------ | :------------- | :----- |
| toggle | 切换菜单展示状态，传`true`为显示，`false`为隐藏，不传参为取反 | show?: boolean | -      |

#### Option 数据结构

| 键名  | 说明                   | 类型            |
| :---- | :--------------------- | :-------------- |
| text  | 文字                   | string          |
| value | 标识符                 | number / string |
| icon  | 左侧图标名称或图片链接 | string          |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-dropdown-Menu"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-dropdown-Menu"
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
