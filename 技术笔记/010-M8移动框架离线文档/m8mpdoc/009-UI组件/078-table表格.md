# 组件使用

## Table 表格

### 介绍

-   表格组件

::: ifdef M83

-   该组件自`v8.3.23-beta.3`版本开始支持

::: endif

::: ifdef M84

-   该组件自`v8.4.1-beta.1`版本开始支持

::: endif

### 代码演示

#### 基础用法

通过 `table` 组件 `data` 属性设置表格数据。

通过 `table-col` 组件 `prop` 设置列数据源字段，`label` 属性设置列标题。

```html
<em-table :data="origin" :height="400" align="center">
    <em-table-col prop="name" label="姓名" width="50%"></em-table-col>
    <em-table-col prop="score" label="分数" width="50%"></em-table-col>
</em-table>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            origin: [
                {
                    name: '赵云',
                    score: 87
                },
                {
                    name: '孔明',
                    score: 100
                },
                {
                    name: '刘备',
                    score: 90
                },
                ...
            ]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const origin = ref([
    {
        name: '赵云',
        score: 87
    },
    {
        name: '孔明',
        score: 100
    },
    {
        name: '刘备',
        score: 90
    },
    ...
]);
```

::: endif

#### 有边框

通过 `table` 组件 `border` 属性设置表格边框。

```html
<em-table :data="origin" :height="400" align="center" border>
    <em-table-col prop="name" label="姓名" width="50%"></em-table-col>
    <em-table-col prop="score" label="分数" width="50%"></em-table-col>
</em-table>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            origin: [
                {
                    name: '赵云',
                    score: 87
                },
                {
                    name: '孔明',
                    score: 100
                },
                {
                    name: '刘备',
                    score: 90
                },
                ...
            ]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const origin = ref([
    {
        name: '赵云',
        score: 87
    },
    {
        name: '孔明',
        score: 100
    },
    {
        name: '刘备',
        score: 90
    },
    ...
]);
```

::: endif

#### 无斑马纹

通过设置 `table` 组件 `stripe` 为 `false` 取消斑马纹。

```html
<em-table :data="origin" :height="400" align="center" border :stripe="false">
    <em-table-col prop="name" label="姓名" width="50%"></em-table-col>
    <em-table-col prop="score" label="分数" width="50%"></em-table-col>
</em-table>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            origin: [
                {
                    name: '赵云',
                    score: 87
                },
                {
                    name: '孔明',
                    score: 100
                },
                {
                    name: '刘备',
                    score: 90
                },
                ...
            ]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const origin = ref([
    {
        name: '赵云',
        score: 87
    },
    {
        name: '孔明',
        score: 100
    },
    {
        name: '刘备',
        score: 90
    },
    ...
]);
```

::: endif

#### 不展示表头

通过设置 `table` 组件 `showHeader` 为 `false` 隐藏表头。

```html
<em-table :data="origin" :height="400" align="center" :showHeader="false">
    <em-table-col prop="name" label="姓名" width="50%"></em-table-col>
    <em-table-col prop="score" label="分数" width="50%"></em-table-col>
</em-table>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            origin: [
                {
                    name: '赵云',
                    score: 87
                },
                {
                    name: '孔明',
                    score: 100
                },
                {
                    name: '刘备',
                    score: 90
                },
                ...
            ]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const origin = ref([
    {
        name: '赵云',
        score: 87
    },
    {
        name: '孔明',
        score: 100
    },
    {
        name: '刘备',
        score: 90
    },
    ...
]);
```

::: endif

#### 固定列

通过设置 `table-col` 组件 `fixed` 为 `true`，在横向滚动时固定对应列。

```html
<em-table :data="origin" :height="400" align="center">
    <em-table-col prop="name" label="姓名" fixed></em-table-col>
    <em-table-col prop="score" label="分数" fixed></em-table-col>
    <em-table-col prop="school" label="求学之所"></em-table-col>
    <em-table-col prop="major" label="专业" width="150"></em-table-col>
    <em-table-col prop="grade" label="年级"></em-table-col>
</em-table>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            origin: [
                {
                    name: '赵云',
                    score: 87,
                    school: '河南理工大学',
                    major: '计算机科学与技术',
                    grade: '2015级'
                },
                {
                    name: '孔明',
                    score: 100,
                    school: '河南理工大学',
                    major: '计算机科学与技术',
                    grade: '2015级'
                },
                {
                    name: '刘备',
                    score: 90,
                    school: '河南理工大学',
                    major: '计算机科学与技术',
                    grade: '2015级'
                },
                ...
            ]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const origin = ref([
    {
        name: '赵云',
        score: 87,
        school: '河南理工大学',
        major: '计算机科学与技术',
        grade: '2015级'
    },
    {
        name: '孔明',
        score: 100,
        school: '河南理工大学',
        major: '计算机科学与技术',
        grade: '2015级'
    },
    {
        name: '刘备',
        score: 90,
        school: '河南理工大学',
        major: '计算机科学与技术',
        grade: '2015级'
    },
    ...
]);
```

::: endif

#### 显示索引

通过设置 `table` 组件 `index` 为 `true`，展示索引列。

`index` 也可传入一个对象来对索引列进行配置，该对象可配置参数参考 `table-col` 组件的 `props`。

```html
<em-table :data="origin" :height="400" align="center" :index="{ align: 'center', width: 40 }">
    <em-table-col prop="name" label="姓名"></em-table-col>
    <em-table-col prop="score" label="分数"></em-table-col>
    <em-table-col prop="school" label="求学之所"></em-table-col>
    <em-table-col prop="major" label="专业" width="150"></em-table-col>
    <em-table-col prop="grade" label="年级"></em-table-col>
</em-table>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            origin: [
                {
                    name: '赵云',
                    score: 87,
                    school: '河南理工大学',
                    major: '计算机科学与技术',
                    grade: '2015级'
                },
                {
                    name: '孔明',
                    score: 100,
                    school: '河南理工大学',
                    major: '计算机科学与技术',
                    grade: '2015级'
                },
                {
                    name: '刘备',
                    score: 90,
                    school: '河南理工大学',
                    major: '计算机科学与技术',
                    grade: '2015级'
                },
                ...
            ]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const origin = ref([
    {
        name: '赵云',
        score: 87,
        school: '河南理工大学',
        major: '计算机科学与技术',
        grade: '2015级'
    },
    {
        name: '孔明',
        score: 100,
        school: '河南理工大学',
        major: '计算机科学与技术',
        grade: '2015级'
    },
    {
        name: '刘备',
        score: 90,
        school: '河南理工大学',
        major: '计算机科学与技术',
        grade: '2015级'
    },
    ...
]);
```

::: endif

#### 排序事件

通过设置 `table-col` 组件 `sortable` 为 `true`，开启该列排序功能。

通过监听 `table` 组件 `sort` 事件，获取对应列排序信息及配置信息（参考`table-col`的 `props`），进行数据排序。

```html
<em-table :data="dataList" :height="400" align="center" @sort="handleSort">
    <em-table-col prop="name" label="姓名" sortable></em-table-col>
    <em-table-col prop="score" label="分数" sortable></em-table-col>
    <em-table-col prop="school" label="求学之所"></em-table-col>
    <em-table-col prop="major" label="专业" width="150"></em-table-col>
    <em-table-col prop="grade" label="年级"></em-table-col>
</em-table>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            dataList: [],
            origin: [
                {
                    name: '赵云',
                    score: 87,
                    school: '河南理工大学',
                    major: '计算机科学与技术',
                    grade: '2015级'
                },
                {
                    name: '孔明',
                    score: 100,
                    school: '河南理工大学',
                    major: '计算机科学与技术',
                    grade: '2015级'
                },
                {
                    name: '刘备',
                    score: 90,
                    school: '河南理工大学',
                    major: '计算机科学与技术',
                    grade: '2015级'
                },
                ...
            ]
        };
    },
    created() {
        this.dataList = this.origin.slice(0);
    },
    methods: {
        handleSort(e) {
            // e.sortDirection === 0, 未排序
            // e.sortDirection === -1，升序, 箭头向下
            // e.sortDirection === 1，降序, 箭头向上
            const getSortFn = (prop, sortDirection) => {
                if (prop === 'name') {
                    return (a, b) => b.name.localeCompare(a.name) * sortDirection;
                } else if (prop === 'score') {
                    return (a, b) => (b.score - a.score) * sortDirection;
                }
            };
            this.dataList = this.origin.slice(0);
            this.dataList.sort(getSortFn(e.prop, e.sortDirection));
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const dataList = ref([]);
const origin = ref([
    {
        name: '赵云',
        score: 87,
        school: '河南理工大学',
        major: '计算机科学与技术',
        grade: '2015级'
    },
    {
        name: '孔明',
        score: 100,
        school: '河南理工大学',
        major: '计算机科学与技术',
        grade: '2015级'
    },
    {
        name: '刘备',
        score: 90,
        school: '河南理工大学',
        major: '计算机科学与技术',
        grade: '2015级'
    },
    ...
]);

dataList.value = origin.value.slice(0);

const handleSort = (e) => {
    // e.sortDirection === 0, 未排序
    // e.sortDirection === -1，升序, 箭头向下
    // e.sortDirection === 1，降序, 箭头向上
    const getSortFn = (prop, sortDirection) => {
        if (prop === 'name') {
            return (a, b) => b.name.localeCompare(a.name) * sortDirection;
        } else if (prop === 'score') {
            return (a, b) => (b.score - a.score) * sortDirection;
        }
    };
    dataList.value = origin.value.slice(0);
    dataList.value.sort(getSortFn(e.prop, e.sortDirection));
};
```

::: endif

#### 自定义列模板

通过 `table-col` 组件的 `value` 插槽，可以自定义该列每项内容。

通过 `Scoped slot` 可以获取到 `row`（该项数据）、 `index` 的数据

```html
<em-table :data="origin" :height="400" align="center">
    <em-table-col prop="name" label="姓名"></em-table-col>
    <em-table-col prop="score" label="分数">
        <template #value="{ row }">
            <view class="score-wrapper">
                <view class="score">{{ row.score }}</view>
                <view>
                    同比
                    <text class="compare">{{ row.compare }}</text>
                </view>
            </view>
        </template>
    </em-table-col>
    <em-table-col prop="school" label="求学之所"></em-table-col>
    <em-table-col prop="major" label="专业" width="150"></em-table-col>
    <em-table-col prop="grade" label="年级"></em-table-col>
</em-table>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            origin: [
                {
                    name: '赵云',
                    score: 87,
                    school: '河南理工大学',
                    major: '计算机科学与技术',
                    grade: '2015级',
                    compare: '1.2%'
                },
                {
                    name: '孔明',
                    score: 100,
                    school: '河南理工大学',
                    major: '计算机科学与技术',
                    grade: '2015级',
                    compare: '1.2%'
                },
                {
                    name: '刘备',
                    score: 90,
                    school: '河南理工大学',
                    major: '计算机科学与技术',
                    compare: '1.2%',
                    grade: '2015级'
                },
                ...
            ]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const origin = ref([
    {
        name: '赵云',
        score: 87,
        school: '河南理工大学',
        major: '计算机科学与技术',
        grade: '2015级',
        compare: '1.2%'
    },
    {
        name: '孔明',
        score: 100,
        school: '河南理工大学',
        major: '计算机科学与技术',
        grade: '2015级',
        compare: '1.2%'
    },
    {
        name: '刘备',
        score: 90,
        school: '河南理工大学',
        major: '计算机科学与技术',
        compare: '1.2%',
        grade: '2015级'
    },
    ...
]);
```

::: endif

#### 不固定表头结合分页器使用

```html
<em-table :data="dataList" align="center" :fixed-header="false">
    <em-table-col prop="name" label="姓名" fixed></em-table-col>
    <em-table-col prop="score" label="分数" fixed></em-table-col>
    <em-table-col prop="school" label="求学之所"></em-table-col>
    <em-table-col prop="major" label="专业" width="150"></em-table-col>
    <em-table-col prop="grade" label="年级"></em-table-col>
</em-table>
<em-pagination
    v-model="currentPage"
    :items-per-page="perPageSize"
    mode="simple"
    :total-items="origin.length"
></em-pagination>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            currentPage: 1,
            perPageSize: 5,
            origin: [
                {
                    name: '赵云',
                    score: 87,
                    school: '河南理工大学',
                    major: '计算机科学与技术',
                    grade: '2015级',
                    compare: '1.2%'
                },
                {
                    name: '孔明',
                    score: 100,
                    school: '河南理工大学',
                    major: '计算机科学与技术',
                    grade: '2015级',
                    compare: '1.2%'
                },
                {
                    name: '刘备',
                    score: 90,
                    school: '河南理工大学',
                    major: '计算机科学与技术',
                    compare: '1.2%',
                    grade: '2015级'
                },
                ...
            ]
        };
    },
    computed: {
        dataList(){
            return this.origin.slice((this.currentPage - 1) * this.perPageSize, this.currentPage * this.perPageSize);
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref, computed } from 'vue';
// 使用 ref 创建响应式数据
const currentPage = ref(1);
const perPageSize = ref(5);
const origin = ref([
    {
        name: '赵云',
        score: 87,
        school: '河南理工大学',
        major: '计算机科学与技术',
        grade: '2015级',
        compare: '1.2%'
    },
    {
        name: '孔明',
        score: 100,
        school: '河南理工大学',
        major: '计算机科学与技术',
        grade: '2015级',
        compare: '1.2%'
    },
    {
        name: '刘备',
        score: 90,
        school: '河南理工大学',
        major: '计算机科学与技术',
        compare: '1.2%',
        grade: '2015级'
    },
    ...
]);

const dataList = computed(() => origin.value.slice((currentPage.value - 1) * perPageSize.value, currentPage.value * perPageSize.value));
```

::: endif

### API

#### Table Props

| 参数         |                                      说明                                       | 类型            | 默认值  |
| :----------- | :-----------------------------------------------------------------------------: | :-------------- | :------ |
| data         |                                   表格数据源                                    | array           | `-`     |
| border       |                                  是否带有边框                                   | boolean         | `false` |
| stripe       |                                 是否为斑马纹表                                  | boolean         | `true`  |
| height       |           Table 的高度，无默认值，设置后自动开启固定表头，默认单位 px           | number / string | `-`     |
| rowHeight    |                                行高，默认单位 px                                | number / string | `50`    |
| showHeader   |                                  是否显示表头                                   | boolean         | `true`  |
| ellipsis     |                           文字较长时是否超出 2 行隐藏                           | boolean         | `true`  |
| index        | 是否显示索引列，可传入 boolean 也可传入列配置，参数参考 `table-col`组件的 props | boolean /       | `false` |
| fixed-header |            是否固定表头，需要结合 height 才可以实现固定表头的效果。             | boolean         | `true`  |
| clickable    |                                是否开启点击反馈                                 | boolean         | `false` |
| align        |              表格所有列对齐方式，可选值：`left`、`center`、`right`              | string          | `left`  |

#### Table Events

| 事件名    |                           说明                           | 回调参数                                                                                                           |
| :-------- | :------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------- |
| sort      | 点击排序时触发，当表格列 sortable 设置为 true 的时候有效 | e: { sortDirection: number (0--未排序, -1--箭头向下, 1--箭头向上), ...`TableColumn`(参考 `table-col`组件的 props)} |
| row-click |               当某一行被点击时会触发该事件               | e: { rowIndex: number（点击行的下标）}                                                                             |

#### Table 方法

通过 ref 可以获取到 Table 实例并调用实例方法，详见组件实例方法

| 方法名                  | 说明         | 参数 | 返回值 |
| :---------------------- | :----------- | :--- | :----- |
| resize `v8.4.4-beta.14` | 重新获取列宽 | -    | `void` |

#### TableCol Props

| 参数     |                      说明                       | 类型            | 默认值  |
| :------- | :---------------------------------------------: | :-------------- | :------ |
| prop     |           字段名称,对应列内容的字段名           | string          | `-`     |
| label    |                     列标题                      | string          | `-`     |
| width    | 对应列的宽度，默认单位为 px，不支持传入 `calc`  | number / string | `100`   |
| sortable |                 是否开启列排序                  | boolean         | `false` |
| fixed    |                  是否固定本列                   | boolean         | `false` |
| align    | 列的对齐方式, 可选值：`left`、`center`、`right` | string          | `left`  |

#### TableCol Slots

| 名称  | 说明               | 参数                                               |
| :---- | :----------------- | :------------------------------------------------- |
| value | 自定义列每项的内容 | row: Object （该项数据），index: number (该项下标) |

::: ifdef M83

<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-table"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-table"
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
