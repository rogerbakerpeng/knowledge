# 组件使用

## picker 选择器

### 介绍

-   提供多个选项集合供用户选择，支持单列选择和多列级联。

### 代码演示

#### 基础用法

**选项配置**
`Picker` 组件通过`columns`属性配置选项数据，`columns`是一个包含字符串或对象的数组。

**顶部栏**
设置`show-toolbar`属性后会展示顶部操作栏，顶部栏包含标题、确认按钮和取消按钮，点击确认按钮触发`confirm`事件，点击取消按钮触发`cancel`事件

::: ifdef M83

```html
<em-picker
    v-model="showPicker"
    title="标题"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="onCancel"
    @change="onChange"
/>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    data() {
        return {
            showPicker: false,
            columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州']
        };
    },
    methods: {
        onConfirm(value, index) {
            Toast({
                zIndex: 3000,
                message: `Value: ${value}, Index:${index}`
            });
        },
        onChange(picker, value, index) {
            Toast({
                zIndex: 3000,
                message: `Value: ${value}, Index:${index}`
            });
        },
        onCancel() {
            Toast({
                zIndex: 3000,
                message: '取消'
            });
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-picker
    v-model="showPicker"
    title="标题"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="onCancel"
    @change="onChange"
/>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';
const showPicker = ref(false);
const columns = ref(['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州']);

const onConfirm = (value, index) => {
    Toast({
        zIndex: 3000,
        message: `Value: ${value}, Index:${index}`
    });
};

const onChange = (picker, value, index) => {
    Toast({
        zIndex: 3000,
        message: `Value: ${value}, Index:${index}`
    });
};

const onCancel = () => {
    Toast({
        zIndex: 3000,
        message: '取消'
    });
};

const emToastRef = ref(null);

defineExpose({
    emToastRef
});
```

::: endif

#### 默认选中项

单列选择时，可以通过`default-index`属性设置初始选中项的索引

```html
<em-picker show-toolbar title="标题" :columns="columns" :default-index="2" />
```

#### 多列选择

`columns`属性可以通过对象数组的形式配置多列选择，对象中可以配置选项数据、初始选中项等，详细格式见下方表格。

```html
<em-picker show-toolbar title="标题" :columns="column7" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            column7: [
                // 第一列
                {
                    values: ['周一', '周二', '周三', '周四', '周五'],
                    defaultIndex: 2
                },
                // 第二列
                {
                    values: ['上午', '下午', '晚上'],
                    defaultIndex: 1
                }
            ]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const column7 = ref([
    // 第一列
    {
        values: ['周一', '周二', '周三', '周四', '周五'],
        defaultIndex: 2
    },
    // 第二列
    {
        values: ['上午', '下午', '晚上'],
        defaultIndex: 1
    }
]);
```

::: endif

#### 级联选择

使用`columns`的`children`字段可以实现选项级联的效果。

```html
<em-picker show-toolbar title="标题" :columns="column8" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            column8: [
                {
                    text: '浙江',
                    children: [
                        {
                            text: '杭州',
                            children: [{ text: '西湖区' }, { text: '余杭区' }]
                        },
                        {
                            text: '温州',
                            children: [{ text: '鹿城区' }, { text: '瓯海区' }]
                        }
                    ]
                },
                {
                    text: '福建',
                    children: [
                        {
                            text: '福州',
                            children: [{ text: '鼓楼区' }, { text: '台江区' }]
                        },
                        {
                            text: '厦门',
                            children: [{ text: '思明区' }, { text: '海沧区' }]
                        }
                    ]
                }
            ]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const column8 = ref([
    {
        text: '浙江',
        children: [
            {
                text: '杭州',
                children: [{ text: '西湖区' }, { text: '余杭区' }]
            },
            {
                text: '温州',
                children: [{ text: '鹿城区' }, { text: '瓯海区' }]
            }
        ]
    },
    {
        text: '福建',
        children: [
            {
                text: '福州',
                children: [{ text: '鼓楼区' }, { text: '台江区' }]
            },
            {
                text: '厦门',
                children: [{ text: '思明区' }, { text: '海沧区' }]
            }
        ]
    }
]);
```

::: endif

级联选择的数据嵌套深度需要保持一致，如果部分选项没有子选项，可以使用空字符串进行占位

#### 禁用选项

选项可以为对象结构，通过设置 `disabled` 来禁用该选项

```html
<em-picker show-toolbar :columns="column2" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            column2: [{ text: '杭州', disabled: true }, { text: '宁波' }, { text: '温州' }]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const column2 = ref([{ text: '杭州', disabled: true }, { text: '宁波' }, { text: '温州' }]);
```

::: endif

#### 动态设置选项

通过 `Picker` 上的实例方法可以更灵活地控制选择器，比如使用`setColumnValues`方法实现多列联动

```html
<em-picker show-toolbar :columns="column4" @change="onChange" />
```

::: ifdef M83

```js
const cities = {
    浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    福建: ['福州', '厦门', '莆田', '三明', '泉州']
};

export default {
    data() {
        return {
            column4: [{ values: Object.keys(cities) }, { values: cities['浙江'] }]
        };
    },
    methods: {
        onChange(picker, values) {
            picker.setColumnValues(1, cities[values[0]]);
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const cities = {
    浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    福建: ['福州', '厦门', '莆田', '三明', '泉州']
};

const column4 = ref([
    {
        values: Object.keys(cities)
    },
    {
        values: cities['浙江']
    }
]);

const onChange = (picker, values) => {
    picker.setColumnValues(1, cities[values[0]]);
};
```

::: endif

#### 加载状态

若选择器数据是异步获取的，可以通过 `loading` 属性显示加载提示

```html
<em-picker v-model="show6" show-toolbar :columns="columns" :loading="loading" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            column6: [],
            show6: false,
            loading: true
        };
    },
    created() {
        setTimeout(() => {
            this.loading = false;
            this.column6 = ['选项'];
        }, 1000);
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const show6 = ref(false);
const loading = ref(true);
const column6 = ref([]);

setTimeout(() => {
    loading.value = false;
    column6.value = ['选项'];
}, 1000);
```

::: endif

### API

#### Picker Props

| 参数                                                                         |                         说明                         | 类型            | 默认值  |
| :--------------------------------------------------------------------------- | :--------------------------------------------------: | :-------------- | :------ |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |                     选择器的显隐                     | boolean         | `false` |
| columns                                                                      |            对象数组，配置每一列显示的数据            | Column[]        | `[]`    |
| title                                                                        |                      顶部栏标题                      | string          | -       |
| confirm-button-text                                                          |                     确认按钮文字                     | string          | `确认`  |
| cancel-button-text                                                           |                     取消按钮文字                     | string          | `取消`  |
| value-key                                                                    |            选项对象中，选项文字对应的键名            | string          | `text`  |
| toolbar-position                                                             |             顶部栏位置，可选值为`bottom`             | string          | `top`   |
| loading                                                                      |                   是否显示加载状态                   | boolean         | `false` |
| readonly                                                                     |        是否为只读状态，只读状态下无法切换选项        | boolean         | `false` |
| show-toolbar                                                                 |                    是否显示顶部栏                    | boolean         | `false` |
| default-index                                                                |             单列选择时，默认选中项的索引             | number / string | `0`     |
| item-height                                                                  |    选项高度，支持 `px` `vw` `rem` 单位，默认 `px`    | number / string | `44`    |
| visible-item-count                                                           |                    可见的选项个数                    | number / string | `6`     |
| swipe-duration                                                               | 快速滑动时惯性滚动的时长，单位 `ms`, 该值必须大于`0` | number / string | `300`   |

#### Popup Props

选择器组件已经包裹了`popup`组件，故也支持传递`popup`组件的部分`props`。相关`props`的具体示例请参考`popup`组件章节。

| 参数                   |                   说明                    | 类型    | 默认值 |
| :--------------------- | :---------------------------------------: | :------ | :----- |
| overlay                |              是否显示遮罩层               | boolean | `true` |
| overlay-class          |             自定义遮罩层类名              | string  | -      |
| overlay-style          |             自定义遮罩层样式              | object  | -      |
| transition             | 动画类名，等价于 `transtion` 的`name`属性 | string  | -      |
| close-on-click-overlay |          是否在点击遮罩层后关闭           | boolean | `true` |
| lock-scroll            |             是否锁定背景滚动              | boolean | `true` |

注意，其中`transition`属性组件库支持的可选值有：`em-fade` `em-fade-up` `em-fade-down` `em-fade-left` `em-fade-right` `em-slide-up` `em-slide-down` `em-slide-left` `em-slide-right`

#### Picker Events

当选择器有多列时，事件回调参数会返回数组

| 事件名  |        说明        | 回调参数                                                                  |
| :------ | :----------------: | :------------------------------------------------------------------------ |
| confirm | 点击完成按钮时触发 | 单列：选中值，选中值对应的索引,多列：所有列选中值，所有列选中值对应的索引 |
| cancel  | 点击取消按钮时触发 | 单列：选中值，选中值对应的索引,多列：所有列选中值，所有列选中值对应的索引 |
| change  |   选项改变时触发   | 单列：选中值，选中值对应的索引,多列：所有列选中值，当前列对应的索引       |

#### Popup Events

时间选择组件已经包裹了`popup`组件，故也支持`popup`组件的部分事件。相关事件的具体示例请参考`popup`组件章节。

| 事件名 |       说明       | 回调参数                    |
| :----- | :--------------: | :-------------------------- |
| close  | 关闭弹出层时触发 | `value`: 当前弹出层是否展开 |

#### Picker Slots

| 名称          |        说明        |
| :------------ | :----------------: |
| default       |  自定义顶部栏内容  |
| title         |   自定义标题内容   |
| confirm       | 自定义确认按钮内容 |
| cancel        | 自定义取消按钮内容 |
| columnsTop    | 自定义选项上方内容 |
| columnsBottom | 自定义选项下方内容 |

#### Picker Column 数据结构

当传入多列数据时，`columns`为一个对象数组，数组中的每一个对象配置每一列，每一列有以下`key`

| 键名         |             说明             | 类型     |
| :----------- | :--------------------------: | :------- |
| values       |       列中对应的备选值       | string[] |
| defaultIndex | 初始选中项的索引，默认为 `0` | number   |
| className    |    为对应列添加额外的类名    | any      |
| children     |           级联选项           | Column   |

#### Picker 方法

通过 `ref` 可以获取到 `Picker` 实例并调用实例方法，详见组件实例方法

| 方法名          |            说明            | 参数                     | 返回值      |
| :-------------- | :------------------------: | :----------------------- | :---------- |
| getValues       |     获取所有列选中的值     | -                        | values      |
| setValues       |     设置所有列选中的值     | values                   | -           |
| getIndexes      | 获取所有列选中值对应的索引 | -                        | indexes     |
| setIndexes      | 设置所有列选中值对应的索引 | indexes                  | -           |
| getColumnValue  |     获取对应列选中的值     | columnIndex              | value       |
| setColumnValue  |     设置对应列选中的值     | columnIndex, value       | -           |
| getColumnIndex  |   获取对应列选中项的索引   | columnIndex              | optionIndex |
| setColumnIndex  |   设置对应列选中项的索引   | columnIndex, optionIndex | -           |
| getColumnValues |    获取对应列中所有选项    | columnIndex              | values      |
| setColumnValues |    设置对应列中所有选项    | columnIndex, values      | -           |
| confirm         |     停止惯性滚动并触发     | confirm 事件             | -           |
| cancel          |     停止惯性滚动并触发     | cancel 事件              | -           |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-picker"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-picker"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif

 <style>
 iframe {
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
