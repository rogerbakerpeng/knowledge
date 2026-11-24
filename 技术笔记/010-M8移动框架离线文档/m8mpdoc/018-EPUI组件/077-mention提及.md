# Mention 提及

用于在输入中提及某人或某事。

## 基础用法

最简单的用法。

```html
<template>
  <div>
    <p>
      整个文本框的值： <span>{{ value }}</span>
    </p>
    <e-mention-m v-model="value" :options="options" style="width: 320px" placeholder="Please input" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const value = ref('@');

const options = ref([
  {
    label: '张三',
    value: '张三'
  },
  {
    label: '李四',
    value: '张三'
  },
  {
    label: '王五',
    value: '张三'
  },
  {
    label: 'btea',
    value: 'btea'
  }
]);
</script>
```

## Textarea

输入类型可以设置为 `textarea` 。

```html
<template>
  <e-mention-m v-model="value" type="textarea" :options="options" style="width: 320px" placeholder="Please input" />
</template>

<script setup>
import { ref } from 'vue';
const value = ref('');

const options = ref([
  {
    label: 'Fuphoenixes',
    value: 'Fuphoenixes'
  },
  {
    label: 'kooriookami',
    value: 'kooriookami'
  },
  {
    label: 'Jeremy',
    value: 'Jeremy'
  },
  {
    label: 'btea',
    value: 'btea'
  }
]);
</script>
```

## 自定义标签

使用 "label" 自定义标签。

```html
<template>
  <e-mention-m v-model="value" :options="options" style="width: 320px" placeholder="Please input">
    <template #label="{ item }">
      <div style="display: flex; align-items: center">
        <e-avatar-m :size="24" :src="item.avatar" />
        <span style="margin-left: 6px">{{ item.value }}</span>
      </div>
    </template>
  </e-mention-m>
</template>

<script setup>
import { ref } from 'vue';
const value = ref('');

const options = ref([
  {
    value: 'Fuphoenixes',
    avatar: 'https://avatars.githubusercontent.com/u/27912232',
  },
  {
    value: 'kooriookami',
    avatar: 'https://avatars.githubusercontent.com/u/38392315',
  },
  {
    value: 'Jeremy',
    avatar: 'https://avatars.githubusercontent.com/u/15975785',
  },
  {
    value: 'btea',
    avatar: 'https://avatars.githubusercontent.com/u/24516654',
  }
]);
</script>
```

## 加载远程选项

异步加载选项。

```html
<template>
  <e-mention-m
    v-model="value"
    :options="options"
    :loading="loading"
    style="width: 320px"
    placeholder="Please input"
    @search="handleSearch"
  />
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue';

const value = ref('');
const loading = ref(false);
const options = ref([]);

let timer;
const handleSearch = (pattern) => {
  if (timer) clearTimeout(timer);

  loading.value = true;
  timer = setTimeout(() => {
    options.value = ['Fuphoenixes', 'kooriookami', 'Jeremy', 'btea'].map((item) => ({
      label: pattern + item,
      value: pattern + item
    }));
    loading.value = false;
  }, 1500);
};

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>
```

## 自定义触发字段

通过 `prefix` 属性 自定义触发字段。 默认为 `@`, `Array<string>` 。

```html
<template>
  <e-mention-m
    v-model="value"
    :options="options"
    :prefix="['@', '#']"
    style="width: 320px"
    placeholder="input @ to mention people, # to mention tag"
    @search="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue';

const MOCK_DATA = {
  '@': ['Fuphoenixes', 'kooriookami', 'Jeremy', 'btea'],
  '#': ['1.0', '2.0', '3.0']
};
const value = ref('');
const options = ref([]);

const handleSearch = (_, prefix) => {
  options.value = (MOCK_DATA[prefix] || []).map((value) => ({
    value
  }));
};
</script>
```

## 整体删除

将 `whole` 属性设置为 `true`，当您按下退格键时，此处的 mention 区域将作为一个整体被删除。 设置 "check-is-whole" 属性来自定义检查逻辑。

```html
<template>
  <e-mention-m v-model="value1" whole :options="options1" style="width: 320px" placeholder="Please input" />
  <e-divider-m />
  <e-mention-m
    v-model="value2"
    :options="options2"
    :prefix="['@', '#']"
    whole
    :check-is-whole="checkIsWhole"
    style="width: 320px"
    placeholder="input @ to mention people, # to mention tag"
    @search="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue';

const MOCK_DATA = {
  '@': ['Fuphoenixes', 'kooriookami', 'Jeremy', 'btea'],
  '#': ['1.0', '2.0', '3.0']
};
const value1 = ref('');
const value2 = ref('');
const options1 = ref(MOCK_DATA['@'].map((value) => ({ value })));
const options2 = ref([]);

const handleSearch = (_, prefix) => {
  options2.value = (MOCK_DATA[prefix] || []).map((value) => ({
    value
  }));
};

const checkIsWhole = (pattern, prefix) => {
  return (MOCK_DATA[prefix] || []).includes(pattern);
};
</script>
```

## 在表单里使用

与 `ep-form` 一起使用

```html
<template>
  <e-form-m ref="ruleFormRef" style="max-width: 600px" label-width="120px" :model="ruleForm" :rules="rules">
    <e-form-item-m label="name" prop="name">
      <e-mention-m v-model="ruleForm.name" :options="options" />
    </e-form-item-m>
    <e-form-item-m label="desc" prop="desc">
      <e-mention-m v-model="ruleForm.desc" type="textarea" :options="options" placement="top"/>
    </e-form-item-m>
    <e-form-item-m>
      <e-button-m type="primary" @click="submitForm(ruleFormRef)"> Submit </e-button-m>
      <e-button-m @click="resetForm(ruleFormRef)">Reset</e-button-m>
    </e-form-item-m>
  </e-form-m>
</template>

<script setup>
import { reactive, ref } from 'vue';

const ruleFormRef = ref();
const ruleForm = reactive({
  name: '',
  desc: ''
});

const options = ref([
  {
    label: 'Fuphoenixes',
    value: 'Fuphoenixes'
  },
  {
    label: 'kooriookami',
    value: 'kooriookami'
  },
  {
    label: 'Jeremy',
    value: 'Jeremy'
  },
  {
    label: 'btea',
    value: 'btea'
  }
]);

const rules = reactive({
  name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
  desc: [{ required: true, message: 'Please input desc', trigger: 'blur' }]
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
```

## API

### Attributes

| 属性名                | 描述                                                                                                             | 类型                                                                | 默认值   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------- |
| options           | 提及选项列表                                                                                                       | `array-MentionOption:[]` | `[]` |
| prefix | 触发字段的前缀。 字符串长度必须且只能为 1                                                                                    | `string` / `array`                                            | `@`    |
| split        | 用于拆分提及的字符。 字符串长度必须且只能为 1                                                                             | `string`                                                 | `" "` |
| filter-option | 定制筛选器选项逻辑                                                                  | `false`/`Function- (pattern: string, option: MentionOption)=>boolean` | —        |
| placement | 设置弹出位置                              | `bottom`/`top`                                                     | `bottom` |
| show-arrow | 下拉菜单的内容是否有箭头                                                                                       | `boolean`                                                    | `false` |
| offset       | 下拉面板偏移量                                                    | `number`                                                     | `0` |
| whole        | 当退格键被按下做删除操作时，是否将提及部分作为整体删除                                  | `boolean`          | `false` |
| check-is-whole  | 当退格键被按下做删除操作时，检查是否将提及部分作为整体删除                      | `Function` -`(pattern: string, prefix: string) => boolean` | `false` |
| loading  | 提及的下拉面板是否处于加载状态                                                                              | `boolean`                                                           | `false` |
| model-value / v-model | 输入值                                                                                                      | `string`                                                      | — |
| popper-class      | 自定义浮层类名                                                              | `string`                                   | —     |
| ep-input props | 支持ep-input 的props属性                                                                     | —                                            | —        |

### Events

| 属性名          | 描述                   | 类型                                                         |
| --------------- | ---------------------- | ------------------------------------------------------------ |
| search          | 按下触发字段时触发     | `Function` -`(pattern: string, prefix: string) => void`      |
| select          | 当用户选择选项时触发   | `Function` -`(option: MentionOption, prefix: string) => void` |
| ep-input events | 支持ep-input的所有事件 | —                                                            |

### Slots

| Name        | Description             | Types                                           |
| ----------- | ----------------------- | ----------------------------------------------- |
| label       | 自定义标签内容          | `object-{ item: MentionOption, index: number }` |
| loading     | 自定义 loading内容      | —                                               |
| header      | 下拉列表顶部的内容      | —                                               |
| footer      | 下拉列表底部的内容      | —                                               |
| input slots | 支持ep-input 的所有插槽 | —                                               |

### Exposes

| Name            | Description       | Type                        |
| --------------- | ----------------- | --------------------------- |
| input           | ep-input 组件实例 | Ref<InputInstance \| null>  |
| tooltip         | 弹出层元素实例    | Ref<HTMLDivElement \| null> |
| dropdownVisible | 是否显示弹出层    | `boolean`                   |

### Type Declarations

```html
type MentionOption = {
  value: string;
  label?: string;
  disabled?: boolean;
  [key: string]: any;
};
```

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-mention-m"
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