# Toolbar 工具栏

该组件提供标准工具栏布局，一般用于搜索工具栏展示

## 基础用法

toolbar 组件提供 `title`、`filter`、`actions`、`button` 等插槽。

`button` 插槽内容一般展示在页面底部，所以可以将内容放在 `toolbar` 的 `default` 插槽中避免布局错乱。

`actions` 插槽内容展示在页面右下角悬浮按钮点击展开后的面板中。

```html
<template>
    <e-toolbar-m title="我是标题">
        <div class="table-content">我是表格内容</div>
        <template #button>
            <e-button-m type="primary">Primary</e-button-m>
            <e-button-m type="success">Success</e-button-m>
        </template>
        <template #filter>
            <div class="filter-content">搜索区域</div>
        </template>
        <template #actions>
            <e-button-group-m>
                <e-button-m icon="LayoutCardBold" iconColor="black" text />
                <e-button-m icon="LayoutTableBold" iconColor="black" text />
                <e-button-m icon="MoreFilled" iconColor="black" text />
            </e-button-group-m>
        </template>
    </e-toolbar-m>
</template>
```

## 结合标题组件

`toolbar` 组件提供 `title` 插槽，可在 `title` 插槽中使用 `toolbar-title` 组件展示标题。

```html
<template>
    <e-toolbar-m>
        <div class="table-content">我是表格内容</div>
        <template #title>
            <e-toolbar-title-m>
                <span>用户列表-toolbar</span>
            </e-toolbar-title-m>
        </template>
        <template #filter>
            <div class="filter-content">搜索区域</div>
        </template>
    </e-toolbar-m>
</template>
```

## 结合高级搜索和排序使用

一般结合 `toolbar-search`组件 展示高级搜索使用。

```html
<e-toolbar-m>
    <template #filter>
        <e-toolbar-search-m
            :search-list="searchList"
            :filter-plan-list="filterPlanList"
            @advance-search="onAdvanceSearch"
        />
    </template>
    <template #extra>
        <e-toolbar-sort-m :sort-list="sortList" @sort="onSort" />
    </template>
</e-toolbar-m>
<div class="table-content">我是表格内容</div>
```

```js
import { ref } from 'vue';

const filterPlanList = ref([
    {
        label: '符合所有条件',
        value: 'and'
    },
    {
        label: '符合任意条件',
        value: 'or',
        default: true
    }
]);
const onAdvanceSearch = (params) => {
    console.log('onAdvanceSearch', params);
};
const searchList = ref([
    {
        label: '复合搜索',
        field: 'searchField',
        type: 'mixSearch', // 复合搜索
        default: true,
        operation: 'EQ',
        operations: [
            {
                label: '等于',
                value: 'EQ'
            },
            {
                label: '不等于',
                value: 'NQ'
            },
            {
                label: '包含',
                value: 'IN'
            },
            {
                label: '不包含',
                value: 'NOTIN'
            }
        ],
        data: [
            { label: '姓名', value: 'name' },
            { label: '所属部门', value: 'department' },
            { label: '电话', value: 'phone' }
        ]
    },
    {
        label: '用户登录名',
        field: 'loginid',
        type: 'input',
        default: true,
        operation: 'EQ',
        operations: [
            {
                label: '等于',
                value: 'EQ'
            },
            {
                label: '不等于',
                value: 'NQ'
            },
            {
                label: '包含',
                value: 'IN'
            },
            {
                label: '不包含',
                value: 'NOTIN'
            }
        ]
    },
    {
        label: '日期选择',
        field: 'birthday',
        type: 'datePicker',
        default: true,
        operation: 'EQ',
        operations: [
            {
                label: '等于',
                value: 'EQ'
            },
            {
                label: '不等于',
                value: 'NQ'
            },
            {
                label: '介于',
                value: 'BTW',
                type: 'rangeDatePicker'
            }
        ]
    },
    {
        label: '日期范围选择',
        field: 'rangeDate',
        type: 'rangeDatePicker',
        default: true,
        operation: 'BTW',
        operations: [
            {
                label: '介于',
                value: 'BTW'
            },
            {
                label: '不介于',
                value: 'NOTBTW'
            }
        ]
    },
    {
        label: '单选',
        field: 'status',
        prop: 'enabled',
        type: 'select',
        default: true,
        operation: 'EQ',
        operations: [
            {
                label: '等于',
                value: 'EQ'
            },
            {
                label: '不等于',
                value: 'NQ',
                type: 'select',
                url: '/frametoolbar/getCodeList'
            },
            {
                label: '包含',
                value: 'IN'
            },
            {
                label: '不包含',
                value: 'NOTIN'
            }
        ],
        data: [
            {
                label: '启用',
                value: '1'
            },
            {
                label: '禁用',
                value: '0'
            }
        ]
    },
    {
        label: '多选状态',
        field: 'statusMulti',
        prop: 'enabled',
        type: 'multiSelect',
        default: true,
        operation: 'EQ',
        operations: [
            {
                label: '等于',
                value: 'EQ'
            },
            {
                label: '不等于',
                value: 'NQ'
            },
            {
                label: '包含',
                value: 'IN'
            },
            {
                label: '不包含',
                value: 'NOTIN'
            }
        ],
        data: [
            {
                label: '启用',
                value: '1'
            },
            {
                label: '禁用',
                value: '0'
            }
        ]
    },
    {
        label: '数值范围',
        field: 'numberRange',
        prop: 'enabled',
        type: 'rangeNumber',
        default: true,
        operation: 'BTW',
        operations: [
            {
                label: '介于',
                value: 'BTW'
            },
            {
                label: '不介于',
                value: 'NOTBTW'
            }
        ]
    }
]);
// 排序列表--同时应只有一项存在排序设置
const sortList = ref([
    {
        name: '事项名称',
        field: 'itemName',
        order: ''
    },
    {
        name: '所在部门',
        field: 'ouName',
        order: 'descend'
    },
    {
        name: '办理时间',
        field: 'date',
        order: ''
    }
]);
const onSort = (sortRes) => {
    console.log('onSort', sortRes);
};
```

### Toolbar Attributes

| 属性名 | 说明                                                                           | 类型         | 默认值     |
| ------ | ------------------------------------------------------------------------------ | ------------ | ---------- |
| title  | 展示的标题                                                                     | `string`     | `-`        |
| text   | 悬浮按钮吸附侧边时展示的按钮文字                                               | `string`     | `悬浮按钮` |
| action | 点击悬浮按钮时触发的事件，若传入该参数，则会触发该方法，而不会展开 action 面板 | `() => void` | `-`        |

### Toolbar Slots

| 插槽名  | 说明                                 |
| ------- | ------------------------------------ |
| default | 工具栏之下，按钮插槽之上的自定义内容 |
| title   | 自定义标题内容                       |
| filter  | 自定义搜索区域内容                   |
| extra   | 搜索区域右侧内容                     |
| button  | 自定义底部按钮区域内容               |
| actions | 自定义悬浮按钮展开面板中的内容       |

### ToolbarTitle Attributes

| 属性名 | 说明       | 类型     | 默认值 |
| ------ | ---------- | -------- | ------ |
| title  | 展示的标题 | `string` | `-`    |

### ToolbarTitle Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义标题内容 |

### ToolbarSort Attributes

提供排序面板组件，方便用户进行排序操作。

| 属性名              | 说明                                                               | 类型                                       | 默认值                    |
| ------------------- | ------------------------------------------------------------------ | ------------------------------------------ | ------------------------- |
| v-model/model-value | 排序结果                                                           | `{ field: string; order: sortDirections }` | `{ field: '', order: ''}` |
| zIndex              | 排序面板层级                                                       | `number`                                   | `-`                       |
| sortList            | 排序项列表，见下表                                                 | `SorterItem[]`                             | `[]`                      |
| showOperation       | 是否展示默认项右侧的设置按钮                                       | `boolean`                                  | `false`                   |
| showHeaderIcon      | 是否展示排序按钮，该按钮隐藏时可通过组件的 toggle 方法切换面板显隐 | `boolean`                                  | `true`                    |

#### SorterItem 说明

```js
type sortDirections = 'ascend' | 'descend' | null;

interface SorterItem {
    field: string; // 排序项的字段名
    order: sortDirections; // 排序项的排序方式
    name: string; // 排序项的文本
}
```

### ToolbarSort Events

| 属性名    | 描述                       | 类型                                                                                    |
| --------- | -------------------------- | --------------------------------------------------------------------------------------- |
| sort      | 排序状态改变时触发         | `Function` - `(sorter: { field: string, order: sortDirections, name: string }) => void` |
| operation | 点击默认项右侧配置按钮触发 | `Function` - `() => void`                                                               |

### ToolbarSort Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义排序按钮 |

### ToolbarSort Exposes

| Name   | Description            | Type                                   |
| ------ | ---------------------- | -------------------------------------- |
| toggle | 切换排序面板的显示状态 | `Function` - `(flag: boolean) => void` |

### ToolbarSearch Attributes

| 属性名          | 说明                         | 类型           | 默认值                                                                                          |
| --------------- | ---------------------------- | -------------- | ----------------------------------------------------------------------------------------------- |
| searchList      | 页面业务需要的搜索字段, 必传 | `SearchItem[]` | `[]`                                                                                            |
| filterPlanList  | 满足条件                     | `FilterPlan[]` | `[{ label: '符合所有条件', value: 'and'}, {label: '符合任意条件', value: 'or', default: true}]` |
| placeholder     | 高级搜索框的提示语           | `string`       | `请输入搜索内容`                                                                                |
| canAddFilters   | 是否可以添加条件             | `boolean`      | `true`                                                                                          |
| needUsualFilter | 是否需要常用筛选             | `boolean`      | `true`                                                                                          |
| zIndex          | 筛选面板层级                 | `number`       | `-`                                                                                             |
| showSearchBox   | 是否展示搜索框               | `boolean`      | `false`                                                                                         |
| hideHistory     | 是否禁用搜索历史面板         | `boolean`      | `false`                                                                                         |
| showAction      | 是否展示搜索框右侧取消按钮   | `boolean`      | `false`                                                                                         |
| actionText      | 搜索框右侧取消按钮文本       | `string`       | `取消`                                                                                          |

### SearchItem 数据结构

| 键名         | 说明                                                                                                                                | 类型                               |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| label        | 筛选项 label                                                                                                                        | `string`                           |
| field        | 筛选项字段名，必填                                                                                                                  | `string`                           |
| fieldType    | 字段名对应的类型，存在 string、number、date 这三种                                                                                  | `string`                           |
| dataType     | 数据类型，目前支持 'default','select','tree'，表示字符串，下拉选项，树形数据源。下拉选项和树数据源必须需要有 url 属性或者 data 属性 | `string`                           |
| value        | 筛选项值，类型根据筛选项输入类型不同而不同                                                                                          | `any`                              |
| type         | 组件类型，目前支持的组件类型：`input、select、multiSelect、datePicker、rangeDatePicker、rangeNumber`                                | `string`                           |
| default      | 是否默认显示到工具栏顶部                                                                                                            | `boolean`                          |
| operation    | 查询条件，目前支持的查询条件值见下方 `operation` 说明                                                                                | `string`                           |
| operations   | 查询条件列表，目前支持的条件列表见下方 `operation` 说明                                                                              | operationItem[]                    |
| data         | 组件数据，比如下拉框的选项，data 目前支持的组件数据默认为 `{label: string, value: string}[]`                                        | `{label: string, value: string}[]` |
| url          | 代码项接口，需要后端开发配置                                                                                                        | `string`                           |
| labelField   | 代码项接口返回的名称字段名，比如 text                                                                                               | `string`                           |
| valueField   | 代码项接口返回的值字段名，比如 id                                                                                                   | `string`                           |
| searchParams | 代码项接口的请求参数，比如 {lazy: true, labelField: 'text'}                                                                         | `object`                           |
| \_config     | 其他配置，表单设计器中可以配置的其他参数，比如：{ format: 'YYYY-MM-DD' }，在个性化组件时可能会用到                                  | `object`                           |

### operations 说明

operations 是一个数组，每项数据结构如下：

| 键名         | 说明                                                                                         | 类型                               |
| ------------ | -------------------------------------------------------------------------------------------- | ---------------------------------- |
| label        | 查询条件 label                                                                               | `string`                           |
| value        | 查询条件值，必填                                                                             | `string`                           |
| type         | 组件类型，配置该字段时，切换到这项查询条件，筛选项输入类型也会随之切换                       | `string`                           |
| data         | 组件数据，比如下拉框的选项，data 目前支持的组件数据默认为 `{label: string, value: string}[]` | `{label: string, value: string}[]` |
| url          | 代码项接口，需要后端开发配置                                                                 | `string`                           |
| labelField   | 代码项接口返回的名称字段名，比如 text                                                        | `string`                           |
| valueField   | 代码项接口返回的值字段名，比如 id                                                            | `string`                           |
| searchParams | 代码项接口的请求参数，比如 {lazy: true, labelField: 'text'}                                  | `object`                           |

### operation 说明

目前后端支持的查询条件值及其支持的类型如下表格:

| 标签             | 类型         | 值        |
| ---------------- | ------------ | --------- |
| 等于             | input        | EQ        |
| 等于             | input-number | EQ        |
| 不等于           | input        | NQ        |
| 不等于           | input-number | NQ        |
| 等于 null        | none         | EQNULL    |
| 等于空           | none         | EQBLANK   |
| 不等于 null      | none         | NQNULL    |
| 不等于空         | none         | NQBLANK   |
| 模糊匹配         | input        | LIKE      |
| 模糊匹配（排除） | input        | NOTLIKE   |
| 以...开头        | input        | LEFTLIKE  |
| 以...结尾        | input        | RIGHTLIKE |
| 包含             | multiSelect  | IN        |
| 不包含           | multiSelect  | NOTIN     |
| 介于             | rangeNumber  | BTW       |
| 不介于           | rangeNumber  | NOTBTW    |
| 大于             | input-number | GT        |
| 大于等于         | input-number | GE        |
| 小于             | input-number | LT        |
| 小于等于         | input-number | LE        |

### FilterPlan 数据结构

| 键名    | 说明                 | 类型      |
| ------- | -------------------- | --------- |
| label   | 满足条件 label，必填 | `string`  |
| value   | 满足条件值，必填     | `string`  |
| default | 是否展示在工具栏顶部 | `boolean` |

### ToolbarSearch Events

| 属性名         | 描述                       | 类型                                                                                   |
| -------------- | -------------------------- | -------------------------------------------------------------------------------------- |
| advance-search | 搜索事件                   | `Function` - `(event: { conditions: Condition[], logicOperator: FilterPlan }) => void` |
| search-input   | 搜索框输入事件             | `Function` - `(value: string) => void`                                                 |
| search         | 搜索框触发搜索事件         | `Function` - `(value: string) => void`                                                 |
| cancel         | 点击搜索框右侧取消按钮事件 | `Function` - `() => void`                                                              |

## 组件扩展

如果内置的组件类型不满足需求，可以自己扩展组件，但是需要注意以下几点：

-   组件文件名多个单词时驼峰命名，比如 `rangeDatePicker`，文件名为 `RangeDatePicker.vue`

-   新增组件名不和已有的组件名重复

-   项目中新增的组件类型，需要在 添加条件 中新增使用的话，需要联系后端开发配置，比如新增 ou 部门选择组件类型，需要后端开发配置 ou 这个类型。

### 示例

比如新增一个 ou 部门组件：

#### 第一步 ​

新增组件文件 `ou.vue`，可以在项目的 `src/components/type-service` 目录下新建组件，内容如下：

```html
<template>
    <e-input-m :model-value="txt" readonly placeholder="请选择" @click="onClick" />
</template>

<script setup>
    import { useSelectPersonStore } from '@/modules/selectperson/store';
    import { useToolbarService } from '@epoint-mfe/eui-components';

    const selectPersonStore = useSelectPersonStore();
    // 事件固定要支持，用于 toolbar-search 组件通讯
    const emit = defineEmits(['update:value', 'update:text']);
    const props = defineProps({
        // 组件固定要支持value、text，用于 toolbar-search 组件通讯
        value: String,
        text: String,
        // 以下三个参数可选，用于接收 searchList 中传的 data、url、searchParams，这里列出仅作示例
        data: {
            type: Array,
            default: () => []
        },
        url: {
            type: String,
            default: ''
        },
        params: {
            type: Object,
            default: () => {}
        }
    });
    // useToolbarService 中已经处理了 value、text 的双向绑定，组件无需再处理
    const { val, txt, handleValueChange } = useToolbarService(props, emit, true);

    const onClick = (e) => {
        const options = {
            url: 'http://172.29.3.2:8080/epoint-shell-member-center-demo/rest/frame/',
            isouonly: true,
            confirm(result) {
                // 选人结果
                console.log(result);
                // 选择部门后通过 handleValueChange 方法传给 toolbar-search 组件
                handleValueChange(result.ouData[0].ouguid, result.ouData[0].ouname);
            }
        };

        selectPersonStore.setOption(options);

        ejs.page.open({
            // 跳转路径应使用相对 使用toolbar页面的路径
            pageUrl: '../../modules/selectperson/index'
        });
    };

    defineExpose({
        // 移动端需要扩展组件暴露一个 trigger 方法用于外显筛选项触发筛选值输入
        trigger: onClick
    });
</script>
```

#### 第二步 ​

在需要配置这个 ou 部门选择的地方，配置如下：

```js
import { ref, markRaw } from 'vue';
import { extendServiceType } from '@epoint-mfe/eui-components/src/hooks';
import ou from '@/components/type-service/ou.vue';

// 通过 extendServiceType 方法扩展 toolbar-search 组件支持的组件类型
extendServiceType({ ou: markRaw(ou) });

const searchList = ref([
    {
        label: '部门',
        field: 'ouGuid',
        type: 'ou', // 使用扩展的类型
        default: true,
        operation: 'EQ',
        operations: [
            {
                label: '等于',
                value: 'EQ'
            },
            {
                label: '不等于',
                value: 'NQ'
            },
            {
                label: '包含',
                value: 'IN'
            },
            {
                label: '不包含',
                value: 'NOTIN'
            }
        ]
    }
]);
```

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-toolbar-m"
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