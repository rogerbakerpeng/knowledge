# VerifyCode 验证码

滑块验证码控件。

## 基本用法

使用 `action` 指定验证码加载数据和验证的请求地址，通过 `validate` 事件来获取到验证的结果

```html
<template>
  <e-verify-code-m action="https://fe.epoint.com.cn/mock/752/eui-vue/initAndCheckCaptcha" @validate="onValidate" />
  <p>验证状态：{{ isValidate ? '成功' : '失败' }}</p>
  <p>validateCode: {{ validateCode }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isValidate = ref<boolean>(false);
const validateCode = ref<string>('');

const onValidate = (e) => {
  isValidate.value = e.isValid;
  validateCode.value = e.validateCode;
};
</script>
```

## trigger 模式

通过将 `type` Name指定为 `trigger` 开启 trigger 模式

```html
<template>
  <e-verify-code-m action="https://fe.epoint.com.cn/mock/752/eui-vue/initAndCheckCaptcha" type="trigger" />
</template>

<script setup lang="ts"></script>
```

## dialog 模式

通过与 `Dialog` 组件结合可以实现弹窗验证的效果

```html
<template>
  <e-button-m @click="showDialog"> 打开验证码 </e-button-m>
  <e-dialog-m v-model="dialogVisible" title="请完成安全验证" :width="340">
    <e-verify-code-m
      ref="verifyCodeRef"
      action="https://fe.epoint.com.cn/mock/752/eui-vue/initAndCheckCaptcha"
      @validate="onValidate"
    />
  </e-dialog-m>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const verifyCodeRef = ref();

const dialogVisible = ref<boolean>(false);
const isValidate = ref<boolean>(false);
const validateCode = ref<string>('');

const showDialog = () => {
  dialogVisible.value = true;
  verifyCodeRef.value?.reload();
};
const onValidate = (e) => {
  isValidate.value = e.isValid;
  validateCode.value = e.validateCode;

  if (e.isValid) {
    setTimeout(() => {
      dialogVisible.value = false;
    }, 1000);
  }
};
</script>
```

## API

### Attributes

| Name         | Description                                           | Type                      | Default  |
| :----------- | :---------------------------------------------------- | :------------------------ | :------- |
| action       | 接口地址                                              | `string`                  | ''       |
| type         | 展示的Type                                            | `enum`-`'normal' \| 'trigger'` |'normal' |
| width        | 宽                                                    | `number`                  | 300      |
| http-request | 覆盖默认的 xhr 行为，允许你实现自己的初始化和验证请求 | `function`-`(options:VerifyRequestHandler) => XMLHttpRequest \| Promise<unknown>` | —        |

### Events

| Name     | Description    | Type       |
| :------- | :------------- | :--------- |
| validate | 验证完成后触发 | `function`-`(evt: { isValid： boolean, validateCode?: string, errorMsg:? string }) => void` |

### Exposes

| Name   | Description    | Type          |
| :----- | :------------- | :------------ |
| reload | 重新加载验证码 | `function`-`() => void` |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-verifycode-m"
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