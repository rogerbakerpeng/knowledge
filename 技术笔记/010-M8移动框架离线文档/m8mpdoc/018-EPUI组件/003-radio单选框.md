# Radio 单选框

单选组件，用于在多个选项中进行单选选择。

## 基本用法

创建单选框组件很容易，只需要将一个变量绑定到单选框的 `v-model`。它等于所选单选框的 `value` 值。`value` 的类型可以是 `String`、`Number` 或 `Boolean`。

```html
<template>
  <div class="mb-2 flex items-center text-sm">
    <e-radio-group-m v-model="radio1" class="ml-4">
      <e-radio-m value="1" size="large">Option 1</e-radio-m>
      <e-radio-m value="2" size="large">Option 2</e-radio-m>
    </e-radio-group-m>
  </div>
  <div class="my-2 flex items-center text-sm">
    <e-radio-group-m v-model="radio2" class="ml-4">
      <e-radio-m value="1">Option 1</e-radio-m>
      <e-radio-m value="2">Option 2</e-radio-m>
    </e-radio-group-m>
  </div>
  <div class="my-4 flex items-center text-sm">
    <e-radio-group-m v-model="radio3" class="ml-4">
      <e-radio-m value="1" size="small">Option 1</e-radio-m>
      <e-radio-m value="2" size="small">Option 2</e-radio-m>
    </e-radio-group-m>
  </div>
  <div class="mb-2 flex items-center text-sm">
    <e-radio-group-m v-model="radio3" disabled class="ml-4">
      <e-radio-m value="1" size="small">Option 1</e-radio-m>
      <e-radio-m value="2" size="small">Option 2</e-radio-m>
    </e-radio-group-m>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from "vue";
  const radio1 = ref("1");
  const radio2 = ref("1");
  const radio3 = ref("1");
</script>
```

## 自定义渲染内容

通过 render 属性自定义渲染内容。

```html
<template>
  <div class="mb-2 flex items-center text-sm">
    <e-radio-group-m v-model="checked2" :options="options" :render="customRender" />
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';

const checked2 = ref([]);
const options = ref([
  {
    value: 1,
    label: '自定义 Option 1',
    gender: 0,
    contentStyle: 'color: blue;',
  },
  {
    value: 2,
    label: '自定义 Option 2',
    gender: 1,
    contentStyle: 'color: red; font-size: 16px;',
  },
]);

type RemoteDataItem = {
  value: string; // value
  label: string; // label
  disable: boolean; // disabled

  icon: string; // 图标
  gender: 0 | 1; // 性别
  contentStyle: string;
};

const customRender = (itemData: RemoteDataItem) => {
  return h(
    'div',
    {
      style: itemData.contentStyle,
    },
    [h('span', itemData.gender == 0 ? '男' : '女'), h('span', ` ${itemData.label}`)]
  );
};
</script>

```

## 禁用状态

`disabled` 属性用于禁用单选框。

只需添加 `disabled` 属性。

```html
<template>
  <e-radio-m v-model="radio" disabled value="disabled">Option A</e-radio-m>
  <e-radio-m v-model="radio" disabled value="selected and disabled">Option B</e-radio-m>
</template>
<script lang="ts" setup>
  import { ref } from "vue";
  const radio = ref("selected and disabled");
</script>
```

## 单选按钮组

适用于从一些互斥的选项中进行选择。

将 `ep-radio-group` 与 `ep-radio` 结合使用以显示单选按钮组。将一个变量绑定到 `ep-radio-group` 元素的 `v-model`，并在 `ep-radio` 中设置 `value` 值。它还提供了 `change` 事件，其参数为当前值。

```html
<template>
  <e-radio-group-m v-model="radio">
    <e-radio-m :value="3">Option A</e-radio-m>
    <e-radio-m :value="6">Option B</e-radio-m>
    <e-radio-m :value="9">Option C</e-radio-m>
  </e-radio-group-m>
</template>
<script lang="ts" setup>
  import { ref } from "vue";

  const radio = ref(3);
</script>
```

## 按钮样式

单选框的按钮样式。

只需将 `ep-radio` 元素更改为 `ep-radio-button` 元素。我们还提供 `size` 属性。

```html
<template>
  <div>
    <e-radio-group-m v-model="radio1" size="large">
      <e-radio-button-m label="New York" value="New York" />
      <e-radio-button-m label="Washington" value="Washington" />
      <e-radio-button-m label="Los Angeles" value="Los Angeles" />
      <e-radio-button-m label="Chicago" value="Chicago" />
    </e-radio-group-m>
  </div>
  <div style="margin-top: 20px">
    <e-radio-group-m v-model="radio2">
      <e-radio-button-m label="New York" value="New York" />
      <e-radio-button-m label="Washington" value="Washington" />
      <e-radio-button-m label="Los Angeles" value="Los Angeles" />
      <e-radio-button-m label="Chicago" value="Chicago" />
    </e-radio-group-m>
  </div>
  <div style="margin-top: 20px">
    <e-radio-group-m v-model="radio3" size="small">
      <e-radio-button-m label="New York" value="New York" />
      <e-radio-button-m label="Washington" value="Washington" />
      <e-radio-button-m label="Los Angeles" value="Los Angeles" />
      <e-radio-button-m label="Chicago" value="Chicago" />
    </e-radio-group-m>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const radio1 = ref("New York");
  const radio2 = ref("New York");
  const radio3 = ref("New York");
</script>
```

## 块级样式

当设置 `block` 属性为 `true` 时，单选按钮组的宽度将充满父容器。该属性仅对 `ep-radio-button` 有效。

在 `ep-radio-group` 上设置 `block` 属性以实现按钮充满父容器的效果，常用于按钮样式的单选组。

```html
<template>
    <div>
        <p class="cell-subtitle">普通按钮组：</p>
        <e-radio-group-m v-model="radio8">
            <e-radio-button-m label="上海" value="Shanghai" />
            <e-radio-button-m label="北京" value="Beijing" />
            <e-radio-button-m label="广州" value="Guangzhou" />
            <e-radio-button-m label="深圳" value="Shenzhen" />
        </e-radio-group-m>
        <p class="cell-subtitle">块级按钮组（宽度充满父容器）：</p>
        <e-radio-group-m v-model="radio8" block>
            <e-radio-button-m label="上海" value="Shanghai" />
            <e-radio-button-m label="北京" value="Beijing" />
            <e-radio-button-m label="广州" value="Guangzhou" />
            <e-radio-button-m label="深圳" value="Shenzhen" />
        </e-radio-group-m>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const radio8 = ref('Shanghai');
</script>

<style lang="scss" scoped>
.cell-subtitle {
    margin-bottom: 5px;
    padding-left: 10px;
    font-size: 14px;
    &:nth-child(n + 2) {
        margin-top: 10px;
    }
}
</style>
```



## 通过数据创建组

如果有一组数据则可以直接通过数据生成
为 `ep-radio-group` 设置 `options` 属性即可，仅当未自定义 `Radio` 时有效。

```html
<template>
  <div>
    <e-button-m @click="add">新增选项</e-button-m>

    <e-form-m :model="formData">
    <e-form-item-m label="选项" props="radio">
        <e-radio-group-m v-model="formData.radio" :options="data" />
    </e-form-item-m>
    <e-form-item-m label="选项" props="radio">
        <e-radio-group-m v-model="formData.radio" :options="data" option-type="button" />
    </e-form-item-m>
    <text class="info">tips: 自己写标签时优先级更高,options 不会生效</text>
    <e-form-item-m label="选项" props="radio">
        <e-radio-group-m v-model="formData.radio" :options="data">
        <e-radio-m value="1">1</e-radio-m>
        <e-radio-m value="2">2</e-radio-m>
        <e-radio-m value="3">3</e-radio-m>
        </e-radio-group-m>
    </e-form-item-m>
    </e-form-m>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  const _data = Array.from({ length: 10 })
    .fill(0)
    .map((_, i) => ({
      label: `选项${i + 1}`,
      value: `${i + 1}`,
      disabled: false,
    }));
  _data[0].disabled = true;
  _data[2].disabled = true;
  _data[4].disabled = true;
  const data = reactive(_data);

  const formData = reactive({
    radio: '1',
    check: ['1', '2', '3'],
  });

  function add() {
    const i = data.length + 1;
    data.push({
      label: `选项${i}`,
      value: `${i}`,
      disabled: false,
    });
    console.log(data);
  }
</script>
<style lang="scss" scoped>
.info{
    font-size: 14px;
    color: #ff0000;
    margin-left: 16px;
}
</style>
```

## 垂直排列

通过设置 `direction` 属性为 `vertical` 可以实现垂直排列的单选框组。

在 `ep-radio-group` 上设置 `direction="vertical"` 属性即可使单选框垂直排列。

```html
<template>
   <div>
        <p class="cell-subtitle">水平排列（默认）：</p>
        <e-radio-group-m v-model="radio9">
            <e-radio-m :value="1">选项 A</e-radio-m>
            <e-radio-m :value="2">选项 B</e-radio-m>
            <e-radio-m :value="3">选项 C</e-radio-m>
        </e-radio-group-m>

        <p class="cell-subtitle">垂直排列：</p>
        <e-radio-group-m v-model="radio9" direction="vertical">
            <e-radio-m :value="1">选项 A</e-radio-m>
            <e-radio-m :value="2">选项 B</e-radio-m>
            <e-radio-m :value="3">选项 C</e-radio-m>
        </e-radio-group-m>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const radio9 = ref('1');
</script>

<style lang="scss" scoped>
.cell-subtitle {
    margin-bottom: 5px;
    padding-left: 10px;
    font-size: 14px;
    &:nth-child(n + 2) {
        margin-top: 10px;
    }
}
</style>
```



## 带边框

使用 `border` 属性可以为单选框添加边框。

```html
<template>
  <div>
    <e-radio-group-m v-model="radio1">
      <e-radio-m value="1" size="large" border>Option A</e-radio-m>
      <e-radio-m value="2" size="large" border>Option B</e-radio-m>
    </e-radio-group-m>
  </div>
  <div style="margin-top: 20px">
    <e-radio-group-m v-model="radio2">
      <e-radio-m value="1" border>Option A</e-radio-m>
      <e-radio-m value="2" border>Option B</e-radio-m>
    </e-radio-group-m>
  </div>
  <div style="margin-top: 20px">
    <e-radio-group-m v-model="radio3" size="small">
      <e-radio-m value="1" border>Option A</e-radio-m>
      <e-radio-m value="2" border disabled>Option B</e-radio-m>
    </e-radio-group-m>
  </div>
  <div style="margin-top: 20px">
    <e-radio-group-m v-model="radio4" size="small" disabled>
      <e-radio-m value="1" border>Option A</e-radio-m>
      <e-radio-m value="2" border>Option B</e-radio-m>
    </e-radio-group-m>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const radio1 = ref("1");
  const radio2 = ref("1");
  const radio3 = ref("1");
  const radio4 = ref("1");
</script>
```

## Radio API

### Radio Attributes

| Name                  | Description              | Type                                           | Default |
| --------------------- | ------------------------ | ---------------------------------------------- | ------- |
| model-value / v-model | 绑定的值                 | `string / number / boolean`                    | —       |
| value                 | 单选框的值               | `string / number / boolean`                    | —       |
| label                 | 单选框的文本               | `string`                                       | —       |
| disabled              | 单选框是否禁用           | `boolean`                                      | `false` |
| border                | 是否在单选框周围添加边框 | `boolean`                                      | `false` |
| size                  | 单选框的尺寸             | `string` --- `'large' \| 'default' \| 'small'` | —       |
| name                  | 原生 `name` 属性         | `string`                                       | —       |

### Radio Events

| 属性名 | 说明                 | 类型       | 默认值                                         |
| ------ | -------------------- | ---------- | ---------------------------------------------- |
| change | 绑定值发生变化时触发 | `Function` | `(value: string \| number \| boolean) => void` |

### Radio Slots

| 属性名    | 说明    |
| ------- | -------------- |
| default | 自定义默认内容 |

## RadioGroup API

### RadioGroup Attributes

| 属性名                | 说明                                                         | 类型                                                         | 默认值         |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------- |
| model-value / v-model | 绑定的值                                                     | `string / number / boolean`                                  | —              |
| size                  | 单选按钮或带边框的单选框的尺寸                               | `string`                                                     | `'default'`    |
| disabled              | 是否禁用嵌套的单选框                                         | `boolean`                                                    | `false`        |
| text-color            | 按钮激活时的字体颜色                                         | `string`                                                     | `'#ffffff'`    |
| fill                  | 按钮激活时的边框和背景颜色                                   | `string`                                                     | `'#409EFF'`    |
| validate-event        | 是否触发表单验证                                             | `boolean`                                                    | `true`         |
| label                 | 与 RadioGroup 中的 `aria-label` 相同                         | `string`                                                     | —              |
| name                  | 原生 `name` 属性                                             | `string`                                                     | —              |
| id                    | 原生 `id` 属性                                               | `string`                                                     | —              |
| options               | 用来生成选项的数组                                           | `Array` --- `string[] \| number[] \| Array<{ label: string value: string disabled?: boolean }>` | —              |
| render                | 自定义渲染内容，优先级大于 `slot`                            | `Function` --- `() => VNode`                                 | —              |
| option-type           | 用于设置 Radio options 类型，仅在使用 options 配置生成时有效 | `string` ---` 'default' \| 'button'`                         | `'default'`    |
| direction             | 设置 Radio 的排列方向                                        | `enum` `'horizontal' 丨 'vertical'`                          | `'horizontal'` |
| block                 | 当设置为 true 时，宽度将充满父容器                           | `boolean`                                                    | `false`        |



### RadioGroup Events

| 属性名 | 说明                 | 类型     | 默认值                                         |
| ------ | -------------------- | -------- | ---------------------------------------------- |
| change | 绑定值发生变化时触发 | `Function` | `(value: string \| number \| boolean) => void` |

### RadioGroup Slots

| 属性名  | 说明           | 子标签                |
| ------- | -------------- | --------------------- |
| default | 自定义默认内容 | `Radio / RadioButton` |

## RadioButton API

### RadioButton Attributes

| 属性名   | 说明             | 类型                      | 默认值 |
| -------- | ---------------- | ------------------------- | ------ |
| value    | 单选框的值       | `string / number / boolean` | —      |
| label    | 单选框的文本     | `string`                    | —      |
| disabled | 单选框是否禁用   | `boolean`                   | `false` |
| name     | 原生`'name'`属性 | `string`                    | —      |

### RadioButton Slots

| 属性名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-radio-m"
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