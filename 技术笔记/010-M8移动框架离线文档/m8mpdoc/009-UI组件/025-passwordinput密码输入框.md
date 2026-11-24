# 组件使用

## passwordinput 密码输入框

### 介绍

-   带网格的输入框组件，可以用于输入支付密码、短信验证码等，通常与数字键盘组件配合使用。

### 代码演示

#### 基础用法

```html
<em-password-input :value="value1" info="密码为 6 位数字" :focused="showKeyboard1" @focus="showKeyboard1 = true" />
<em-number-keyboard :show="showKeyboard1" @inputkey="onInput1" @delete="onDelete1" @blur="showKeyboard1 = false" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            value1: '123',
            showKeyboard1: false
        };
    },
    methods: {
        onInput1(key) {
            this.value1 = (this.value1 + key).slice(0, 6);
        },
        onDelete1() {
            this.value1 = this.value1.slice(0, this.value1.length - 1);
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const value1 = ref('123');
const showKeyboard1 = ref(false);

const onInput1 = (key) => {
    value1.value = (value1.value + key).slice(0, 6);
};

const onDelete1 = () => {
    value1.value = value1.value.slice(0, value1.value.length - 1);
};
```

::: endif

#### 自定义长度

```html
<em-password-input :value="value2" :length="4" :gutter="15" :focused="showKeyboard2" @focus="showKeyboard2 = true" />
```

#### 明文展示

```html
<em-password-input :value="value3" :mask="false" :focused="showKeyboard3" @focus="showKeyboard3 = true" />
```

#### 错误提示

通过`error-info`属性可以设置错误提示信息，例如当输入六位时提示密码错误

```html
<em-password-input :value="value4" :error-info="errorInfo" :focused="showKeyboard4" @focus="showKeyboard4 = true" />
<em-number-keyboard :show="showKeyboard4" @inputkey="onInput4" @delete="onDelete4" @blur="showKeyboard4 = false" />
```
::: ifdef M83
```js
export default {
    data() {
        return {
            value4: '123',
            showKeyboard4: false,
            errorInfo: ''
        };
    },
    methods: {
        onInput4(key) {
            this.value4 = (this.value4 + key).slice(0, 6);
            if (this.value4.length === 6) {
                this.errorInfo = '密码错误';
            } else {
                this.errorInfo = '';
            }
        },
        onDelete4() {
            this.value4 = this.value4.slice(0, this.value4.length - 1);
        }
    }
};
```
::: endif
::: ifdef M84
```js
import { ref } from 'vue';
const value4 = ref('123');
const showKeyboard4 = ref(false);
const errorInfo = ref('');

const onInput4 = (key) => {
    value4.value = (value4.value + key).slice(0, 6);
    if (value4.value.length === 6) {
        errorInfo.value = '密码错误';
    } else {
        errorInfo.value = '';
    }
};

const onDelete4 = () => {
    value4.value = value4.value.slice(0, value4.value.length - 1);
};
```
::: endif

### API

#### Props

| 参数       |                         说明                          | 类型            | 默认值  |
| :--------- | :---------------------------------------------------: | :-------------- | :------ |
| value      |                        密码值                         | string          | `''`    |
| info       |                  输入框下方文字提示                   | string          | -       |
| error-info |                  输入框下方错误提示                   | string          | -       |
| length     |                     密码最大长度                      | number / string | `6`     |
| gutter     | 输入框格子之间的间距，如 `20px` `2em`，默认单位为`px` | number / string | `0`     |
| mask       |                   是否隐藏密码内容                    | boolean         | `true`  |
| focused    |             是否已聚焦，聚焦时会显示光标              | boolean         | `false` |

#### Events

| 事件名 |       说明       | 回调参数 |
| :----- | :--------------: | :------- |
| focus  | 输入框聚焦时触发 | -        |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-password-input"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-password-input"
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
