# 组件使用

## checkbox 复选框

### 介绍

-   复选框。

### 代码演示

#### 基础用法

通过`v-model`绑定复选框的勾选状态

```html
<em-checkbox v-model="checked">复选框</em-checkbox>
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

通过设置`disabled`属性可以禁用复选框

```html
<em-checkbox v-model="checked" disabled>复选框</em-checkbox>
```

#### 自定义形状

将`shape`属性设置为`round`，复选框的形状会变成圆形,

其他形状属性值需要在组件中预设，建议其他形状使用【自定义图标】

```html
<em-checkbox v-model="checked" shape="round">复选框</em-checkbox>
```

#### 自定义颜色

通过`checked-color`属性设置选中状态的图标颜色

```html
<em-checkbox v-model="checked" checked-color="#07c160">复选框</em-checkbox>
```

#### 自定义大小

通过`icon-size`属性可以自定义图标的大小

```html
<em-checkbox v-model="checked" icon-size="24px">复选框</em-checkbox>
```

#### 自定义图标

通过 `icon` 插槽自定义图标，可以通过`slotProps`判断是否为选中状态

**注意：**

因微信和支付宝小程序兼容性问题，需在 `em-checkbox` 或 `em-checkbox-group` 标签上添加 `icon` 属性， 纯 h5 环境中可不加

```html
<em-checkbox v-model="checked" icon>
    自定义图标
    <template #icon="props">
        <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
    </template>
</em-checkbox>

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
            checked: true,
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

const checked = ref(true);
const activeIcon = ref('https://img.yzcdn.cn/vant/user-active.png');
const inactiveIcon = ref('https://img.yzcdn.cn/vant/user-inactive.png');
```

::: endif

#### 中选框

设置 `indeterminate` 属性可调整复选框风格

```html
<em-checkbox v-model="checked" :indeterminate="indeterminate">中选框</em-checkbox>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            checked: true,
            indeterminate: true
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const checked = ref(true);
const indeterminate = ref(true);
```

::: endif

#### 禁用文本点击

设置`label-disabled`属性后，点击图标以外的内容不会触发复选框切换

```html
<em-checkbox v-model="checked" label-disabled>复选框</em-checkbox>
```

#### 复选框组

复选框可以与复选框组一起使用，复选框组通过`v-model`数组绑定复选框的勾选状态

```html
<em-checkbox-group v-model="result">
    <em-checkbox name="a">复选框 a</em-checkbox>
    <em-checkbox name="b">复选框 b</em-checkbox>
</em-checkbox-group>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            result: ['a', 'b']
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const result = ref(['a', 'b']);
```

::: endif

#### 水平排列

将`direction`属性设置为`horizontal`后，复选框组会变成水平排列

```html
<em-checkbox-group v-model="result" direction="horizontal">
    <em-checkbox name="a">复选框 a</em-checkbox>
    <em-checkbox name="b">复选框 b</em-checkbox>
</em-checkbox-group>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            result: []
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const result = ref([]);
```

::: endif

#### 限制最大可选数

通过`max`属性可以限制复选框组的最大可选数

```html
<em-checkbox-group v-model="result" :max="2">
    <em-checkbox name="a">复选框 a</em-checkbox>
    <em-checkbox name="b">复选框 b</em-checkbox>
    <em-checkbox name="c">复选框 c</em-checkbox>
</em-checkbox-group>
```

#### 全选与反选

通过`CheckboxGroup`实例上的`toggleAll`方法可以实现全选与反选

```html
<em-checkbox-group v-model="result" ref="checkboxGroup">
    <em-checkbox name="a">复选框 a</em-checkbox>
    <em-checkbox name="b">复选框 b</em-checkbox>
    <em-checkbox name="c">复选框 c</em-checkbox>
</em-checkbox-group>

<em-button type="primary" @click="checkAll">全选</em-button>
<em-button type="info" @click="toggleAll">反选</em-button>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            result: []
        };
    },
    methods: {
        checkAll() {
            this.$refs.checkboxGroup.toggleAll(true);
        },
        toggleAll() {
            this.$refs.checkboxGroup.toggleAll();
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const result = ref([]);
const checkboxGroup = ref(null);
const checkAll = () => {
    // 获取 checkboxGroup 的引用并调用 toggleAll
    checkboxGroup.value.toggleAll(true);
};

const toggleAll = () => {
    // 获取 checkboxGroup 的引用并调用 toggleAll
    checkboxGroup.value.toggleAll();
};
```

::: endif

#### 搭配单元格组件使用

此时你需要再引入`Cell`和`CellGroup`组件，并通过`Checkbox`实例上的 `toggle` 方法触发切换

```html
<em-checkbox-group v-model="result">
    <em-cell-group>
        <em-cell v-for="(item, index) in list" clickable :key="item" :title="`复选框 ${item}`" @click="toggle(index)">
            <template #rightIcon>
                <em-checkbox :name="item" ref="checkboxes" />
            </template>
        </em-cell>
    </em-cell-group>
</em-checkbox-group>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            list: ['a', 'b'],
            result: []
        };
    },
    methods: {
        toggle(index) {
            this.$refs.checkboxes[index].toggle();
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const list = ref(['a', 'b']);
const result = ref([]);
const checkboxes = ref([]);

const toggle = (index) => {
    checkboxes.value[index].toggle(); // 假设这里用来切换选中状态
};
```

::: endif

### API

#### Checkbox Props

| 参数                                                                         |                      说明                      | 类型            | 默认值    |
| :--------------------------------------------------------------------------- | :--------------------------------------------: | :-------------- | :-------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |                 是否为选中状态                 | boolean         | `false`   |
| name                                                                         |       标识符，注意微信小程序请传递字符串       | any             | -         |
| shape                                                                        |             形状，可选值为 `round`             | string          | `square`  |
| indeterminate                                                                |                   启用中选框                   | boolean         | `false`   |
| disabled                                                                     |                 是否禁用复选框                 | boolean         | `false`   |
| label-disabled                                                               |             是否禁用复选框文本点击             | boolean         | `false`   |
| label-position                                                               |           文本位置，可选值为 `left`            | string          | `right`   |
| icon-size                                                                    |            图标大小，默认单位为`px`            | number / string | `20px`    |
| icon                                                                         | 自定义图标依赖该属性用于兼容微信和支付宝小程序 | boolean         | `false`   |
| checked-color                                                                |                  选中状态颜色                  | string          | `#1989fa` |
| bind-group                                                                   |               是否与复选框组绑定               | boolean         | `true`    |

#### CheckboxGroup Props

| 参数                                                                         |                      说明                      | 类型            | 默认值     |
| :--------------------------------------------------------------------------- | :--------------------------------------------: | :-------------- | :--------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |               所有选中项的标识符               | any[]           | -          |
| disabled                                                                     |               是否禁用所有复选框               | boolean         | `false`    |
| max                                                                          |             最大可选数，0 为无限制             | number / string | 0          |
| icon                                                                         | 自定义图标依赖该属性用于兼容微信和支付宝小程序 | boolean         | `false`    |
| direction                                                                    |         排列方向，可选值为`horizontal`         | string          | `vertical` |
| icon-size                                                                    |      所有复选框的图标大小，默认单位为`px`      | number / string | `20px`     |
| checked-color                                                                |            所有复选框的选中状态颜色            | string          | `#1989fa`  |

#### Checkbox Events

| 事件名                                        |           说明           | 回调参数         |
| :-------------------------------------------- | :----------------------: | :--------------- |
| change                                        | 当绑定值变化时触发的事件 | checked: boolean |
| click                                         |     点击复选框时触发     | event: Event     |
| ::: ifdef M84 update:checked `v8.4` ::: endif |  用于同步 checked 事件   | checked: boolean |

#### CheckboxGroup Events

| 事件名 |           说明           | 回调参数     |
| :----- | :----------------------: | :----------- |
| change | 当绑定值变化时触发的事件 | names: any[] |

#### Checkbox Slots

| 名称    |    说明    | SlotProps        |
| :------ | :--------: | :--------------- |
| default | 自定义文本 | -                |
| icon    | 自定义图标 | checked: boolean |

#### CheckboxGroup 方法

通过 `ref` 可以获取到 `CheckboxGroup` 实例并调用实例方法，详见组件实例方法

| 方法名    |                              说明                              | 参数                     | 返回值 |
| :-------- | :------------------------------------------------------------: | :----------------------- | :----- |
| toggleAll | 切换所有复选框，传 true 为选中，false 为取消选中，不传参为取反 | options?: boolean/object | -      |
| toggle    |          切换所选复选框，传数组下标，自动进行切换状态          | Number                   | -      |

#### toggleAll 方法示例

::: ifdef M83

```js
const { checkboxGroup } = this.$refs;

// 全部反选
checkboxGroup.toggleAll();
// 全部选中
checkboxGroup.toggleAll(true);
// 全部取消
checkboxGroup.toggleAll(false);

// 全部反选，并跳过禁用的复选框, M8框架8.2.10版本以上支持
checkboxGroup.toggleAll({
    skipDisabled: true
});
// 全部选中，并跳过禁用的复选框，M8框架8.2.10版本以上支持
checkboxGroup.toggleAll({
    checked: true,
    skipDisabled: true
});
```

::: endif

::: ifdef M84

```js
import { ref } from 'vue';
const checkboxGroup = ref(null);

// 全部反选
checkboxGroup.value.toggleAll();
// 全部选中
checkboxGroup.value.toggleAll(true);
// 全部取消
checkboxGroup.value.toggleAll(false);

// 全部反选，并跳过禁用的复选框, M8框架8.2.10版本以上支持
checkboxGroup.value.toggleAll({
    skipDisabled: true
});
// 全部选中，并跳过禁用的复选框，M8框架8.2.10版本以上支持
checkboxGroup.value.toggleAll({
    checked: true,
    skipDisabled: true
});
```

::: endif

#### Checkbox 方法

通过 `ref` 可以获取到 `Checkbox` 实例并调用实例方法，详见组件实例方法

| 方法名 |                             说明                             | 参数              | 返回值 |
| :----- | :----------------------------------------------------------: | :---------------- | :----- |
| toggle | 切换选中状态，传 true 为选中，false 为取消选中，不传参为取反 | checked?: boolean | -      |

::: ifdef M83

<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-checkbox"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-checkbox"
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
