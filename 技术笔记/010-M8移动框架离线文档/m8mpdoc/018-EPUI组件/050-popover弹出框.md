# Popover 弹出框

Popover 是一个轻量级的弹出框组件，支持多种触发方式和丰富的自定义内容。

## 基本使用

Popover 支持点击、长按和手动触发三种方式。

```html
<template>
    <div class="demo-popover">
        <e-popover-m placement="right" title="标题" trigger="click" content="这是一段内容，这是一段内容，这是一段内容">
            <template #reference>
                <e-button-m>点击触发</e-button-m>
            </template>
        </e-popover-m>

        <e-popover-m
            placement="right"
            title="标题"
            trigger="longpress"
            content="这是一段内容，这是一段内容，这是一段内容"
        >
            <template #reference>
                <e-button-m>长按触发</e-button-m>
            </template>
        </e-popover-m>

        <e-popover-m
            v-model:visible="visible"
            placement="right"
            title="标题"
            trigger="manual"
            content="这是一段内容，这是一段内容，这是一段内容"
        >
            <template #reference>
                <e-button-m @click="manualClick">手动触发</e-button-m>
            </template>
        </e-popover-m>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const visible = ref(false);
    const manualClick = () => {
        visible.value = !visible.value;
    };
</script>

<style lang="scss" scoped>
    .demo-popover {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>
```

## 丰富的内容

Popover 支持自定义内容，包括图片、按钮等复杂元素。

```html
<template>
    <div class="demo-popover-content">
        <e-popover-m placement="right" title="图片内容" trigger="click">
            <template #reference>
                <e-button-m>点击触发</e-button-m>
            </template>
            <div class="em-img-popover">
                <img src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" alt="" />
            </div>
        </e-popover-m>

        <e-popover-m placement="right" title="图片按钮" trigger="click">
            <template #reference>
                <div class="em-img-button">
                    <img src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" alt="" />
                </div>
            </template>
            <span>这是图片触发的内容</span>
        </e-popover-m>
    </div>
</template>

<style lang="scss" scoped>
    .demo-popover-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .em-img-popover {
        height: 150px;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .em-img-button {
        img {
            height: 50px;
            width: 50px;
            border-radius: 50%;
        }
    }
</style>
```

## 嵌套操作

Popover 支持在弹出内容中嵌套按钮等交互元素。

```html
<template>
    <e-popover-m v-model:visible="visible" placement="right" trigger="click" :width="200">
        <p>你确定要删除吗?</p>
        <div style="text-align: left; margin-top: 10px;">
            <e-button-m size="small" text @click="visible = false">取消</e-button-m>
            <e-button-m size="small" type="primary" @click="visible = false">确认</e-button-m>
        </div>
        <template #reference>
            <e-button-m type="danger">删除</e-button-m>
        </template>
    </e-popover-m>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const visible = ref(false);
</script>
```

## 自动关闭

Popover 支持设置自动关闭时间。

```html
<template>
    <e-popover-m
        v-model:visible="autoCloseVisible"
        placement="top"
        trigger="click"
        :auto-close="3000"
        content="3秒后自动关闭"
    >
        <template #reference>
            <e-button-m>自动关闭</e-button-m>
        </template>
    </e-popover-m>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const autoCloseVisible = ref(false);
</script>
```

## 延迟显示/隐藏

Popover 支持设置显示和隐藏的延迟时间。

```html
<template>
    <e-popover-m
        placement="bottom"
        trigger="click"
        :show-after="500"
        :hide-after="300"
        content="显示延迟500ms，隐藏延迟300ms"
    >
        <template #reference>
            <e-button-m>延迟触发</e-button-m>
        </template>
    </e-popover-m>
</template>
```

## 选项列表

Popover 支持 actions 传入列表数据

```html
<template>
    <e-popover-m placement="top" trigger="click" :actions="actions" @select="popoverSelect">
        <template #reference>
            <e-button-m>选项列表</e-button-m>
        </template>
    </e-popover-m>
</template>
<script lang="ts" setup>
    const actions = [
        { text: '选项一', icon: 'add-o' },
        { text: '选项二', icon: 'music-o', divider: true },
        { text: '选项三', icon: 'more-o', disabled: true, className: 'em-action-item-demo' }
    ];
    //弹出选项选择触发
    const popoverSelect = (action: object, index: number) => {
        console.log(action, index);
    };
</script>
```

## API

### Attributes

| **Name**                  | **Description**                     | **Type**                                                                                                                                                                    | **Default** |
| ------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| trigger                   | 触发方式                            | `enum` `'click' 丨 'longpress' 丨 'manual'`                                                                                                                                 | `'click'`   |
| title                     | 弹出框标题                          | `string`                                                                                                                                                                    | —           |
| effect                    | 主题                                | `enum` `'light'丨'dark'`                                                                                                                                                    | `'light'`   |
| content                   | 弹出框内容，可以替换为默认的 `slot` | `string`                                                                                                                                                                    | —           |
| width                     | 弹出框宽度                          | `number 丨 string`                                                                                                                                                          | `'150px'`   |
| placement                 | 弹出位置                            | `enum` `'top' 丨 'top-start' 丨 'top-end' 丨 'bottom' 丨 'bottom-start' 丨 'bottom-end' 丨 'left' 丨 'left-start' 丨 'left-end' 丨 'right' 丨 'right-start' 丨 'right-end'` | `'bottom'`  |
| disabled                  | 是否禁用弹出框                      | `boolean`                                                                                                                                                                   | `false`     |
| visible / v-model:visible | 是否显示弹出框                      | `boolean`                                                                                                                                                                   | `false`     |
| offset                    | 弹出框偏移量                        | `[number, number]`                                                                                                                                                          | `[0, 8]`    |
| show-arrow                | 是否显示箭头                        | `boolean`                                                                                                                                                                   | `true`      |
| popper-class              | 弹出框类名                          | `string`                                                                                                                                                                    | —           |
| popper-style              | 弹出框样式                          | `string 丨 object`                                                                                                                                                          | —           |
| show-after                | 显示延迟时间（毫秒）                | `number`                                                                                                                                                                    | `0`         |
| hide-after                | 隐藏延迟时间（毫秒）                | `number`                                                                                                                                                                    | `200`       |
| auto-close                | 自动关闭时间（毫秒）                | `number`                                                                                                                                                                    | `0`         |
| tabindex                  | HTML tabindex 属性                  | `number`                                                                                                                                                                    | —           |
| actions                   | 选项列表                            | `Action[]`                                                                                                                                                                  | `[]`        |

### Action 数据结构

`actions` 属性是一个由对象构成的数组，数组中的每个对象配置一列，对象可以包含以下值：

| 键名      |                    说明                    | 类型      |
| :-------- | :----------------------------------------: | :-------- |
| text      |                  选项文字                  | `string`  |
| icon      | 文字左侧的图标，支持传入图标名称或图片链接 | `string`  |
| disabled  |               是否为禁用状态               | `boolean` |
| className |          为对应选项添加额外的类名          | `any`     |
| divider   |                列表项分割线                | `boolean` |

### Events

| Name           | **Description**    | **Type**                                  |
| -------------- | ------------------ | ----------------------------------------- |
| update:visible | 显示状态改变时触发 | `(value: boolean) => void`                |
| show           | 显示时触发         | `() => void`                              |
| hide           | 隐藏时触发         | `() => void`                              |
| before-enter   | 进入前触发         | `() => void`                              |
| after-enter    | 进入后触发         | `() => void`                              |
| before-leave   | 离开前触发         | `() => void`                              |
| after-leave    | 离开后触发         | `() => void`                              |
| select         | 点击选项列表触发   | `(action: Action, index: number) => void` |

### Exposes

| Name      | Description  | Type                                |
| --------- | ------------ | ----------------------------------- |
| popperRef | popover 实例 | `ComponentInternalInstance 丨 null` |
| hide      | 隐藏弹出层   | `() => void`                        |

### Slots

| Name      | **Description** |
| --------- | --------------- |
| default   | 弹出框内容      |
| reference | 触发元素        |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-popover-m"
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