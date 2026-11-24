# 组件使用

## cascader 级联选择框

### 介绍

-   级联选择框，用于多层级数据的选择，典型场景为省市区选择, M8 框架`8.2.10`版本以上支持。

### 代码演示

#### 基础用法

级联选择组件可以搭配 `Field` 和 `Popup` 组件使用，示例如下：

```html
<em-field v-model="fieldValue" is-link readonly label="地区" placeholder="请选择所在地区" @click="show = true" />
<em-cascader
    v-model="show"
    title="请选择所在地区"
    :selected-value="cascaderValue"
    :options="options"
    @close="show = false"
    @finish="onFinish"
/>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            show: false,
            fieldValue: '',
            cascaderValue: '',
            // 选项列表，children 代表子选项，支持多级嵌套
            options: [
                {
                    text: '浙江省',
                    value: '330000',
                    children: [{ text: '杭州市', value: '330100' }]
                },
                {
                    text: '江苏省',
                    value: '320000',
                    children: [{ text: '南京市', value: '320100' }]
                }
            ]
        };
    },
    methods: {
        // 全部选项选择完毕后，会触发 finish 事件
        onFinish({ selectedOptions }) {
            this.show = false;
            this.fieldValue = selectedOptions.map((option) => option.text).join('/');
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

// 使用 ref 创建响应式数据
const show = ref(false);
const fieldValue = ref('');
const cascaderValue = ref('');

// 选项列表，支持多级嵌套
const options = ref([
    {
        text: '浙江省',
        value: '330000',
        children: [{ text: '杭州市', value: '330100' }]
    },
    {
        text: '江苏省',
        value: '320000',
        children: [{ text: '南京市', value: '320100' }]
    }
]);

// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
    show.value = false;
    fieldValue.value = selectedOptions.map((option) => option.text).join('/');
};
```

::: endif

#### 自定义颜色

通过 `active-color` 属性来设置选中状态的高亮颜色。

```html
<em-cascader
    v-model="show"
    title="请选择所在地区"
    active-color="#1989fa"
    :options="options"
    @close="show = false"
    @finish="onFinish"
/>
```

#### 异步加载选项

可以监听 `change` 事件并动态设置 `options`，实现异步加载选项。

```html
<em-field v-model="fieldValue" is-link readonly label="地区" placeholder="请选择所在地区" @click="show = true" />
<em-cascader
    v-model="show"
    :selected-value="cascaderValue"
    title="请选择所在地区"
    :options="options"
    @close="show = false"
    @finish="onFinish"
    @change="onChange"
/>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            show: false,
            fieldValue: '',
            cascaderValue: '',
            options: [
                {
                    text: '浙江省',
                    value: '330000',
                    children: []
                }
            ]
        };
    },
    methods: {
        onChange({ value }) {
            if (value === this.options[0].value) {
                setTimeout(() => {
                    this.options[0].children = [
                        { text: '杭州市', value: '330100' },
                        { text: '宁波市', value: '330200' }
                    ];
                }, 500);
            }
        },
        onFinish({ selectedOptions }) {
            this.show = false;
            this.fieldValue = selectedOptions.map((option) => option.text).join('/');
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

// 使用 ref 创建响应式数据
const show = ref(false);
const fieldValue = ref('');
const cascaderValue = ref('');

// 选项列表，支持多级嵌套
const options = ref([
    {
        text: '浙江省',
        value: '330000',
        children: []
    }
]);

// 选中项变化时触发
const onChange = ({ value }) => {
    if (value === options.value[0].value) {
        setTimeout(() => {
            options.value[0].children = [
                { text: '杭州市', value: '330100' },
                { text: '宁波市', value: '330200' }
            ];
        }, 500);
    }
};

// 全部选项选择完成后触发
const onFinish = ({ selectedOptions }) => {
    show.value = false;
    fieldValue.value = selectedOptions.map((option) => option.text).join('/');
};
```

::: endif

#### 自定义字段名

通过 `field-names` 属性可以自定义 `options` 里的字段名称。

```html
<em-cascader
    v-model="show"
    title="请选择所在地区"
    :options="options"
    :field-names="fieldNames"
    @close="show = false"
    @finish="onFinish"
/>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            fieldNames: {
                text: 'name',
                value: 'code',
                children: 'items'
            },
            options: [
                {
                    name: '浙江省',
                    code: '330000',
                    items: [{ name: '杭州市', code: '330100' }]
                },
                {
                    name: '江苏省',
                    code: '320000',
                    items: [{ name: '南京市', code: '320100' }]
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

// 使用 ref 创建响应式数据
const fieldNames = ref({
    text: 'name',
    value: 'code',
    children: 'items'
});

// 选项列表，支持多级嵌套
const options = ref([
    {
        name: '浙江省',
        code: '330000',
        items: [{ name: '杭州市', code: '330100' }]
    },
    {
        name: '江苏省',
        code: '320000',
        items: [{ name: '南京市', code: '320100' }]
    }
]);
```

::: endif

### API

#### Cascader Props

| 参数                                                                         |             说明              | 类型            | 默认值                                                   |
| :--------------------------------------------------------------------------- | :---------------------------: | :-------------- | :------------------------------------------------------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |      级联选择组件的显隐       | boolean         | `false`                                                  |
| title                                                                        |           顶部标题            | string          | -                                                        |
| selected-value                                                               |          选中项的值           | string / number | -                                                        |
| options                                                                      |         可选项数据源          | Option[]        | `[]`                                                     |
| placeholder                                                                  |      未选中时的提示文案       | string          | `请选择`                                                 |
| active-color                                                                 |      选中状态的高亮颜色       | string          | `#2e6be5`                                                |
| closeable                                                                    |       是否显示关闭图标        | boolean         | `true`                                                   |
| field-names                                                                  | 自定义 `options` 结构中的字段 | object          | `{ text: 'text', value: 'value', children: 'children' }` |

#### Popup Props

级联选择组件已经包裹了`popup`组件，故也支持传递`popup`组件的部分`props`。相关`props`的具体示例请参考`popup`组件章节。

| 参数                   |                   说明                    | 类型    | 默认值 |
| :--------------------- | :---------------------------------------: | :------ | :----- |
| overlay                |              是否显示遮罩层               | boolean | `true` |
| overlay-class          |             自定义遮罩层类名              | string  | -      |
| overlay-style          |             自定义遮罩层样式              | object  | -      |
| transition             | 动画类名，等价于 `transtion` 的`name`属性 | string  | -      |
| close-on-click-overlay |          是否在点击遮罩层后关闭           | boolean | `true` |
| lock-scroll            |             是否锁定背景滚动              | boolean | `true` |
| lazy-render            |        是否在显示弹层时才渲染节点         | boolean | `true` |

注意，其中`transition`属性组件库支持的可选值有：`em-fade` `em-fade-up` `em-fade-down` `em-fade-left` `em-fade-right` `em-slide-up` `em-slide-down` `em-slide-left` `em-slide-right`

#### Cascader Events

| 事件   |          说明          | 回调参数                               |
| :----- | :--------------------: | :------------------------------------- |
| change |    选中项变化时触发    | `{ value, selectedOptions, tabIndex }` |
| finish | 全部选项选择完成后触发 | `{ value, selectedOptions, tabIndex }` |
| close  |   点击关闭图标时触发   | -                                      |

#### Popup Events

级联选择组件已经包裹了`popup`组件，故也支持`popup`组件的部分事件。相关事件的具体示例请参考`popup`组件章节。

| 事件名 |       说明       | 回调参数                    |
| :----- | :--------------: | :-------------------------- |
| close  | 关闭弹出层时触发 | `value`: 当前弹出层是否展开 |

#### Cascader Slots

| 名称  |      说明      |
| :---- | :------------: |
| title | 自定义顶部标题 |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-cascader"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-cascader"
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
