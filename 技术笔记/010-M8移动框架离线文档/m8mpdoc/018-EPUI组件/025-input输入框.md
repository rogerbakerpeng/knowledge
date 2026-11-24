# Input 输入框

```warning
Input 为受控组件，其总会显示 Vue 绑定值。

在正常情况下，`input` 的输入事件应该被正常响应。 它的处理程序应该更新组件的绑定值 (或使用 `v-model`)。 否则，输入框的值将不会改变。

不支持 `v-model` 修饰符。

```

## 基础用法

```html
<template>
    <e-input-m v-model="input" placeholder="请输入" />
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    const input = ref('');
</script>
```

## 禁用状态

通过 `disabled` 属性指定是否禁用 `input` 组件

```html
<template>
    <e-input-m v-model="input" disabled placeholder="Please input" />
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    const input = ref('');
</script>
```

## 一键清空

使用 `clearable` 属性即可得到一个可一键清空的输入框

```html
<template>
    <e-input-m v-model="input" clearable placeholder="Please input" />
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    const input = ref('');
</script>
```

## 格式化

在 `formatter` 的情况下显示值，我们通常同时使用 `parser`

```html
<template>
    <e-input-m
        v-model="input"
        placeholder="Please input"
        :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
    />
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    const input = ref('');
</script>
```

## 密码框

使用 `show-password` 属性即可得到一个可切换显示隐藏的密码框

但此时需同步设置 `type="password"`

```html
<template>
    <e-input-m v-model="input" type="password" placeholder="Please input password" show-password />
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    const input = ref('');
</script>
```

## 带图标的输入框

带有图标标记输入类型

要在输入框中添加图标，你可以简单地使用 `prefix-icon` 和 `suffix-icon` 以及 `trailing-icon` 属性。 另外， `prefix` 和 `suffix` 以及 `trailing` 命名的插槽也能正常工作。`trailing-icon` 属性添加的图标位置在清除按钮右侧

```html
<template>
    <e-input-m v-model="input1" class="w-50 m-2" placeholder="Pick a date" :suffix-icon="Calendar" />
    <e-input-m v-model="input2" class="w-50 m-2" placeholder="Type something" :prefix-icon="Search" />
    <e-input-m v-model="input3" class="w-50 m-2" placeholder="Pick a date">
        <template #suffix>
            <e-icon-m class="e-input__icon"><Calendar /></e-icon-m>
        </template>
    </e-input-m>
    <e-input-m v-model="input4" class="w-50 m-2" placeholder="Type something">
        <template #prefix>
            <e-icon-m class="ep-input__icon"><Search /></e-icon-m>
        </template>
    </e-input-m>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { Calendar, Search } from '@epoint-mfe/eui-icons';
    const input1 = ref('');
    const input2 = ref('');
    const input3 = ref('');
    const input4 = ref('');
</script>
```

## 文本域

用于输入多行文本信息可缩放的输入框。 添加 `type="textarea"` 属性来将 `input` 元素转换为原生的 `textarea` 元素。

文本域高度可通过 `rows` 属性控制

```html
<template>
    <e-input-m v-model="textarea" :rows="2" type="textarea" placeholder="Please input" />
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    const textarea = ref('');
</script>
```

## 自适应文本域

设置文字输入类型的 `autosize` 属性使得根据内容自动调整的高度。 你可以给 `autosize` 提供一个包含有最大和最小高度的对象，让输入框自动调整。

```html
<template>
    <e-input-m v-model="textarea1" autosize type="textarea" placeholder="Please input" />
    <e-input-m v-model="textarea2" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="Please input" />
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    const textarea1 = ref('');
    const textarea2 = ref('');
</script>
```

## 复合型输入框

可以在输入框中前置或后置一个元素，通常是标签或按钮。

可通过 `slot` 来指定在 `Input` 中分发的前置或者后置的内容。

```html
<template>
    <e-input-m v-model="input1" placeholder="Please input">
        <template #prepend>Http://</template>
    </e-input-m>
    <e-input-m v-model="input2" placeholder="Please input">
        <template #append>.com</template>
    </e-input-m>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { Search } from '@epoint-mfe/eui-icons';
    const input1 = ref('');
    const input2 = ref('');
</script>
```

## 输入长度限制

使用 maxlength 和 minlength 属性, 来控制输入内容的最大字数和最小字数。 "字符数"使用 JavaScript 字符串长度来衡量。 为文本或文本输入类型设置 maxlength prop 可以限制输入值的长度。 允许你通过设置 show-word-limit 到 true 来显示剩余字数。

```html
<template>
    <e-input-m v-model="text" maxlength="10" placeholder="Please input" show-word-limit type="text" />

    <e-input-m v-model="textarea" maxlength="30" placeholder="Please input" show-word-limit type="textarea" />
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    const text = ref('');
    const textarea = ref('');
</script>
```

## 脱敏

文本输入框内置的脱敏和防窥屏的能力，可以对输入内容进行脱敏处理。用户在输入框聚焦时展示实际内容值，取消聚焦时展示脱敏信息。首次进入编辑时，由于没有真实值，值会清空要求全部重新输入

使用 desensitization-type 属性，指定脱敏的数据类型，内置支持多种脱敏数据类型。

```html
<template>
    <e-input-m v-model="input1" placeholder="Please input" :desensitization-type="DESENDATATYPE_MOBILE_PHONE" />
    <e-input-m v-model="input2" placeholder="Please input" desensitization-type="ID_CARD" />
    <e-button-m @click="getInputValue">获取输入值</e-button-m>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { DESENDATATYPE_MOBILE_PHONE } from '@epoint-mfe/eui-components';

    const input1 = ref('17215683972');
    const input2 = ref('612300190001010000');
    const getInputValue = () => {
        ejs.ui.toast(`手机号:${input1.value};身份证号:${input2.value}`);
    };
</script>
```

## 自定义脱敏

使用 desensitizer 属性，由外部提供脱敏数据处理方法，自行对数据进行脱敏处理。

```html
<template>
    <e-input-m
        v-model="input"
        placeholder="Please input"
        :desensitization-type="DESENDATATYPE_CUSTOM"
        :desensitizer="desensitizer"
    />
    <e-button-m @click="getInputValue">获取输入值</e-button-m>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { DESENDATATYPE_CUSTOM } from '@epoint-mfe/eui-components';

    const input = ref('epoint@epoint.com.cn');
    const desensitizer = (val) => {
        const index = val.indexOf('@');

        return `****${val.slice(index)}`;
    };
    const getInputValue = () => {
        ejs.ui.toast(`输入框值:${input.value}`);
    };
</script>
```

## API

### Attributes

| 属性名                | 描述                                                                                                             | 类型                                                                | 默认值   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------- |
| type                  | 类型                                                                                                             | `string`- 可选值见下表                                              | `text`   |
| model-value / v-model | 绑定值                                                                                                           | `string` / `number`                                                 | —        |
| maxlength             | 最大输入长度                                                                                                     | `string` / `number`                                                 | 140      |
| minlength             | 原生属性，最小输入长度，移动端暂不支持                                                                           | `number`                                                            | —        |
| show-word-limit       | 是否显示统计字数, 只在 `type` 为 `text` 或 `textarea` 的时候生效                                                 | `boolean`                                                           | `false`  |
| placeholder           | 输入框占位文本                                                                                                   | `string`                                                            | —        |
| clearable             | 是否显示清除按钮，只有当 `type` 不是 `textarea` 时生效                                                           | `boolean`                                                           | false    |
| formatter             | 指定输入值的格式。(只有当 `type` 是`text`时才能工作)                                                             | `Function` -`(value: string \| number) => string`                   | —        |
| parser                | 指定从格式化器输入中提取的值。(仅当 `type` 是`text`时才起作用)                                                   | `Function` -`(value: string) => string`                             | —        |
| show-password         | 是否显示切换密码图标                                                                                             | `boolean`                                                           | false    |
| disabled              | 是否禁用                                                                                                         | `boolean`                                                           | false    |
| size                  | 输入框尺寸，只在 type 不为 'textarea' 时有效                                                                     | `default`/`small`/`large`                                           | -        |
| prefix-icon           | 自定义前缀图标                                                                                                   | `string` / `Component`                                              | —        |
| suffix-icon           | 自定义后缀图标,位置在去除按钮左侧                                                                                | `string` / `Component`                                              | —        |
| trailing-icon         | 自定义后缀图标,位置在去除按钮右侧                                                                                | `string` / `Component`                                              | —        |
| rows                  | 输入框行数，仅 `type` 为 `textarea` 时有效                                                                       | `number`                                                            | `2`      |
| autosize              | `textarea` 高度是否自适应，仅 `type` 为 `textarea` 时生效。 可以接受一个对象，比如: `{ minRows: 2, maxRows: 6 }` | `boolean` / `{ minRows?: number, maxRows?: number }`                | `false`  |
| autocomplete          | 原生 `autocomplete` 属性，移动端暂不支持                                                                         | `string`                                                            | off      |
| name                  | 等价于原生 `input name` 属性                                                                                     | `string`                                                            | —        |
| readonly              | readonly 属性，是否只读                                                                                          | `boolean`                                                           | false    |
| max                   | 原生 max 属性，设置最大值，移动端暂不支持                                                                        | `string` / `number`                                                 | —        |
| min                   | 原生属性，设置最小值，移动端暂不支持                                                                             | `string` / `number`                                                 | —        |
| step                  | 原生属性，设置输入字段的合法数字间隔，移动端暂不支持                                                             | `string` / `number`                                                 | —        |
| autofocus             | 原生属性，自动获取焦点，IOS 端不支持                                                                             | `boolean`                                                           | false    |
| form                  | 原生属性，移动端暂不支持                                                                                         | `string`                                                            | —        |
| label ^(a11y)         | 等价于原生 input `aria-label` 属性，移动端暂不支持                                                               | `string`                                                            | —        |
| tabindex              | 输入框的 tabindex，移动端暂不支持                                                                                | `string` / `number`                                                 | —        |
| validate-event        | 输入时是否触发表单的校验                                                                                         | `boolean`                                                           | `true`   |
| input-style           | `input` 元素或 `textarea` 元素的 style                                                                           | `string` / `object` - CSSProperties \| CSSProperties[] \| string[]` | `{}`     |
| desensitization-type  | 脱敏的数据类型，参考下面的表格                                                                                   | `string`                                                            | -        |
| desensitizer          | 自定义脱敏数据处理方法                                                                                           | `(value: string) => string`                                         | -        |
| desensitizeReg        | 自定义脱敏正则表达式                                                                                             | `RegExp`                                                            | `/(?:)/` |

#### 脱敏数据类型 ​

脱敏数据类型入参如下：

| Export Const                  | Value           | Description            | Desensitization Rules                                              |
| :---------------------------- | :-------------- | :--------------------- | :----------------------------------------------------------------- |
| DESENDATATYPE_ID_CARD         | ID_CARD         | 身份证号脱敏           | 保留后 4 位                                                        |
| DESENDATATYPE_MOBILE_PHONE    | MOBILE_PHONE    | 手机号脱敏             | 保留前 3 位和后 4 位，如果手机号不足 11 位，则保留前 2 位和后 2 位 |
| DESENDATATYPE_CHINESE_NAME    | CHINESE_NAME    | 人名脱敏               | 保留后 1 位                                                        |
| DESENDATATYPE_FIXED_PHONE     | FIXED_PHONE     | 固定电话脱敏           | 保留后 4 位                                                        |
| DESENDATATYPE_LOGINID         | LOGINID         | 登录名脱敏             | 保留后 1 位                                                        |
| DESENDATATYPE_BANK_CARD       | BANK_CARD       | 银行卡脱敏             | 保留前 5 位和后 4 位                                               |
| DESENDATATYPE_EMAIL           | EMAIL           | 电子邮箱脱敏           | 保留@及之后的信息                                                  |
| DESENDATATYPE_PASSWORD        | PASSWORD        | 密码脱敏               | 全部隐藏                                                           |
| DESENDATATYPE_ADDRESS         | ADDRESS         | 地址脱敏               | 不足 12 位保留前面不超过 50%，大于 12 位只保留前 6 位              |
| DESENDATATYPE_CREDENTIAL_DATE | CREDENTIAL_DATE | 证件日期脱敏           | 保留后 4 位                                                        |
| DESENDATATYPE_INTELLIGENCE    | INTELLIGENCE    | 智能脱敏               | 小于 4 位的全脱，否则保留前后各 2 位                               |
| DESENDATATYPE_REGEXP          | REGEXP          | 自定义脱敏正则         | 自定义脱敏正则,使用 desensitize-reg 入参值进行匹配                 |
| DESENDATATYPE_CUSTOM          | CUSTOM          | 自定义脱敏数据处理方法 | 自定义脱敏数据处理方法,使用 desensitizer 入参方法处理原始数据      |

#### type 有效值

| 值            | 说明               |
| ------------- | ------------------ |
| text          | 文本输入键盘       |
| textarea      | 多行文本框         |
| number        | 数字输入键盘       |
| idcard        | 身份证输入键盘     |
| digit         | 带小数点的数字键盘 |
| tel           | 电话输入键盘       |
| safe-password | 密码安全输入键盘   |
| nickname      | 昵称输入键盘       |

### Events

| 属性名 | 描述                                                          | 类型                                           |
| ------ | ------------------------------------------------------------- | ---------------------------------------------- |
| blur   | 当选择器的输入框失去焦点时触发                                | `Function` -(event: FocusEvent) => void`       |
| focus  | 当选择器的输入框获得焦点时触发                                | `Function` -(event: FocusEvent) => void`       |
| change | 仅当 modelValue 改变时，当输入框失去焦点或用户按 Enter 时触发 | `Function` -(value: string \| number) => void` |
| input  | 在 Input 值改变时触发                                         | `Function` -(value: string \| number) => void` |
| clear  | 在点击由 clearable 属性生成的清空按钮时触发                   | `Function` -() => void`                        |

### Slots

| Name    | Description                                   |
| ------- | --------------------------------------------- |
| prefix  | 输入框头部内容，只对非 `type="textarea"` 有效 |
| suffix  | 输入框尾部内容，只对非 `type="textarea"` 有效 |
| prepend | 输入框前置内容，只对非 `type="textarea"` 有效 |
| append  | 输入框后置内容，只对非 `type="textarea"` 有效 |

### Exposes

| Name           | Description                                                          | Type                                                  |
| -------------- | -------------------------------------------------------------------- | ----------------------------------------------------- |
| blur           | 使 input 失去焦点                                                    | `Function` -() => void`                               |
| clear          | 清除 input 值                                                        | `Function` -() => void`                               |
| focus          | 使 input 获取焦点                                                    | `Function` -() => void`                               |
| ref            | HTML 元素 input 或 textarea, 在移动端只是 uniapp 的 input 组件的引用 | `object`Ref<HTMLInputElement \| HTMLTextAreaElement>` |
| input          | Input HTML 元素, 在移动端只是 uniapp 的 input 组件的引用             | `object`Ref<HTMLInputElement>`                        |
| textarea       | HTML textarea 元素, 在移动端只是 uniapp 的 input 组件的引用          | `object`Ref<HTMLTextAreaElement>`                     |
| textareaStyle  | textarea 的样式                                                      | `object`Ref<StyleValue>`                              |
| resizeTextarea | 改变 textarea 大小，移动端暂不支持                                   | `Function` -() => void`                               |
| select         | 选中 input 中的文字                                                  | `Function` -() => void`                               |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-input-m"
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