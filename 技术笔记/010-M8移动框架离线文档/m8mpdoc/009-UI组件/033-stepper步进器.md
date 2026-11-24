# 组件使用

## stepper 步进器

### 介绍

-   步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。

### 代码演示

#### 基础用法

可以通过`change`事件监听到输入值的变化。

::: ifdef M83

```html
<em-stepper :value="value" />
```

```js
export default {
    data() {
        return {
            value: 1
        };
    }
};
```

::: endif

::: ifdef M84

```html
<em-stepper :model-value="value" />
```

```js
import { ref } from 'vue';
const value = ref(1);
```

::: endif

#### 步长设置

通过`step`属性设置每次点击增加或减少按钮时变化的值，默认为`1`

::: ifdef M83

```html
<em-stepper :value="value" step="2" />
```

::: endif

::: ifdef M84

```html
<em-stepper :model-value="value" step="2" />
```

::: endif

#### 限制输入范围

通过`min`和`max`属性限制输入值的范围

::: ifdef M83

```html
<em-stepper :value="value" min="5" max="8" />
```

::: endif

::: ifdef M84

```html
<em-stepper :model-value="value" min="5" max="8" />
```

::: endif

#### 限制输入整数

设置`integer`属性后，输入框将限制只能输入整数

::: ifdef M83

```html
<em-stepper :value="value" integer />
```

::: endif

::: ifdef M84

```html
<em-stepper :model-value="value" integer />
```

::: endif

#### 禁用状态

通过设置`disabled`属性来禁用步进器，禁用状态下无法点击按钮或修改输入框

::: ifdef M83

```html
<em-stepper :value="value" disabled />
```

::: endif

::: ifdef M84

```html
<em-stepper :model-value="value" disabled />
```

::: endif

#### 禁用输入框

通过设置`disable-input`属性来禁用输入框，此时按钮仍然可以点击

::: ifdef M83

```html
<em-stepper :value="value" disable-input />
```

::: endif

::: ifdef M84

```html
<em-stepper :model-value="value" disable-input />
```

::: endif

#### 固定小数位数

通过设置`decimal-length`属性可以保留固定的小数位数

::: ifdef M83

```html
<em-stepper :value="value" step="0.2" :decimal-length="1" />
```

::: endif

::: ifdef M84

```html
<em-stepper :model-value="value" step="0.2" :decimal-length="1" />
```

::: endif

#### 自定义大小

通过`input-width`属性设置输入框宽度，通过`button-size`属性设置按钮大小和输入框高度

::: ifdef M83

```html
<em-stepper :value="value" input-width="40px" button-size="32px" />
```

::: endif

::: ifdef M84

```html
<em-stepper :model-value="value" input-width="40px" button-size="32px" />
```

::: endif

#### 异步变更

如果需要异步地修改输入框的值，可以设置`async-change`属性，并在`change`事件中手动修改`value`

::: ifdef M83

```html
<em-stepper :value="value" async-change @change="onChange" />
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    data() {
        return {
            value: 1
        };
    },
    methods: {
        onChange(target, value) {
            Toast.loading({
                forbidClick: true
            });
            setTimeout(() => {
                Toast.clear();
                this[target] = value;
            }, 500);
        }
    }
};
```

::: endif

::: ifdef M84

```html
<em-stepper :model-value="value" async-change @change="onChange" />
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';

const value = ref(1);

function onChange(value) {
    Toast.loading({
        forbidClick: true
    });
    setTimeout(() => {
        Toast.clear();
        value.value = value;
    }, 500);
}

const emToastRef = ref(null);

defineExpose({
    emToastRef
});
```

::: endif

#### 圆角风格

将 `theme` 设置为 `round` 来展示圆角风格的步进器

::: ifdef M83

```html
<em-stepper :value="value" theme="round" button-size="22" disable-input />
```

::: endif

::: ifdef M84

```html
<em-stepper :model-value="value" theme="round" button-size="22" disable-input />
```

::: endif

### API

#### Props

| 参数                                                                         |                    说明                    | 类型            | 默认值  |
| :--------------------------------------------------------------------------- | :----------------------------------------: | :-------------- | :------ |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |                当前输入的值                | number / string | -       |
| min                                                                          |                   最小值                   | number / string | `1`     |
| max                                                                          |                   最大值                   | number / string | -       |
| default-value                                                                |                   初始值                   | number / string | `1`     |
| step                                                                         |          步长，每次点击时改变的值          | number / string | `1`     |
| name                                                                         |  标识符，可以在`change`事件回调参数中获取  | number / string | -       |
| input-width                                                                  |         输入框宽度，默认单位为`px`         | number / string | `32px`  |
| button-size                                                                  |   按钮大小以及输入框高度，默认单位为`px`   | number / string | `28px`  |
| decimal-length                                                               |             固定显示的小数位数             | number / string | -       |
| theme                                                                        |         样式风格，可选值为 `round`         | string          | -       |
| placeholder                                                                  |             输入框占位提示文字             | string          | -       |
| integer                                                                      |             是否只允许输入整数             | boolean         | `false` |
| disabled                                                                     |               是否禁用步进器               | boolean         | `false` |
| disable-plus                                                                 |              是否禁用增加按钮              | boolean         | `false` |
| disable-minus                                                                |              是否禁用减少按钮              | boolean         | `false` |
| disable-input                                                                |               是否禁用输入框               | boolean         | `false` |
| async-change                                                                 | 是否开启异步变更，开启后需要手动控制输入值 | boolean         | `false` |
| show-plus                                                                    |              是否显示增加按钮              | boolean         | `true`  |
| show-minus                                                                   |              是否显示减少按钮              | boolean         | `true`  |
| show-input                                                                   |               是否显示输入框               | boolean         | `true`  |
| long-press                                                                   |              是否开启长按手势              | boolean         | `true`  |
| allow-empty                                                                  |            是否允许输入的值为空            | boolean         | `false` |

#### Events

| 事件名    |           说明           | 回调参数                                |
| :-------- | :----------------------: | :-------------------------------------- |
| change    | 当绑定值变化时触发的事件 | value: string, detail: { name: string } |
| overlimit |  点击不可用的按钮时触发  | -                                       |
| plus      |    点击增加按钮时触发    | -                                       |
| minus     |    点击减少按钮时触发    | -                                       |
| focus     |     输入框聚焦时触发     | event: Event                            |
| blur      |     输入框失焦时触发     | event: Event                            |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-stepper"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-stepper"
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
