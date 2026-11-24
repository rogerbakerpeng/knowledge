# Pagination 分页

分页组件，用于分页展示大量数据。

## 基础用法

通过 `total` 属性设置总数据条数，通过 `current-page` 属性设置当前页数，通过 `page-size` 属性设置每页条数。

```html
<e-pagination-m
  v-model:current="current"
  v-model:page-size="pageSize"
  :total="50"
></e-pagination-m>
```

```ts
import { ref } from "vue";
const current = ref(1);
const pageSize = ref(10);
```

## 改变每页数量

`show-size-changer`设置为 `true` 时可以改变每页数量。

当 `total` 大于 `50` 时默认为 `true`

```html
<e-pagination-m :total="50" show-size-changer></e-pagination-m>
```

## 自定义下拉选项

通过传入`page-size-options`属性可以自定义每页数量的下拉选项。

通过传入`build-option-text`方法对每页数量展示文本进行自定义。

```html
<e-pagination-m
  v-model:page-size="pageSizeRef"
  :total="50"
  :page-size-options="pageSizeOptions"
  :build-option-text="buildOptionText"
  show-size-changer
  @show-size-change="onShowSizeChange"
></e-pagination-m>
```

```js
import { ref, h } from 'vue';

const pageSizeRef = ref(10);
const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const buildOptionText = (option) => {
    if (option.value !== '50') {
        return `${option.value}条/页`;
    }
    return '全部';
};
const onShowSizeChange = (current: number, pageSize: number) => {
    pageSizeRef.value = pageSize;
};
```

## 快速跳转

`showQuickJumper`设置为 `true` 时可以选择页码进行快速跳转。

```html
<e-pagination-m :total="50" showQuickJumper></e-pagination-m>
```

## 迷你

设置`size`属性为 `small` 时变为迷你尺寸。

```html
<e-pagination-m size="small" :total="50" />
<e-pagination-m size="small" :total="50" show-size-changer show-quick-jumper />
<e-pagination-m
  size="small"
  :total="50"
  :show-total="(total) => `Total ${total} items`"
/>
```

## 简洁模式

设置`simple`属性为 `true` 时开启简洁模式。

移动端在开启快速跳转和选择每页数量时，会自动开启简洁模式。

```html
<e-pagination-m :total="50" simple></e-pagination-m>
```

## 显示总数

通过`showTotal`属性可以设置显示数据总量和当前数据顺序。

该属性是一个方法，返回一个字符串。

```html
<e-pagination-m
  v-model:current="current"
  v-model:page-size="pageSize"
  :total="85"
  :show-total="(total, range) => `${range[0]}-${range[1]} of ${total} items`"
/>
```

```ts
const current = ref(1);
const pageSize = ref(10);
```

## 修改上一步和下一步

通过`itemRender`插槽对分页组件的上一步、下一步进行自定义。

注意：移动端不提供 `originalElement`， 默认为 `undefined`

```html
<e-pagination-m :total="50">
  <template #itemRender="{ type, originalElement }">
    <span v-if="type === 'prev'">Previous</span>
    <span v-else-if="type === 'next'">Next</span>
    <component :is="originalElement" v-else />
  </template>
</e-pagination-m>
```

## API

### Attributes

| 属性名            | 描述                                                                            | 类型                                                                                         | 默认值                    |
| ----------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------- |
| current(v-model)  | 当前页数                                                                        | number                                                                                       | 1                         |
| defaultPageSize   | 默认的每页条数                                                                  | number                                                                                       | 10                        |
| disabled          | 禁用分页                                                                        | boolean                                                                                      | false                     |
| hideOnSinglePage  | 只有一页时是否隐藏分页器                                                        | boolean                                                                                      | false                     |
| itemRender        | 用于自定义页码的结构                                                            | ({page: number, type: 'page' / 'prev'/ 'next', originalElement: undefined}) => vNode/ v-slot | -                         |
| pageSize(v-model) | 每页条数                                                                        | number                                                                                       | -                         |
| pageSizeOptions   | 指定每页可以显示多少条                                                          | string[] \| number[]                                                                         | ['10', '20', '50', '100'] |
| responsive        | 当 size 未指定时，根据屏幕宽度自动调整尺寸，PC 端属性不适用移动端，移动端不支持 | boolean                                                                                      | false                     |
| showLessItems     | 是否显示较少页面内容，为`true`时仅展示 3 个页码，为`false`时展示 5 个           | boolean                                                                                      | false                     |
| showQuickJumper   | 是否可以快速跳转至某页                                                          | boolean                                                                                      | false                     |
| showSizeChanger   | 是否展示 pageSize 切换器, 当 total 大于 50 时默认为 true                        | boolean                                                                                      | false                     |
| showTotal         | 显示数据总量和当前数据顺序                                                      | (total: number, range: [number, nuber]) => string                                            | -                         |
| simple            | 简单分页模式                                                                    | boolean                                                                                      | -                         |
| total             | 数据总数                                                                        | number                                                                                       | 0                         |
| buildOptionText   | 自定义每页数量下拉选项文本                                                      | (option: { value: number }) => string                                                        | -                         |
| size              | 尺寸                                                                            | `default`/`small`                                                                            | `default`                 |

#### Events

| 事件名         |                           说明                           | 回调参数                       |
| :------------- | :------------------------------------------------------: | :----------------------------- |
| change         | 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数 | page: number, pageSize: number |
| showSizeChange |                   pageSize 变化的回调                    | page: number, pageSize: number |

### Slots

| 属性名     | 描述                                | SlotProps                                                              |
| ---------- | ----------------------------------- | ---------------------------------------------------------------------- |
| itemRender | 可自定义分页组件的 prev、next、page | page: number, type: 'page'/ 'prev'/ 'next', originalElement: undefined |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-pagination-m"
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