# Select 选择器

## 基础用法

可以使用组件插槽或通过 `options` 属性指定数据源，`v-model` 是当前选定的 `ep-option` 的值。

```html
<template>
  <p>组件插槽</p>
  <e-select-m v-model="value" placeholder="Select">
    <e-option-m
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></e-option-m>
  </e-select-m>

  <p>options数据绑定</p>
  <e-select-m
    v-model="value"
    placeholder="Select"
    :options="options"
  ></e-select-m>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";

  const value = ref('');
  const options = [
    {
      value: "Beijing",
      label: "Beijing",
    },
    {
      value: "Shanghai",
      label: "Shanghai",
    },
    {
      value: "Nanjing",
      label: "Nanjing",
    },
    {
      value: "Chengdu",
      label: "Chengdu",
    },
    {
      value: "Shenzhen",
      label: "Shenzhen",
    },
    {
      value: "Guangzhou",
      label: "Guangzhou",
    },
  ];
</script>
```

## 绑定文本

可以通过 `text` 属性来指定初始值的文本，该属性对于懒加载的场景比较有用。

```html
<template>
  <p>绑定文本-单选</p>
  <e-select-m
    v-model="value1"
    v-model:text="text1"
    :options="options1"
    :loading="loading1"
    @visible-change="onVisibleChange1"
  ></e-select-m>

  <p>绑定文本-多选</p>
  <e-select-m
    v-model="value2"
    v-model:text="text2"
    :options="options2"
    :loading="loading2"
    multiple
    @visible-change="onVisibleChange2"
    placeholder="请选择"
  />
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";

  const source = [
    {
      value: "1",
      label: "Option1",
    },
    {
      value: "2",
      label: "Option2",
    },
    {
      value: "3",
      label: "Option3",
    },
    {
      value: "4",
      label: "Option4",
    },
    {
      value: "5",
      label: "Option5",
    },
  ];

  const value1 = ref("1");
  const text1 = ref("Option1");
  const options1 = ref([]);
  const loading1 = ref(false);
  const onVisibleChange1 = (visible: boolean) => {
    console.log("visible change", visible);
    if (visible && options1.value.length === 0) {
      loading1.value = true;

      // 模拟懒加载
      setTimeout(() => {
        options1.value = source;
        loading1.value = false;
      }, 500);
    }
  };

  const value2 = ref(["2"]);
  const text2 = ref(["Option2"]);
  const options2 = ref([]);
  const loading2 = ref(false);
  const onVisibleChange2 = (visible: boolean) => {
    if (visible && options2.value.length === 0) {
      loading2.value = true;
      // 模拟懒加载
      setTimeout(() => {
        options2.value = source;
        loading2.value = false;
      }, 500);
    }
  };
</script>
```

## 禁用选项

在 `ep-option` 中设置 `disabled` 的值为 `true` 或在 `options` 属性上指定带有 `disabled` 值为 `true` 的数据，可以禁用该选项。

```html
<template>
  <p>禁用选项</p>
  <e-select-m v-model="valueDisabled" class="m-2" placeholder="请选择">
    <e-option-m
      v-for="item in optionsDisabled"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </e-select-m>
  <e-select-m v-model="valueDisabled" :options="optionsDisabled" placeholder="请选择" />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const valueDisabled = ref('');
  const optionsDisabled = [
    {
      value: "Beijing",
      label: "Beijing",
    },
    {
      value: "Shanghai",
      label: "Shanghai",
      disabled: true,
    },
    {
      value: "Nanjing",
      label: "Nanjing",
    },
    {
      value: "Chengdu",
      label: "Chengdu",
    },
    {
      value: "Shenzhen",
      label: "Shenzhen",
    },
    {
      value: "Guangzhou",
      label: "Guangzhou",
    },
  ];
</script>
```

## 禁用选择框

禁用整个组件。

设置 `ep-select` 的 `disabled` 属性以使其禁用。

```html
<template>
  <p>禁用选择框</p>
  <e-select-m v-model="valueDisabled2" disabled placeholder="请选择">
    <e-option-m
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </e-select-m>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const valueDisabled2 = ref('');
  const options = [
    {
      value: "Beijing",
      label: "Beijing",
    },
    {
      value: "Shanghai",
      label: "Shanghai",
    },
    {
      value: "Nanjing",
      label: "Nanjing",
    },
    {
      value: "Chengdu",
      label: "Chengdu",
    },
    {
      value: "Shenzhen",
      label: "Shenzhen",
    },
    {
      value: "Guangzhou",
      label: "Guangzhou",
    },
  ];
</script>
```

## 单选可清空

您可以使用清空图标来清除选择。

选择器默认可清空，当有选项被选中时，将显示一个清除图标。请注意，清除功能仅适用于单选。

```html
<template>
  <p>单选可清空</p>
  <e-select-m
    v-model="valueClear"
    placeholder="Select"
    :options="options"
    clearable
  ></e-select-m>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const valueClear = ref('');
  const options = [
    {
      value: "Beijing",
      label: "Beijing",
    },
    {
      value: "Shanghai",
      label: "Shanghai",
    },
    {
      value: "Nanjing",
      label: "Nanjing",
    },
    {
      value: "Chengdu",
      label: "Chengdu",
    },
    {
      value: "Shenzhen",
      label: "Shenzhen",
    },
    {
      value: "Guangzhou",
      label: "Guangzhou",
    },
  ];
</script>
```

## 基本多选

多选使用标签显示已选选项。

为 `ep-select` 设置 `multiple` 属性以启用多选模式。在这种情况下，`v-model` 的值将是一个已选选项的数组。默认情况下，已选选项将显示为标签。您可以使用 `collapse-tags` 属性将它们折叠成文本。

```html
<template>
  <p>default</p>
  <e-select-m
    v-model="valueMultiple"
    class="m-2"
    :options="options"
    multiple
    placeholder="请选择"
    style="width: 100%"
  />

  <p>use collapse-tags</p>
  <e-select-m
    v-model="valueMultiple2"
    class="m-2"
    :options="options"
    multiple
    collapse-tags
    placeholder="请选择"
    style="width: 100%"
  />

  <p>use max-collapse-tags</p>
  <e-select-m
    v-model="valueMultiple3"
    class="m-2"
    :options="options"
    multiple
    collapse-tags
    :max-collapse-tags="3"
    placeholder="请选择"
    style="width: 100%"
  />
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";

  const valueMultiple = ref([]);
  const valueMultiple2 = ref([]);
  const valueMultiple3 = ref([]);
  const options = [
    {
      value: "Beijing",
      label: "Beijing",
    },
    {
      value: "Shanghai",
      label: "Shanghai",
    },
    {
      value: "Nanjing",
      label: "Nanjing",
    },
    {
      value: "Chengdu",
      label: "Chengdu",
    },
    {
      value: "Shenzhen",
      label: "Shenzhen",
    },
    {
      value: "Guangzhou",
      label: "Guangzhou",
    },
  ];
</script>
```

## 自定义模板

您可以为选项自定义 `HTML` 模板。

将自定义的 `HTML` 模板插入到 `ep-option` 的插槽中。

```html
<template>
  <p>自定义模板</p>
  <e-select-m v-model="valueCustom" placeholder="Select">
    <e-option-m
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span
        style="float: left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
        >{{ item.label }}</span
      >
      <span
        style="float: right;white-space: nowrap;overflow: hidden;text-overflow: ellipsis; color: var(--e-text-color-secondary); font-size: 13px"
      >
        {{ item.value }}
      </span>
    </e-option-m>
  </e-select-m>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";

  const valueCustom = ref('');
  const options = [
    {
      value: "Beijing",
      label: "Beijing",
    },
    {
      value: "Shanghai",
      label: "Shanghai",
    },
    {
      value: "Nanjing",
      label: "Nanjing",
    },
    {
      value: "Chengdu",
      label: "Chengdu",
    },
    {
      value: "Shenzhen",
      label: "Shenzhen",
    },
    {
      value: "Guangzhou",
      label: "Guangzhou",
    },
  ];
</script>
```

## 分组显示

以组的方式显示选项。

使用 `ep-option-group` 或在 `options` 属性上绑定分组格式数据对选项进行分组，其 `label` 属性表示组的名称。

```html
<template>
  <p>分组显示</p>
  <e-select-m v-model="valueLabel" class="m-2" placeholder="请选择">
    <e-option-group-m
      v-for="group in optionslabel"
      :key="group.label"
      :label="group.label"
    >
      <e-option-m
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </e-option-group-m>
  </e-select-m>
  <e-select-m
    v-model="valueLabel"
    class="m-2"
    :options="optionslabel"
    placeholder="请选择"
  />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const valueLabel = ref('');
  const optionslabel = [
    {
      label: "Popular cities",
      options: [
        {
          value: "Shanghai",
          label: "Shanghai",
        },
        {
          value: "Beijing",
          label: "Beijing",
        },
      ],
    },
    {
      label: "City name",
      options: [
        {
          value: "Chengdu",
          label: "Chengdu",
        },
        {
          value: "Shenzhen",
          label: "Shenzhen",
        },
        {
          value: "Guangzhou",
          label: "Guangzhou",
        },
        {
          value: "Dalian",
          label: "Dalian",
        },
      ],
    },
  ];
</script>
```

## 选项过滤

您可以过滤出您所需的选项。

在 `ep-select` 上添加 `filterable` 启用过滤。默认情况下，选择框将查找所有 `label` 属性包含输入值的选项。如果您希望使用其他过滤策略，可以传递 `filter-method`。`filter-method` 是一个在输入值更改时被调用的 `Function`，它的参数是当前的输入值。

```html
<template>
  <p>选项过滤</p>
  <e-select-m
    v-model="valueFilter"
    class="m-2"
    :options="options"
    filterable
    :filter-method="filterMethod"
    placeholder="请选择"
  />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const valueFilter = ref('');
  const options = [
    {
      value: "1",
      label: "Option1",
    },
    {
      value: "2",
      label: "Option2",
    },
    {
      value: "3",
      label: "Option3",
    },
    {
      value: "4",
      label: "Option4",
    },
    {
      value: "5",
      label: "Option5",
    },
  ];

  const filterMethod = (value: string) => {
    console.log("自定义filterMethod方法", value);

    return options.filter((item) => {
      return item.label.toLowerCase().includes(value.toLowerCase());
    });
  };
</script>
```

## 远程搜索

输入关键字并从服务器搜索数据。

设置 `filterable` 和 `remote` 的值为 `true` 以启用远程搜索，您应该传递 `remote-method`。`remote-method` 是一个在输入值更改时被调用的 `Function`，它的参数是当前的输入值。请注意，如果 `ep-option` 是使用 `v-for` 指令渲染的，您应该为 `ep-option` 添加 `key` 属性。它的值需要是唯一的，例如在下面的示例中的 `item.value`。

```html
<template>
  <p>远程搜索</p>
  <e-select-m
    v-model="valueSearch"
    class="m-2"
    filterable
    :remote="true"
    :remote-method="remoteMethod"
    placeholder="请选择"
  >
    <e-option-m
      v-for="item in remoteOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></e-option-m>
  </e-select-m>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from "vue";

  interface ListItem {
    value: string;
    label: string;
  }
  const valueSearch = ref('');
  const loading = ref(false);
  const list = ref<ListItem[]>([]);
  const remoteOptions = ref<ListItem[]>([]);
  const remoteMethod = (query: string) => {
    if (query) {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        remoteOptions.value = list.value.filter((item) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });
      }, 200);
    } else {
      remoteOptions.value = [];
    }
  };
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
  ];

  onMounted(() => {
    list.value = states.map((item) => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  });
</script>
```

## 创建新项目

创建并选择不包含在选项中的新项目

通过使用 `allow-create` 属性，用户可以在输入框中输入来创建新项目。请注意，为了使 `allow-create` 生效，`filterable` 必须为 `true`。

```html
<template>
  <p>创建新项目（多选模式）</p>
  <e-select-m
    v-model="createNewValue"
    v-model:text="createNewText"
    multiple
    filterable
    allow-create
    :reserve-keyword="false"
    placeholder="输入新标签名称或从现有选项中选择"
    class="m-2"
    @change="onCreateNewChange"
  >
    <e-option-m
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </e-select-m>

  <p>创建新项目（单选模式）</p>
  <e-select-m
    v-model="createNewSingleValue"
    v-model:text="createNewSingleText"
    filterable
    allow-create
    :reserve-keyword="true"
    placeholder="输入或选择单个标签"
    class="m-2"
    @change="onCreateNewSingleChange"
  >
    <e-option-m
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </e-select-m>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const createNewValue = ref([]);
  const createNewText = ref([]);
  const createNewSingleValue = ref("");
  const createNewSingleText = ref("");

  // 创建新项目多选模式的变化事件
  const onCreateNewChange = (value, text) => {
    console.log("多选模式 - 值变化:", value);
    console.log("多选模式 - 文本变化:", text);
    console.log("多选模式 - 当前选中项数量:", value?.length || 0);
  };

  // 创建新项目单选模式的变化事件
  const onCreateNewSingleChange = (value, text) => {
    console.log("单选模式 - 值变化:", value);
    console.log("单选模式 - 文本变化:", text);
  };

  const options = [
    {
      value: "HTML",
      label: "HTML",
    },
    {
      value: "CSS",
      label: "CSS",
    },
    {
      value: "JavaScript",
      label: "JavaScript",
    },
    {
      value: "Vue",
      label: "Vue",
    },
    {
      value: "React",
      label: "React",
    },
  ];
</script>
```

## 使用 value-key 属性

如果 `Select` 的绑定值是一个对象，请确保分配 `value-key` 作为其唯一标识键名。

通过使用 `value-key` 属性，可以正确处理具有重复标签的数据。`label` 属性的值是重复的，但通过 `id` 可以识别选项。

```html
<template>
  <p>使用value-key属性</p>
  <e-select-m v-model="value3" class="m-2" value-key="id" placeholder="请选择">
    <e-option-m
      v-for="item in options3"
      :key="item.id"
      :label="item.label"
      :value="item"
    />
  </e-select-m>
  <e-select-m
    v-model="value3"
    class="m-2"
    :options="options3"
    value-key="id"
    placeholder="请选择"
  />

  <p>selected option's description: {{ value ? value.desc : 'no select' }}</p>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  type Option = {
    id: number;
    label: string;
    desc: string;
  };
  const value3 = ref<Option>();
  const options3 = ref([
    { id: 1, label: "Option A", desc: "Option A - 230506" },
    { id: 2, label: "Option B", desc: "Option B - 230506" },
    { id: 3, label: "Option C", desc: "Option C - 230506" },
    { id: 4, label: "Option A", desc: "Option A - 230507" },
  ]);
</script>
```

## 自定义面板内容

您可以使用插槽自定义下拉面板的顶部和底部内容。

使用 `panel-header` 和 `panel-footer` 插槽来自定义下拉面板的顶部和底部内容。

```html
<template>
  <p>自定义面板内容</p>
  <e-select-m v-model="valuePanel" placeholder="Select">
    <template #panel-header>
      <h1>自定义顶部标题</h1>
    </template>
    <e-option-m
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></e-option-m>
    <template #panel-footer>
      <h1>自定义底部标题</h1>
    </template>
  </e-select-m>

  <e-select-m v-model="valuePanel" placeholder="Select" :options="options">
    <template #panel-header>
      <h1>自定义顶部标题</h1>
    </template>
  </e-select-m>
  <e-select-m v-model="valuePanel" placeholder="Select" :options="options">
    <template #panel-footer>
      <h1>自定义底部标题</h1>
    </template>
  </e-select-m>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";

  const valuePanel = ref('');
  const options = [
    {
      value: "Beijing",
      label: "Beijing",
    },
    {
      value: "Shanghai",
      label: "Shanghai",
    },
    {
      value: "Nanjing",
      label: "Nanjing",
    },
    {
      value: "Chengdu",
      label: "Chengdu",
    },
    {
      value: "Shenzhen",
      label: "Shenzhen",
    },
    {
      value: "Guangzhou",
      label: "Guangzhou",
    },
  ];
</script>
```

## Select API

### Select Attributes

| 属性名                | 说明                                                                 | 类型                                       | 默认值           |
|-----------------------|--------------------------------------------------------------------|--------------------------------------------|------------------|
| model-value / v-model | 绑定的值                                                             | string / number / boolean / object / array | -                |
| text / v-model:text   | 绑定的文本                                                           | string / array                             | -                |
| multiple              | 是否启用多选模式                                                     | boolean                                    | false            |
| disabled              | 是否禁用 Select                                                      | boolean                                    | false            |
| value-key             | 用于值的唯一标识键名，当值为对象时必需                                | string                                     | value            |
| size                  | 输入框尺寸                                                           | string(large / default / small)            | default          |
| clearable             | 是否可清空选择                                                       | boolean                                    | true             |
| collapse-tags         | 在多选情况下是否将标签折叠成文本                                     | boolean                                    | false            |
| multiple-limit        | 用户可以选择的最大选项数（当 multiple 为 true 时）。设置为 0 表示无限制 | number                                     | 0                |
| name                  | select 输入框的 name 属性                                            | string                                     | -                |
| autocomplete          | select 输入框的 autocomplete 属性                                    | string                                     | off              |
| placeholder           | 占位符                                                               | string                                     | Select           |
| filterable            | Select 是否可筛选                                                    | boolean                                    | false            |
| allow-create          | 是否允许创建新项目。若使用此选项，filterable 必须为 true               | boolean                                    | false            |
| filter-method         | 自定义筛选方法                                                       | (value: string) => { return [];}           | -                |
| remote                | 选项是否从服务器加载                                                 | boolean                                    | false            |
| remote-method         | 自定义远程搜索方法                                                   | (value: string) => { return [];}           | -                |
| loading               | Select 是否正在从服务器加载数据                                      | boolean                                    | false            |
| loading-text          | 在加载数据时显示的文本                                               | string                                     | Loading          |
| no-match-text         | 当没有数据与筛选查询匹配时显示的文本，也可以使用插槽 empty            | string                                     | No matching data |
| no-data-text          | 当没有选项时显示的文本，也可以使用插槽 empty                          | string                                     | No data          |
| reserve-keyword       | 当 multiple 和 filter 为 true 时，是否在选择选项后保留当前关键词      | boolean                                    | true             |
| max-collapse-tags     | 要显示的最大标签数量。要使用此选项，collapse-tags 必须为 true          | number                                     | 1                |
| clear-icon            | 自定义清空图标组件                                                   | string / object                            | CircleClose      |
| tag-type     | 标签类型           |     string(success / info / warning / danger)                                 | info
| validate-event     | 是否触发表单验证           | boolean                                     | true
| empty-values     | 定义哪些值被视为空值。当选择器的值等于这些值时，会被视为未选择状态。            | array(string / number / null / undefined)                                     | [undefined, null, '']
| value-on-clear     | 当点击清除按钮时,选择器的值会被设置为这个值。默认值为 undefined，你可以设置为任意类型的值,比如空字符串、null、数组等。           | string / number / array / boolean / object / null / undefined                                     | undefined

### Events

| Name           | Description                            | Parameters                     |
|----------------|----------------------------------------|--------------------------------|
| change         | 当选定的值发生变化时触发               | 当前选定的值                   |
| visible-change | 当下拉菜单出现/消失时触发              | 当它出现时为 true，否则为 false |
| remove-tag     | 在多选模式下移除标签时触发             | 移除的标签值                   |
| clear          | 在可清除的 Select 中点击清除图标时触发 | —                              |
| blur           | 当输入框失去焦点时触发                 | (event: FocusEvent)            |
| focus          | 当输入框获得焦点时触发                 | (event: FocusEvent)            |

### Slots

| Name         | Description            | Subtags               |
|--------------|------------------------|-----------------------|
| default      | 选项组件列表           | Option Group / Option |
| prefix       | 作为 Select 前缀的内容 | —                     |
| empty        | 当没有选项时的内容     | —                     |
| panel-header | 下拉面板顶部自定义内容 | —                     |
| panel-footer | 下拉面板底部自定义内容 | —                     |


### Methods

| Name  | Description                 | Parameters |
|-------|-----------------------------|------------|
| focus | 聚焦到输入框组件            | —          |
| blur  | 失焦输入框组件，隐藏下拉菜单 | —          |

## Option Group API

### Option Group Attributes

| Name     | Description                | Type    | Default |
|----------|----------------------------|---------|---------|
| label    | 分组的名称                 | string  | —       |
| disabled | 是否禁用该分组内的所有选项 | boolean | false   |

### Option Group Slots

| Name    | Description    | Subtags |
|---------|----------------|---------|
| default | 自定义默认内容 | Option  |

## Option API

### Option Attributes

| Name     | Description                        | Type                               | Default |
|----------|------------------------------------|------------------------------------|---------|
| value    | 选项的值                           | string / number / boolean / object | —       |
| label    | 选项的标签，如果省略则与 value 相同 | string / number                    | —       |
| disabled | 是否禁用该选项                     | boolean                            | false   |

### Option Slots

| Name    | Description    |
|---------|----------------|
| default | 自定义默认内容 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-select-m"
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