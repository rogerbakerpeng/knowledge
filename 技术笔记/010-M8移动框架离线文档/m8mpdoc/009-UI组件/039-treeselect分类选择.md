# 组件使用

## treeselect 分类选择

### 介绍

-   分类选择组件。

### 代码演示

#### 单选模式

`item`为分类显示所需的数据，数据格式见下方示例。`main-active-index`表示左侧高亮选项的索引，`active-id`表示右侧高亮选项的 `id`

::: ifdef M83

```html
<em-tree-select
    :items="items"
    :active-id.sync="activeId"
    :main-active-index.sync="activeIndex"
    @click-nav="onNavClick"
    @click-item="onItemClick"
></em-tree-select>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    data() {
        return {
            items: [
                {
                    text: '所有城市',
                    children: [
                        {
                            text: '温州',
                            id: 1,
                            disabled: true
                        },
                        {
                            text: '杭州',
                            id: 2
                        },
                        {
                            text: '南京',
                            id: 3
                        },
                        {
                            text: '苏州',
                            id: 4
                        }
                    ]
                },
                {
                    text: '浙江',
                    children: [
                        {
                            text: '温州',
                            id: 1,
                            disabled: true
                        },
                        {
                            text: '杭州',
                            id: 2
                        }
                    ]
                },
                {
                    text: '江苏',
                    children: [
                        {
                            text: '南京',
                            id: 3
                        },
                        {
                            text: '苏州',
                            id: 4
                        }
                    ]
                }
            ],
            activeId: 1,
            activeIndex: 1
        };
    },
    methods: {
        onNavClick(index) {
            Toast({
                message: `触发点击事件，index:${index}`
            });
        },
        onItemClick(item) {
            Toast({
                message: `触发点击事件，item:${JSON.stringify(item)}`
            });
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-tree-select
    :items="items"
    :v-model:active-id="activeId"
    :v-model:main-active-index="activeIndex"
    @click-nav="onNavClick"
    @click-item="onItemClick"
></em-tree-select>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';
const items = ref([
    {
        text: '所有城市',
        children: [
            {
                text: '温州',
                id: 1,
                disabled: true
            },
            {
                text: '杭州',
                id: 2
            },
            {
                text: '南京',
                id: 3
            },
            {
                text: '苏州',
                id: 4
            }
        ]
    },
    {
        text: '浙江',
        children: [
            {
                text: '温州',
                id: 1,
                disabled: true
            },
            {
                text: '杭州',
                id: 2
            }
        ]
    },
    {
        text: '江苏',
        children: [
            {
                text: '南京',
                id: 3
            },
            {
                text: '苏州',
                id: 4
            }
        ]
    }
]);

const activeId = ref(1);
const activeIndex = ref(1);

const onNavClick = (index) => {
    Toast({
        message: `触发点击事件，index:${index}`
    });
};

const onItemClick = (item) => {
    Toast({
        message: `触发点击事件，item:${JSON.stringify(item)}`
    });
};

const emToastRef = ref(null);

defineExpose({
    emToastRef
});
```

::: endif

#### 多选模式

`active-id`为数组格式时，可以选中多个右侧选项

::: ifdef M83

```html
<em-tree-select
    :items="items"
    :active-id.sync="activeIds"
    :main-active-index.sync="activeIndex1"
    @click-nav="onNavClick"
    @click-item="onItemClick"
></em-tree-select>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    data() {
        return {
            items: [
                {
                    text: '所有城市',
                    children: [
                        {
                            text: '温州',
                            id: 1,
                            disabled: true
                        },
                        {
                            text: '杭州',
                            id: 2
                        },
                        {
                            text: '南京',
                            id: 3
                        },
                        {
                            text: '苏州',
                            id: 4
                        }
                    ]
                },
                {
                    text: '浙江',
                    children: [
                        {
                            text: '温州',
                            id: 1,
                            disabled: true
                        },
                        {
                            text: '杭州',
                            id: 2
                        }
                    ]
                },
                {
                    text: '江苏',
                    children: [
                        {
                            text: '南京',
                            id: 3
                        },
                        {
                            text: '苏州',
                            id: 4
                        }
                    ]
                }
            ],
            activeIds: [2],
            activeIndex1: 1
        };
    },
    methods: {
        onNavClick(index) {
            Toast({
                message: `触发点击事件，index:${index}`
            });
        },
        onItemClick(item) {
            Toast({
                message: `触发点击事件，item:${JSON.stringify(item)}`
            });
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-tree-select
    :items="items"
    :v-model:active-id="activeIds"
    :v-model:main-active-index="activeIndex1"
    @click-nav="onNavClick"
    @click-item="onItemClick"
></em-tree-select>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';
const items = ref([
    {
        text: '所有城市',
        children: [
            {
                text: '温州',
                id: 1,
                disabled: true
            },
            {
                text: '杭州',
                id: 2
            },
            {
                text: '南京',
                id: 3
            },
            {
                text: '苏州',
                id: 4
            }
        ]
    },
    {
        text: '浙江',
        children: [
            {
                text: '温州',
                id: 1,
                disabled: true
            },
            {
                text: '杭州',
                id: 2
            }
        ]
    },
    {
        text: '江苏',
        children: [
            {
                text: '南京',
                id: 3
            },
            {
                text: '苏州',
                id: 4
            }
        ]
    }
]);

const activeIds = ref([2]);
const activeIndex1 = ref(1);

const onNavClick = (index) => {
    Toast({
        message: `触发点击事件，index:${index}`
    });
};

const onItemClick = (item) => {
    Toast({
        message: `触发点击事件，item:${JSON.stringify(item)}`
    });
};

const emToastRef = ref(null);

defineExpose({
    emToastRef
});
```

::: endif

#### 自定义内容

通过`content`插槽可以自定义右侧区域的内容

::: ifdef M83

```html
<em-tree-select :items="items1" :main-active-index.sync="activeIndex2" @click-nav="onNavClick">
    <template #content>
        <em-image v-if="activeIndex2 === 0" :width="240" :height="190" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
        <em-image :width="240" :height="190" v-if="activeIndex2 === 1" src="https://img.yzcdn.cn/vant/apple-2.jpg" />
    </template>
</em-tree-select>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    data() {
        return {
            activeIndex2: 1,
            items1: [{ text: '分组1' }, { text: '分组2' }]
        };
    },
    methods: {
        onNavClick(index) {
            Toast({
                message: `触发点击事件，index:${index}`
            });
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-tree-select :items="items1" :v-model:main-active-index="activeIndex2" @click-nav="onNavClick">
    <template #content>
        <em-image v-if="activeIndex2 === 0" :width="240" :height="190" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
        <em-image :width="240" :height="190" v-if="activeIndex2 === 1" src="https://img.yzcdn.cn/vant/apple-2.jpg" />
    </template>
</em-tree-select>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';
const items1 = ref([{ text: '分组1' }, { text: '分组2' }]);

const activeIndex2 = ref(1);

const onNavClick = (index) => {
    Toast({
        message: `触发点击事件，index:${index}`
    });
};

const emToastRef = ref(null);

defineExpose({
    emToastRef
});
```

::: endif

#### 徽标提示

设置`dot`属性后，会在图标右上角展示一个小红点。设置`badge`属性后，会在图标右上角展示相应的徽标

::: ifdef M83

```html
<em-tree-select :items="items2" :main-active-index.sync="activeIndex3"></em-tree-select>
```

```js
export default {
    data() {
        return {
            activeIndex3: 1,
            items2: [
                {
                    text: '浙江',
                    dot: true,
                    children: [
                        {
                            text: '温州',
                            id: 1,
                            disabled: true
                        },
                        {
                            text: '杭州',
                            id: 2
                        }
                    ]
                },
                {
                    text: '江苏',
                    badge: 5,
                    children: [
                        {
                            text: '南京',
                            id: 3
                        },
                        {
                            text: '苏州',
                            id: 4
                        }
                    ]
                }
            ]
        };
    }
};
```

::: endif
::: ifdef M84

```html
<em-tree-select :items="items2" :v-model:main-active-index="activeIndex3"></em-tree-select>
```

```js
import { ref } from 'vue';
const items2 = ref([
    {
        text: '浙江',
        dot: true,
        children: [
            {
                text: '温州',
                id: 1,
                disabled: true
            },
            {
                text: '杭州',
                id: 2
            }
        ]
    },
    {
        text: '江苏',
        badge: 5,
        children: [
            {
                text: '南京',
                id: 3
            },
            {
                text: '苏州',
                id: 4
            }
        ]
    }
]);

const activeIndex3 = ref(1);
```

::: endif

### API

#### Props

| 参数              |              说明               | 类型                                 | 默认值     |
| :---------------- | :-----------------------------: | :----------------------------------- | :--------- |
| items             |       分类显示所需的数据        | Item[]                               | `[]`       |
| height            |      高度，默认单位为`px`       | number / string                      | `300`      |
| main-active-index |        左侧选中项的索引         | number / string                      | `0`        |
| active-id         | 右侧选中项的 `id`，支持传入数组 | number / string /(number / string)[] | `0`        |
| max               |       右侧项最大选中个数        | number / string                      | `Infinity` |
| selected-icon     |   自定义右侧栏选中状态的图标    | string                               | `success`  |

#### Slots

| 名称    |        说明        |
| :------ | :----------------: |
| content | 自定义右侧区域内容 |

#### Events

| 事件名     |         说明         | 回调参数                  |
| :--------- | :------------------: | :------------------------ |
| click-nav  |  点击左侧导航时触发  | index：被点击的导航的索引 |
| click-item | 点击右侧选择项时触发 | data: 该点击项的数据      |

#### Item 数据结构

`items` 整体为一个数组，数组内包含一系列描述分类的对象，每个分类里，`text`表示当前分类的名称，`children`表示分类里的可选项。

```js
[
    {
        // 导航名称
        text: '所有城市',
        // 导航名称右上角徽标，2.5.6 版本开始支持
        badge: 3,
        // 是否在导航名称右上角显示小红点
        dot: true,
        // 导航节点额外类名
        className: 'my-class',
        // 该导航下所有的可选项
        children: [
            {
                // 名称
                text: '温州',
                // id，作为匹配选中状态的标识符
                id: 1,
                // 禁用选项
                disabled: true
            },
            {
                text: '杭州',
                id: 2
            }
        ]
    }
];
```

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-tree-select"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-tree-select"
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
