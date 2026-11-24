# Cascader 级联选择

级联选择框，用于多层级数据的选择，典型场景为省市区选择。

## 基本使用

将 `options` 属性分配给选项数组会渲染一个级联选择器。

```html
<template>
  <div class="m-4">
    <p>Child options expand when clicked (default)</p>
    <e-cascader-m v-model="value" :options="options" @change="handleChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref([]);

const handleChange = (value) => {
  console.log(value);
};
const options = [
  {
    label: "浙江省",
    value: "330000",
    children: [{ label: "杭州市", value: "330100" }],
  },
  {
    label: "江苏省",
    value: "320000",
    children: [{ label: "南京市", value: "320100" }],
  },
];
</script>
```

## 禁用选项
通过在选项对象中设置 `disabled` 字段来禁用选项。

在此示例中，`options` 数组中的第一项具有 `disabled: true` 字段，因此它被禁用。默认情况下，级联选择器会检查每个选项对象中的 `disabled` 字段；如果您使用其他字段名称来指示选项是否被禁用，可以在 `props.disabled` 属性中进行分配（有关详细信息，请参考下面的 `API` 表格）。当然，字段名称 `value`、`label` 和 `children` 也可以以相同的方式自定义。

```html
<template>
  <e-cascader-m v-model="value" :options="options" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref([]);
const options = [
    {
      label: "浙江省",
      value: "330000",
      disabled: true,
      children: [{ label: "杭州市", value: "330100" }],
    },
    {
      label: "江苏省",
      value: "320000",
      children: [{ label: "南京市", value: "320100" }],
    },
];
</script>
```

## 可清除
显示清除图标

```html
<template>
  <e-cascader-m v-model="value" :options="options" clearable />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref([]);
const options = [
    {
      label: "浙江省",
      value: "330000",
      children: [{ label: "杭州市", value: "330100" }],
    },
    {
      label: "江苏省",
      value: "320000",
      children: [{ label: "南京市", value: "320100" }],
    },
];
</script>
```

## 仅显示最后一级
输入框可以只显示最后一级而不是所有级别。

`show-all-levels` 属性定义是否显示所有级别。如果它为 `false`，则只显示最后一级。

```html
<template>
  <e-cascader-m v-model="value" :options="options" :show-all-levels="false" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref([]);
const options = [
    {
      label: "浙江省",
      value: "330000",
      children: [{ label: "杭州市", value: "330100" }],
    },
    {
      label: "江苏省",
      value: "320000",
      children: [{ label: "南京市", value: "320100" }],
    },
];
</script>
```

## 多选
在标签中添加 `:props="props"` 并设置数据 `props = { multiple: true }` 以使用多选功能。

示例:

```html
<template>
  <e-cascader-m :props="props" />
</template>
<script lang="ts" setup>
  const props = { multiple: true };
</script>
```

不要这样做：

```html
<template>
  <!-- 级联选择器的对象字面量绑定是无效的语法 -->
  <e-cascader-m :props="{ multiple: true }" />
</template>
```

使用多选功能时，默认情况下会显示所有已选择的标签。您可以设置 `collapse-tags = true` 来折叠已选择的标签。通过使用 `collapse-tags-tooltip` 属性，在点击折叠文本上时，可以展开它们。

```html
<template>
  <div class="m-4">
    <p>Display all tags (default)</p>
    <e-cascader-m :options="options" :props="props" clearable />
  </div>
  <div class="m-4">
    <p>Collapse tags</p>
    <e-cascader-m :options="options" :props="props" collapse-tags clearable />
  </div>
  <div class="m-4">
    <p>Collapse tags tooltip</p>
    <e-cascader-m :options="options" :props="props" collapse-tags collapse-tags-tooltip clearable />
  </div>
</template>

<script lang="ts" setup>
const props = { multiple: true };

const options = [
  {
    value: 1,
    label: 'Asia',
    children: [
      {
        value: 2,
        label: 'China',
        children: [
          { value: 3, label: 'Beijing' },
          { value: 4, label: 'Shanghai' },
          { value: 5, label: 'Hangzhou' },
        ],
      },
      {
        value: 6,
        label: 'Japan',
        children: [
          { value: 7, label: 'Tokyo' },
          { value: 8, label: 'Osaka' },
          { value: 9, label: 'Kyoto' },
        ],
      },
    ],
  },
  {
    value: 14,
    label: 'Europe',
    children: [
      {
        value: 15,
        label: 'France',
        children: [
          { value: 16, label: 'Paris' },
          { value: 17, label: 'Marseille' },
          { value: 18, label: 'Lyon' },
        ]
      }
    ],
  }
];
</script>
```

## 选择任意级别的选项
在单选模式下，只能选中叶子节点，而在多选模式下，选中父节点将导致最终选中叶子节点。启用此功能后，可以使父节点和子节点不关联，并可以选择任意级别的选项。

设置 `props.checkStrictly = true` 以使节点的选中状态不影响其父节点和子节点，然后可以选择任意级别的选项。

```html
<template>
  <div class="m-4">
    <p>Select any level of options (Single selection)</p>
    <e-cascader-m :options="options" :props="props1" clearable />
  </div>
  <div class="m-4">
    <p>Select any level of options (Multiple selection)</p>
    <e-cascader-m :options="options" :props="props2" clearable />
  </div>
</template>

<script lang="ts" setup>
const props1 = {
  checkStrictly: true,
};

const props2 = {
  multiple: true,
  checkStrictly: true,
};

const options = [
  {
    value: 1,
    label: 'Asia',
    children: [
      {
        value: 2,
        label: 'China',
        children: [
          { value: 3, label: 'Beijing' },
          { value: 4, label: 'Shanghai' },
          { value: 5, label: 'Hangzhou' },
        ],
      },
      {
        value: 6,
        label: 'Japan',
        children: [
          { value: 7, label: 'Tokyo' },
          { value: 8, label: 'Osaka' },
          { value: 9, label: 'Kyoto' },
        ],
      },
    ],
  },
  {
    value: 14,
    label: 'Europe',
    children: [
      {
        value: 15,
        label: 'France',
        children: [
          { value: 16, label: 'Paris' },
          { value: 17, label: 'Marseille' },
          { value: 18, label: 'Lyon' },
        ]
      }
    ],
  }
];
</script>
```

## 动态加载
当选中一个节点时，动态加载其子节点。

设置 `lazy = true` 来使用动态加载，并且必须通过 `lazyload` 指定如何加载数据源。lazyload 有两个参数，第一个参数 node 是当前点击的节点，`resolve` 是一个指示加载完成的回调函数，必须调用它。为了更准确地显示节点的状态，您可以添加一个 `leaf` 字段（可以通过 `props.leaf` 修改）来指示它是否是叶子节点。否则，它将根据是否有子节点来推断。

示例:

```html
<template>
  <e-cascader-m v-model="value" :props="props" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref([]);
let id = 0;
const props = {
  lazy: true,
  lazyLoad(node, resolve) {
    const { level } = node;
    setTimeout(() => {
      const nodes = Array.from({ length: level + 1 }).map((item, i) => ({
        value: ++id,
        label: `Option - ${level} - ${i + 1}`,
        leaf: level >= 2,
      }));
      // Invoke `resolve` callback to return the child nodes data and indicate the loading is finished.
      resolve(nodes);
    }, 1000);
  },
};
</script>
```

## 可过滤
使用关键词搜索并选择选项。

在 `ep-cascader` 中添加 `filterable` 启用过滤功能。级联选择器将匹配包含输入关键字的标签或父标签（根据 `show-all-levels`）。当然，您可以通过 `filter-method` 自定义搜索逻辑，它接受一个函数，第一个参数是 `node`，第二个是 `keyword`，需要返回一个布尔值，指示是否匹配。

示例:

```html
<template>
  <div class="m-4">
    <p>Filterable (Single selection)</p>
    <e-cascader-m placeholder="Try searchingL Guide" :options="options" filterable />
  </div>
  <div class="m-4">
    <p>Filterable (Multiple selection)</p>
    <e-cascader-m placeholder="Try searchingL Guide" :options="options" :props="props" filterable />
  </div>
</template>

<script lang="ts" setup>
const props = {
  multiple: true,
};

const options = [
  {
    value: 1,
    label: 'Asia',
    children: [
      {
        value: 2,
        label: 'China',
        children: [
          { value: 3, label: 'Beijing' },
          { value: 4, label: 'Shanghai' },
          { value: 5, label: 'Hangzhou' },
        ],
      },
      {
        value: 6,
        label: 'Japan',
        children: [
          { value: 7, label: 'Tokyo' },
          { value: 8, label: 'Osaka' },
          { value: 9, label: 'Kyoto' },
        ],
      },
    ],
  },
  {
    value: 14,
    label: 'Europe',
    children: [
      {
        value: 15,
        label: 'France',
        children: [
          { value: 16, label: 'Paris' },
          { value: 17, label: 'Marseille' },
          { value: 18, label: 'Lyon' },
        ]
      }
    ],
  }
];
</script>
```

## 自定义选项内容

您可以自定义级联选择器节点的内容。

您可以通过 `scoped slot` 自定义级联选择器节点的内容。在范围内，您将访问到 `node` 和 `data`，分别代表当前节点的 `Node` 对象和节点数据。

```html
<template>
  <e-cascader-m :options="options">
    <template #custom-node="{ node, data }">
      <span>{{ data.label }}</span>
      <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
    </template>
  </e-cascader-m>
</template>

<script lang="ts" setup>

const options = [
  {
    value: 1,
    label: 'Asia',
    children: [
      {
        value: 2,
        label: 'China',
        children: [
          { value: 3, label: 'Beijing' },
          { value: 4, label: 'Shanghai' },
          { value: 5, label: 'Hangzhou' },
        ],
      },
      {
        value: 6,
        label: 'Japan',
        children: [
          { value: 7, label: 'Tokyo' },
          { value: 8, label: 'Osaka' },
          { value: 9, label: 'Kyoto' },
        ],
      },
    ],
  },
  {
    value: 14,
    label: 'Europe',
    children: [
      {
        value: 15,
        label: 'France',
        children: [
          { value: 16, label: 'Paris' },
          { value: 17, label: 'Marseille' },
          { value: 18, label: 'Lyon' },
        ]
      }
    ],
  }
];
</script>
```

## 级联选择器面板

`CascaderPanel` 是 `Cascader` 的核心组件，具有各种功能，例如单选、多选、动态加载等。

就像 `ep-cascader` 一样，您可以通过 `options` 设置备选选项，并通过 `props` 启用其他功能，详细信息请参见下面的 `API` 表格。

```html
<template>
  <e-cascader-panel-m :options="options" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref([]);

const options = [
  {
    label: "浙江省",
    value: "330000",
    children: [{ label: "杭州市", value: "330100" }],
  },
  {
    label: "江苏省",
    value: "320000",
    children: [{ label: "南京市", value: "320100" }],
  },
];
</script>
```

## Cascader API

### Cascader Attributes

| Name                  | Description                                                  | Type                                                         | Default |
| :-------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :------ |
| model-value / v-model | 绑定值                                                       | `字符串`/`数字`/`object`  (`string[] \| number[] \| any`)      | —       |
| options               | 选项数据，`value` 和 `label` 的键可以通过 `CascaderProps` 进行自定义。 | `object`  (`Record<string, unknown>[]`)                      | —       |
| props                 | 配置选项，参见下面的 `CascaderProps` 表格。                  | `object` (`CascaderProps`)                                   | —       |
| size                  | 输入框的尺寸                                                 | `枚举` (`'large' \| 'default' \| 'small'`)                     | —       |
| placeholder           | 输入框的占位符                                               | `字符串`                                                     | —       |
| disabled              | 是否禁用级联选择器                                           | `布尔值`                                                     | —       |
| clearable             | 是否可以清除已选择的值                                       | `布尔值`                                                     | —       |
| show-all-levels       | 是否在输入框中显示所选值的所有级别                           | `布尔值`                                                     | true    |
| collapse-tags         | 是否在多选模式下折叠标签                                     | `布尔值`                                                     | —       |
| collapse-tags-tooltip | 是否点击折叠标签文本时显示所有已选择的标签。要使用此选项，`collapse-tags` 必须设置为 true | `布尔值`                                                     | false   |
| separator             | 选项标签分隔符                                               | `字符串`                                                     | ' / '   |
| filterable            | 是否可以搜索选项                                             | `布尔值`                                                     | —       |
| filter-method         | 自定义搜索逻辑，第一个参数是 `node`，第二个参数是 `keyword`，需要返回一个布尔值，指示是否匹配。 | `Function` (`(node: CascaderNode, keyword: string) => boolean`) | —       |
| debounce              | 输入筛选关键词时的防抖延迟，以毫秒为单位                     | `数字`                                                       | 300     |
| before-filter         | 过滤前的钩子函数，以待过滤的值作为其参数。如果返回 `false` 或返回一个被拒绝的 `Promise`，则将中止过滤操作 | `Function` (`(value: string) => boolean`)                    | —       |
| popper-class          | 级联选择器下拉框的自定义类名                                 | `字符串`                                                     | ''      |
| tag-type              | 标签类型                                                     | `枚举` (`'success' \| 'info' \| 'warning' \| 'danger'`)         | info    |
| validate-event        | 是否触发表单验证                                             | `布尔值`                                                     | true    |
| swipe-threshold        | 滚动阈值，标签数量超过阈值时开始横向滚动                     | `字符串`/`数字`                                              | `3`    |

### Cascader Events

| Name           | Description                | Type                                                         |
| :------------- | :------------------------- | :----------------------------------------------------------- |
| change         | 当绑定值变化时触发         | `Function`    `(value: CascaderValue) => void`               |
| expand-change  | 当展开选项变化时触发       | `Function`    `(value: CascaderValue) => void`               |
| blur           | 当级联选择器失焦时触发     | `Function`    `(event: FocusEvent) => void`                  |
| focus          | 当级联选择器获得焦点时触发 | `Function`    `(event: FocusEvent) => void`                  |
| visible-change | 当下拉框显示/隐藏时触发    | `Function`    `(value: boolean) => void`                     |
| remove-tag     | 在多选模式下移除标签时触发 | `Function`    `(value: CascaderNode['valueByOption']) => void` |


### Cascader Slots

| Name        | Description                                                  | Scope                                  |
| :---------- | :----------------------------------------------------------- | :------------------------------------- |
| custom-node | 级联选择器节点的自定义内容，分别是当前的 Node 对象和节点数据。 | `object`    `{ node: any, data: any }` |
| empty       | 当没有匹配选项时的内容。                                     | `-`                                    |


### Cascader Exposes

| Name                | Description                                                  | Type                                                      |
| :------------------ | :----------------------------------------------------------- | :-------------------------------------------------------- |
| getCheckedNodes     | 获取当前选定节点的数组，(leafOnly) 是否只返回叶子节点，默认为 `false` | `Function`    `(leafOnly: boolean) => CascaderNode[] \| undefined` |
| cascaderPanelRef    | 级联选择器面板的引用                                         | `object`      `ComputedRef<any>`                          |
| togglePopperVisible | 切换弹出框的可见类型                                         | `Function`    `(visible?: boolean) => void`               |
| contentRef          | 级联选择器内容的引用                                         | `object`      `ComputedRef<any>`                          |
| clearCheckedNodes   | 清除选定节点                                                 | `Function`    `() => void`                                |


## CascaderPanel API

### CascaderPanel Attributes

| Name                  | Description                                                  | Type                                                         | Default |
| :-------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | ------- |
| model-value / v-model | 绑定值                                                       | `string`/`number`/`object`      (`string[] \| number[] \| any`) | `-`     |
| options               | 选项数据，`value` 和 `label` 的键可以由 `CascaderProps` 自定义。 | `object`     (`Record<string, unknown>[]`)                   | `-`     |
| props                 | 配置选项，参见下面的 `CascaderProps` 表格。                  | `object`     (`CascaderProps`)                               | `-`     |
| swipe-threshold        | 滚动阈值，标签数量超过阈值时开始横向滚动                     | `字符串`/`数字`                                              | `3`    |

### CascaderPanel 事件

| Name          | Description                                        | Type                                                    |
| :------------ | :------------------------------------------------- | :------------------------------------------------------ |
| change        | 绑定值更改时触发                                   | `Function`      `(value: CascaderValue) => void`        |
| expand-change | 展开选项更改时触发                                 | `Function`     `(value: CascaderNodePathValue) => void` |
| close         | 关闭面板事件，提供给 Cascader 以判断是否收起面板。 | `Function`     `() => void`                             |

### CascaderPanel 插槽

| Name    | Description                                                  | Scope                                    |
| :------ | :----------------------------------------------------------- | :--------------------------------------- |
| default | 级联节点的自定义内容，当前节点对象和节点数据分别为 `node` 和 `data`。 | `object`      `{ node: any, data: any }` |

### CascaderPanel Exposes

| Name              | Description                                                  | Type                                                         |
| :---------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| getCheckedNodes   | 获取当前选定节点的数组，（leafOnly）是否只返回叶子选定节点，默认为 `false` | `Function`      `(leafOnly: boolean) => CascaderNode[] \| undefined` |
| clearCheckedNodes | 清除选定节点                                                 | `Function`     `() => void`                                  |

# CascaderProps
| 属性           | Description                                                  | Type                                                  | Default  |
| :------------- | :----------------------------------------------------------- | :---------------------------------------------------- | :------- |
| multiple       | 是否启用多选                                                 | `boolean`                                             | false    |
| checkStrictly  | 选定节点的状态是否不影响其父节点和子节点的状态               | `boolean`                                             | false    |
| emitPath       | 当选定节点改变时，是否要发射节点路径的数组，如果为 false，只发射节点的值 | `boolean`                                             | true     |
| lazy           | 是否动态加载子节点，与 `lazyload` 属性一起使用               | `boolean`                                             | false    |
| lazyLoad       | 用于加载子节点数据的方法，仅在 `lazy` 为 true 时生效         | `Function` (`(node: Node, resolve: Resolve) => void`) | —        |
| value          | 指定节点对象中用作节点值的键                                 | `string`                                              | value    |
| label          | 指定节点对象中用作节点标签的键                               | `string`                                              | label    |
| children       | 指定节点对象中用作节点子节点的键                             | `string`                                              | children |
| disabled       | 指定节点对象中用作节点禁用状态的键                           | `string`                                              | disabled |
| leaf           | 指定节点对象中用作节点叶子节点字段的键                       | `string`                                              | leaf     |

# Type Declarations

## Show declarations

```typescript
type CascaderNodeValue = string | number;
type CascaderNodePathValue = CascaderNodeValue[];
type CascaderValue =
  | CascaderNodeValue
  | CascaderNodePathValue
  | (CascaderNodeValue | CascaderNodePathValue)[];

type Resolve = (data: any) => void;

type LazyLoad = (node: Node, resolve: Resolve) => void;

type isDisabled = (data: CascaderOption, node: Node) => boolean;

type isLeaf = (data: CascaderOption, node: Node) => boolean;

interface CascaderOption extends Record<string, unknown> {
  label?: string;
  value?: CascaderNodeValue;
  children?: CascaderOption[];
  disabled?: boolean;
  leaf?: boolean;
}

interface CascaderProps {
  expandTrigger?: ExpandTrigger;
  multiple?: boolean;
  checkStrictly?: boolean;
  emitPath?: boolean;
  lazy?: boolean;
  lazyLoad?: LazyLoad;
  value?: string;
  label?: string;
  children?: string;
  disabled?: string | isDisabled;
  leaf?: string | isLeaf;
}

class Node {
  readonly uid: number;
  readonly level: number;
  readonly value: CascaderNodeValue;
  readonly label: string;
  readonly pathNodes: Node[];
  readonly pathValues: CascaderNodePathValue;
  readonly pathLabels: string[];

  childrenData: ChildrenData;
  children: Node[];
  text: string;
  loaded: boolean;
  /**
   * Is it checked
   *
   * @default false
   */
  checked: boolean;
  /**
   * Used to indicate the intermediate state of unchecked and fully checked child nodes
   *
   * @default false
   */
  indeterminate: boolean;
  /**
   * Loading Status
   *
   * @default false
   */
  loading: boolean;

  // getter
  isDisabled: boolean;
  isLeaf: boolean;
  valueByOption: CascaderNodeValue | CascaderNodePathValue;

  // method
  appendChild(childData: CascaderOption): Node;
  calcText(allLevels: boolean, separator: string): string;
  broadcast(event: string, ...args: unknown[]): void;
  emit(event: string, ...args: unknown[]): void;
  onParentCheck(checked: boolean): void;
  onChildCheck(): void;
  setCheckState(checked: boolean): void;
  doCheck(checked: boolean): void;
}

Node as CascaderNode;
```

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-cascader-m"
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