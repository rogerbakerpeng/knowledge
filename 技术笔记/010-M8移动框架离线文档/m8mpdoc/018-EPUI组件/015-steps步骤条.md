# Steps 步骤导航

可以用于页面头部导航步骤，显示流程步骤以及支持切换事件。

## 基本使用

使用 `active` 属性设置为 `Number` 类型，表示步骤的索引，从 `0` 开始。您可以在步骤的宽度需要固定时设置 `space` 属性，它接受 `Number`  类型。`space` 属性的单位是 `px`。如果不设置，它将自适应。设置 `finish-status` 属性可以更改已完成步骤的状态。

```html
<template>
  <e-steps-m :active="active" finish-status="success">
    <e-step-m title="Step 1" />
    <e-step-m title="Step 2" />
    <e-step-m title="Step 3" />
  </e-steps-m>
  <e-button-m style="margin-top: 12px" @click="next"
    >Next step</e-button-m
  >
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  const active = ref(0);

  const next = () => {
    if (active.value++ > 2) active.value = 0;
  };
</script>
```

## 包含状态的步骤条

可以通过设置 `finish-status` 属性来改变已完成步骤的状态。

```html
<template>
  <e-steps-m :space="200" :active="1" finish-status="success">
    <e-step-m title="Done" />
    <e-step-m title="Processing" />
    <e-step-m title="Step 3" />
  </e-steps-m>
</template>
```

## 居中

标题和描述可以居中显示。

```html
<template>
  <e-steps-m :active="2" align-center>
    <e-step-m title="Step 1" description="Some description" />
    <e-step-m title="Step 2" description="Some description" />
    <e-step-m title="Step 3" description="Some description" />
    <e-step-m title="Step 4" description="Some description" />
  </e-steps-m>
</template>
```



## 带有描述的步骤条

可以通过 `description` 属性来添加步骤的描述信息。

```html
<template>
  <e-steps-m :active="1">
    <e-step-m title="Step 1" description="Some description" />
    <e-step-m title="Step 2" description="Some description" />
    <e-step-m title="Step 3" description="Some description" />
  </e-steps-m>
</template>
```

## 带有图标的步骤条

可以通过 `icon` 属性来设置步骤的图标。

```html
<template>
  <e-steps-m :active="1">
    <e-step-m title="Step 1" icon="Edit" />
    <e-step-m title="Step 2" icon="Upload" />
    <e-step-m title="Step 3" icon="Picture" />
  </e-steps-m>
</template>
```

## 竖直步骤条

可以通过设置 `direction` 属性为 `vertical` 来改变步骤条的显示方向。

```html
<template>
  <div style="height: 300px">
    <e-steps-m direction="vertical" :active="1">
      <e-step-m title="Step 1" />
      <e-step-m title="Step 2" />
      <e-step-m title="Step 3" />
    </e-steps-m>
  </div>
</template>
```

## 简单步骤条

简单的步骤条，align-center、description、direction 和 space 将被忽略。

```html
<template>
  <e-steps-m :space="200" :active="1" simple>
    <e-step-m title="Step 1" icon="Edit" />
    <e-step-m title="Step 2" icon="UploadFilled" />
    <e-step-m title="Step 3" icon="Picture" />
  </e-steps-m>

  <e-steps-m
    :active="1"
    finish-status="success"
    simple
    style="margin-top: 20px"
  >
    <e-step-m title="Step 1" />
    <e-step-m title="Step 2" />
    <e-step-m title="Step 3" />
  </e-steps-m>
</template>
```

## 节点为小圆点的步骤条

可以使用 `dot` 属性来设置节点为小圆点的步骤条。

```html
<template>
	<div class="steps-container-item">
      <e-steps-m :active="active" finish-status="success" dot align-center>
        <e-step-m title="Step 1" description="This is a description" />
        <e-step-m title="Step 2" description="This is a description" />
        <e-step-m title="Step 3" description="This is a description" />
      </e-steps-m>
    </div>
	<div class="steps-container-item-vertical">
      <e-steps-m
        :active="active"
        finish-status="success"
        dot
        direction="vertical"
        style="height: 300px"
        align-center
      >
        <e-step-m title="Step 1" status="success" description="This is a description" />
        <e-step-m title="Step 2" status="error" description="This is a description" />
        <e-step-m title="Step 3" status="wait" description="This is a description" />
      </e-steps-m>
    </div>
  <e-button-m style="margin-top: 12px" @click="next">Next step</e-button-m>
</template>

<script lang="ts" setup>
  const active = ref(0);

  const next = () => {
    if (active.value++ > 2) active.value = 0;
  };
</script>
<style lang="scss" scoped>
.steps-container-item {
  margin-bottom: 40px;
}

.steps-container-item-vertical {
  display: flex;
  gap: 100px;
  justify-content: center;
  align-items: center;
}
</style>
```



## Steps API

### Steps Attributes

| **Name**       | **Description**                                    | **Type**                                                     | **Default**    |
| -------------- | -------------------------------------------------- | ------------------------------------------------------------ | -------------- |
| space          | 每个步骤之间的间距，如果省略则自适应。支持百分比。 | `number` / `string`                                          | `''`           |
| direction      | 显示方向，可选值为 `vertical`                      | `enum` `'vertical' \|'horizontal'`                           | `'horizontal'` |
| active         | 当前激活的步骤                                     | `number`                                                     | `0`            |
| process-status | 当前步骤的状态                                     | `enum` `'wait' \|'process' \|'finish' \|'error' \|'success'` | `'process'`    |
| finish-status  | 最后一步的状态                                     | `enum` `'wait' \|'process' \|'finish' \|'error' \|'success'` | `'finish'`     |
| align-center   | 居中显示标题和描述                                 | `boolean`                                                    | `false`        |
| simple         | 是否应用简单主题                                   | `boolean`                                                    | `false`        |
| dot            | 是否显示小圆点                                     | `boolean`                                                    | `false`        |



### Steps Slots

| Name    | **Description** | **Subtags** |
| ------- | --------------- | ----------- |
| default | 自定义默认内容  | Step        |



## Step API

### Step Attributes

| **Name**    | **Description**                              | **Type**                                                     | **Default** |
| ----------- | -------------------------------------------- | ------------------------------------------------------------ | ----------- |
| title       | 步骤标题                                     | `string`                                                     | `''`        |
| description | 步骤描述                                     | `string`                                                     | `''`        |
| icon        | 步骤自定义图标。图标也可以通过命名插槽传递。 | `string` / `Component`                                       | —           |
| status      | 当前状态。如果未配置，将由 Steps 自动设置。  | `enum` `'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | `''`        |

### Step Slots

| **Name**    | **Description** |
| ----------- | --------------- |
| icon        | 自定义图标      |
| title       | 步骤表体        |
| description | 步骤描述        |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-steps-m"
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