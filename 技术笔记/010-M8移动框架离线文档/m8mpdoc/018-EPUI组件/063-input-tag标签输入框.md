# Input Tag 标签输入框

InputTag 组件允许用户添加内容作为标签




## 基本用法

按 `Enter` 回车键添加输入内容为标签

```html
<template>
  <e-input-tag-m v-model="input" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref<string[]>();
</script>
```



## 最大标签数

您可以设置可以添加的标签数量限制。

```html
<template>
  <e-input-tag-m v-model="input" :max="3" placeholder="enter up to 3 tags" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref<string[]>();
</script>
```



## 禁用状态

您可以设置 `InputTag` 被禁用。

```html
<template>
  <e-input-tag-m v-model="input" disabled placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref<string[]>(['tag1', 'tag2', 'tag3']);
</script>
```

## 可清空

您可以设置是否显示清除按钮。

```html
<template>
  <e-input-tag-m v-model="input" clearable placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref<string[]>(['tag1', 'tag2', 'tag3']);
</script>
```

## 可拖放

您可以设置是否可以拖动标签。

```html
<template>
  <e-input-tag-m v-model="input" draggable placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref<string[]>(['tag1', 'tag2', 'tag3']);
</script>
```

## 尺寸

使用 `size` 属性改变输入框大小。 除了默认大小外，还有另外两个选项： `large`, `small`。

```html
<template>
  <e-input-tag-m v-model="input" size="large" placeholder="Please input" />
  <br />
  <e-input-tag-m v-model="input" placeholder="Please input" />
  <br />
  <e-input-tag-m v-model="input" size="small" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref<string[]>();
</script>

```

## 自定义标签

您可以通过 `tag` 插槽自定义标签内容。

```html
<template>
  <div>
    <e-segmented-m v-model="tagType" :options="type" class="mr-5" />
    <e-segmented-m v-model="tagEffect" :options="effect" />
  </div>
  <br />
  <e-input-tag-m v-model="input" :tag-type="tagType" :tag-effect="tagEffect" placeholder="Please input">
    <template #tag="{ value }">
      <div class="flex items-center">
        <e-icon-m class="mr-1">
          <CollectionTag />
        </e-icon-m>
        <span>{{ value }}</span>
      </div>
    </template>
  </e-input-tag-m>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CollectionTag } from '@epoint-mfe/eui-icons';
import type { TagProps } from '@epoint-mfe/eui-components';

const type: Array<TagProps['type']> = ['success', 'info', 'warning', 'danger'];
const effect: Array<TagProps['effect']> = ['light', 'dark', 'plain'];

const tagType = ref<TagProps['type']>('');
const tagEffect = ref<TagProps['effect']>('plain');
const input = ref<string[]>(['tag1', 'tag2', 'tag3']);
</script>
```

## 自定义前缀和后缀

您可以通过 `prefix` 和 `suffix` 插槽自定义 `InputTag` 的前缀和后缀。

```html
<template>
  <e-input-tag-m v-model="input" clearable placeholder="Please input">
    <template #prefix>
      <e-icon-m><CollectionTag /></e-icon-m>
    </template>
    <template #suffix>
      <e-icon-m><Search /></e-icon-m>
    </template>
  </e-input-tag-m>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CollectionTag, Search } from '@epoint-mfe/eui-icons';

const input = ref<string[]>();
</script>
```

## API

### Attributes

| Name                  | Description                    | Type                                                         | Default |
| :-------------------- | :----------------------------- | :----------------------------------------------------------- | :------ |
| model-value / v-model | 绑定值                         | `array` （string[]）                                         | —       |
| max                   | 可添加标签的最大数量           | `number`                                                     | —       |
| tag-type              | 标签类型                       | `enum` （'' \| 'success' \| 'info' \| 'warning' \| 'danger' ） | ''    |
| tag-effect            | 标签效果                       | `enum` （'' \| 'light' \| 'dark' \| 'plain'）                | light   |
| draggable             | 是否可以拖动标签               | `boolean`                                                    | false   |
| size                  | 输入框尺寸                     | `enum` （'large' \| 'default' \| 'small'）                   | —       |
| clearable             | 是否显示清除按钮               | `boolean`                                                    | false   |
| disabled              | 是否禁用                       | `boolean`                                                    | false   |
| validate-event        | 是否触发表单验证               | `boolean`                                                    | true    |
| readonly              | 等价于原生 `readonly` 属性     | `boolean`                                                    | false   |
| autofocus             | 等价于原生 `autofocus` 属性    | `boolean`                                                    | false   |
| id                    | 等价于原生 input `id` 属性     | `string`                                                     | —       |
| tabindex              | 等价于原生 `tabindex` 属性     | `string` / `number`                                          | —       |
| maxlength             | 等价于原生 `maxlength` 属性    | `string` / `number`                                          | —       |
| minlength             | 等价于原生 `minlength` 属性    | `string` / `number`                                          | —       |
| placeholder           | 输入框占位文本                 | `string`                                                     | —       |
| autocomplete          | 等价于原生 `autocomplete` 属性 | `string`                                                     | off     |


### Events

| Name       | Description             | Type                                     |
| :--------- | :---------------------- | :--------------------------------------- |
| change     | 绑定值变化时触发的事件  | `Function` - (value: string[]) => void   |
| input      | 在 Input 值改变时触发   | `Function` - (value: string) => void     |
| add-tag    | tag 被添加时触发        | `Function` - (value: string) => void     |
| remove-tag | tag 被移除时触发        | `Function` - (value: string) => void     |
| focus      | 在 Input 获得焦点时触发 | `Function`- (event: FocusEvent) => void  |
| blur       | 在 Input 失去焦点时触发 | `Function` - (event: FocusEvent) => void |
| clear      | 点击清除图标时触发      | `Function` - () => void                  |


### Slots

| Name   | Description       | Type                                        |
| :----- | :---------------- | :------------------------------------------ |
| tag    | 作为tag的内容     | `object` - { value: string, index: number } |
| prefix | InputTag 头部内容 | —                                           |
| suffix | InputTag 尾部内容 | —                                           |


### Exposes

| Name  | Description       | Type                    |
| :---- | :---------------- | :---------------------- |
| focus | 使 input 获取焦点 | `Function` - () => void |
| blur  | 使 input 失去焦点 | `Function` - () => void |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-input-tag-m"
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