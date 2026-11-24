# Checkbox 多选框

一组用于多选的选项。

## 基本用法

复选框可以单独使用，用于在两个状态之间切换。

在 `ep-checkbox` 中定义 `v-model`（绑定变量）。单个 `checkbox` 的默认值是 `Boolean`，选中时为 `true`。`ep-checkbox` 标签内的内容将成为复选框按钮后面的描述。

```html
<template>
  <div>
    <e-checkbox-m v-model="checked1" label="选项 1" size="large" />
    <e-checkbox-m v-model="checked2" label="选项 2" size="large" />
  </div>
  <div>
    <e-checkbox-m v-model="checked3" label="选项 1" />
    <e-checkbox-m v-model="checked4" label="选项 2" />
  </div>
  <div>
    <e-checkbox-m v-model="checked5" label="选项 1" size="small" />
    <e-checkbox-m v-model="checked6" label="选项 2" size="small" />
  </div>
  <div>
    <e-checkbox-m v-model="checked5" label="选项 1" size="small" disabled />
    <e-checkbox-m v-model="checked6" label="选项 2" size="small" disabled />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const checked1 = ref(true);
  const checked2 = ref(false);
  const checked3 = ref(false);
  const checked4 = ref(false);
  const checked5 = ref(false);
  const checked6 = ref(false);
</script>
```

## 自定义内容

通过 `render` 属性自定义内容。

```html
<template>
  <div class="flex justify-spacep-between mb-4 flex-wrap gap-4">
      <div class="mb-2 flex items-center text-sm">
        <e-checkbox-group-m v-model="checked7" :options="options" :render="customRender" />
      </div>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import { Female, Male } from '@epoint-fe/eui-icons';
import { EIcon } from '@eui-components/components/icon';

const checked1 = ref([]);
const options = ref([
  {
    value: 1,
    label: '自定义 Option 1',
    gender: 0,
    contentStyle: 'color: blue;display:flex;',
    icon: '<e-icon><male /></e-icon>',
  },
  {
    value: 2,
    label: '自定义 Option 2',
    gender: 1,
    contentStyle: 'color: red; display:flex;',
    icon: '<e-icon><female /></e-icon>',
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
    [
      h(EIcon, {}, [itemData.gender === 0 ? h(Male) : h(Female)]),
      h('span', itemData.gender == 0 ? '男' : '女'),
      h('span', ` ${itemData.label}`),
    ]
  );
};
</script>
```

## 禁用状态

复选框的禁用状态。

设置 `disabled` 属性。

```html
<template>
  <e-checkbox-m v-model="checked1" disabled>Disabled</e-checkbox-m>
  <e-checkbox-m v-model="checked2">Not disabled</e-checkbox-m>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const checked1 = ref(false);
  const checked2 = ref(true);
</script>
```

## 复选框组

用于多个复选框绑定在一组中，并通过检查是否选中来指示是否选中一个选项。

通过使用绑定为 `Array` 的 `v-model`，`checkbox-group` 元素可以在一组中管理多个复选框。在 `ep-checkbox` 元素内，`value` 是复选框的值。如果该标签中没有嵌套的内容，`label` 将呈现为按钮后面的描述。`value` 也与数组中的元素值相对应。如果指定的值存在于数组中，则该复选框将被选中，反之亦然。

```html
<template>
  <e-checkbox-group-m v-model="checkList">
    <e-checkbox-m value="A" label="选项 A" />
    <e-checkbox-m value="B" label="选项 B" />
    <e-checkbox-m value="C" label="选项 C" />
    <e-checkbox-m value="D" label="禁用的" disabled />
    <e-checkbox-m value="E" label="禁用的 已被勾选" disabled />
  </e-checkbox-group-m>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const checkList = ref(["E", "A"]);
</script>
```

## 垂直排布

复选框组可以垂直排布。

设置 `direction="vertical"` 属性可以使复选框垂直排布。

```html
<template>
   <div>
        <p class="cell-subtitle">水平排布（默认）：</p>
        <e-checkbox-group-m v-model="checkList2">
            <e-checkbox-m value="A" label="选项 A" />
            <e-checkbox-m value="B" label="选项 B" />
            <e-checkbox-m value="C" label="选项 C" />
            <e-checkbox-m value="D" label="禁用的" disabled />
            <e-checkbox-m value="E" label="禁用的 已被勾选" disabled />
        </e-checkbox-group-m>

        <p class="cell-subtitle">垂直排布：</p>
        <e-checkbox-group-m v-model="checkList3" direction="vertical">
            <e-checkbox-m value="A" label="选项 A" />
            <e-checkbox-m value="B" label="选项 B" />
            <e-checkbox-m value="C" label="选项 C" />
            <e-checkbox-m value="D" label="禁用的" disabled />
            <e-checkbox-m value="E" label="禁用的 已被勾选" disabled />
        </e-checkbox-group-m>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const checkList2 = ref(['E', 'A']);
const checkList3 = ref(['E', 'A']);
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



## 不定状态

`indeterminate` 属性可以帮助您实现“全选”效果。

```html
<template>
  <e-checkbox-m
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
    >Check all</e-checkbox-m
  >
  <e-checkbox-group-m v-model="checkedCities" @change="handleCheckedCitiesChange">
    <e-checkbox-m v-for="city in cities" :key="city" :value="city" :label="city">{{ city }}</e-checkbox-m>
  </e-checkbox-group-m>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const checkAll = ref(false);
  const isIndeterminate = ref(true);
  const checkedCities = ref(["Shanghai", "Beijing"]);
  const cities = ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"];

  const handleCheckAllChange = (val: boolean) => {
    checkedCities.value = val ? cities : [];
    isIndeterminate.value = false;
  };
  const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length;
    checkAll.value = checkedCount === cities.length;
    isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
  };
</script>
```

## 最小/最大项已选

`min` 和 `max` 属性可以帮助您限制已选项的数量。

```html
<template>
  <e-checkbox-group-m v-model="checkedCities" :min="1" :max="2">
    <e-checkbox-m v-for="city in cities" :key="city" :label="city" :value="city"
      >{{ city }}</e-checkbox-m
    >
  </e-checkbox-group-m>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const checkedCities = ref(["Shanghai", "Beijing"]);
  const cities = ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"];
</script>
```

## 按钮样式

带有按钮样式的复选框。

您只需将 `ep-checkbox` 元素更改为 `ep-checkbox-button` 元素。我们还提供 `size` 属性。

```html
<template>
  <div>
    <e-checkbox-group-m v-model="checkboxGroup1" size="large">
      <e-checkbox-button-m
        v-for="city in cities"
        :key="city"
        :value="city"
        :label="city"
      >
        {{ city }}
      </e-checkbox-button-m>
    </e-checkbox-group-m>
  </div>
  <div class="demo-button-style">
    <e-checkbox-group-m v-model="checkboxGroup2">
      <e-checkbox-button-m
        v-for="city in cities"
        :key="city"
        :value="city"
        :label="city"
        >{{ city }}</e-checkbox-button-m
      >
    </e-checkbox-group-m>
  </div>
  <div class="demo-button-style">
    <e-checkbox-group-m v-model="checkboxGroup3" size="small">
      <e-checkbox-button-m
        v-for="city in cities"
        :key="city"
        :value="city"
        :label="city"
        :disabled="city === 'Beijing'"
        >{{ city }}</e-checkbox-button-m
      >
    </e-checkbox-group-m>
  </div>
  <div class="demo-button-style">
    <e-checkbox-group-m v-model="checkboxGroup4" size="small" disabled>
      <e-checkbox-button-m
        v-for="city in cities"
        :key="city"
        :value="city"
        :label="city"
        >{{ city }}</e-checkbox-button-m
      >
    </e-checkbox-group-m>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const checkboxGroup1 = ref(["Shanghai"]);
  const checkboxGroup2 = ref(["Shanghai"]);
  const checkboxGroup3 = ref(["Shanghai"]);
  const checkboxGroup4 = ref(["Shanghai"]);
  const cities = ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"];
</script>

<style scoped>
  .demo-button-style {
    margin-top: 24px;
  }
</style>
```

## 块级显示

设置 `block` 属性可以让复选框组充满父容器的宽度。该属性仅对 `ep-checkbox-button` 有效。

```html
<template>
    <div>
        <e-checkbox-group-m v-model="checkboxGroup1" size="large" block>
            <e-checkbox-button-m v-for="city in cities" :key="city" :value="city" :label="city">
                {{ city }}
            </e-checkbox-button-m>
        </e-checkbox-group-m>
    </div>
    <div class="demo-button-style">
        <e-checkbox-group-m v-model="checkboxGroup2" block>
            <e-checkbox-button-m v-for="city in cities" :key="city" :value="city" :label="city">
                {{ city }}
            </e-checkbox-button-m>
        </e-checkbox-group-m>
    </div>
    <div class="demo-button-style">
        <e-checkbox-group-m v-model="checkboxGroup3" size="small" block>
            <e-checkbox-button-m
                v-for="city in cities"
                :key="city"
                :value="city"
                :label="city"
                :disabled="city === 'Beijing'"
            >
                {{ city }}
            </e-checkbox-button-m>
        </e-checkbox-group-m>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const checkboxGroup1 = ref(['Shanghai']);
const checkboxGroup2 = ref(['Shanghai']);
const checkboxGroup3 = ref(['Shanghai']);
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];
</script>
<style scoped>
.demo-button-style {
	margin-top: 24px;
}
</style>
```



## 通过数据创建组

如果有一组数据则可以直接通过数据生成

为 `e-checkbox-group` 设置 `options` 属性即可，仅当未自定义 `Checkbox` 时有效。

```html
<template>
  <div class="box">
    <e-button-m @click="add">新增选项</e-button-m>

    <e-form-m :model="formData">
    <e-form-item-m label="选项" props="check">
        <e-checkbox-group-m v-model="formData.check" :options="data" />
    </e-form-item-m>
    <e-form-item-m label="选项按钮" props="check">
        <e-checkbox-group-m v-model="formData.check" :options="data" option-type="button" />
    </e-form-item-m>
    <text class="info">tips: 自己写标签时优先级更高,options 不会生效</text>
    <e-form-item-m label="选项" props="check">
        <e-checkbox-group-m v-model="formData.check" :options="data">
        <e-checkbox-m value="1">1</e-checkbox-m>
        <e-checkbox-m value="2">2</e-checkbox-m>
        <e-checkbox-m value="3">3</e-checkbox-m>
        </e-checkbox-group-m>
    </e-form-item-m>
    </e-form-m>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
const _data = Array.from({ length: 5 })
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

## 带边框

`border` 属性可以为复选框添加边框。

```html
<template>
  <div>
    <e-checkbox-m v-model="checked1" label="Option1" size="large" border />
    <e-checkbox-m v-model="checked2" label="Option2" size="large" border />
  </div>
  <div class="mt-4">
    <e-checkbox-m v-model="checked3" label="Option1" border />
    <e-checkbox-m v-model="checked4" label="Option2" border />
  </div>
  <div class="mt-4">
    <e-checkbox-group-m v-model="checkboxGroup1" size="small">
      <e-checkbox-m label="选项1" value="Option1" border />
      <e-checkbox-m label="选项2" value="Option2" border />
    </e-checkbox-group-m>
  </div>
  <div class="mt-4">
    <e-checkbox-group-m v-model="checkboxGroup1" size="small">
      <e-checkbox-m label="选项1" value="Option1" border disabled />
      <e-checkbox-m label="选项2" value="Option2" border disabled />
    </e-checkbox-group-m>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const checked1 = ref(true);
  const checked2 = ref(false);
  const checked3 = ref(false);
  const checked4 = ref(true);
  const checkboxGroup1 = ref(["Option1"]);
</script>
```

## 跳出组

在 `checkbox-group` 内部的 `checkbox` 会自动组合成一组，但有时我们需要某个 `checkbox` 不参与组合。通过设置 `skip-group` 属性可以让 `checkbox` 跳出组合，作为独立的 `checkbox` 使用。

在组内的 `checkbox` 设置 `skip-group` 属性为 `true` 后，该 `checkbox` 将不再受组的控制，需要单独设置 `v-model` 进行数据绑定。

```html
<template>
  <e-checkbox-group-m v-model="checkList1">
      <e-checkbox-m value="A" label="选项 A" />
      <e-checkbox-m value="B" label="选项 B" />
      <e-checkbox-m value="C" label="选项 C" />
      <e-checkbox-m v-model="independentValue" value="D" label="跳出组" :skip-group="true" />
  </e-checkbox-group-m>

  <e-button-m @click="onSubmit">提交</e-button-m>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkList = ref([]);

const independentValue = ref(false);

const onSubmit = () => {
  console.log(checkList.value, independentValue.value);
};
</script>
```

## Checkbox API

### Checkbox Attributes

| 名称                  | 描述                                                         | 类型                                            | 默认值  |
| --------------------- | ------------------------------------------------------------ | ----------------------------------------------- | ------- |
| model-value / v-model | 绑定值                                                       | `string / number / boolean / object`            | —       |
| label                 | checkbox 后的文本                                            | `string`                                        | —       |
| value                 | 在 `checkbox-group` 内使用时的复选框的值                     | `string / number / boolean / object`            | —       |
| true-value            | 复选框选中时的值                                             | `string / number`                               | —       |
| false-value           | 复选框未选中时的值                                           | `string / number`                               | —       |
| disabled              | 复选框是否被禁用                                             | `boolean`                                       | `false` |
| skip-group            | 在 checkbox-group 内部时，是否跳出组合，作为独立的 checkbox 使用 | `boolean`                                       | `false` |
| border                | 是否在复选框周围添加边框                                     | `boolean`                                       | `false` |
| size                  | 复选框的大小                                                 | `string` ---- `'large' \| 'default' \| 'small'` | —       |
| name                  | 原生 'name' 属性                                             | `string`                                        | —       |
| checked               | 复选框是否被选中                                             | `boolean`                                       | `false` |
| indeterminate         | 设置不定状态，仅负责样式控制                                 | `boolean`                                       | `false` |
| validate-event        | 是否触发表单验证                                             | `boolean`                                       | `true`  |
| tabindex              | 输入的 tabindex                                              | `string / number`                               | —       |
| id                    | 输入的 id                                                    | `string`                                        | —       |
| render                | 自定义渲染内容，优先级高于 `slot   `                         | `Function` ---  `() => VNode`                   | —       |
| controls              | 与 [aria-controls](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls) 相同，在 `indeterminate` 为 `true` 时生效 | `boolean`                                       | —       |

### Checkbox Events

| 名称   | 描述             | 类型       | 默认值                                         |
| ------ | ---------------- | ---------- | ---------------------------------------------- |
| change | 绑定值更改时触发 | `Function` | `(value: string \| number \| boolean) => void` |

### Checkbox Slots

| 名称    | 描述           |
| ------- | -------------- |
| default | 自定义默认内容 |

## CheckboxGroup API

### CheckboxGroup Attributes

| 名称                  | 描述                                                         | 类型                                                         | 默认值         |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------- |
| model-value / v-model | 绑定值                                                       | `string[] \| number[]`                                       | `[]`           |
| size                  | 复选框的大小                                                 | `string` ---- `'large' \| 'default' \| 'small'`              | —              |
| disabled              | 是否禁用嵌套的复选框                                         | `boolean`                                                    | `false`        |
| min                   | 最小已选复选框数量                                           | `number`                                                     | —              |
| max                   | 最大已选复选框数量                                           | `number`                                                     | —              |
| label                 | 屏幕阅读器的标签                                             | `string`                                                     | —              |
| text-color            | 按钮处于活动状态时的字体颜色                                 | `string`                                                     | `'#ffffff'`    |
| fill                  | 按钮处于活动状态时的边框和背景颜色                           | `string`                                                     | `'#409EFF'`    |
| tag                   | 复选框组的元素标签                                           | `string`                                                     | `'div'`        |
| validate-event        | 是否触发表单验证                                             | `boolean`                                                    | `true`         |
| options               | 用来生成选项的数组                                           | `string[] \| number[] \| Array<{ label: string value: string disabled?: boolean }>` | —              |
| option-type           | 用于设置 Checkbox options 类型，仅在使用 options 配置生成时有效 | `string` ---` 'default'丨'button'`                           | `'default'`    |
| direction             | 复选框组的排列方向                                           | `enum` `'horizontal'｜'vertical'`                            | `'horizontal'` |
| block                 | 是否将复选框组渲染为块级元素，使其宽度充满父容器             | `boolean`                                                    | `false`        |

### CheckboxGroup Events

| 名称   | 描述             | 类型                                               |默认值|
| ------ | ---------------- | -------------------------------------------------- |-|
| change | 绑定值更改时触发 | `Function` | `(value: string[] \| number[]) => void` |

### CheckboxGroup Slots

| 名称    | 描述           | 子标签              |
| ------- | -------------- | ------------------- |
| default | 自定义默认内容 | 复选框 / 复选框按钮 |

## CheckboxButton API

### CheckboxButton Attributes

| 名称        | 描述                                     | 类型                                 | 默认值  |
| ----------- | ---------------------------------------- | ------------------------------------ | ------- |
| value       | 在 `checkbox-group` 内使用时的复选框的值 | `string / number / boolean / object` | —       |
| label       | 显示的文本                               | `string`                             | —       |
| true-value  | 复选框选中时的值                         | `string / number`                    | —       |
| false-value | 复选框未选中时的值                       | `string / number`                    | —       |
| disabled    | 复选框是否被禁用                         | `boolean`                            | `false` |
| name        | 原生 'name' 属性                         | `string`                             | —       |
| checked     | 复选框是否被选中                         | `boolean`                            | `false` |

### CheckboxButton Slots

| 名称    | 描述           |
| ------- | -------------- |
| default | 自定义默认内容 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-checkbox-m"
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