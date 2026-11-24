# Tree

对于文件夹、分类目录、组织架构等层级较多的内容，树可以清楚显示他们的层级关系，并具有展开、收起、选择等交互功能。

## 跨端兼容说明

Tree 组件支持 H5 和小程序跨端使用：

- **H5 环境**：支持文档所有功能
- **小程序环境**：支持核心功能，h 渲染函数相关功能不支持，建议使用插槽方式自定义图标

涉及 h 渲染函数的功能（如 `typeIcon`、`icon`、`loadingIcon` 等）仅在 H5 环境下可用。

## 基本用法

为每个节点赋予全局唯一的 `value`（必填项），`label` 为该节点显示的内容。

```html
<template>
  <e-tree-m
    :data="treeData"
    :default-expanded-keys="['0-0-0']"
    :default-selected-keys="['0-1-1-2']"
    @select="handleSelect"
  />
</template>

<script lang="ts" setup>
  const treeData = [
    {
      label: "Trunk 0-0",
      value: "0-0",
      children: [
        {
          label: "Leaf",
          value: "0-0-1",
        },
        {
          label: "Branch 0-0-2",
          value: "0-0-2",
          disabled: true,
          children: [
            {
              label: "Leaf",
              value: "0-0-2-1",
            },
            {
              label: "Leaf",
              value: "0-0-2-2",
              disableCheckbox: true,
            },
          ],
        },
      ],
    },
    {
      label: "Trunk 0-1",
      value: "0-1",
      children: [
        {
          label: "Branch 0-1-1",
          value: "0-1-1",
          children: [
            {
              label: "Leaf",
              value: "0-1-1-1",
            },
            {
              label: "Leaf",
              value: "0-1-1-2",
            },
          ],
        },
        {
          label: "Leaf",
          value: "0-1-2",
        },
      ],
    },
  ];

  const handleSelect = (selectedKeys, eventData) => {
    console.log("选中节点:", selectedKeys, eventData);
  };
</script>
```

## 带单选框的树

为 `Tree` 添加 `checkable` 属性，并设置 `multiple` 属性为 `false`（默认值），即可使树具有单选框功能。

```html
<template>
  <e-tree-m
    v-model:checked-keys="checkedKeys"
    :checkable="true"
    :multiple="false"
    :data="treeData"
  />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const checkedKeys = ref([]);
  const treeData = [
    {
      label: "Trunk 0-0",
      value: "0-0",
      children: [
        {
          label: "Leaf",
          value: "0-0-1",
        },
        {
          label: "Branch 0-0-2",
          value: "0-0-2",
          disabled: true,
          children: [
            {
              label: "Leaf",
              value: "0-0-2-1",
            },
            {
              label: "Leaf",
              value: "0-0-2-2",
              disableCheckbox: true,
            },
          ],
        },
      ],
    },
    {
      label: "Trunk 0-1",
      value: "0-1",
      children: [
        {
          label: "Branch 0-1-1",
          value: "0-1-1",
          children: [
            {
              label: "Leaf",
              value: "0-1-1-1",
            },
            {
              label: "Leaf",
              value: "0-1-1-2",
            },
          ],
        },
        {
          label: "Leaf",
          value: "0-1-2",
        },
      ],
    },
  ];
</script>
```

## 带复选框的树

为 `Tree` 添加 `checkable` 属性，并设置 `multiple` 属性为 `true`，即可使树具有复选框功能

```html
<template>
  <div class="example-flex">
    <e-checkbox-m v-model="checkStrictly">checkStrictly</e-checkbox-m>
  </div>
  <e-tree-m
    v-model:checked-keys="checkedKeys"
    :checkable="true"
    :multiple="true"
    :check-strictly="checkStrictly"
    :data="treeData"
  />
</template>

<script lang="ts" setup>
  const checkedKeys = ref([]);
  const checkStrictly = ref(false);
  const treeData = [
    {
      label: "Trunk 0-0",
      value: "0-0",
      children: [
        {
          label: "Leaf",
          value: "0-0-1",
        },
        {
          label: "Branch 0-0-2",
          value: "0-0-2",
          disabled: true,
          children: [
            {
              label: "Leaf",
              value: "0-0-2-1",
            },
            {
              label: "Leaf",
              value: "0-0-2-2",
              disableCheckbox: true,
            },
          ],
        },
      ],
    },
    {
      label: "Trunk 0-1",
      value: "0-1",
      children: [
        {
          label: "Branch 0-1-1",
          value: "0-1-1",
          children: [
            {
              label: "Leaf",
              value: "0-1-1-1",
            },
            {
              label: "Leaf",
              value: "0-1-1-2",
            },
          ],
        },
        {
          label: "Leaf",
          value: "0-1-2",
        },
      ],
    },
  ];
</script>
```

## 双向绑定示例

树组件的 `selectedKeys`、`checkedKeys`、`expandedKeys` 属性均支持双向绑定，可以通过 `v-model` 或在对应的事件中自行控制属性值。

```html
<template>
  <div>
    <e-button-m type="primary" @click="toggleChecked"
      >{{ isAllNodesChecked ? '取消全选' : '全选' }}</e-button-m
    >
    <e-tree-m
      v-model:selected-keys="selectedKeys"
      v-model:checked-keys="checkedKeys"
      v-model:expanded-keys="expandedKeys"
      :checkable="true"
      :multiple="true"
      :data="treeData"
      :check-strictly="false"
      @select="onSelect"
      @check="onCheck"
      @expand="onExpand"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from "vue";

  const selectedKeys = ref<string[]>([]);
  const checkedKeys = ref<string[]>([]);
  const expandedKeys = ref<string[]>([]);

  // 所有可选中的节点键值（排除禁用节点和禁用复选框的节点及其子节点）
  const allCheckedKeys = [
    "0-0",
    "0-0-1",
    "0-1",
    "0-1-1",
    "0-1-1-1",
    "0-1-1-2",
    "0-1-2",
    // 注意：排除了 '0-0-2'(disabled), '0-0-2-1', '0-0-2-2'(disableCheckbox)
  ];

  // 计算是否所有节点都被选中
  const isAllNodesChecked = computed(() => {
    return (
      checkedKeys.value.length === allCheckedKeys.length &&
      allCheckedKeys.every((key) => checkedKeys.value.includes(key))
    );
  });

  // 切换全选/取消全选
  const toggleChecked = () => {
    checkedKeys.value = isAllNodesChecked.value ? [] : allCheckedKeys;
  };

  // 事件处理函数
  const onSelect = (newSelectedKeys, event) => {
    console.log("select:", newSelectedKeys, event);
    // 这里可以自行控制如何更新selectedKeys
    // selectedKeys.value = newSelectedKeys;
  };

  const onCheck = (newCheckedKeys, event) => {
    console.log("check:", newCheckedKeys, event);
    // 这里可以自行控制如何更新checkedKeys
    // checkedKeys.value = newCheckedKeys;
  };

  const onExpand = (newExpandedKeys, event) => {
    console.log("expand:", newExpandedKeys, event);
    // 这里可以自行控制如何更新expandedKeys
    // expandedKeys.value = newExpandedKeys;
  };

  const treeData = [
    {
      label: "Trunk 0-0",
      value: "0-0",
      children: [
        {
          label: "Leaf 0-0-1",
          value: "0-0-1",
        },
        {
          label: "Branch 0-0-2",
          value: "0-0-2",
          disabled: true,
          children: [
            {
              label: "Leaf 0-0-2-1",
              value: "0-0-2-1",
            },
            {
              label: "Leaf 0-0-2-2",
              value: "0-0-2-2",
              disableCheckbox: true,
            },
          ],
        },
      ],
    },
    {
      label: "Trunk 0-1",
      value: "0-1",
      children: [
        {
          label: "Leaf 0-1-1",
          value: "0-1-1",
          children: [
            {
              label: "Leaf 0-1-1-1",
              value: "0-1-1-1",
            },
            {
              label: "Leaf 0-1-1-2",
              value: "0-1-1-2",
            },
          ],
        },
        {
          label: "Leaf 0-1-2",
          value: "0-1-2",
        },
      ],
    },
  ];
</script>
```

## 设置回填方式

为 `Tree` 添加 `checked-strategy` 属性可以设置选中时的回填方式。

```html
<template>
  <div>
    <e-radio-group-m v-model="checkedStrategy" type="button">
      <e-radio-m value="all">show all</e-radio-m>
      <e-radio-m value="parent">show parent</e-radio-m>
      <e-radio-m value="child">show child</e-radio-m>
    </e-radio-group-m>
    <e-tree-m
      v-model:checked-keys="checkedKeys"
      :checkable="true"
      :multiple="true"
      :checked-strategy="checkedStrategy"
      :data="treeData"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const checkedKeys = ref([]);
  const checkedStrategy = ref("all");
  const treeData = [
    {
      label: "Trunk 0-0",
      value: "0-0",
      children: [
        {
          label: "Leaf",
          value: "0-0-1",
        },
        {
          label: "Branch 0-0-2",
          value: "0-0-2",
          disabled: true,
          children: [
            {
              label: "Leaf",
              value: "0-0-2-1",
            },
            {
              label: "Leaf",
              value: "0-0-2-2",
              disableCheckbox: true,
            },
          ],
        },
      ],
    },
    {
      label: "Trunk 0-1",
      value: "0-1",
      children: [
        {
          label: "Branch 0-1-1",
          value: "0-1-1",
          children: [
            {
              label: "Leaf",
              value: "0-1-1-1",
            },
            {
              label: "Leaf",
              value: "0-1-1-2",
            },
          ],
        },
        {
          label: "Leaf",
          value: "0-1-2",
        },
      ],
    },
  ];
</script>
```

## 定制额外节点

Tree 提供了名为 `extra` 的插槽，可以在节点上定制额外的内容。

```html
<template>
  <e-tree-m
    :data="extraNodeTreeData"
    :block-node="true"
    :checkable="true"
    :multiple="true"
  >
    <template #extra="nodeData">
      <e-icon-m
        style="color: #3370ff; margin-left: 8px"
        @click="() => onIconClick(nodeData)"
      >
        <Plus />
      </e-icon-m>
      <e-icon-m
        style="color: #f53f3f; margin-left: 8px"
        @click="() => onIconClick(nodeData)"
      >
        <Minus />
      </e-icon-m>
    </template>
  </e-tree-m>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { Plus, Minus } from "@epoint-mfe/eui-icons";

  // 定制额外节点示例数据
  const extraNodeTreeData = ref([
    {
      label: "Trunk 0-0",
      value: "0-0",
      children: [
        {
          label: "Branch 0-0-0",
          value: "0-0-0",
          children: [
            {
              label: "Leaf 0-0-0-0",
              value: "0-0-0-0",
            },
            {
              label: "Leaf 0-0-0-1",
              value: "0-0-0-1",
            },
          ],
        },
        {
          label: "Branch 0-0-1",
          value: "0-0-1",
          children: [
            {
              label: "Leaf 0-0-1-0",
              value: "0-0-1-0",
            },
          ],
        },
      ],
    },
  ]);

  // 添加节点处理函数
  const onIconClick = (nodeData) => {
    console.log("onIconClick", nodeData);
  };
</script>
```

## 动态加载节点

可通过 `load-more` 属性来实现节点的动态加载数据，点击展开时会显示 loading 效果。

```html
<template>
  <e-tree-m :data="treeData" :load-more="loadMore" />
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const treeData = ref([
    {
      label: "Trunk 0-0",
      value: "0-0",
      isLeaf: false,
    },
    {
      label: "Trunk 0-1",
      value: "0-1",
      children: [
        {
          label: "Branch 0-1-1",
          value: "0-1-1",
        },
      ],
    },
  ]);

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

## 定制组件图标

### 加载中图标

`loadingIcon`，同时支持在 `tree`（插槽） 和 `node` (方法) 两个纬度上定制，其中 `node` 的优先级较高。

```html
<template>
  <div>
    <e-button-m type="primary" @click="resetLoadingData">重置加载数据</e-button-m>
    <e-tree-m :data="loadingTreeData" :load-more="loadMoreNodes">
      <template #loading-icon="{ isLeaf, loading }">
        <!-- 定制 loading 图标 -->
        <!-- 使用 is-loading 类让图标旋转 -->
        <e-icon-m v-if="!isLeaf && loading" class="is-loading">
          <Promotion />
        </e-icon-m>
      </template>
    </e-tree-m>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  // #ifdef H5
  import { h } from "vue";
  // #endif
  import { Promotion, Loading } from "@epoint-mfe/eui-icons";

  const loadingDelay = ref(2); // 加载延迟时间（秒）
  const loadingTreeData = ref([
    {
      label: "父节点 0-0",
      value: "0-0",
      isLeaf: false,
      children: [], // 空的children数组，表示需要动态加载
    },
    {
      label: "父节点 0-1",
      value: "0-1",
      isLeaf: false,
      children: [
        {
          label: "子节点 0-1-1",
          value: "0-1-1",
          isLeaf: true,
        },
      ],
    },
    {
      label: "父节点 0-2 (自定义loading图标)",
      value: "0-2",
      isLeaf: false,
      children: [],
      loadingIcon: ({ loading }) => {
        if (loading) {
          return h(
            "span",
            {
              class: "custom-loading-icon",
              style: { color: "red" },
            },
            h(Loading)
          );
        }
        return null;
      },
    },
  ]);

  // 重置加载数据
  const resetLoadingData = () => {
    loadingTreeData.value = [
      {
        label: "父节点 0-0",
        value: "0-0",
        isLeaf: false,
        children: [],
      },
      {
        label: "父节点 0-1",
        value: "0-1",
        isLeaf: false,
        children: [
          {
            label: "子节点 0-1-1",
            value: "0-1-1",
            isLeaf: true,
          },
        ],
      },
      {
        label: "父节点 0-2 (自定义loading图标)",
        value: "0-2",
        isLeaf: false,
        children: [],
        // #ifdef H5
        loadingIcon: ({ loading }) => {
          if (loading) {
            return h(
              "span",
              {
                class: "custom-loading-icon",
                style: { color: "red" },
              },
              h(Loading)
            );
          }
          return null;
        },
        // #endif
      },
    ];
  };

  // 加载更多节点的方法
  const loadMoreNodes = (nodeData) => {
    return new Promise<void>((resolve) => {
      // 模拟加载延迟
      setTimeout(() => {
        // 确保为非叶子节点
        nodeData.isLeaf = false;

        // 创建子节点
        const childCount = Math.floor(Math.random() * 3) + 2; // 2-4个子节点
        const newChildren = [];

        for (let i = 0; i < childCount; i++) {
          const n = i + 1;
          const isChildLeaf = Math.random() > 0.7; // 70%概率是叶子节点
          const childKey = `${nodeData.value}-${n}`;

          const childNode: any = {
            label: `${nodeData.label}-${n}`,
            value: childKey,
            key: childKey,
            isLeaf: isChildLeaf,
            children: isChildLeaf ? undefined : [], // 非叶子节点提供空children数组
          };

          // 如果父节点有自定义loadingIcon，子节点也继承
          if (nodeData.loadingIcon) {
            childNode.loadingIcon = nodeData.loadingIcon;
          }

          newChildren.push(childNode);
        }

        // 更新节点的children属性
        nodeData.children = newChildren;

        // 确保DOM更新后再返回
        setTimeout(() => {
          resolve();
        }, 0);
      }, loadingDelay.value * 1000); // 使用设定的延迟时间
    });
  };
</script>
```

### 类型图标

通过 `showTypeIcon` 属性可以开启类型图标的显示。此图标显示在展开图标之后，勾选节点之前。

`show-type-icon` 属性可开启类型图标的显示。默认行为： 父节点显示文件夹图标（区分打开收起），子节点显示文件图标。

```html
<template>
  <div>
    <e-switch-m
      v-model="showTypeIcon"
      active-text="显示类型图标"
      inactive-text="隐藏类型图标"
    />
    <e-tree-m
      :data="treeData"
      :show-type-icon="showTypeIcon"
      checkable
      multiple
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const showTypeIcon = ref(true);
  const treeData = [
    {
      label: "Trunk 0-0",
      value: "0-0",
      children: [
        {
          label: "Leaf",
          value: "0-0-1",
        },
        {
          label: "Branch 0-0-2",
          value: "0-0-2",
          disabled: true,
          children: [
            {
              label: "Leaf",
              value: "0-0-2-1",
            },
            {
              label: "Leaf",
              value: "0-0-2-2",
              disableCheckbox: true,
            },
          ],
        },
      ],
    },
    {
      label: "Trunk 0-1",
      value: "0-1",
      children: [
        {
          label: "Branch 0-1-1",
          value: "0-1-1",
          children: [
            {
              label: "Leaf",
              value: "0-1-1-1",
            },
            {
              label: "Leaf",
              value: "0-1-1-2",
            },
          ],
        },
        {
          label: "Leaf",
          value: "0-1-2",
        },
      ],
    },
  ];
</script>
```

### 类型图标自定义

可以通过 tree 的 `type-icon` 插槽全局指定，也可以通过节点的 `typeIcon` 属性单独指定。

```html
<template>
  <e-tree-m :data="typeIconTreeData" checkable multiple show-type-icon>
    <template #type-icon="{ isLeaf, expanded }">
      <!-- 定制 type 图标 -->
      <template v-if="!isLeaf">
        <Folder v-if="!expanded" />
        <FolderOpened v-else />
      </template>
      <template v-else>
        <User />
      </template>
    </template>
  </e-tree-m>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  // #ifdef H5
  import { h } from "vue";
  // #endif
  import {
    Folder,
    FolderOpened,
    User,
    UserFilled,
    Finished,
  } from "@epoint-mfe/eui-icons";

  const typeIconTreeData = [
    {
      label: "父节点1",
      value: "node1",
      children: [
        {
          label: "Leaf",
          value: "node2",
        },
      ],
    },
    {
      label: "父节点2个性化图标，显示成加减号",
      value: "node3",
      // #ifdef H5
      typeIcon: ({ expanded }) => {
        return h("span", `${expanded ? "-" : "+"}`);
      },
      // #endif
      children: [
        {
          label: "叶子节点4",
          value: "node4",
        },
        {
          label: "叶子节点5",
          value: "node5",
        },
        {
          label: "叶子节点6, 个性化成不一样的用户图标",
          value: "node6",
          // #ifdef H5
          typeIcon: () => h(UserFilled),
          // #endif
        },
      ],
    },
  ];
</script>
```

### 节点图标

通过 `show-icon` 属性可以开启节点图标的显示。默认行为：父节点显示文件夹图标（区分打开收起），子节点显示文件图标。

```html
<template>
  <e-tree-m :data="treeData" show-icon checkable multiple />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const treeData = [
    {
      label: "Trunk 0-0",
      value: "0-0",
      children: [
        {
          label: "Branch 0-0-0",
          value: "0-0-0",
          children: [
            {
              label: "Leaf",
              value: "0-0-0-0",
            },
            {
              label: "Leaf",
              value: "0-0-0-1",
            },
          ],
        },
        {
          label: "Branch 0-0-1",
          value: "0-0-1",
          children: [
            {
              label: "Leaf",
              value: "0-0-1-0",
            },
          ],
        },
      ],
    },
  ];
</script>
```

### 节点图标自定义

节点图标可以通过 `tree` 的 `icon` 插槽全局指定，也可以通过节点的 `icon` 属性单独指定。

```html
<template>
  <e-tree-m :data="nodeIconTreeData" checkable multiple show-icon>
    <template #icon="{ isLeaf, expanded }">
      <!-- 定制节点图标 -->
      <template v-if="!isLeaf">
        <Folder v-if="!expanded" />
        <FolderOpened v-else />
      </template>
      <template v-else>
        <User />
      </template>
    </template>
  </e-tree-m>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  // #ifdef H5
  import { h } from "vue";
  // #endif
  import {
    Folder,
    FolderOpened,
    User,
    UserFilled,
    Finished,
  } from "@epoint-mfe/eui-icons";

  const nodeIconTreeData = [
    {
      label: "父节点1",
      value: "node1",
      children: [
        {
          label: "Leaf",
          value: "node2",
        },
      ],
    },
    {
      label: "父节点2个性化图标",
      value: "node3",
      // #ifdef H5
      icon: ({ expanded }) => {
        return h("span", { style: "color:red" }, `${expanded ? "-" : "+"}`);
      },
      // #endif
      children: [
        {
          label: "叶子节点6, 个性化成不一样的用户图标",
          value: "node6",
          // #ifdef H5
          icon: () => {
            return h(
              "span",
              {
                style: { color: "red" },
              },
              [h(UserFilled)]
            );
          },
          // #endif
        },
      ],
    },
  ];
</script>
```

## 搜索树

为 `Tree` 添加 `show-filter` 属性可以开启搜索功能。

### 搜索树（单选）

```html
<template>
  <e-tree-m
    v-model:checked-keys="searchSingleCheckedKeys"
    :data="treeData"
    show-filter
    checkable
    :multiple="false"
  />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const searchSingleCheckedKeys = ref([]);
  const treeData = [
    {
      label: "Trunk 0-0",
      value: "0-0",
      children: [
        {
          label: "Leaf",
          value: "0-0-1",
        },
        {
          label: "Branch 0-0-2",
          value: "0-0-2",
          disabled: true,
          children: [
            {
              label: "Leaf",
              value: "0-0-2-1",
            },
            {
              label: "Leaf",
              value: "0-0-2-2",
              disableCheckbox: true,
            },
          ],
        },
      ],
    },
    {
      label: "Trunk 0-1",
      value: "0-1",
      children: [
        {
          label: "Branch 0-1-1",
          value: "0-1-1",
          children: [
            {
              label: "Leaf",
              value: "0-1-1-1",
            },
            {
              label: "Leaf",
              value: "0-1-1-2",
            },
          ],
        },
        {
          label: "Leaf",
          value: "0-1-2",
        },
      ],
    },
  ];
</script>
```

### 搜索树（多选）

```html
<template>
  <e-tree-m
    v-model:checked-keys="searchMultiCheckedKeys"
    :data="treeData"
    show-filter
    checkable
    :multiple="true"
    :check-strictly="false"
  />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const searchMultiCheckedKeys = ref([]);
  const treeData = [
    {
      label: "Trunk 0-0",
      value: "0-0",
      children: [
        {
          label: "Leaf",
          value: "0-0-1",
        },
        {
          label: "Branch 0-0-2",
          value: "0-0-2",
          disabled: true,
          children: [
            {
              label: "Leaf",
              value: "0-0-2-1",
            },
            {
              label: "Leaf",
              value: "0-0-2-2",
              disableCheckbox: true,
            },
          ],
        },
      ],
    },
    {
      label: "Trunk 0-1",
      value: "0-1",
      children: [
        {
          label: "Branch 0-1-1",
          value: "0-1-1",
          children: [
            {
              label: "Leaf",
              value: "0-1-1-1",
            },
            {
              label: "Leaf",
              value: "0-1-1-2",
            },
          ],
        },
        {
          label: "Leaf",
          value: "0-1-2",
        },
      ],
    },
  ];
</script>
```

## 远程搜索树

可通过 `filter-method` 属性来实现远程搜索效果。

### 远程搜索树（单选）

```html
<template>
  <e-tree-m
    v-model:checked-keys="remoteSearchSingleCheckedKeys"
    :data="remoteTreeData"
    show-filter
    :filter-method="remoteFilter"
    checkable
    :multiple="false"
  />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const remoteSearchSingleCheckedKeys = ref([]);

  // 远程搜索树数据
  const remoteTreeData = ref([
    {
      label: "Trunk 0-0",
      value: "0-0",
      children: [
        {
          label: "Branch 0-0-0",
          value: "0-0-0",
          disabled: true,
          children: [
            {
              label: "Leaf",
              value: "0-0-0-0",
            },
            {
              label: "Leaf",
              value: "0-0-0-1",
            },
          ],
        },
        {
          label: "Branch 0-0-1",
          value: "0-0-1",
          children: [
            {
              label: "Leaf",
              value: "0-0-1-0",
            },
          ],
        },
      ],
    },
  ]);

  // 远程搜索方法
  const remoteFilter = (key: string) => {
    return new Promise((resolve) => {
      // 如果没有输入关键字，返回原始数据
      if (!key) {
        resolve(remoteTreeData.value);
        return;
      }

      // 模拟远程搜索结果
      const data = [
        {
          label: "Trunk 0-0",
          value: "0-0",
          children: [
            {
              label: `Branch ${key}`,
              value: "0-0-0",
              children: [
                {
                  label: `Leaf ${key}`,
                  value: "0-0-0-0",
                },
                {
                  label: `${key} Leaf`,
                  value: "0-0-0-1",
                },
              ],
            },
          ],
        },
      ];

      setTimeout(() => {
        resolve(data);
      }, 500);
    });
  };
</script>
```

### 远程搜索树（多选）

```html
<template>
  <e-tree-m
    v-model:checked-keys="remoteSearchMultiCheckedKeys"
    :data="remoteTreeData"
    show-filter
    :filter-method="remoteFilter"
    checkable
    :multiple="true"
    :check-strictly="false"
  />
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const remoteSearchMultiCheckedKeys = ref([]);

  // 远程搜索树数据
  const remoteTreeData = ref([
    {
      label: "Trunk 0-0",
      value: "0-0",
      children: [
        {
          label: "Branch 0-0-0",
          value: "0-0-0",
          disabled: true,
          children: [
            {
              label: "Leaf",
              value: "0-0-0-0",
            },
            {
              label: "Leaf",
              value: "0-0-0-1",
            },
          ],
        },
        {
          label: "Branch 0-0-1",
          value: "0-0-1",
          children: [
            {
              label: "Leaf",
              value: "0-0-1-0",
            },
          ],
        },
      ],
    },
  ]);

  // 远程搜索方法
  const remoteFilter = (key: string) => {
    return new Promise((resolve) => {
      // 如果没有输入关键字，返回原始数据
      if (!key) {
        resolve(remoteTreeData.value);
        return;
      }

      // 模拟远程搜索结果
      const data = [
        {
          label: "Trunk 0-0",
          value: "0-0",
          children: [
            {
              label: `Branch ${key}`,
              value: "0-0-0",
              children: [
                {
                  label: `Leaf ${key}`,
                  value: "0-0-0-0",
                },
                {
                  label: `${key} Leaf`,
                  value: "0-0-0-1",
                },
              ],
            },
          ],
        },
      ];

      setTimeout(() => {
        resolve(data);
      }, 500);
    });
  };
</script>
```

## 自定义 data 的字段名称

通过 `field-names` 属性可以自定义 data 的字段名。

```html
<template>
  <e-tree-m
    :default-selected-keys="['0-0-1']"
    :field-names="{
            value: 'value',
            label: 'text',
            children: 'items',
            icon: 'customIcon'
        }"
    :data="customFieldsTreeData"
  />
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  // #ifdef H5
  import { h } from "vue";
  // #endif
  import { Folder, User } from "@epoint-mfe/eui-icons";

  const customFieldsTreeData = [
    {
      text: "Trunk 0-0",
      value: "0-0",
      items: [
        {
          text: "Branch 0-0-2",
          value: "0-0-2",
          selectable: false,
          // #ifdef H5
          customIcon: () => h(Folder),
          // #endif
          items: [
            {
              text: "Leaf",
              value: "0-0-2-1",
              items: [
                {
                  text: "Leaf 0-0-2",
                  value: "0-0-2-1-0",
                  items: [
                    {
                      text: "Leaf",
                      // #ifdef H5
                      customIcon: () => h(User),
                      // #endif
                      value: "0-0-2-1-0-0",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      text: "Trunk 0-1",
      value: "0-1",
      items: [
        {
          text: "Branch 0-1-1",
          value: "0-1-1",
          items: [
            {
              text: "Leaf",
              value: "0-1-1-0",
            },
          ],
        },
      ],
    },
  ];
</script>
```

## API

### Attributes

| Name                            | Description                                                                                                     | Type                                                                                | Default |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------- |
| multiple                        | 是否支持多选，`checkable` 为 `true` 时可用于控制选项框单/多选类型                                               | boolean                                                                             | false   |
| checkable                       | 是否在节点前添加复选框，支持函数格式                                                                            | boolean \| (node: TreeNodeData, info: {level: number; isLeaf: boolean;}) => boolean | false   |
| selectable                      | 是否支持选择，支持函数格式                                                                                      | boolean \| (node: TreeNodeData, info: {level: number; isLeaf: boolean;}) => boolean | true    |
| check-strictly                  | 是否取消父子节点关联                                                                                            | boolean                                                                             | false   |
| checked-strategy                | 定制回填方式 <br/> all: 返回所有选中的节点 <br/> parent: 父子节点都选中时只返回父节点 <br/> child: 只返回子节点 | `'all' \| 'parent' \| 'child'`                                                      | 'all'   |
| default-selected-keys           | 默认选中的树节点                                                                                                | `Array<string \| number>`                                                           | —       |
| selected-keys **(v-model)**     | 选中的树节点                                                                                                    | `Array<string \| number>`                                                           | —       |
| default-checked-keys            | 默认选中复选框的树节点                                                                                          | `Array<string \| number>`                                                           | —       |
| checked-keys **(v-model)**      | 选中复选框的树节点                                                                                              | `Array<string \| number>`                                                           | —       |
| data                            | 传入`data`,生成对应的树结构                                                                                     | `TreeNodeData[]`                                                                    | []      |
| field-names                     | 指定节点数据中的字段名                                                                                          | `TreeFieldNames`                                                                    | —       |
| show-type-icon                  | 是否显示树节点的类型图标，展开收起之后，勾选节点前                                                              | boolean                                                                             | false   |
| show-icon                       | 是否显示树节点的的图标，勾选节点后，文字内容前                                                                  | boolean                                                                             | false   |
| show-filter                     | 是否开启搜索功能                                                                                                | boolean                                                                             | false   |
| filter-method                   | 异步搜索的回调，返回一个 `Promise`                                                                              | `(keyword: string) => Promise<TreeNodeData[]>`                                      | —       |
| debounce                        | 输入筛选关键词的防抖延迟，以毫秒为单位                                                                          | number                                                                              | 300     |
| show-breadcrumb                 | 是否显示面包屑导航                                                                                              | boolean                                                                             | true    |
| load-more                       | 异步加载数据的回调，返回一个 `Promise`                                                                          | `(node: TreeNodeData) => Promise<any>`                                              | —       |
| half-checked-keys **(v-model)** | 半选状态的节点，仅在 checkable 且 checkStrictly 时生效                                                          | `Array<string \| number>`                                                           | —       |
| only-check-leaf                 | 开启后 checkedKeys 只处理叶子节点，父节点状态由子节点决定（仅在 checkable 且 checkStrictly 为 false 时生效）    | boolean                                                                             | false   |

### Events

| Name   | Description            | Parameters                                                                                                                                                                                                      |
| ------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| select | 点击树节点时触发       | selectedKeys: `Array<string \| number>`<br>data: `{ selected?: boolean; selectedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }`                                                                       |
| check  | 点击树节点复选框时触发 | checkedKeys: `Array<string \| number>`<br>data: `{ checked?: boolean; checkedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; halfCheckedKeys: (string \| number)[]; halfCheckedNodes: TreeNodeData[]; }` |
| expand | 展开/关闭              | expandKeys: `Array<string \| number>`<br>data: `{ expanded?: boolean; expandNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }`                                                                           |

### Methods

| Method              | Description                                                                     | Parameters                                                                               |
| ------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| getNodes            | 获取节点对象                                                                    | keys: `TreeNodeKey[]`                                                                    |
| getSelectedKeys     | 获取选中节点的 key 值                                                           | —                                                                                        |
| getSelectedNodes    | 获取选中的节点                                                                  | —                                                                                        |
| getCheckedKeys      | 获取选中复选框节点的 key 值。支持传入 `checkedStrategy`，没有传则取组件的配置。 | options: `checkedStrategy?: 'all' \| 'parent' \| 'child'; includeHalfChecked?: boolean;` |
| getCheckedNodes     | 获取选中复选框的节点。支持传入 `checkedStrategy`，没有传则取组件的配置。        | options: `checkedStrategy?: 'all' \| 'parent' \| 'child'; includeHalfChecked?: boolean;` |
| getHalfCheckedKeys  | 获取复选框半选节点的 key 值                                                     | —                                                                                        |
| getHalfCheckedNodes | 获取复选框半选的节点                                                            | —                                                                                        |
| getExpandedNodes    | 获取展开的节点                                                                  | —                                                                                        |
| checkAll            | 设置全部节点的复选框状态                                                        | checked: `boolean`                                                                       |
| checkNode           | 设置指定节点的复选框状态                                                        | key: `TreeNodeKey \| TreeNodeKey[]`<br>checked: `boolean`<br>onlyCheckLeaf: `boolean`    |
| selectAll           | 设置全部节点的选中状态                                                          | selected: `boolean`                                                                      |
| selectNode          | 设置指定节点的选中状态                                                          | key: `TreeNodeKey \| TreeNodeKey[]`<br>selected: `boolean`                               |
| filter              | 过滤节点                                                                        | keyword: ` string`                                                                       |

### Slots

| Name         | Description                                |
| ------------ | ------------------------------------------ |
| loading-icon | 定制 loading 图标                          |
| type-icon    | 定制节点类型图标，开启`showTypeIcon`后可用 |
| icon         | 定制节点图标，开启`showIcon`后可用         |
| title        | 标题                                       |
| extra        | 渲染额外的节点内容                         |

以上插槽的作用域参数为 `TreeNodeData & TreeNodeStatus` , 详见 [TreeNodeData](#treenodedata) 和 [TreeNodeStatus](#treenodestatus)。

### TreeNodeData

| 参数名          | 描述                                             | 类型                                      | 默认值  |
| --------------- | ------------------------------------------------ | ----------------------------------------- | :-----: |
| value           | 唯一标示                                         | `string \| number`                        |    —    |
| label           | 该节点显示的标题                                 | `string`                                  |    —    |
| selectable      | 是否允许选中                                     | `boolean`                                 | `false` |
| disabled        | 是否禁用节点                                     | `boolean`                                 | `false` |
| disableCheckbox | 是否禁用复选框                                   | `boolean`                                 | `false` |
| checkable       | 是否显示多选框                                   | `boolean`                                 | `false` |
| isLeaf          | 是否是叶子节点。动态加载时有效                   | `boolean`                                 | `false` |
| typeIcon        | 节点的类型图标（仅 H5 支持）                     | `(nodeInfo: TreeNodeRenderArgs) => VNode` |    —    |
| icon            | 节点的图标（仅 H5 支持）                         | `(nodeInfo: TreeNodeRenderArgs) => VNode` |    —    |
| loadingIcon     | 定制 loading 图标，优先级大于 tree（仅 H5 支持） | `(nodeInfo: TreeNodeRenderArgs) => VNode` |    —    |
| children        | 子节点                                           | `TreeNodeData[]`                          |    —    |
| showTypeIcon    | 是否是节点类型图标                               | `boolean`                                 | `false` |
| showIcon        | 是否是节点图标                                   | `boolean`                                 | `false` |

### TreeNodeStatus

| 参数名        | 描述         | 类型      |
| ------------- | ------------ | --------- |
| loading       | 是否加载中   | `boolean` |
| checked       | 是否勾选     | `boolean` |
| selected      | 是否选中     | `boolean` |
| expanded      | 是否展开     | `boolean` |
| indeterminate | 是否半选     | `boolean` |
| isLeaf        | 是否叶子节点 | `boolean` |

### TreeFieldNames

| 参数名          | 描述                                            | 类型     |      默认值       |
| --------------- | ----------------------------------------------- | -------- | :---------------: |
| value           | 指定 value 在 TreeNodeData 中的字段名           | `string` |      `value`      |
| label           | 指定 label 在 TreeNodeData 中的字段名           | `string` |      `label`      |
| disabled        | 指定 disabled 在 TreeNodeData 中的字段名        | `string` |    `disabled`     |
| children        | 指定 children 在 TreeNodeData 中的字段名        | `string` |    `children`     |
| isLeaf          | 指定 isLeaf 在 TreeNodeData 中的字段名          | `string` |     `isLeaf`      |
| disableCheckbox | 指定 disableCheckbox 在 TreeNodeData 中的字段名 | `string` | `disableCheckbox` |
| checkable       | 指定 checkable 在 TreeNodeData 中的字段名       | `string` |    `checkable`    |
| icon            | 指定 icon 在 TreeNodeData 中的字段名            | `string` |      `icon`       |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-tree-m"
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