# 组件使用

## radio 单选框

### 介绍

-   单选框组件。

### 代码演示

#### 基础用法

通过`v-model`绑定值当前选中项的 `name`。

```html
<em-radio-group v-model="radio">
    <em-radio name="1">单选框 1</em-radio>
    <em-radio name="2">单选框 2</em-radio>
</em-radio-group>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            radio: '1'
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const radio = ref('1');
```

::: endif

#### 水平排列

将`direction`属性设置为`horizontal`后，单选框组会变成水平排列

```html
<em-radio-group v-model="radio" direction="horizontal">
    <em-radio name="1">单选框 1</em-radio>
    <em-radio name="2">单选框 2</em-radio>
</em-radio-group>
```

#### 禁用状态

通过`disabled`属性禁止选项切换，在`Radio`上设置`disabled`可以禁用单个选项。

```html
<em-radio-group v-model="radio" disabled>
    <em-radio name="1">单选框 1</em-radio>
    <em-radio name="2">单选框 2</em-radio>
</em-radio-group>
```

#### 自定义颜色

通过`checked-color`属性设置选中状态的图标颜色

```html
<em-radio-group v-model="radio">
    <em-radio name="1" checked-color="#07c160">单选框 1</em-radio>
    <em-radio name="2" checked-color="#07c160">单选框 2</em-radio>
</em-radio-group>
```

#### 自定义大小

通过`icon-size`属性可以自定义图标的大小

```html
<em-radio-group v-model="radio">
    <em-radio name="1" icon-size="32px">单选框 1</em-radio>
    <em-radio name="2" icon-size="32px">单选框 2</em-radio>
</em-radio-group>
```

#### 自定义图标

通过`icon`插槽自定义图标，并通过`slotProps`判断是否为选中状态

```html
<em-radio-group v-model="radio" icon>
    <em-radio name="1">
        单选框 1
        <template #icon="props">
            <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
        </template>
    </em-radio>
    <em-radio name="2">
        单选框 2
        <template #icon="props">
            <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
        </template>
    </em-radio>
</em-radio-group>

<style>
    .img-icon {
        height: 20px;
    }
</style>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            radio: '1',
            activeIcon: 'https://img.yzcdn.cn/vant/user-active.png',
            inactiveIcon: 'https://img.yzcdn.cn/vant/user-inactive.png'
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const radio = ref('1');
const activeIcon = 'https://img.yzcdn.cn/vant/user-active.png';
const inactiveIcon = 'https://img.yzcdn.cn/vant/user-inactive.png';
```

::: endif

#### 中选框

设置 `indeterminate` 属性可调整单选框风格

```html
<em-radio-group v-model="radio">
    <em-radio name="1" :indeterminate="indeterminate">单选框 1</em-radio>
    <em-radio name="2" checked-color="#07c160" :indeterminate="indeterminate">单选框 2</em-radio>
    <em-radio name="3" disabled checked-color="#07c160" :indeterminate="indeterminate">单选框 3</em-radio>
</em-radio-group>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            radio: '1',
            indeterminate: true
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const radio = ref('1');
const indeterminate = ref(true);
```

::: endif

#### 禁用文本点击

设置`label-disabled`属性后，点击图标以外的内容不会触发单选框切换

```html
<em-radio-group v-model="radio">
    <em-radio name="1" label-disabled>单选框 1</em-radio>
    <em-radio name="2" label-disabled>单选框 2</em-radio>
</em-radio-group>
```

#### 与 Cell 组件一起使用

此时你需要再引入`Cell`和`CellGroup`组件。

```html
<em-radio-group v-model="radio">
    <em-cell-group>
        <em-cell title="单选框 1" @click="radio = '1'">
            <template #rightIcon>
                <em-radio name="1" />
            </template>
        </em-cell>
        <em-cell title="单选框 2" @click="radio = '2'">
            <template #rightIcon>
                <em-radio name="2" />
            </template>
        </em-cell>
    </em-cell-group>
</em-radio-group>
```

### API

#### Props

| 参数           |                                    说明                                    | 类型            | 默认值    |
| :------------- | :------------------------------------------------------------------------: | :-------------- | :-------- |
| name           |                     标识符, 注意微信小程序请传递字符串                     | any             | -         |
| shape          | 形状，可选值为 `square`(为了与 PC 保持统一，`v8.3.7`开始默认值改为`round`) | string          | `round`   |
| indeterminate  |                                 启用中选框                                 | boolean         | `false`   |
| disabled       |                               是否为禁用状态                               | boolean         | `false`   |
| label-disabled |                            是否禁用文本内容点击                            | boolean         | `false`   |
| label-position |                         文本位置，可选值为 `left`                          | string          | `right`   |
| icon-size      |                          图标大小，默认单位为`px`                          | number / string | `20px`    |
| checked-color  |                                选中状态颜色                                | string          | `#1989fa` |
| icon           |                         自定义图标时需要添加该属性                         | boolean         | false     |

#### RadioGroup Props

| 参数                                                                         |                 说明                 | 类型            | 默认值     |
| :--------------------------------------------------------------------------- | :----------------------------------: | :-------------- | :--------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |          当前选中项的标识符          | any             | -          |
| disabled                                                                     |          是否禁用所有单选框          | boolean         | `false`    |
| direction                                                                    |    排列方向，可选值为`horizontal`    | string          | `vertical` |
| icon-size                                                                    | 所有单选框的图标大小，默认单位为`px` | number / string | `20px`     |
| checked-color                                                                |       所有单选框的选中状态颜色       | string          | `#1989fa`  |

#### Radio Events

| 事件名                                        |         说明          | 回调参数                   |
| :-------------------------------------------- | :-------------------: | :------------------------- |
| click                                         |   点击单选框时触发    | event: Event,value: string |
| ::: ifdef M84 update:checked `v8.4` ::: endif | 用于同步 checked 事件 | checked: boolean           |

#### RadioGroup Events

| 事件名 |           说明           | 回调参数     |
| :----- | :----------------------: | :----------- |
| change | 当绑定值变化时触发的事件 | name: string |

#### Radio Slots

| 名称    |    说明    | SlotProps        |
| :------ | :--------: | :--------------- |
| default | 自定义文本 | -                |
| icon    | 自定义图标 | checked: boolean |

::: ifdef M83

<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-radio"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-radio"
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
