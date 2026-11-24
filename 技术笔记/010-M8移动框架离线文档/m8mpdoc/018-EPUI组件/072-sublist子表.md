# Sublist 子表

子表 2.0 的表单形式。

由于该组件可以渲染成表格形式，所以 `ep-table` 组件支持的属性和方法 `ep-sublist` 都支持，本文档主要介绍表单形式支持的属性功能。

## 基本用法

子表的输入框默认使用 `ep-input` 组件，可通过 `column.editor.props` 调整 `ep-input`组件的属性。

当然，你也可以通过 `editor` 插槽替换为其他组件，或者通过 `form` 插槽直接替换整块表单内容。

行数据未展开时会展示简要内容，可通过 `briefInfoList` 配置需要展示的字段。

```html
<template>
    <e-sublist-m
        :rowKey="rowKey"
        :dataSource="tableSource.dataSource"
        :columns="columnList"
        :title="(record) => record && record.itemName"
        height="500px"
        :briefInfoList="['ouName', 'date']"
    >
        <template #editor="{ column, record, editable }">
            <e-input-m
                v-if="column.dataIndex === 'age'"
                v-model.number="record[column.dataIndex]"
                :disabled="!editable"
                type="number"
            />
        </template>
    </e-sublist-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const rowKey = 'userGuid';
    const columnList: Record<string, any>[] = [
        { dataIndex: 'itemName', title: '事项名称' },
        { dataIndex: 'ouName', title: '所在部门' },
        { dataIndex: 'date', title: '办理时间' },
        {
            dataIndex: 'schedule',
            title: '预约时间'
        },
        {
            dataIndex: 'age',
            title: '年龄'
        },
        {
            dataIndex: 'status',
            title: '状态'
        }
    ];
    // tableSource 具备以下属性： { dataSource, pageSize, current, total, loading, refresh, onTableChange }
    const tableSource = useTableDataSource('/frameaction/getDataGridDataAll', {
        idField: rowKey,
        columns: columnList,
        pageSize: 10
    });
</script>
```

## 异步加载

这个例子演示了如何从服务端读取并展现数据，具有 loading 效果。开发者可以自行接入其他数据处理方式。

```html
<template>
    <e-sublist-m
        :rowKey="rowKey"
        :dataSource="dataSource"
        :pagination="pagination"
        :loading="loading"
        height="500px"
        :columns="columnList"
        :title="(record) => record && record.itemName"
        :briefInfoList="['ouName', 'date']"
        @change="onTableChange"
    ></e-sublist-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const rowKey = 'userGuid';
    const columnList: Record<string, any>[] = [
        { dataIndex: 'itemName', title: '事项名称' },
        { dataIndex: 'ouName', title: '所在部门' },
        { dataIndex: 'date', title: '办理时间' },
        {
            dataIndex: 'schedule',
            title: '预约时间'
        },
        {
            dataIndex: 'age',
            title: '年龄'
        },
        {
            dataIndex: 'status',
            title: '状态'
        }
    ];
    // 需要双向绑定时，要解构获取
    const { dataSource, pageSize, current, total, loading, refresh, onTableChange } = useTableDataSource(
        '/frameaction/getDataGridData',
        {
            pageSize: 10, // 模拟数据是10
            idField: rowKey,
            columns: columnList
        }
    );
    const pagination = reactive({
        total,
        current: current.value,
        pageSize: pageSize.value
    });
</script>
```

## 结合 toolbar 工具栏

通过`toolbar`插槽放置工具栏。

```html
<template>
    <e-sublist-m
        :rowKey="rowKey"
        :dataSource="dataSource2"
        :pagination="pagination2"
        :loading="loading2"
        height="500px"
        :columns="columnList"
        :title="(record) => record && record.itemName"
        :briefInfoList="['ouName', 'date']"
        @change="onTableChange2"
    >
        <template #toolbar>
            <e-toolbar-m title="事项管理">
                <template #filter>
                    <e-toolbar-search-m :search-list="searchList" @advance-search="onAdvanceSearch" />
                </template>
            </e-toolbar-m>
        </template>
    </e-sublist-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const rowKey = 'userGuid';
    const columnList: Record<string, any>[] = [
        { dataIndex: 'itemName', title: '事项名称', width: 100 },
        { dataIndex: 'ouName', title: '所在部门', width: 100 },
        { dataIndex: 'date', title: '办理时间', width: 100 },
        {
            dataIndex: 'schedule',
            title: '预约时间',
            width: 100
        },
        {
            dataIndex: 'age',
            title: '年龄',
            width: 100
        },
        {
            dataIndex: 'status',
            title: '状态',
            width: 100
        }
    ];
    const params: any = reactive({
        userName: '',
        loginId: '',
        ouName: ''
    });
    const {
        dataSource: dataSource2,
        pageSize: pageSize2,
        current: current2,
        total: total2,
        loading: loading2,
        onTableChange: onTableChange2
    } = useTableDataSource('/frameaction/getDataGridData', {
        pageSize: 10, // 模拟数据是10
        idField: 'userGuid',
        columns: columnList,
        params
    });
    // 给表格组件绑定初始化的分页设置
    const pagination2 = reactive({
        total: total2,
        current: current2.value,
        pageSize: pageSize2.value
    });
    const onAdvanceSearch = (filterRes) => {
        console.log('onAdvanceSearch', filterRes);
        // 修改列表请求的查询参数
        params.searchParams = filterRes.conditions;
        params.logicOperator = filterRes.logicOperator;

        // 筛选事件触发列表刷新
        onTableChange2(
            {
                pageSize: pageSize2.value,
                current: current2.value
            },
            filterRes,
            []
        );
    };
    // 筛选条件
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
                { label: '事项名称', value: 'itemName' },
                { label: '所在部门', value: 'ouName' },
                { label: '年龄', value: 'age' }
            ]
        }
    ]);
</script>
```

## 行展开

可通过 `expandedRowKeys` 控制表单行展开状态。

`expand-change` 事件在行展开状态发生变化时触发。

```html
<template>
    <e-sublist-m
        :rowKey="rowKey"
        :dataSource="tableSource.dataSource"
        :columns="columnList"
        :title="(record) => record && record.itemName"
        height="500px"
        :briefInfoList="['ouName', 'date']"
        v-model:expandedRowKeys="expandedRowKeys"
        @expand-change="onExpand"
    ></e-sublist-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const rowKey = 'userGuid';
    const columnList: Record<string, any>[] = [
        { dataIndex: 'itemName', title: '事项名称' },
        { dataIndex: 'ouName', title: '所在部门' },
        { dataIndex: 'date', title: '办理时间' },
        {
            dataIndex: 'schedule',
            title: '预约时间'
        },
        {
            dataIndex: 'age',
            title: '年龄'
        },
        {
            dataIndex: 'status',
            title: '状态'
        }
    ];
    // tableSource 具备以下属性： { dataSource, pageSize, current, total, loading, refresh, onTableChange }
    const tableSource = useTableDataSource('/frameaction/getDataGridDataAll', {
        idField: rowKey,
        columns: columnList,
        pageSize: 10
    });
    const expandedRowKeys = ref(['2', '4']);
    const onExpand = (expandedKeys) => {
        console.log('行展开变化事件', expandedKeys, expandedRowKeys.value);
    };
</script>
```

## 表单编辑

通过 `getFormBtns` 属性配置行操作按钮，该属性是一个方法，可根据不同状态配置不同的操作按钮，同时配置的按钮数量不应超过三个。

通过 `footer` 插槽可在列表底部添加额外的按钮例如 新增按钮。

子表组件提供了 `add`、`toggleEdit` 等方法方便开发者切换表单状态。

```html
<template>
    <e-sublist-m
        ref="sublistRef"
        :rowKey="rowKey"
        :dataSource="editData3"
        :columns="columnList2"
        :title="(record) => record && record.itemName"
        height="500px"
        :briefInfoList="['ouName', 'date']"
        :getFormBtns="getFormBtns"
        v-model:expandedRowKeys="expandedRowKeys2"
    >
        <template #editor="{ column, record, editable }">
            <e-input-m
                v-if="column.dataIndex === 'age'"
                v-model.number="record[column.dataIndex]"
                :disabled="!editable"
                type="number"
            />
        </template>
        <template #footer>
            <div class="edit-btn">
                <e-button-m text icon="CirclePlus" @click="onAdd">新增</e-button-m>
            </div>
        </template>
    </e-sublist-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const rowKey = 'userGuid';
    const expandedRowKeys2 = ref([]); // 展开的行key数组
    const sublistRef = ref<any>();
    const columnList2: Record<string, any>[] = [
        {
            dataIndex: 'itemName',
            title: '事项名称',
            disabled: true,
            required: true
        },
        { dataIndex: 'ouName', title: '所在部门', width: 100 },
        {
            dataIndex: 'date',
            title: '办理时间'
        },
        {
            dataIndex: 'schedule',
            title: '预约时间'
        },
        {
            dataIndex: 'age',
            title: '年龄',
            rules: [
                { type: 'required', message: '请输入年龄' },
                { type: 'number', message: '请输入正确的年龄' }
            ]
        },
        {
            dataIndex: 'status',
            title: '状态'
        }
    ];
    // 接口返回数据
    const { dataSource: dataSource3 } = useTableDataSource('/frameaction/getDataGridDataAll', {
        pageSize: 10,
        idField: rowKey,
        columns: columnList2
    });
    const editData3 = ref([]); // 编辑数据，用于列表展示
    const saveData = ref([]); // 最终保存的数据，用于模拟保存，实际业务应该是去请求接口保存

    watch(
        dataSource3,
        (val) => {
            saveData.value = JSON.parse(JSON.stringify(val));
        },
        {
            immediate: true
        }
    );

    watch(
        saveData,
        (val) => {
            editData3.value = JSON.parse(JSON.stringify(val));
        },
        {
            immediate: true
        }
    );
    const onAdd = () => {
        const userGuid = new Date().getTime().toString();
        // 在列表末尾新增一条数据
        sublistRef.value.add({
            userGuid,
            itemName: '我是新增事项',
            ouName: '',
            status: '',
            age: '',
            date: '',
            schedule: ''
        });
        // 切换为编辑态
        sublistRef.value.toggleEdit(true, userGuid);
        // 展开行
        expandedRowKeys2.value.push(userGuid);
    };
    const save = async (record) => {
        // 保存之前先校验
        const { valid, fields } = await sublistRef.value.validateRow(record[rowKey]);
        console.log('校验表单', valid, fields);

        if (valid) {
            const currRowData = sublistRef.value.getRowData(record[rowKey]);
            const index = saveData.value.findIndex((item) => item[rowKey] === currRowData[rowKey]);
            let list = saveData.value.slice(0);

            if (index > -1) {
                list = saveData.value.map((data, i) => {
                    if (index === i) {
                        return currRowData;
                    } else {
                        return data;
                    }
                });
            } else {
                list.push(currRowData);
            }

            saveData.value = list.slice(0);

            return true;
        }

        ejs.ui.toast('保存失败！');

        return false;
    };
    const closeEdit = (record) => {
        sublistRef.value.toggleEdit(false, record[rowKey]);
    };
    // 行操作按钮
    const getFormBtns = (record, rowIndex, editable) => {
        let btns = [];
        const detailBtns = [
            {
                content: '编辑',
                type: 'primary',
                id: 'edit',
                onClick: () => {
                    console.log('编辑', record);
                    const key = record[rowKey];

                    sublistRef.value.toggleEdit(true, key);
                    // 编辑时展开行
                    if (!expandedRowKeys2.value.includes(key)) {
                        expandedRowKeys2.value.push(key);
                    }
                }
            },
            {
                content: '上移',
                id: 'up',
                onClick: () => {
                    // 将 index 的数据上移一行
                    let list = editData3.value.slice(0);
                    list.splice(rowIndex - 1, 0, list.splice(rowIndex, 1)[0]);
                    saveData.value = list.slice(0);
                }
            },
            {
                content: '下移',
                id: 'down',
                onClick: () => {
                    // 将 rowIndex 的数据下移一行
                    let list = editData3.value.slice(0);
                    list.splice(rowIndex + 1, 0, list.splice(rowIndex, 1)[0]);
                    saveData.value = list.slice(0);
                }
            }
        ];
        const editBtns = [
            {
                content: '保存',
                type: 'primary',
                id: 'save',
                onClick: async () => {
                    const res = await save(record);

                    if (res) {
                        // 关闭编辑
                        closeEdit(record);
                    }
                }
            },
            {
                content: '取消',
                id: 'cancel',
                onClick: () => {
                    // 还原数据
                    editData3.value = JSON.parse(JSON.stringify(saveData.value));
                    closeEdit(record);
                }
            },
            {
                content: '删除',
                type: 'danger',
                id: 'del',
                onClick: () => {
                    saveData.value = editData3.value.filter((item) => item[rowKey] !== record[rowKey]);
                }
            }
        ];

        if (editable) {
            btns = editBtns;
        } else {
            btns = detailBtns;
        }

        if (rowIndex === 0) {
            // 第一条不展示上移
            return btns.filter((item) => item.id !== 'up');
        }

        if (rowIndex === editData3.value.length - 1) {
            // 最后一条不展示下移
            return btns.filter((item) => item.id !== 'down');
        }

        const i = saveData.value.findIndex((item) => item[rowKey] === record[rowKey]);
        // 不在保存数据中说明是新增的，不展示删除
        if (i === -1) {
            return btns.filter((item) => item.id !== 'del');
        }

        return btns;
    };
</script>
<style lang="scss" scoped>
    .edit-btn {
        display: flex;
        justify-content: center;
        padding: 7px 16px;
        margin: 8px 16px 16px;
        background-color: #f2f4f7;
        border-radius: 4px;
    }
</style>
```

## 切换表格形式

通过 `renderAsTable` 属性可切换成表格形式，此时组件使用方式与 `ep-table` 完全相同，具体请参考 `ep-table` 文档。

```html
<template>
    <e-switch-m v-model="renderAsTable"></e-switch-m>
    <e-sublist-m
        :rowKey="rowKey"
        :dataSource="tableSource.dataSource"
        :columns="columnList"
        :title="(record) => record && record.itemName"
        height="500px"
        :briefInfoList="['ouName', 'date']"
        :renderAsTable="renderAsTable"
    ></e-sublist-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const rowKey = 'userGuid';
    const renderAsTable = ref(false);
    const columnList: Record<string, any>[] = [
        { dataIndex: 'itemName', title: '事项名称', width: 100 },
        { dataIndex: 'ouName', title: '所在部门', width: 100 },
        { dataIndex: 'date', title: '办理时间', width: 100 },
        {
            dataIndex: 'schedule',
            title: '预约时间',
            width: 100
        },
        {
            dataIndex: 'age',
            title: '年龄',
            width: 100
        },
        {
            dataIndex: 'status',
            title: '状态',
            width: 100
        }
    ];
    // tableSource 具备以下属性： { dataSource, pageSize, current, total, loading, refresh, onTableChange }
    const tableSource = useTableDataSource('/frameaction/getDataGridDataAll', {
        idField: rowKey,
        columns: columnList,
        pageSize: 10
    });
</script>
```

## Sublist API

### Sublist Attributes

仅介绍表单形式支持的属性。

| 属性                     | 描述                                                                  | 类型                                                                                                                                                                      | 默认值                   |
| :----------------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------- |
| columns                  | 表格列的配置描述，具体项见下表                                        | `array`                                                                                                                                                                   | []                       |
| dataSource               | 数据数组                                                              | `object[]`                                                                                                                                                                | -                        |
| loading                  | 页面是否加载中                                                        | `boolean \| LoadingProps`                                                                                                                                                 | `false`                  |
| locale                   | 默认文案设置，目前包括空数据文案                                      | `object`                                                                                                                                                                  | { emptyText: '暂无数据'} |
| pagination               | 分页器，参考 pagination 文档，设为 false 时不展示和进行分页           | `PaginationProps \| boolean`                                                                                                                                              | `true`                   |
| rowClassName             | 表单行的类名                                                          | `Function(record, index):string`                                                                                                                                          | —                        |
| rowKey                   | 表格行 key 的取值，可以是字符串或一个函数                             | `string\|Function(record):string`                                                                                                                                         | `key`                    |
| size                     | 表单大小                                                              | `large \| default \| small`                                                                                                                                               | `default`                |
| title                    | 每条行表单标题                                                        | `Function(currRowData) => string`                                                                                                                                         | -                        |
| renderAsTable            | 渲染成表格形式，此时支持 `ep-table` 组件所有功能                      | `boolean`                                                                                                                                                                 | `false`                  |
| defaultExpandAllRows     | 初始时，是否展开所有行                                                | `boolean`                                                                                                                                                                 | `false`                  |
| defaultExpandedRowKeys   | 默认展开的行                                                          | `string[]`                                                                                                                                                                | []                       |
| expandedRowKeys(v-model) | 展开的行，控制属性，绑定后展开状态完全受此属性控制                    | `string[]`                                                                                                                                                                | []                       |
| rowExpandable            | 设置行是否可以展开，此时会隐藏展开按钮。优先级比 `expandedRowKeys` 低 | `(record) => boolean`                                                                                                                                                     | `() => true`             |
| getFormProps             | 自定义每行表单属性，支持属性参考`ep-form`文档说明                     | `(record) => FormProps`                                                                                                                                                   | `-`                      |
| getFormItemProps         | 自定义每个表单项属性，支持属性参考`ep-form-item`文档说明              | `(record, column) => FormItemProps`                                                                                                                                       | `-`                      |
| height                   | 组件整体高度，默认单位为 px                                           | `string \| number`                                                                                                                                                        | `-`                      |
| briefInfoList            | 用于配置表单行折叠时需要展示的简要信息字段列表                        | `string[]`                                                                                                                                                                | `-`                      |
| getFormBtns              | 返回表单行的操作按钮，最多能配置三个                                  | `(record, rowIndex, editable) => { content: string, id?: string; type?: 'default' \| 'primary' \| 'success' \| 'warning' \| 'info' \| 'danger', onClick?: () => void }[]` | `-`                      |

#### Column

列描述数据对象，是 columns 中的一项，Column 使用相同的 API。

| Name      | Description                                                                               | Type                                         | Default                           |
| :-------- | :---------------------------------------------------------------------------------------- | :------------------------------------------- | :-------------------------------- |
| dataIndex | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径                                      | `string \| string[]`                         | -                                 |
| hidden    | 该字段是否隐藏                                                                            | `boolean`                                    | `false`                           |
| key       | Vue 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性                          | `string`                                     | -                                 |
| title     | 表单项的 label                                                                            | `string`                                     | -                                 |
| required  | 此列是否标记为必填， 一旦设置会以设置优先，未设置会尝试查找列的校验规则中是否存在必填规则 | `boolean`                                    | -                                 |
| tooltip   | 表单项 label 中显示的 tooltip 帮助提示信息                                                | `string \| TooltipProps`                     | -                                 |
| rules     | 此列表单校验规则                                                                          | `FormItemRule[]`                             | -                                 |
| disabled  | 编辑模式下此列是否禁用                                                                    | `boolean`                                    | -                                 |
| editor    | 用于配置行数据中该列字段使用的表单组件，当前仅支持 `editor.type = 'ep-input'`             | `object` - `{ type: string, props: object }` | `{ type: 'ep-input', props: {} }` |

### Sublist Events

| 名称          | 描述                     | 类型                                                         |
| :------------ | :----------------------- | :----------------------------------------------------------- |
| change        | 分页变化时触发           | `Function(pagination: { current: number, pageSize: number})` |
| expand-change | 行数据展开状态改变时触发 | `Function(expandedRowKeys)`                                  |

### Sublist Slots

| 名称       | 描述                                                   | 参数                                                     |
| :--------- | :----------------------------------------------------- | :------------------------------------------------------- |
| bodyCell   | 表单模式下替换表单中的 `ep-form-item` 组件             | {text, record, index(当前页的行索引，从 0 开始), column} |
| emptyText  | 自定义空数据时的显示内容                               | -                                                        |
| footer     | 列表尾部                                               | currentPageData                                          |
| title      | 列表头部                                               | currentPageData                                          |
| toolbar    | 工具栏插槽                                             | -                                                        |
| editor     | 表单的自定义输入框，替换 `ep-form-item` 的默认插槽内容 | { colunm, record, editable }                             |
| form       | 替换整体`ep-form`                                      | { record, editable }                                     |
| rowTitle   | 自定义行标题                                           | { record, title, rowIndex(总数据行索引), expanded }      |
| expandIcon | 自定义展开图标                                         | { record, expanded }                                     |
| action     | 自定义行操作按钮，建议操作按钮设置不超过三个           | { record, expanded, rowIndex(总数据行索引) }             |
| briefInfo  | 自定义行数据未展开时的简要内容                         | { record }                                               |
| extra      | 分页和表单之间的自定义内容                             | -                                                        |

### Sublist Exposes

| Name        | Description                                                                                                         | Type                                                             |
| :---------- | :------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------- |
| add         | 新增一条数据，可传一条新数据模板，也可传新增数据的索引位置 (仅用于修改弹窗展示样式，实际数据根据 `dataSource` 展示) | `(newRow?: RecordType, rowIndex?: number(总数据行索引)) => void` |
| toggleEdit  | 切换某行数据是否为编辑模式                                                                                          | `(flag: boolean, rowKey: string) => void`                        |
| validateRow | 用于校验行数据表单                                                                                                  | `(rowKey: string) => Promise<{ valid, fields }>`                 |
| getFormRef  | 获取当前页某行数据表单引用，注意，最好在行展开后获取，否则表单未渲染可能获取不到                                    | `(rowKey: string) => FormInstance`                               |
| getRowData  | 获取某行数据                                                                                                        | `(rowKey: string) => record`                                     |
| resize      | 重新计算组件高度                                                                                                    | `() => void`                                                     |

### 注意 ​

在 sublist 中，dataSource 和 columns 里的数据值都需要指定 key 值。对于 dataSource 默认将每列数据的 key 属性作为唯一的标识。

如果你的数据没有这个属性，务必使用 rowKey 来指定数据列的主键。若没有指定，控制台会出现缺少 key 的提示，表格组件也会出现各类奇怪的错误。

```html
<!-- 比如你的数据主键是 uid -->
<e-sublist-m rowKey="uid" />
```

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-sublist-m"
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