# TreeSelect 树形选择

下拉菜单的树选择器，结合了 `ep-tree` 和 `ep-select` 组件的功能。

## 基本用法

用于树形结构的选择器。

```html
<template>
  <e-tree-select-m v-model="value" :data="data" />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value = ref("");

  const data = [
    {
      value: "1",
      label: "Level one 1",
      children: [
        {
          value: "1-1",
          label: "Level two 1-1",
          children: [
            {
              value: "1-1-1",
              label: "Level three 1-1-1",
            },
          ],
        },
      ],
    },
    {
      value: "2",
      label: "Level one 2",
      children: [
        {
          value: "2-1",
          label: "Level two 2-1",
          children: [
            {
              value: "2-1-1",
              label: "Level three 2-1-1",
            },
          ],
        },
        {
          value: "2-2",
          label: "Level two 2-2",
          children: [
            {
              value: "2-2-1",
              label: "Level three 2-2-1",
            },
          ],
        },
      ],
    },
    {
      value: "3",
      label: "Level one 3",
      children: [
        {
          value: "3-1",
          label: "Level two 3-1",
          children: [
            {
              value: "3-1-1",
              label: "Level three 3-1-1",
            },
          ],
        },
        {
          value: "3-2",
          label: "Level two 3-2",
          children: [
            {
              value: "3-2-1",
              label: "Level three 3-2-1",
            },
          ],
        },
      ],
    },
  ];
</script>
```

## 复选框

设置 `checkable` 和 `multiple` 属性开启多选模式。

```html
<template>
  <e-tree-select-m v-model="value" :data="data" checkable multiple />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value = ref([]);

  const data = [
    {
      value: "1",
      label: "Level one 1",
      children: [
        {
          value: "1-1",
          label: "Level two 1-1",
          children: [
            {
              value: "1-1-1",
              label: "Level three 1-1-1",
            },
          ],
        },
      ],
    },
    {
      value: "2",
      label: "Level one 2",
      children: [
        {
          value: "2-1",
          label: "Level two 2-1",
          children: [
            {
              value: "2-1-1",
              label: "Level three 2-1-1",
            },
          ],
        },
        {
          value: "2-2",
          label: "Level two 2-2",
          children: [
            {
              value: "2-2-1",
              label: "Level three 2-2-1",
            },
          ],
        },
      ],
    },
  ];
</script>
```

## 单选框

设置 `checkable` 属性开启单选复选框模式。

```html
<template>
  <e-tree-select-m v-model="value" :data="data" checkable />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value = ref([]);

  const data = [
    {
      value: "1",
      label: "Level one 1",
      children: [
        {
          value: "1-1",
          label: "Level two 1-1",
          children: [
            {
              value: "1-1-1",
              label: "Level three 1-1-1",
            },
          ],
        },
      ],
    },
    {
      value: "2",
      label: "Level one 2",
      children: [
        {
          value: "2-1",
          label: "Level two 2-1",
          children: [
            {
              value: "2-1-1",
              label: "Level three 2-1-1",
            },
          ],
        },
        {
          value: "2-2",
          label: "Level two 2-2",
          children: [
            {
              value: "2-2-1",
              label: "Level three 2-2-1",
            },
          ],
        },
      ],
    },
  ];
</script>
```

## 复选框(非联动)

设置 `check-strictly` 为 `true` 开启非联动模式，父子节点选择状态不关联。

```html
<template>
  <e-tree-select-m
    v-model="value"
    :data="data"
    checkable
    multiple
    check-strictly
  />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value = ref([]);

  const data = [
    {
      value: "1",
      label: "Level one 1",
      children: [
        {
          value: "1-1",
          label: "Level two 1-1",
          children: [
            {
              value: "1-1-1",
              label: "Level three 1-1-1",
            },
          ],
        },
      ],
    },
    {
      value: "2",
      label: "Level one 2",
      children: [
        {
          value: "2-1",
          label: "Level two 2-1",
          children: [
            {
              value: "2-1-1",
              label: "Level three 2-1-1",
            },
          ],
        },
      ],
    },
  ];
</script>
```

## 定制回填方式

可以通过 `checked-strategy` 属性定制回填方式。

```html
<template>
  <div class="strategy-wrapper">
    <e-radio-group-m
      v-model="checkedStrategy"
      type="button"
      @change="handleStrategyChange"
    >
      <e-radio-m value="all">show all</e-radio-m>
      <e-radio-m value="parent">show parent</e-radio-m>
      <e-radio-m value="child">show child</e-radio-m>
    </e-radio-group-m>
  </div>
  <e-tree-select-m
    v-model="value"
    checkable
    multiple
    :checked-strategy="checkedStrategy"
    :data="data"
  />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value = ref([]);
  const checkedStrategy = ref("all");

  // 处理策略切换
  const handleStrategyChange = () => {
    value.value = [];
  };

  const data = [
    {
      value: "1",
      label: "Level one 1",
      children: [
        {
          value: "1-1",
          label: "Level two 1-1",
          children: [
            {
              value: "1-1-1",
              label: "Level three 1-1-1",
            },
          ],
        },
      ],
    },
    {
      value: "2",
      label: "Level one 2",
      children: [
        {
          value: "2-1",
          label: "Level two 2-1",
          children: [
            {
              value: "2-1-1",
              label: "Level three 2-1-1",
            },
          ],
        },
        {
          value: "2-2",
          label: "Level two 2-2",
          children: [
            {
              value: "2-2-1",
              label: "Level three 2-2-1",
            },
          ],
        },
      ],
    },
    {
      value: "3",
      label: "Level one 3",
      children: [
        {
          value: "3-1",
          label: "Level two 3-1",
          children: [
            {
              value: "3-1-1",
              label: "Level three 3-1-1",
            },
          ],
        },
        {
          value: "3-2",
          label: "Level two 3-2",
          children: [
            {
              value: "3-2-1",
              label: "Level three 3-2-1",
            },
          ],
        },
      ],
    },
  ];
</script>
```

## 禁用选项

使用禁用字段禁用选项。

```html
<template>
  <e-tree-select-m v-model="value" :data="disabledData" />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value = ref("");

  const disabledData = [
    {
      value: "1",
      label: "Level one 1",
      disabled: true,
      children: [
        {
          value: "1-1",
          label: "Level two 1-1",
          disabled: true,
          children: [
            {
              disabled: true,
              value: "1-1-1",
              label: "Level three 1-1-1",
            },
          ],
        },
      ],
    },
    {
      value: "2",
      label: "Level one 2",
      children: [
        {
          value: "2-1",
          label: "Level two 2-1",
          children: [
            {
              value: "2-1-1",
              label: "Level three 2-1-1",
            },
          ],
        },
        {
          value: "2-2",
          label: "Level two 2-2",
          children: [
            {
              value: "2-2-1",
              label: "Level three 2-2-1",
            },
          ],
        },
      ],
    },
    {
      value: "3",
      label: "Level one 3",
      children: [
        {
          value: "3-1",
          label: "Level two 3-1",
          children: [
            {
              value: "3-1-1",
              label: "Level three 3-1-1",
            },
          ],
        },
        {
          value: "3-2",
          label: "Level two 3-2",
          children: [
            {
              value: "3-2-1",
              label: "Level three 3-2-1",
            },
          ],
        },
      ],
    },
  ];
</script>
```

## 可过滤（带选框）

通过 `filterable` 属性开启过滤功能。

```html
<template>
  <e-tree-select-m v-model="value" :data="data" filterable checkable />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value = ref([]);

  const data = [
    {
      value: "1",
      label: "Level one 1",
      children: [
        {
          value: "1-1",
          label: "Level two 1-1",
          children: [
            {
              value: "1-1-1",
              label: "Level three 1-1-1",
            },
          ],
        },
      ],
    },
    {
      value: "2",
      label: "Level one 2",
      children: [
        {
          value: "2-1",
          label: "Level two 2-1",
          children: [
            {
              value: "2-1-1",
              label: "Level three 2-1-1",
            },
          ],
        },
        {
          value: "2-2",
          label: "Level two 2-2",
          children: [
            {
              value: "2-2-1",
              label: "Level three 2-2-1",
            },
          ],
        },
      ],
    },
    {
      value: "3",
      label: "Level one 3",
      children: [
        {
          value: "3-1",
          label: "Level two 3-1",
          children: [
            {
              value: "3-1-1",
              label: "Level three 3-1-1",
            },
          ],
        },
        {
          value: "3-2",
          label: "Level two 3-2",
          children: [
            {
              value: "3-2-1",
              label: "Level three 3-2-1",
            },
          ],
        },
      ],
    },
  ];
</script>
```

## 远程搜索（带选框）

可通过 `filterMethod` 来实现远程搜索。

```html
<template>
  <e-tree-select-m
    v-model="value"
    :data="remoteData"
    filterable
    checkable
    :filter-method="filterMethod"
    :loading="isLoading"
  />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value = ref([]);
  const isLoading = ref(false);

  // 基础树形数据
  const data = [
    {
      value: "1",
      label: "Level one 1",
      children: [
        {
          value: "1-1",
          label: "Level two 1-1",
          children: [
            {
              value: "1-1-1",
              label: "Level three 1-1-1",
            },
          ],
        },
      ],
    },
    {
      value: "2",
      label: "Level one 2",
      children: [
        {
          value: "2-1",
          label: "Level two 2-1",
          children: [
            {
              value: "2-1-1",
              label: "Level three 2-1-1",
            },
          ],
        },
        {
          value: "2-2",
          label: "Level two 2-2",
          children: [
            {
              value: "2-2-1",
              label: "Level three 2-2-1",
            },
          ],
        },
      ],
    },
    {
      value: "3",
      label: "Level one 3",
      children: [
        {
          value: "3-1",
          label: "Level two 3-1",
          children: [
            {
              value: "3-1-1",
              label: "Level three 3-1-1",
            },
          ],
        },
        {
          value: "3-2",
          label: "Level two 3-2",
          children: [
            {
              value: "3-2-1",
              label: "Level three 3-2-1",
            },
          ],
        },
      ],
    },
  ];

  const remoteData = ref([...data]); // 初始化为完整数据

  // 远程搜索的模拟数据源
  const sourceData = [...data];

  /**
   * 远程搜索方法
   * 根据关键字过滤树形数据
   * @param keyword 搜索关键字
   */
  const filterMethod = (keyword) => {
    const loop = (treeData) => {
      const result = [];

      if (!treeData || !Array.isArray(treeData)) {
        return result;
      }

      treeData.forEach((item) => {
        if (
          item.label &&
          item.label.toLowerCase().includes(keyword.toLowerCase())
        ) {
          result.push({ ...item });
        } else if (item.children && item.children.length > 0) {
          const childData = loop(item.children);

          if (childData.length > 0) {
            result.push({
              ...item,
              children: childData,
            });
          }
        }
      });

      return result;
    };

    return new Promise((resolve) => {
      isLoading.value = true;

      setTimeout(() => {
        try {
          let filteredData;

          // 如果搜索关键字为空，返回所有数据
          if (!keyword || keyword.trim() === "") {
            filteredData = [...sourceData];
          } else {
            filteredData = loop(sourceData);
          }

          remoteData.value = filteredData;
          isLoading.value = false;
          resolve(filteredData);
        } catch (error) {
          console.error("搜索过程中出现错误:", error);
          isLoading.value = false;
          remoteData.value = [];
          resolve([]);
        }
      }, 1000); // 增加延时以便看到加载效果
    });
  };
</script>
```

## 自定义内容

自定义树节点的内容。

```html
<template>
  <e-tree-select-m v-model="value" :data="data" placeholder="自定义节点显示内容">
    <template #default="{ data: { label } }">
      {{ label }}
      <span style="color: gray; font-size: 12px">(suffix)</span>
    </template>
  </e-tree-select-m>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value = ref("");

  const data = [
    {
      value: "1",
      label: "Level one 1",
      children: [
        {
          value: "1-1",
          label: "Level two 1-1",
          children: [
            {
              value: "1-1-1",
              label: "Level three 1-1-1",
            },
          ],
        },
      ],
    },
    {
      value: "2",
      label: "Level one 2",
      children: [
        {
          value: "2-1",
          label: "Level two 2-1",
          children: [
            {
              value: "2-1-1",
              label: "Level three 2-1-1",
            },
          ],
        },
        {
          value: "2-2",
          label: "Level two 2-2",
          children: [
            {
              value: "2-2-1",
              label: "Level three 2-2-1",
            },
          ],
        },
      ],
    },
    {
      value: "3",
      label: "Level one 3",
      children: [
        {
          value: "3-1",
          label: "Level two 3-1",
          children: [
            {
              value: "3-1-1",
              label: "Level three 3-1-1",
            },
          ],
        },
        {
          value: "3-2",
          label: "Level two 3-2",
          children: [
            {
              value: "3-2-1",
              label: "Level three 3-2-1",
            },
          ],
        },
      ],
    },
  ];
</script>
```

## 延迟加载

延迟加载树节点，适用于大数据列表。通过 `load-more` 属性实现节点的延迟加载。

```html
<template>
  <e-tree-select-m
    v-model="value"
    :data="defaultTreeData"
    :load-more="loadMore"
  />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const value = ref("");

  // 延迟加载的初始数据
  const defaultTreeData = ref([
    {
      value: "node1",
      label: "node1",
      disabled: true,
      children: [
        {
          value: "node2",
          label: "node2",
        },
      ],
    },
    {
      value: "node3",
      label: "node3",
      children: [
        {
          value: "node4",
          label: "node4",
          isLeaf: true,
        },
        {
          value: "node5",
          label: "node5",
          isLeaf: true,
        },
      ],
    },
  ]);

  /**
   * 延迟加载子节点方法
   * 动态生成子节点数据
   * @param nodeData 当前节点数据
   */
  const loadMore = (nodeData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        nodeData.children = Array.from({
          length: (Math.random() * 10 + 2) >>> 0,
        })
          .fill(0)
          .map((_, i) => {
            const n = i + 1;

            return {
              label: `${nodeData.label}-${n}`,
              value: `${nodeData.value}-${n}`,
              isLeaf: Math.random() > 0.6,
            };
          });
        resolve("");
      }, 1000);
    });
  };
</script>
```

## API

### Attributes

由于此组件结合了 `ep-tree` 和 `ep-select` 组件的功能，原有的属性没有更改，因此不会重复列出，
请前往原始组件查看文档。

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-tree-select-m"
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