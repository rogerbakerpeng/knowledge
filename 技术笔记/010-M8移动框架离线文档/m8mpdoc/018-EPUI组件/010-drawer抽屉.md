# Drawer 抽屉

有时，`Dialog` 并不总是能满足我们的需求。比如，你有一个庞大的表单，或者需要空间来展示诸如 "条款与条件" 这样的内容，`Drawer` 具有几乎与 `Dialog` 相同的 API，但它提供了不同的用户体验。

由于所有组件原生支持 `v-model`，`visible.sync` 已经被弃用，使用 `v-model="visibilityBinding"` 来控制当前抽屉的可见性。

## 基本用法

呼出一个临时抽屉，可以从多个方向打开

您必须像 `Dialog` 一样为 `Drawer` 设置 `model-value` 以控制 `Drawer` 本身的可见性，它是 `boolean` 类型。`Drawer` 有三个部分：`title`、`body` 和 `footer`，`title` 是一个具有命名插槽的标题，您还可以通过名为 `title` 的属性设置标题，默认为空`string`，`body` 部分是 `Drawer` 的主要区域，其中包含用户定义的内容。在打开时，`Drawer` 默认会从右上角向左展开，占手机窗口的 **50%**。您可以通过设置 `direction` 和 `size` 属性来更改默认行为。此示例还演示了如何使用 `before-close` API，查看属性部分以获取更多详细信息。

```html
<template>
  <div class="van-content">
    <e-radio-group-m v-model="direction">
      <e-radio-m value="ltr">left to right</e-radio-m>
      <e-radio-m value="rtl">right to left</e-radio-m>
      <e-radio-m value="ttb">top to bottom</e-radio-m>
      <e-radio-m value="btt">bottom to top</e-radio-m>
    </e-radio-group-m>

    <e-button-m type="primary" style="margin-left: 16px" @click="drawerOpen = true">open</e-button-m>
    <e-button-m type="primary" style="margin-left: 16px" @click="drawerFooter = true">with footer</e-button-m>

    <e-drawer-m v-model="drawerOpen" title="I am the title" modal :direction="direction" :before-close="handleClose" :close-on-click-modal="true">
      <span>Hi, there!</span>
    </e-drawer-m>
    <e-drawer-m v-model="drawerFooter" :direction="direction" :close-on-click-modal="true" size="60%">
      <template #header>
        <h4>set title by slot</h4>
      </template>
      <template #default>
        <e-radio-group-m v-model="radio1">
          <e-radio-m value="Option 1" size="large">Option 1</e-radio-m>
          <e-radio-m value="Option 2" size="large">Option 2</e-radio-m>
        </e-radio-group-m>
      </template>
      <template #footer>
        <div style="display: flex; align-items: center; justify-content: space-around">
          <e-button-m @click="cancelClick">cancel</e-button-m>
          <e-button-m type="primary" @click="confirmClick">confirm</e-button-m>
        </div>
      </template>
    </e-drawer-m>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { EMessageBoxM } from '@epoint-mfe/eui-components';

const drawerOpen = ref(false);
const drawerFooter = ref(false);
const direction = ref('rtl');
const radio1 = ref('Option 1');

const handleClose = (done: () => void) => {
  EMessageBoxM.confirm('Are you sure you want to close this?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

function cancelClick() {
  drawerFooter.value = false;
}

function confirmClick() {
  EMessageBoxM.confirm(`Are you confirm to chose ${radio1.value} ?`)
    .then(() => {
      drawerFooter.value = false;
    })
    .catch(() => {
      // catch error
    });
}
</script>
```

## 无标题

当您不再需要标题时，可以从抽屉中移除它。

将 `withHeader` 属性设置为 **false**，可以从抽屉中移除标题，从而使抽屉可以在屏幕上占用更多空间。如果您希望实现辅助功能，请确保设置 `title` 属性。同时由于没有顶部，也不会有顶部的关闭按钮，你需要自己处理关闭逻辑。

```html
<template>
  <e-button-m type="primary" style="margin-left: 16px" @click="drawerNoTitle = true">open</e-button-m>

  <e-drawer-m v-model="drawerNoTitle" title="I am the title" :with-header="false" close-on-click-modal>
    <span>Hi there!</span>
    <p>There is no Header, so there is no title. You can click the overlay to close this drawer.</p>
    <p>没有顶部，所以没有标题，你可以点击遮罩层来关闭此抽屉。</p>
  </e-drawer-m>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const drawerNoTitle = ref(false);
</script>
```

## 自定义内容

与 `Dialog` 一样，`Drawer` 可用于显示多种不同的交互方式。

```html
<template>
  <e-button-m text @click="table = true">Open Drawer with nested table</e-button-m>
  <e-button-m text @click="dialog = true">Open Drawer with nested form</e-button-m>

  <e-drawer-m v-model="table" title="I have a nested table inside!" direction="rtl" size="80%">
    <e-table-m :data-source="gridData" :columns="columnList"></e-table-m>
  </e-drawer-m>

  <e-drawer-m 
    ref="drawerRef" 
    v-model="dialog" 
    title="I have a nested form inside!" 
    :before-close="handleCloseForm"
    direction="ltr" 
    class="demo-drawer" 
    size="80%"
  >
    <div class="demo-drawer__content">
      <e-form-m :model="form">
        <e-form-item-m label="Name" :label-width="formLabelWidth">
          <e-input-m v-model="form.name" autocomplete="off" placeholder="Please enter name" />
        </e-form-item-m>
        <e-form-item-m label="Area" :label-width="formLabelWidth">
          <e-select-m v-model="form.region" placeholder="Please select activity area">
            <e-option-m label="Area1" value="shanghai" />
            <e-option-m label="Area2" value="beijing" />
          </e-select-m>
        </e-form-item-m>
      </e-form-m>
      <div class="demo-drawer__footer">
        <e-button-m @click="cancelForm">Cancel</e-button-m>
        <e-button-m type="primary" :loading="loading" @click="onClick">
          {{ loading ? 'Submitting ...' : 'Submit' }}
        </e-button-m>
      </div>
    </div>
  </e-drawer-m>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { EMessageBoxM } from '@epoint-mfe/eui-components';

const formLabelWidth = '80px';
let timer: ReturnType<typeof setTimeout>;

const table = ref(false);
const dialog = ref(false);
const loading = ref(false);

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
});

const gridData = [
  {
    date: '2016-05-02',
    name: 'Peter Parker',
    address: 'Queens, New York City'
  },
  {
    date: '2016-05-04',
    name: 'Peter Parker',
    address: 'Queens, New York City'
  },
  {
    date: '2016-05-01',
    name: 'Peter Parker',
    address: 'Queens, New York City'
  },
  {
    date: '2016-05-03',
    name: 'Peter Parker',
    address: 'Queens, New York City'
  }
];

const columnList: Record<string, any>[] = [
  { key: 'date', dataIndex: 'date', title: '日期', width: '30%' },
  { key: 'name', dataIndex: 'name', title: '姓名', width: '30%' },
  { key: 'address', dataIndex: 'address', title: '地址', width: '40%' }
];

const drawerRef = ref<any>();
const onClick = () => {
  drawerRef.value?.handleClose();
};

const handleCloseForm = (done: () => void) => {
  if (loading.value) {
    return;
  }
  EMessageBoxM.confirm('Do you want to submit?')
    .then(() => {
      loading.value = true;
      timer = setTimeout(() => {
        done();
        // 动画关闭需要一定的时间
        setTimeout(() => {
          loading.value = false;
        }, 400);
      }, 2000);
    })
    .catch(() => {
      // catch error
    });
};

const cancelForm = () => {
  loading.value = false;
  dialog.value = false;
  clearTimeout(timer);
};
</script>
```

## 自定义标题

`header` 插槽可用于自定义标题显示的区域。为了保持辅助功能，除了使用此插槽，还可以使用 `title` 属性，或使用 `titleId` 插槽属性来指定要读取为抽屉标题的元素。

```html
<template>
  <e-button-m @click="visible = true">Open Drawer with customized header</e-button-m>
  <e-drawer-m v-model="visible" :show-close="false" size="60%">
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
      <e-button-m type="danger" @click="close">
        <e-icon-m class="ep-icon--left"><CircleCloseFilled /></e-icon-m>
          Close
      </e-button-m>
    </template>
    This is drawer content.
  </e-drawer-m>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { CircleCloseFilled } from '@epoint-mfe/eui-icons';
const visible = ref(false);
</script>
```

## 嵌套的抽屉

您还可以像 `Dialog` 一样拥有多层抽屉。

```html
<template>
  <e-button-m type="primary" style="margin-left: 16px" @click="drawerInner = true">open</e-button-m>

  <e-drawer-m v-model="drawerInner" title="I'm outer Drawer" size="70%">
    <div>
      <e-button-m @click="innerDrawer = true">Click me!</e-button-m>
      <e-drawer-m v-model="innerDrawer" title="I'm inner Drawer" :before-close="handleCloseInner">
        <p>_(:зゝ∠)_</p>
      </e-drawer-m>
    </div>
  </e-drawer-m>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { EMessageBoxM } from '@epoint-mfe/eui-components';

const drawerInner = ref(false);
const innerDrawer = ref(false);

const handleCloseInner = (done: () => void) => {
  EMessageBoxM.confirm('You still have unsaved data, proceed?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>
```

抽屉内的内容应该是惰性渲染的，这意味着抽屉内的内容不会影响初始渲染性能，因此任何 DOM 操作都应该通过 `ref` 或在 `open` 事件触发后执行。

抽屉提供了一个名为 `destroyOnClose` 的 API，它是一个标志变量，指示抽屉关闭后是否应销毁抽屉内的子内容。您可以在需要每次抽屉打开时调用 `mounted` 生命周期时使用此 API。


## Drawer Attributes

| 属性名                   | 描述                                                                                                                                                                                        | 类型                                                                                          | 可选值     | 默认值 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------- | ------- |
| model-value / v-model  | 抽屉是否应显示                                                                                                                                                                                     | `boolean`                                                                                          | —                     | false   |
| lock-scroll            | 在显示抽屉时是否禁用 body 滚动                                                                                                                                                                     | `boolean`                                                                                          | —                     | true    |
| before-close          | 如果设置，将停止关闭过程                                                                                                                                                                           | `function` | 函数(done)（done 是接受`boolean`值作为参数的函数类型，使用 true 或无参数调用 done 将中止关闭过程）                     | —       |
| close-on-click-modal  | 是否可以通过单击遮罩关闭抽屉                                                                                                                                                                       | `boolean`                                                                                          | —                     | false    |
| open-delay             | 打开之前的时间（毫秒）                                                                                                                                                                             | `number`                                                                                          | —                     | 0       |
| close-delay           | 关闭之前的时间（毫秒）                                                                                                                                                                             | `number`                                                                                          | —                     | 0       |
| destroy-on-close           | 指示抽屉关闭后是否应销毁子元素                                                                                                                                                                             | `boolean`                                                                                          | —                     | false       |
| modal                  | 是否显示阴影层                                                                                                                                                                                     | `boolean`                                                                                          | —                     | true    |
| direction              | 抽屉的打开方向                                                                                                                                                                                     | `string`                                                                                          | rtl / ltr / ttb / btt | rtl     |
| show-close             | 是否在抽屉的右上角显示关闭按钮                                                                                                                                                                     | `boolean`                                                                                          | —                     | true    |
| size                   | 抽屉的尺寸，如果抽屉为水平模式，它将影响宽度属性，否则将影响高度属性，当尺寸为 `number` 类型时，它以像素为单位描述尺寸；当尺寸为 `string` 类型时，它应与 `x%` 符号一起使用，否则将被解释为像素单位 | `number` / `string`                                                                                 | -                     | '50%'   |
| title                  | 抽屉的标题，也可以通过命名插槽设置，有关详细说明，请参阅插槽形式                                                                                                                                   | `string`                                                                                        | —                     | —       |
| withHeader             | 控制标题部分的存在的标志，默认为 true，当 withHeader 设置为 false 时，`title 属性` 和 `title 插槽` 都不起作用                                                                                      | `boolean`                                                                                          | -                     | true    |
| modal-class            | 阴影层的额外类名                                                                                                                                                                                   | `string`                                                                                        | -                     | -       |
| z-index                | 设置 z-index                                                                                                                                                                                       | `number`                                                                                          | -                     | -       |

## Drawer Slots

| 属性名   | 描述                                                | SlotProps                                |
| ------ | --------------------------------------------------- | --------------------------------------- |
| default| 默认插槽名，抽屉的内容                                         |-                                        |
| header | 抽屉的标题部分；替换此部分会移除标题，但不会移除关闭按钮。           | close：关闭按钮的点击事件，titleId：标题id，titleClass：标题class                                        |
| title  | 抽屉的标题部分；当使用title插槽时，header插槽部分不显示，但不会移除关闭按钮。               |-                                        |
| footer | 抽屉的页脚部分                                               |-                                        |

## Drawer Methods

| 属性名        | 描述                                  |
| ----------- | -------------------------------------------- |
| handleClose | 用于关闭抽屉，此方法将调用 `before-close`。 |

## Drawer Events

| 属性名   | 描述            | 参数 |
| ------ | ---------------------- | --------- |
| open   | 抽屉打开动画开始前触发 | —         |
| opened | 抽屉打开动画结束后触发 | —         |
| close  | 抽屉关闭动画开始前触发 | —         |
| closed | 抽屉关闭动画结束后触发 | —         |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-drawer-m"
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