# Table 表格

展示行列数据

## 基本用法

简单的表格，最后一列配置为操作列时，表格默认提供一个操作列样式，可通过 `click-action` 事件处理操作列的点击事件。

表格组件需要手动设置高度，可根据需求自行配置。

```html
<template>
    <e-table-m
        rowKey="userGuid"
        :columns="columnList1"
        :data-source="dataSource1"
        height="100%"
        @click-action="clickAction"
    ></e-table-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const columnList1: Record<string, any>[] = [
        { key: 'itemName', dataIndex: 'itemName', title: '事项名称', width: 100 },
        { key: 'ouName', dataIndex: 'ouName', title: '所在部门', width: 100 },
        {
            key: 'date',
            dataIndex: 'date',
            title: '办理时间',
            width: 100
        },
        {
            title: '操作',
            key: 'action',
            width: 80
        }
    ];
    const clickAction = (record: Record<string, any>) => {
        ejs.ui.actionSheet({
            items: ['编辑', '删除'],
            success: function (result) {
                if (result.which > -1) {
                    ejs.ui.toast(result.content + record.itemName);
                }
            },
            error: function (err) {}
        });
    };

    const params = reactive({
        userName: '',
        loginId: '',
        ouName: ''
    });
    // tableSource 具备以下属性： { dataSource, pageSize, current, total, loading, refresh, onTableChange }
    // 需要双向绑定时，要解构获取
    const { dataSource: dataSource1 } = useTableDataSource('/frameaction/getDataGridDataAll', {
        pageSize: 10, // 默认就是10
        idField: 'userGuid',
        columns: columnList1,
        params
    });
</script>
```

## 使用插槽

可以使用 `bodyCell` 插槽自定义单元格内容。

```html
<template>
    <e-table-m :dataSource="dataSource1" :columns="columnList1" height="100%">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'ouName'">
                <e-tag-m>{{ record.ouName }}</e-tag-m>
            </template>
            <template v-else-if="column.key === 'date'">
                <span style="color: blue">{{ record.date }}</span>
            </template>
            <template v-else-if="column.key === 'action'">
                <div @click.stop="Del">
                    <e-button-m link type="danger">删除</e-button-m>
                </div>
            </template>
        </template>
    </e-table-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const columnList1: Record<string, any>[] = [
        { key: 'itemName', dataIndex: 'itemName', title: '事项名称', width: 100 },
        { key: 'ouName', dataIndex: 'ouName', title: '所在部门', width: 100 },
        {
            key: 'date',
            dataIndex: 'date',
            title: '办理时间',
            width: 100
        },
        {
            title: '操作',
            key: 'action',
            width: 80
        }
    ];

    const params = reactive({
        userName: '',
        loginId: '',
        ouName: ''
    });
    // tableSource 具备以下属性： { dataSource, pageSize, current, total, loading, refresh, onTableChange }
    // 需要双向绑定时，要解构获取
    const { dataSource: dataSource1 } = useTableDataSource('/frameaction/getDataGridDataAll', {
        pageSize: 10, // 默认就是10
        idField: 'userGuid',
        columns: columnList1,
        params
    });
</script>
```

## 异步加载

这个例子演示了如何从服务端读取并展现数据，具有 loading 效果。开发者可以自行接入其他数据处理方式。

```html
<template>
    <e-table-m
        :dataSource="dataSource"
        :columns="columnList1"
        :row-key="(record) => record.userGuid"
        :pagination="pagination"
        :loading="loading"
        height="100%"
        @change="onTableChange"
    ></e-table-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const columnList1: Record<string, any>[] = [
        { key: 'itemName', dataIndex: 'itemName', title: '事项名称', width: 100 },
        { key: 'ouName', dataIndex: 'ouName', title: '所在部门', width: 100 },
        {
            key: 'date',
            dataIndex: 'date',
            title: '办理时间',
            width: 100
        },
        {
            title: '操作',
            key: 'action',
            width: 80
        }
    ];

    const params = reactive({
        userName: '',
        loginId: '',
        ouName: ''
    });
    // 需要双向绑定时，要解构获取
    const { dataSource, pageSize, current, total, loading, refresh, onTableChange } = useTableDataSource(
        '/frameaction/getDataGridData',
        {
            pageSize: 10, // 模拟数据是10
            idField: 'userGuid',
            columns: columnList1,
            params
        }
    );
    const pagination = reactive({
        total,
        current: current.value,
        pageSize: pageSize.value
    });
</script>
```

## 筛选和排序

组件提供 `toolbar`插槽，可结合 `ep-toolbar` 工具栏对表格数据进行筛选和排序。

不使用插槽设置工具栏时，表格高度需要自行计算。

```html
<template>
    <e-table-m
        :dataSource="editData"
        :columns="columnList1"
        :loading="loading2"
        :pagination="pagination2"
        height="100%"
        @change="onTableChange2"
    >
        <template #toolbar>
            <e-toolbar-m>
                <template #filter>
                    <e-toolbar-search-m :search-list="searchList" @advance-search="onAdvanceSearch" />
                </template>
                <template #extra>
                    <e-toolbar-sort-m v-model="sorter" :sort-list="sortList" />
                </template>
            </e-toolbar-m>
        </template>
    </e-table-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const params: any = reactive({
        userName: '',
        loginId: '',
        ouName: ''
    });
    const columnList1: Record<string, any>[] = [
        { key: 'itemName', dataIndex: 'itemName', title: '事项名称', width: 100 },
        { key: 'ouName', dataIndex: 'ouName', title: '所在部门', width: 100 },
        {
            key: 'date',
            dataIndex: 'date',
            title: '办理时间',
            width: 100
        },
        {
            title: '操作',
            key: 'action',
            width: 80
        }
    ];
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
        columns: columnList1,
        params
    });
    const editData = ref([]);

    watch(
        dataSource2,
        (val) => {
            editData.value = val;
        },
        {
            immediate: true
        }
    );
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
        },
        {
            label: '事项名称',
            field: 'itemName',
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
            label: '办理时间',
            field: 'date',
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
            label: '所在部门',
            field: 'ouName',
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
        }
    ]);
    // 排序列表
    const sortList = ref([
        {
            name: '事项名称',
            field: 'itemName',
            order: 'ascend' // 可设置初始化的排序顺序
        },
        {
            name: '所在部门',
            field: 'ouName',
            order: ''
        }
    ]);
    // 排序结果
    const sorter = ref({
        field: '',
        order: ''
    });
    watch(
        sorter,
        (sortRes) => {
            if (sortRes.field) {
                // 可以本地进行排序
                editData.value = editData.value
                    .sort((a, b) => {
                        if (sortRes.order === 'ascend') {
                            return a[sortRes.field].localeCompare(b[sortRes.field], 'zh-CN');
                        } else {
                            return b[sortRes.field].localeCompare(a[sortRes.field], 'zh-CN');
                        }
                    })
                    .slice(0);

                // 也可以远程交给服务器进行排序
                // onTableChange2({
                //     pageSize: pageSize2.value,
                //     current: current2.value
                // }, null, sortRes);
            }
        },
        {
            immediate: true
        }
    );
</script>
```

## 行编辑

设置 `showDetail` 为 `true` 时，点击行会弹窗展示行详情。

通过 `getFormBtns` 属性配置弹窗底部操作按钮，该属性是一个方法，可根据不同状态配置不同的操作按钮。

组件提供了 `toggleEdit` 方法，用于在查看和编辑两种模式之间进行切换。

弹窗中的表单组件默认为 `ep-input`，可通过 `column.editor.props` 调整 `ep-input`组件的属性。

若想要在编辑模式下禁用某一列的编辑，可配置 `column.disabled` 为 `true`。

当然，你也可以通过 `editor` 插槽替换为其他组件，或者通过 `form` 插槽直接替换整块表单内容。

```html
<template>
    <e-table-m
        ref="tableRef"
        :rowKey="rowKey"
        :dataSource="editData3"
        :columns="columnList7"
        height="100%"
        showDetail
        :title="() => '事项详情'"
        :getFormBtns="getFormBtns"
    >
        <template #editor="{ column, record, editable }">
            <e-input-m
                v-if="column.dataIndex === 'age'"
                v-model.number="record[column.dataIndex]"
                :disabled="!editable"
                type="number"
            />
        </template>
    </e-table-m>
</template>
<script lang="ts" setup>
    import { reactive, ref, watch, computed } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const rowKey = 'userGuid';
    const columnList7: Record<string, any>[] = [
        {
            dataIndex: 'itemName',
            title: '事项名称',
            disabled: true,
            required: true,
            width: 100
        },
        { dataIndex: 'ouName', title: '所在部门', width: 100 },
        {
            dataIndex: 'date',
            title: '办理时间',
            width: 100
        },
        {
            dataIndex: 'schedule',
            title: '预约时间',
            width: 100
        },
        {
            dataIndex: 'age',
            title: '年龄',
            width: 100,
            rules: [
                { type: 'required', message: '请输入年龄' },
                { type: 'number', message: '请输入正确的年龄' }
            ]
        },
        {
            dataIndex: 'status',
            title: '状态',
            width: 100
        }
    ];
    const { dataSource: dataSource3 } = useTableDataSource('/frameaction/getDataGridDataAll', {
        pageSize: 10, // 模拟数据是10
        idField: 'userGuid',
        columns: columnList7
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
    const tableRef = ref<any>();
    const add = () => {
        const userGuid = new Date().getTime().toString();
        tableRef.value.add({
            userGuid,
            itemName: '我是新增事项',
            ouName: '',
            status: '',
            age: '',
            date: '',
            schedule: ''
        });
        // 新增的数据切换成编辑态
        tableRef.value.toggleEdit(true, userGuid);
    };
    const save = async () => {
        // 保存之前先校验行数据
        const { valid, fields } = await tableRef.value.validateRow();
        console.log('校验表单', valid, fields);

        if (valid) {
            const currRowData = tableRef.value.getRowData();
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
    // 行操作按钮
    const getFormBtns = (record, rowIndex, editable) => {
        let btns = [];
        const detailBtns = [
            {
                content: '新增',
                id: 'add',
                icon: 'Plus',
                onClick: add
            },
            {
                content: '编辑',
                id: 'edit',
                icon: 'Edit',
                onClick: () => {
                    // 切换当前弹窗数据为编辑态
                    tableRef.value.toggleEdit(true);
                }
            },
            {
                content: '删除',
                id: 'delete',
                icon: 'Delete',
                onClick: () => {
                    // 获取当前弹窗数据
                    const currRowData = tableRef.value.getRowData();

                    saveData.value = editData3.value.filter((item) => item[rowKey] !== currRowData[rowKey]);
                    // 删除后跳转上一条数据，防止超限
                    tableRef.value.prev();
                }
            }
        ];
        const editBtns = [
            {
                content: '保存',
                id: 'save',
                type: 'primary',
                onClick: async () => {
                    const res = await save();

                    if (res) {
                        // 切换为只读态
                        tableRef.value.toggleEdit(false);
                        // 保存完毕关闭弹窗
                        tableRef.value.toggleExpandRow(false);
                    }
                }
            },
            {
                content: '保存并新增',
                id: 'saveAndAdd',
                onClick: async () => {
                    const res = await save();

                    if (res) {
                        add();
                    }
                }
            },
            {
                // 上移按钮
                content: '上移',
                id: 'moveUp',
                icon: 'Top',
                onClick: () => {
                    const index = tableRef.value.getCurrRowIndex();

                    // 将 index 的数据上移一行
                    let list = editData3.value.slice(0);
                    list.splice(index - 1, 0, list.splice(index, 1)[0]);
                    saveData.value = list.slice(0);
                    tableRef.value.prev();
                }
            },
            {
                // 下移按钮
                content: '下移',
                id: 'moveDown',
                icon: 'Bottom',
                onClick: () => {
                    const index = tableRef.value.getCurrRowIndex();

                    // 将 index 的数据下移一行
                    let list = editData3.value.slice(0);
                    list.splice(index + 1, 0, list.splice(index, 1)[0]);
                    saveData.value = list.slice(0);
                    tableRef.value.next();
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
            return btns.filter((item) => item.id !== 'moveUp');
        }

        if (rowIndex === editData3.value.length - 1) {
            // 最后一条不展示下移
            return btns.filter((item) => item.id !== 'moveDown');
        }

        return btns;
    };
</script>
```

## 带边框

添加表格边框线，页头和页脚。

```html
<template>
    <e-radio-group-m v-model="borderStyle" label="边框控制">
        <e-radio-button-m value="none">无边框</e-radio-button-m>
        <e-radio-button-m value="horizontal">行边框</e-radio-button-m>
        <e-radio-button-m value="full">全边框</e-radio-button-m>
    </e-radio-group-m>
    <e-table-m :borderStyle="borderStyle" :dataSource="dataSource1" :columns="columnList1" height="calc(100% - 30px)">
        <template #title>表头</template>
        <template #footer>表尾</template>
    </e-table-m>
</template>
<script lang="ts" setup>
    import { reactive, ref } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const borderStyle = ref('none');
    const columnList1: Record<string, any>[] = [
        { key: 'itemName', dataIndex: 'itemName', title: '事项名称', width: 100 },
        { key: 'ouName', dataIndex: 'ouName', title: '所在部门', width: 100 },
        {
            key: 'date',
            dataIndex: 'date',
            title: '办理时间',
            width: 100
        },
        {
            title: '操作',
            key: 'action',
            width: 80
        }
    ];

    const params = reactive({
        userName: '',
        loginId: '',
        ouName: ''
    });
    // tableSource 具备以下属性： { dataSource, pageSize, current, total, loading, refresh, onTableChange }
    // 需要双向绑定时，要解构获取
    const { dataSource: dataSource1 } = useTableDataSource('/frameaction/getDataGridDataAll', {
        pageSize: 10, // 默认就是10
        idField: 'userGuid',
        columns: columnList1,
        params
    });
</script>
```

## 单元格自动省略

设置 `column.ellipsis` 可以让单元格内容根据宽度超出一行自动省略。

```html
<template>
    <div style="margin-bottom: 10px">
        <e-switch-m v-model="ellipsisEnabled" />
        <span style="margin-left: 8px">{{ ellipsisEnabled ? '开启省略' : '关闭省略' }}</span>
    </div>
    <e-table-m :dataSource="dataSource1" :columns="columnList2" height="calc(100% - 40px)"></e-table-m>
</template>
<script lang="ts" setup>
    import { reactive, ref, computed } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const ellipsisEnabled = ref(true);
    const baseColumns: Record<string, any>[] = [
        { dataIndex: 'itemName', title: '事项名称' },
        { dataIndex: 'ouName', title: '所在部门' },
        {
            dataIndex: 'date',
            title: '办理时间'
        },
        {
            title: '操作',
            key: 'action'
        }
    ];
    const columnList2 = computed(() => {
        return baseColumns.map((column) => {
            if (column.dataIndex === 'date') {
                return {
                    ...column,
                    width: 100,
                    ellipsis: ellipsisEnabled.value
                };
            }
            return column;
        });
    });

    const params = reactive({
        userName: '',
        loginId: '',
        ouName: ''
    });
    // tableSource 具备以下属性： { dataSource, pageSize, current, total, loading, refresh, onTableChange }
    // 需要双向绑定时，要解构获取
    const { dataSource: dataSource1 } = useTableDataSource('/frameaction/getDataGridDataAll', {
        pageSize: 10, // 默认就是10
        idField: 'userGuid',
        columns: columnList2,
        params
    });
</script>
```

## 冻结操作列

支持通过 `column.fixed` 冻结列，移动端只支持冻结 `column.key`值为 `action` 的操作列。

```html
<template>
    <e-table-m :dataSource="dataSource1" :columns="columnList3" height="100%"></e-table-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const columnList3: Record<string, any>[] = [
        { dataIndex: 'itemName', title: '事项名称', width: 100 },
        { dataIndex: 'ouName', title: '所在部门', width: 100 },
        { dataIndex: 'date', title: '办理时间', width: 100 },
        {
            title: '操作',
            key: 'action',
            fixed: true,
            width: 80
        }
    ];

    const params = reactive({
        userName: '',
        loginId: '',
        ouName: ''
    });
    // tableSource 具备以下属性： { dataSource, pageSize, current, total, loading, refresh, onTableChange }
    // 需要双向绑定时，要解构获取
    const { dataSource: dataSource1 } = useTableDataSource('/frameaction/getDataGridDataAll', {
        pageSize: 10, // 默认就是10
        idField: 'userGuid',
        columns: columnList3,
        params
    });
</script>
```

## 行列合并

表头只支持列合并，使用 `column` 里的 `colSpan` 进行设置。 表体支持行/列合并，通过 `customCell` 返回单元格属性 `colSpan` 或者 `rowSpan`。

注意：一个列配置 `colspan`，后续相关列为 0。即如果需要合并第一、第二、第三列，则在起始列第一列 设置 `colSpan` 为 `3`，在第二、第三列设置 `colSpan` 为 `0`；而不是在 第一列设置 `0`，第二列设置 `3`，第三列设置 `0`。

```html
<template>
    <e-table-m
        :dataSource="dataSource1"
        :columns="columnList4"
        borderStyle="full"
        :stripe="false"
        height="100%"
    ></e-table-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const sharedOnCell = (_, index) => {
        if (index >= 4) {
            return { colSpan: 0 };
        }
    };
    const columnList4: Record<string, any>[] = [
        {
            dataIndex: 'itemName',
            title: '事项名称',
            width: 100,
            customCell: (_, index) => ({
                colSpan: index < 4 ? 1 : 5
            })
        },
        { dataIndex: 'ouName', title: '所在部门', width: 100, customCell: sharedOnCell },
        {
            dataIndex: 'date',
            title: '办理时间',
            colSpan: 2,
            width: 100,
            customCell: (_, index) => {
                if (index === 2) {
                    return { rowSpan: 2 };
                }
                if (index === 3) {
                    return { rowSpan: 0 };
                }
                if (index >= 4) {
                    return { colSpan: 0 };
                }
            }
        },
        {
            dataIndex: 'schedule',
            title: '预约时间',
            colSpan: 0,
            width: 100,
            customCell: sharedOnCell
        },
        {
            dataIndex: 'age',
            title: '年龄',
            width: 100,
            customCell: sharedOnCell
        }
    ];

    const params = reactive({
        userName: '',
        loginId: '',
        ouName: ''
    });
    const { dataSource: dataSource1 } = useTableDataSource('/frameaction/getDataGridDataAll', {
        pageSize: 10, // 默认就是10
        idField: 'userGuid',
        columns: columnList4,
        params
    });
</script>
```

## 隐藏列

使用 `column.hidden` 隐藏列。

```html
<template>
    <e-button-m
        v-for="(item, index) in columnList6"
        :key="index"
        :type="item.hidden ? 'default' : 'primary'"
        @click="changeVisible(item)"
    >
        {{ item.title }}
    </e-button-m>
    <e-table-m
        :dataSource="dataSource1"
        :columns="columnList6"
        borderStyle="full"
        :stripe="false"
        height="calc(100% - 40px)"
    ></e-table-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const changeVisible = (item) => {
        item.hidden = !item.hidden;
    };
    const columnList6: Ref<Record<string, any>[]> = ref([
        { dataIndex: 'itemName', title: '事项名称', width: 100, hidden: false },
        { dataIndex: 'ouName', title: '所在部门', width: 100, hidden: false },
        { dataIndex: 'date', title: '办理时间', width: 100, hidden: false },
        {
            title: '操作',
            key: 'action',
            width: 80,
            fixed: true,
            hidden: false
        }
    ]);

    const params = reactive({
        userName: '',
        loginId: '',
        ouName: ''
    });
    const { dataSource: dataSource1 } = useTableDataSource('/frameaction/getDataGridDataAll', {
        pageSize: 10, // 默认就是10
        idField: 'userGuid',
        columns: columnList4,
        params
    });
</script>
```

## 表头分组

`columns[n]` 可以内嵌 `children`，以渲染分组表头。

```html
<template>
    <e-table-m
        :dataSource="dataSource1"
        borderStyle="full"
        :stripe="false"
        :columns="columnList5"
        height="100%"
    ></e-table-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const columnList5: Record<string, any>[] = [
        { dataIndex: 'itemName', title: '事项名称', width: 100 },
        {
            title: '其他信息',
            children: [
                { dataIndex: 'ouName', title: '所在部门', width: 100 },
                {
                    title: '时间',
                    width: 100,
                    children: [
                        { dataIndex: 'date', title: '办理时间' },
                        {
                            dataIndex: 'schedule',
                            title: '预约时间'
                        }
                    ]
                }
            ]
        },
        {
            title: '状态',
            children: [
                { dataIndex: 'age', title: '年龄', width: 100 },
                {
                    title: '进度',
                    dataIndex: 'status',
                    width: 100
                }
            ]
        },
        {
            title: '操作',
            key: 'action',
            fixed: true,
            width: 80
        }
    ];

    const params = reactive({
        userName: '',
        loginId: '',
        ouName: ''
    });
    const { dataSource: dataSource1 } = useTableDataSource('/frameaction/getDataGridDataAll', {
        pageSize: 10, // 默认就是10
        idField: 'userGuid',
        columns: columnList4,
        params
    });
</script>
```

## 批处理

可设置 `rowSelection` 开启选择列。

`rowSelection.selectedRowKeys` 可完全控制选择列选中状态，需配合 `rowSelection.onChange` 使用。

```html
<template>
    <e-table-m
        rowKey="userGuid"
        :columns="columnList1"
        :data-source="dataSource1"
        height="100%"
        :row-selection="rowSelection"
    ></e-table-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const columnList1: Record<string, any>[] = [
        { key: 'itemName', dataIndex: 'itemName', title: '事项名称', width: 100 },
        { key: 'ouName', dataIndex: 'ouName', title: '所在部门', width: 100 },
        {
            key: 'date',
            dataIndex: 'date',
            title: '办理时间',
            width: 100
        },
        {
            title: '操作',
            key: 'action',
            width: 80
        }
    ];
    const params = reactive({
        userName: '',
        loginId: '',
        ouName: ''
    });
    // tableSource 具备以下属性： { dataSource, pageSize, current, total, loading, refresh, onTableChange }
    // 需要双向绑定时，要解构获取
    const { dataSource: dataSource1 } = useTableDataSource('/frameaction/getDataGridDataAll', {
        pageSize: 10, // 默认就是10
        idField: 'userGuid',
        columns: columnList1,
        params
    });
    const rowSelection = reactive({
        selectedRowKeys: [],
        onChange: (selectedRowKeys: string[], selectedRows: Record<string, any>[]) => {
            rowSelection.selectedRowKeys = selectedRowKeys;
            console.log(`选中的行键值: ${rowSelection.selectedRowKeys}`, '选中的行数据: ', selectedRows);
        },
        getCheckboxProps: (record: Record<string, any>) => ({
            disabled: record.itemName === '我是事项1' // 配置不可选中的列
        })
    });
</script>
```

## 渲染 HTML

通过列配置项的 `allowHtml` 属性可以控制单元格对于 HTML 字符串的渲染行为。

```html
<template>
    <e-table-m :dataSource="data" :columns="columnList10" height="100%"></e-table-m>
</template>
<script lang="ts" setup>
    const columnList10 = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: 200,
            allowHtml: 'text'
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 200,
            allowHtml: 'html'
        },
        {
            title: '地址',
            dataIndex: 'address',
            width: 200,
            allowHtml: 'decodeHtml'
        }
    ];
    const data = [
        {
            key: '1',
            name: '<span style="color: red">张三</span>',
            sex: '<span style="color: red">女</span>',
            address: '<span style="color: red">纽约第一湖公园</span>'
        },
        {
            key: '2',
            name: '&lt;span style=&quot;color: red&quot;&gt;李四&lt;/span&gt;',
            sex: '&lt;span style=&quot;color: red&quot;&gt;男&lt;/span&gt;',
            address: '&lt;span style=&quot;color: red&quot;&gt;伦敦第一湖公园&lt;/span&gt;'
        },
        {
            key: '3',
            name: '王五',
            sex: '男',
            address: '悉尼第一湖公园'
        }
    ];
</script>
```

## 自定义表头 cell

你可以通过 colunm 配置给表头中添加必填和帮助提示的标记，通过 headerCell 插槽自定义额外内容。

```html
<template>
    <e-table-m :dataSource="dataSource1" :columns="columnList11" height="100%">
        <template #headerCell="{ column }">
            <template v-if="column.key === 'action'">
                <span>
                    <e-icon-m name="Sunny"></e-icon-m>
                    更多
                </span>
            </template>
        </template>
    </e-table-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';

    const columnList11: Record<string, any>[] = [
        {
            key: 'itemName',
            dataIndex: 'itemName',
            title: '事项名称',
            width: 100,
            required: true,
            tooltip: '请输入事项名称'
        },
        {
            key: 'ouName',
            dataIndex: 'ouName',
            title: '所在部门',
            width: 100,
            tooltip: {
                content: '<span style="color: var(--e-color-danger)">请输入所在部门</span>',
                placement: 'left',
                effect: 'light',
                rawContent: true,
                showArrow: false
            },
            editor: {
                type: 'input',
                props: {}
            },
            rules: [{ required: true, message: '请输入所在部门' }]
        },
        {
            key: 'date',
            dataIndex: 'date',
            title: '办理时间',
            width: 100,
            tooltip: '请输入办理时间',
            rules: [
                { type: 'required', message: '请输入办理时间' },
                { type: 'date', message: '请输入正确的办理时间' }
            ]
        },
        {
            title: '操作',
            key: 'action',
            width: 80
        }
    ];

    const params = reactive({
        userName: '',
        loginId: '',
        ouName: ''
    });
    const { dataSource: dataSource1 } = useTableDataSource('/frameaction/getDataGridDataAll', {
        pageSize: 10, // 默认就是10
        idField: 'userGuid',
        columns: columnList11,
        params
    });
</script>
```

## Table API

### Table Attributes

| 属性               | 描述                                                        | 类型                                      | 默认值                   |
| :----------------- | :---------------------------------------------------------- | :---------------------------------------- | :----------------------- |
| borderStyle        | 控制表格的边框类型                                          | `enum`-`'none' \| 'horizontal' \| 'full'` | `none`                   |
| columns            | 表格列的配置描述，具体项见下表                              | `array`                                   | []                       |
| dataSource         | 数据数组                                                    | `object[]`                                | -                        |
| loading            | 页面是否加载中                                              | `boolean \| LoadingProps`                 | `false`                  |
| locale             | 默认文案设置，目前包括空数据文案                            | `object`                                  | { emptyText: '暂无数据'} |
| pagination         | 分页器，参考 pagination 文档，设为 false 时不展示和进行分页 | `PaginationProps \| boolean`              | `true`                   |
| rowClassName       | 表格行的类名                                                | `Function(record, index):string`          | —                        |
| stripe             | 是否显示斑马纹                                              | `boolean`                                 | `true`                   |
| rowKey             | 表格行 key 的取值，可以是字符串或一个函数                   | `string\|Function(record):string`         | `key`                    |
| showHeader         | 是否显示表头                                                | `boolean`                                 | `true`                   |
| size               | 表格大小                                                    | `large \| default \| small`               | `default`                |
| sticky             | 设置粘性头部                                                | `boolean`                                 | `true`                   |
| title              | 表格标题，会展示在行数据详情弹窗顶部                        | `Function(currRowData) => string`         | -                        |
| rowHeight          | 行高，单位 px                                               | `string \| number`                        | `44`                     |
| editable           | 表格是否开启行编辑，设为 true 时表格内容除了操作列都可编辑  | `boolean`                                 | `false`                  |
| showDetail         | 不可编辑情况下，点击行是否弹窗展示行数据详情                | `boolean`                                 | `false`                  |
| rowSelection       | 列表项是否可选择，具体配置项见以下说明                      | `object`                                  | `null`                   |
| getFormProps       | 自定义每行表单属性，支持属性参考`ep-form`文档说明           | `(record) => FormProps`                   | `-`                      |
| getFormItemProps   | 自定义每个表单项属性，支持属性参考`ep-form-item`文档说明    | `(record, column) => FormItemProps`       | `-`                      |
| indexColumn        | 序号列配置                                                  | `boolean \| IndexColumn`                  | `false`                  |
| showDetailPageTurn | 弹窗时右上角是否展示翻页                                    | `boolean`                                 | `true`                   |

#### Column

列描述数据对象，是 columns 中的一项，Column 使用相同的 API。

| Name             | Description                                                                                 | Type                                                                    | Default                           |
| :--------------- | :------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------- | :-------------------------------- |
| align            | 设置列的对齐方式                                                                            | `left \| right \| center`                                               | `center`                          |
| allowHtml        | 是否允许直接渲染数据中的 HTML 字符串。详见 AllowHtml                                        | `boolean \| 'text' \| 'html' \| 'decodeHtml'`                           | `false`                           |
| colSpan          | 表头列合并,设置为 0 时，不渲染                                                              | `number`                                                                | -                                 |
| customCell       | 设置单元格属性                                                                              | `(record, rowIndex, column) => { colSpan?: number; rowSpan?: number; }` | -                                 |
| customHeaderCell | 设置头部单元格属性，仅支持设置 align                                                        | `(column) => { align?: left \| right \| center; }`                      | -                                 |
| dataIndex        | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径                                        | `string \| string[]`                                                    | -                                 |
| ellipsis         | 设置为 true 或 { showTitle?: boolean } 时，超过宽度将自动省略。暂不支持和排序筛选一起使用。 | `boolean \| { showTitle?: boolean }`                                    | `false`                           |
| fixed            | 列是否固定，移动端只能固定操作列                                                            | `boolean`                                                               | `false`                           |
| hidden           | 列是否隐藏                                                                                  | `boolean`                                                               | `false`                           |
| key              | Vue 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性                            | `string`                                                                | -                                 |
| title            | 列头显示文字                                                                                | `string`                                                                | -                                 |
| width            | 列宽度，建议设置，否则按照列数量计算列平均宽度                                              | `string \| number`                                                      | `-`                               |
| required         | 此列是否标记为必填， 一旦设置会以设置优先，未设置会尝试查找列的校验规则中是否存在必填规则   | `boolean`                                                               | -                                 |
| tooltip          | 此列表头中显示的 tooltip 帮助提示信息                                                       | `string \| TooltipProps`                                                | -                                 |
| rules            | 此列表单校验规则                                                                            | `FormItemRule[]`                                                        | -                                 |
| disabled         | 编辑模式下此列是否禁用                                                                      | `boolean`                                                               | -                                 |
| editor           | 用于配置行详情弹窗中列使用的表单组件，当前仅支持 `editor.type = 'ep-input'`                 | `object` - `{ type: string, props: object }`                            | `{ type: 'ep-input', props: {} }` |

#### AllowHtml

控制表格当前列中内容的渲染方式是否允许 html 展示，可选值为:

-   text: 以纯文本形式展示，不渲染 HTML。
-   html: 直接渲染 HTML。
-   decodeHtml：先还原转义字符，再渲染 HTML。
-   也可设置成 boolean 值，false 等价于 text，true 等价于 html

注意：如果你自定义了列的渲染，此属性不会生效。

#### rowSelection 说明

| Name             | Description                                     | Type                                                  | Default  |
| :--------------- | :---------------------------------------------- | :---------------------------------------------------- | :------- |
| columnTitle      | 自定义列表选择框标题                            | string                                                | -        |
| columnWidth      | 自定义列表选择框宽度                            | string\|number                                        | -        |
| fixed            | 把选择框列固定在左边                            | boolean                                               | -        |
| getCheckboxProps | 选择框的默认属性配置                            | Function(record)                                      | -        |
| hideSelectAll    | 隐藏全选勾选框与自定义选择项                    | boolean                                               | false    |
| selectedRowKeys  | 指定选中项的 key 数组，需要和 onChange 进行配合 | string[]                                              | []       |
| type             | 多选/单选，checkbox or radio                    | string                                                | checkbox |
| onChange         | 选中项发生变化时的回调                          | Function(selectedRowKeys, selectedRows)               | -        |
| onSelect         | 用户手动选择/取消选择某列的回调                 | Function(record, selected, selectedRows, nativeEvent) | -        |
| onSelectAll      | 用户手动选择/取消选择所有列的回调               | Function(selected, selectedRows, changeRows)          | -        |

#### IndexColumn 说明

| Name      | Description      | Type                                                                                                  | Default  |
| :-------- | :--------------- | :---------------------------------------------------------------------------------------------------- | :------- |
| width     | 宽度             | number \| string                                                                                      | `50`     |
| align     | 对齐方式         | 'left' \| 'center' \| 'right'                                                                         | 'center' |
| title     | 标题             | string                                                                                                | 序号     |
| formatter | 序号列格式化方法 | Function(index: number（在当前页的索引）, pagination: { current: number, pageSize: number}) => string | -        |

### Table Events

| 名称          | 描述                                     | 类型                                                         |
| :------------ | :--------------------------------------- | :----------------------------------------------------------- |
| change        | 分页变化时触发                           | `Function(pagination: { current: number, pageSize: number})` |
| click-action  | 点击默认行操作列时触发，事件传参为行数据 | `Function(record)`                                           |
| click-row     | 点击行时触发，事件传参为行数据           | `Function(record)`                                           |
| click-overlay | 点击行弹窗的遮罩时触发                   | `Function()`                                                 |

### Table Slots

| 名称       | 描述                                                         | 参数                                                     |
| :--------- | :----------------------------------------------------------- | :------------------------------------------------------- |
| bodyCell   | 个性化单元格                                                 | {text, record, index(当前页的行索引，从 0 开始), column} |
| emptyText  | 自定义空数据时的显示内容                                     | -                                                        |
| footer     | 表格尾部                                                     | currentPageData                                          |
| headerCell | 个性化头部单元格                                             | {title, column}                                          |
| title      | 表格标题                                                     | currentPageData                                          |
| toolbar    | 工具栏插槽                                                   | -                                                        |
| editor     | 详情弹窗中列的自定义内容，替换 `ep-form-item` 的默认插槽内容 | { colunm, record, editable }                             |
| form       | 详情弹窗中的自定义表单，替换整体`ep-form`                    | { record, editable }                                     |
| extra      | 分页和表格之间的自定义内容                                   | -                                                        |

### Table Exposes

| Name            | Description                                                                                                         | Type                                                      |
| :-------------- | :------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------- |
| add             | 新增一条数据，可传一条新数据模板，也可传新增数据的索引位置 (仅用于修改弹窗展示样式，实际数据根据 `dataSource` 展示) | `(newRow?: RecordType, index?: number) => void`           |
| toggleEdit      | 切换某行数据是否为编辑模式                                                                                          | `(flag?: boolean, rowKey?: string) => void`               |
| getRowData      | 获取某行数据，不传 rowKey 时获取当前弹窗数据                                                                        | `(rowKey?: string) => record`                             |
| getCurrRowIndex | 获取当前弹窗展示的行数据的索引                                                                                      | `() => number`                                            |
| toggleExpandRow | 切换行详情弹窗显隐，可传一个布尔值指定弹窗显隐，也可同时传一个具体的行数据进行展示                                  | `(flag?: boolean, rowData?: Record<string, any>) => void` |
| validateRow     | 用于编辑模式下校验弹窗的行数据表单                                                                                  | `() => Promise<{ valid, fields }>`                        |
| getFormRef      | 获取当前弹窗的行数据表单组件                                                                                        | `() => FormInstance`                                      |
| prev            | 行详情跳转上一条数据                                                                                                | `() => void`                                              |
| next            | 行详情跳转下一条数据                                                                                                | `() => void`                                              |
| resize          | 重新获取列宽                                                                                                        | `() => void`                                              |

### 注意 ​

在 Table 中，dataSource 和 columns 里的数据值都需要指定 key 值。对于 dataSource 默认将每列数据的 key 属性作为唯一的标识。

如果你的数据没有这个属性，务必使用 rowKey 来指定数据列的主键。若没有指定，控制台会出现缺少 key 的提示，表格组件也会出现各类奇怪的错误。

```html
<!-- 比如你的数据主键是 uid -->
<e-table-m rowKey="uid" />
```

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-table-m"
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