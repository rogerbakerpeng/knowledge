# 组件使用

## field 输入框

### 介绍

-   表单中的输入框组件。

### 代码演示

#### 基础用法

可以通过 `v-model` 双向绑定输入框的值，通过 `placeholder` 设置占位提示文字。

```html
<!-- Field 是基于 Cell 实现的，可以使用 CellGroup 作为容器来提供外边框。 -->
<em-cell-group>
    <em-field v-model="value" label="文本" placeholder="请输入用户名" />
</em-cell-group>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            value: ''
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const value = ref('');
```

::: endif

#### 基座风格

可以通过 `basic` 设置基座风格的样式。

```html
<em-cell-group>
    <em-field label="横向必填项" basic required is-link placeholder="请输入" v-model="value"></em-field>
</em-cell-group>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            value: ''
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const value = ref('');
```

::: endif

#### 基座风格:纵向

可以通过 `input-align="vertical"` 设置`label`和输入框纵向排列。

```html
<em-cell-group>
    <em-field
        label="纵向必填项"
        basic
        required
        is-link
        input-align="vertical"
        placeholder="请输入"
        v-model="value"
    ></em-field>
</em-cell-group>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            value: ''
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const value = ref('');
```

::: endif

#### 基座风格: 多行文本框

通过 `type="textarea"` 设置多行文本框。

```html
<em-cell-group>
    <em-field
        label="多行文本框"
        basic
        required
        input-align="vertical"
        :autosize="{ minHeight: 24 }"
        type="textarea"
        placeholder="请输入"
        v-model="value"
    ></em-field>
</em-cell-group>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            value: ''
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const value = ref('');
```

::: endif

#### 基座风格: 其他表单项类型

设置`field`的`basic`属性后，`input slot`中包含的其他表单组件也会默认展示`basic`样式

```html
<em-cell-group>
    <em-field name="switch" basic label="滑动开关" input-align="right">
        <template v-slot:input>
            <em-switch v-model="value" />
        </template>
    </em-field>
</em-cell-group>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            value: ''
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const value = ref('');
```

::: endif

#### 自定义类型

根据 `type` 属性定义不同类型的输入框，默认值为 `text`。

```html
<!-- 输入任意文本 -->
<em-field v-model="text" label="文本" />
<!-- 输入手机号，调起手机号键盘 -->
<em-field v-model="tel" type="tel" label="手机号" />
<!-- 允许输入正整数，调起纯数字键盘 -->
<em-field v-model="number" type="number" label="整数" />
<!-- 允许输入数字，调起带符号的纯数字键盘 -->
<em-field v-model="digit" type="digit" label="数字" />
<!-- 输入密码 -->
<em-field v-model="password" type="password" label="密码" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            tel: '',
            text: '',
            digit: '',
            number: '',
            password: ''
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const tel = ref('');
const text = ref('');
const digit = ref('');
const number = ref('');
const password = ref('');
```

::: endif

#### 禁用输入框

通过 `readonly` 将输入框设置为只读状态，通过 `disabled` 将输入框设置为禁用状态。

```html
<em-cell-group>
    <em-field label="文本" value="输入框只读" readonly />
    <em-field label="文本" value="输入框已禁用" disabled />
</em-cell-group>
```

#### 显示图标

通过 `left-icon` 和 `right-icon` 配置输入框两侧的图标，通过设置 `clearable` 在输入过程中展示清除图标。

```html
<em-cell-group>
    <em-field v-model="value1" label="文本" left-icon="smile-o" right-icon="warning-o" placeholder="显示图标" />
    <em-field v-model="value2" clearable label="文本" left-icon="music-o" placeholder="显示清除图标" />
</em-cell-group>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            value1: '',
            value2: '123'
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const value1 = ref('');
const value2 = ref('123');
```

::: endif

#### 错误提示

设置 `required` 属性表示这是一个必填项，可以配合 `error` 或 `error-message` 属性显示对应的错误提示。

```html
<em-cell-group>
    <em-field v-model="username" error required label="用户名" placeholder="请输入用户名" />
    <em-field v-model="phone" required label="手机号" placeholder="请输入手机号" error-message="手机号格式错误" />
</em-cell-group>
```

#### 插入按钮

通过 `button` 插槽可以在输入框尾部插入按钮。

```html
<em-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
    <template #button>
        <em-button size="small" type="primary">发送验证码</em-button>
    </template>
</em-field>
```

#### 格式化输入内容

通过 `formatter` 属性可以对输入的内容进行格式化，通过 `format-trigger` 属性可以指定执行格式化的时机，默认在输入时进行格式化。

```html
<em-field v-model="value1" label="文本" :formatter="formatter" placeholder="在输入时执行格式化" />
<em-field
    v-model="value2"
    label="文本"
    :formatter="formatter"
    format-trigger="onBlur"
    placeholder="在失焦时执行格式化"
/>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            value1: '',
            value2: ''
        };
    },
    methods: {
        formatter(value) {
            // 过滤输入的数字
            return value.replace(/\d/g, '');
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const value1 = ref('');
const value2 = ref('');

const formatter = (value) => {
    // 过滤输入的数字
    return value.replace(/\d/g, '');
};
```

::: endif

#### 高度自适应

对于 `textarea`，可以通过 `autosize` 属性设置高度自适应。

```html
<em-field v-model="message" rows="1" autosize label="留言" type="textarea" placeholder="请输入留言" />
```

#### 显示字数统计

设置 `maxlength` 和 `show-word-limit` 属性后会在底部显示字数统计。

```html
<em-field
    v-model="message"
    rows="2"
    autosize
    label="留言"
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
/>
```

#### 输入框内容对齐

通过 `input-align` 属性可以设置输入框内容的对齐方式，可选值为 `center`、`right`。

```html
<em-field v-model="value" label="文本" placeholder="输入框内容右对齐" input-align="right" />
```

#### 输入框占位提示文字样式

通过 `placeholder-style` 属性可以设置输入框占位提示文字样式。

```html
<em-field v-model="value" label="文本" placeholder="输入框内容右对齐" placeholder-style="color: #b8becc;" />
```

通过 `placeholder-class` 属性可以设置输入框占位提示文字样式类。

```html
<em-field v-model="value" label="文本" placeholder="输入框内容右对齐" placeholder-class="placeholder" />
```

```css
::v-deep .placeholder {
    color: #b8becc;
}
```

### API

#### Props

| 参数                                                                                   |                                                     说明                                                      | 类型             | 默认值            |
| :------------------------------------------------------------------------------------- | :-----------------------------------------------------------------------------------------------------------: | :--------------- | :---------------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif           |                                                 当前输入的值                                                  | number / string  | -                 |
| label                                                                                  |                                                输入框左侧文本                                                 | string           | -                 |
| name                                                                                   |                                            名称，提交表单的标识符                                             | string           | -                 |
| type                                                                                   |                     输入框类型, 可选值为 `tel` `digit` `number` `textarea` `password` 等                      | string           | `text`            |
| size                                                                                   |                                            大小，可选值为 `large`                                             | string           | -                 |
| maxlength                                                                              |                                               输入的最大字符数                                                | number / string  | -                 |
| placeholder                                                                            |                                              输入框占位提示文字                                               | string           | -                 |
| placeholder-style                                                                      |                                            指定 placeholder 的样式                                            | string           | `color: #b8becc;` |
| placeholder-class `v8.3.11-beta.2`                                                     |        指定 placeholder 的样式类，注意页面或组件的`style`中写了`scoped`时，需要使用`::v-deep`样式穿透         | string           | -                 |
| border                                                                                 |                                                是否显示内边框                                                 | boolean          | `true`            |
| disabled                                                                               |                                                是否禁用输入框                                                 | boolean          | `false`           |
| readonly                                                                               |                                                   是否只读                                                    | boolean          | `false`           |
| colon                                                                                  |                                          是否在 `label` 后面添加冒号                                          | boolean          | `false`           |
| required                                                                               |                                             是否显示表单必填星号                                              | boolean          | `false`           |
| ::: ifdef M84 required-before `v8.4.0-beta.7` ::: endif                                |                                         表单必填星号位置是否切换在前                                          | boolean          | `false`           |
| center                                                                                 |                                              是否使内容垂直居中                                               | boolean          | `false`           |
| clearable                                                                              |                                 是否启用清除图标，点击清除图标后会清空输入框                                  | boolean          | `false`           |
| clear-trigger                                                                          |           显示清除图标的时机，`always` 表示输入框不为空时展示，`focus` 表示输入框聚焦且不为空时展示           | string           | `focus`           |
| clickable                                                                              |                                               是否开启点击反馈                                                | boolean          | `false`           |
| is-link                                                                                |                                        是否展示右侧箭头并开启点击反馈                                         | boolean          | `false`           |
| autofocus                                                                              |                                     是否自动聚焦，`iOS` 系统不支持该属性                                      | boolean          | `false`           |
| show-word-limit                                                                        |                                   是否显示字数统计，需要设置`maxlength`属性                                   | boolean          | `false`           |
| error                                                                                  |                                              是否将输入内容标红                                               | boolean          | `false`           |
| error-message                                                                          |                                        底部错误提示文案，为空时不展示                                         | string           | -                 |
| formatter                                                                              |                                              输入内容格式化函数                                               | Function         | -                 |
| format-trigger                                                                         |                                    格式化函数触发的时机，可选值为 `onBlur`                                    | string           | `onChange`        |
| arrow-direction                                                                        |                                     箭头方向，可选值为 `left` `up` `down`                                     | string           | `right`           |
| label-class                                                                            |                                               左侧文本额外类名                                                | string           | -                 |
| label-width                                                                            |                                         左侧文本宽度，默认单位为`px`                                          | number /string   | `96px`            |
| label-align                                                                            |                                  左侧文本对齐方式，可选值为 `center` `right`                                  | string           | `left`            |
| input-class                                                                            |                                                输入框额外类名                                                 | string           | -                 |
| input-align                                                                            |                             输入框对齐方式，可选值为 `center` `right` `vertical`                              | string           | `left`            |
| error-message-align                                                                    |                                错误提示文案对齐方式，可选值为 `center` `right`                                | string           | `left`            |
| autosize                                                                               | 是否自适应内容高度，只对 `textarea` 有效，可传入对象,如 { `maxHeight`: `100`, `minHeight`: `50` }，单位为`px` | boolean / object | `false`           |
| left-icon                                                                              |                                            左侧图标名称或图片链接                                             | string           | -                 |
| right-icon                                                                             |                                            右侧图标名称或图片链接                                             | string           | -                 |
| icon-prefix                                                                            |                              图标类名前缀，同 `Icon` 组件的 `class-prefix` 属性                               | string           | `van-icon`        |
| icon-class                                                                             |                                               右侧图标额外类名                                                | string           |                   |
| cell-style                                                                             |                                           内部单元格组件的额外样式                                            | string           |                   |
| rules                                                                                  |                                        表单校验规则，详见 `Form` 组件                                         | Rule[]           | -                 |
| desensitizationType ::: ifdef M83 `v8.3.24` ::: endif ::: ifdef M84 `v8.4.5` ::: endif |                脱敏类型。脱敏功能需配合`emForm`使用,设置该属性时开启脱敏功能，详见 `Form` 组件                | string           | -                 |
| desensitizer ::: ifdef M83 `v8.3.24` ::: endif ::: ifdef M84 `v8.4.5` ::: endif        |                                            自定义脱敏数据处理方法                                             | function         | -                 |
| desensitizeReg ::: ifdef M83 `v8.3.24` ::: endif ::: ifdef M84 `v8.4.5` ::: endif      |                                             自定义脱敏正则表达式                                              | RegExp           | `/(?:)/`          |

#### Events

除下列事件外，`Field` 默认支持 `Input` 标签所有的原生事件

| 事件名           |         说明         | 回调参数                     |
| :--------------- | :------------------: | :--------------------------- |
| input            | 输入框内容变化时触发 | value: string (当前输入的值) |
| focus            | 输入框获得焦点时触发 | event: Event                 |
| blur             | 输入框失去焦点时触发 | event: Event                 |
| clear            |  点击清除按钮时触发  | event: Event                 |
| click            |  点击 Field 时触发   | event: Event                 |
| click-input      |  点击输入区域时触发  | event: Event                 |
| click-left-icon  |  点击左侧图标时触发  | event: Event                 |
| click-right-icon |  点击右侧图标时触发  | event: Event                 |

#### 方法

通过 `ref` 可以获取到 `Field` 实例并调用实例方法，详见组件实例方法

| 方法名 |      说明      | 参数 | 返回值 |
| :----- | :------------: | :--- | :----- |
| focus  | 获取输入框焦点 | -    | -      |
| blur   | 取消输入框焦点 | -    | -      |

#### Slots

| 名称      |                            说明                            |
| :-------- | :--------------------------------------------------------: |
| label     |                  自定义输入框 label 标签                   |
| input     | 自定义输入框，使用此插槽后，与输入框相关的属性和事件将失效 |
| leftIcon  |                    自定义输入框头部图标                    |
| rightIcon |                    自定义输入框尾部图标                    |
| button    |                    自定义输入框尾部按钮                    |
| extra     |                自定义输入框最右侧的额外内容                |

### FAQ

1. 设置`readonly`属性后，在 H5 端`field`输入框无法触发`click`点击事件了。

原因：为了与小程序保持一致，uniapp 框架提供的`input`组件并没有提供`readonly`属性，只有`disabled`属性，所以在 H5 端`field`组件的`disabled`属性与`readonly`属性区别只有样式是否置灰，设置了`readonly`等同于给`input`设置了`disabled`属性，所以`click`事件不能触发了。在小程序端可以正常触发`click`事件。

解决方案：在 H5 端，可以用`touchstart`或`touchend`事件替代，示例如下：

```html
<em-field label="文本" value="输入框只读" readonly @touchend.native="onClick" />
```

::: ifdef M83

<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-field"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-field"
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
