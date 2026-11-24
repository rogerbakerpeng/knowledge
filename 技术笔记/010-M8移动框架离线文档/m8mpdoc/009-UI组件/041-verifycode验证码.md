# 组件使用

## verifycode 验证码

### 介绍

-   验证码组件。

### 代码演示

#### 基础用法

```html
<em-field placeholder="请输入验证码" v-model="value"></em-field>
<em-verify-code :width="160" style="margin: 10px;" ref="verifycode"></em-verify-code>
<em-button class="mr10" type="primary" plain @click="checkVerifyCode">校验验证码</em-button>
<em-button type="danger" plain @click="updateVerify">更新验证码</em-button>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            value: ''
        };
    },
    methods: {
        updateVerify() {
            this.$refs.verifycode.update();
        },
        checkVerifyCode() {
            console.log(`验证结果：${this.$refs.verifycode.validate(this.value)}`);
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const value = ref('');
const verifycode = ref(null);
const updateVerify = () => {
    verifycode.value.update();
};

const checkVerifyCode = () => {
    console.log(`验证结果：${verifycode.value.validate(value.value)}`);
};
```

::: endif

### API

#### Props

| 参数                 |           说明           | 类型    | 默认值  |
| :------------------- | :----------------------: | :------ | :------ |
| len                  |     验证码字符串长度     | number  | `4`     |
| minfontsize          |  验证码字符最小字体大小  | number  | `20`    |
| maxfontsize          |  验证码字符最大字体大小  | number  | `35`    |
| bgColor              |      验证码边框颜色      | string  | `#444`  |
| colors               | 自定义验证码每个字符颜色 | array   | -       |
| width                |      验证码画布宽度      | number  | `130`   |
| height               |      验证码画布高度      | number  | `60`    |
| enableCaseValidation |    是否开启大小写校验    | boolean | `false` |
| lines `v8.3.12`      |        干扰线数量        | number  | `8`     |
| points `v8.3.12`     |        干扰点数量        | number  | `100`   |

#### 方法

| 方法名   |    说明    | 参数                                  |           返回值           |
| :------- | :--------: | :------------------------------------ | :------------------------: |
| update   | 刷新验证码 | -                                     |             -              |
| validate | 验证码校验 | value: 用户输入的验证码，类型`String` | 检验是否通过，类型 Boolean |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-verify-code"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-verify-code"
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
