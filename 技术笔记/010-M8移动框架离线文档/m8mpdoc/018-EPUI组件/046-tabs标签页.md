# Tabs 选项卡

将相关联但属于不同类型的数据集合进行划分。

## 基础用法

简单且简洁的选项卡。

选项卡提供选择性卡片功能。默认情况下，第一个选项卡被选为活动状态，您可以通过设置 `value` 属性来激活任何选项卡。

```html
<template>
  <e-tabs-m v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <e-tab-pane-m label="User" name="first">User</e-tab-pane-m>
    <e-tab-pane-m label="Config" name="second">Config</e-tab-pane-m>
    <e-tab-pane-m label="Role" name="third">Role</e-tab-pane-m>
    <e-tab-pane-m label="Task" name="fourth">Task</e-tab-pane-m>
  </e-tabs-m>
</template>
<script setup>
import { ref } from 'vue';
const activeName = ref('first');
const handleClick = (tab, event) => {
  console.log(tab, event);
};
</script>
```

## Iframe 选项卡

在选项卡上配置 url 可以自定生成 Iframe 并加载对应地址的页面。

```html
<template>
  <e-button-m type="primary" @click="reload">刷新选项卡</e-button-m>
  <e-tabs-m ref="tabs" v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <e-tab-pane-m
      ref="firstRef"
      label="EUI-Vue"
      name="first"
      url="http://192.168.219.170/docs/vue/latest/component/component/button.html"
      @load="onload"
    />
    <e-tab-pane-m
      class="second"
      ref="secondRef"
      label="EUI-F9"
      name="second"
      url="http://192.168.219.170/showcase/eui3/components/"
      lazy
      @load="onload"
    />
  </e-tabs-m>
</template>
<script setup>
import { onMounted, ref } from 'vue';
const activeName = ref('first');
const tabs = ref(null);
const firstRef = ref();
const secondRef = ref();
const handleClick = (tab, event) => {
  console.log('标签点击:', tab);
};
const onload = (pane) => {
  console.log('标签加载:', pane);
};
const reload = () => {
  if (activeName.value === 'first' && firstRef.value && firstRef.value.reload instanceof Function) {
    firstRef.value.reload();
    return;
  } else if (activeName.value === 'second' && secondRef.value && firstRef.value.reload instanceof Function) {
    secondRef.value.reload();
    return;
  }
  if (tabs.value && activeName.value) {
    const tabPane = tabs.value.getTabPane(activeName.value);
    if (tabPane && typeof tabPane.reload === 'function') {
      tabPane.reload();
      return;
    }
  }
};
</script>
```

## 卡片风格

具有卡片样式的选项卡。

将 `type` 设置为 `card` 可以得到卡片样式的选项卡。

```html
<template>
  <e-tabs-m v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
    <e-tab-pane-m label="User" name="first">User</e-tab-pane-m>
    <e-tab-pane-m label="Config" name="second">Config</e-tab-pane-m>
    <e-tab-pane-m label="Role" name="third">Role</e-tab-pane-m>
    <e-tab-pane-m label="Task" name="fourth">Task</e-tab-pane-m>
  </e-tabs-m>
</template>
<script setup>
import { ref } from 'vue';
const activeName = ref('first');
const handleClick = (tab, event) => {
  console.log(tab, event);
};
</script>
```

## 边框卡片

带边框的卡片选项卡。

将 `type` 设置为 `border-card`。

```html
<template>
  <e-tabs-m type="border-card">
    <e-tab-pane-m label="User">User</e-tab-pane-m>
    <e-tab-pane-m label="Config">Config</e-tab-pane-m>
    <e-tab-pane-m label="Role">Role</e-tab-pane-m>
    <e-tab-pane-m label="Task">Task</e-tab-pane-m>
  </e-tabs-m>
</template>
```

## 选项卡位置

您可以使用 `tab-position` 属性设置选项卡的位置。

您可以从两个方向中选择：tabPosition="top|bottom"

```html
<template>
    <e-radio-group-m v-model="tabPosition" style="margin-bottom: 30px">
        <e-radio-button-m value="top">top</e-radio-button-m>
        <e-radio-button-m value="bottom">bottom</e-radio-button-m>
    </e-radio-group-m>
    <e-tabs-m :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
        <e-tab-pane-m label="User">User</e-tab-pane-m>
        <e-tab-pane-m label="Config">Config</e-tab-pane-m>
        <e-tab-pane-m label="Role">Role</e-tab-pane-m>
        <e-tab-pane-m label="Task">Task</e-tab-pane-m>
    </e-tabs-m>
</template>
<script setup>
import { ref } from 'vue';

const tabPosition = ref('top');
</script>
```

## 自定义选项卡

您可以使用命名插槽来自定义选项卡标签内容。

```html
<template>
  <e-tabs-m>
    <e-tab-pane-m >
       <template #label>
        <span class="custom-tabs-label">
          <e-icon-m name="User"/>
          <span>User</span>
        </span>
      </template>
      User
    </e-tab-pane-m>
    <e-tab-pane-m label="Config">Config</e-tab-pane-m>
    <e-tab-pane-m label="Role">Role</e-tab-pane-m>
    <e-tab-pane-m label="Task">Task</e-tab-pane-m>
  </e-tabs-m>
</template>
```



## 添加 & 关闭选项卡

选项卡支持可添加 & 可关闭。

```html
<template>
  <div style="margin-bottom: 20px">
    <e-button-m size="small" @click="addTab"> add tab </e-button-m>
  </div>
  <e-tabs-m v-model="editableTabsValue" type="card" class="demo-tabs" closable @tab-remove="removeTab">
    <e-tab-pane-m v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
      {{ item.content }}
    </e-tab-pane-m>
  </e-tabs-m>
</template>
<script setup>
import { ref } from 'vue';

let tabIndex = 2;
const editableTabsValue = ref('2');
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
]);

const addTab = () => {
  const newTabName = `${++tabIndex}`;
  editableTabs.value.push({
    title: 'New Tab',
    name: newTabName,
    content: 'New Tab content',
  });
  editableTabsValue.value = newTabName;
};
const removeTab = (targetName) => {
  const tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
        }
      }
    });
  }

  editableTabsValue.value = activeName;
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
};
</script>
```

## 自定义新选项卡的触发按钮

```html
<template>
  <div style="margin-bottom: 20px">
    <e-button-m size="small" @click="addTab"> add tab </e-button-m>
  </div>
  <e-tabs-m v-model="editableTabsValue" type="card" class="demo-tabs" closable @tab-remove="removeTab">
    <e-tab-pane-m v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
      {{ item.content }}
    </e-tab-pane-m>
  </e-tabs-m>
</template>
<script setup>
import { ref } from 'vue';


let tabIndex = 2;
const editableTabsValue = ref('2');
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
]);

const addTab = () => {
  const newTabName = `${++tabIndex}`;
  editableTabs.value.push({
    title: 'New Tab',
    name: newTabName,
    content: 'New Tab content',
  });
  editableTabsValue.value = newTabName;
};
const removeTab = (targetName) => {
  const tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
        }
      }
    });
  }

  editableTabsValue.value = activeName;
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
};
</script>
```



## Tabs API

### Tabs Attributes

| Name                  | Description                                                  | Type                                            | Default            |
| :-------------------- | :----------------------------------------------------------- | :---------------------------------------------- | :----------------- |
| model-value / v-model | 绑定值，选中选项卡的名称                                     | `string` / `number`                             | 第一个选项卡的名称 |
| type                  | 选项卡的类型                                                 | `line` / `card`/`border-card`                   | line               |
| closable              | 选项卡是否可关闭                                             | `boolean`                                       | false              |
| addable               | 选项卡是否可添加                                             | `boolean`                                       | false              |
| editable              | 选项卡是否可添加和关闭                                       | `boolean`                                       | false              |
| tab-position          | 选项卡的位置                                                 | `string`                                        | top                |
| stretch               | 选项卡宽度是否自动适应其容器                                 | `boolean`                                       | false              |
| before-leave          | 切换选项卡前的钩子函数。如果返回 `false` 或返回 `Promise` 并且被拒绝，将阻止切换 | `(name, oldname) => boolean \|Promise<boolean>` | —                  |

### Tabs Events

| Name       | Description                              | **Parameters**                                               |
| :--------- | :--------------------------------------- | :----------------------------------------------------------- |
| tab-click  | 点击选项卡时触发                         | (pane:{name: `PaneName`,title: `paneLabel`} ,ev: `Event`)    |
| tab-change | 当前激活的 tab 变更时触发                | (name: `PaneName`)                                           |
| tab-remove | 点击选项卡移除按钮时触发                 | (name: `PaneName`)                                           |
| tab-add    | 点击选项卡添加按钮时触发                 | —                                                            |
| edit       | 点击选项卡添加按钮或选项卡移除按钮时触发 | (paneName: `TabPaneName \|undefined`, action: `'remove' \|'add'`) |

### Tabs Slots

| Name    | Description | **Parameters** |
| :------ | :---------- | :------------- |
| default | 标签页内容  | ep-tab-pane    |

## Tab-pane API

### Tab-pane Attributes

| Name     | Description                                    | Type                | Default                                                  |
| :------- | :--------------------------------------------- | :------------------ | :------------------------------------------------------- |
| label    | 选项卡的标题                                   | `string`            | —                                                        |
| disabled | 选项卡是否禁用                                 | `boolean`           | false                                                    |
| name     | 对应于选项卡名称的标识符，代表选项卡面板的别名 | `string` / `number` | 选项卡面板在序列中的序数编号，例如第一个选项卡面板为 '0' |
| closable | 选项卡是否可关闭                               | `boolean`           | false                                                    |
| lazy     | 选项卡是否懒加载                               | `boolean`           | false                                                    |
| url      | iframe 路径地址                                | `string`            | null                                                     |

### Tab-pane Slots

| Name    | Description      |
| :------ | :--------------- |
| default | 选项卡面板的内容 |
| label   | 选项卡面板的标签 |

### Tab-pane Events

| Name | Description                            | **Parameters**                                               |
| :--- | :------------------------------------- | :----------------------------------------------------------- |
| load | 带有 url 的 pane，iframe加载完成后出发 | (pane:{name: `paneName\|undefined`, title: `'Label'`,disabled:`<boolean>`}) |

### Tab-pane Methods

| Name   | Description    | **Parameters** |
| :----- | :------------- | :------------- |
| reload | 刷新iframe页面 | —              |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-tabs-m"
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